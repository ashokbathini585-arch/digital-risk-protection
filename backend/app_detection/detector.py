from .similarity import name_similarity, developer_similarity, description_similarity
from .official_apps import load_official_apps
from .risk_engine import calculate_risk


def _norm(value: str) -> str:
    return "".join(ch.lower() for ch in (value or "").strip() if ch.isalnum())


def _norm_package(value: str) -> str:
    return (value or "").strip().lower()


def _developer_match(scanned: str, official: str) -> bool:
    a, b = _norm(scanned), _norm(official)
    if not a or not b:
        return False
    aliases = {
        "metaplatformsinc": {"metaplatformsinc", "instagram", "facebook"},
        "whatsappllc": {"whatsappllc", "whatsapp"},
        "googlellc": {"googlellc", "google"},
        "one97communicationsltd": {"one97communicationsltd", "paytm"},
        "phonepe": {"phonepe", "phonepeprivatelimited"},
        "telegramfzllc": {"telegramfzllc", "telegram"},
    }
    return a == b or b in aliases and a in aliases[b]


def _is_exact_identity(app: dict, official: dict) -> tuple[bool, bool, bool]:
    package_match = _norm_package(app.get("package_id")) == _norm_package(official.get("package_id"))
    developer_match = _developer_match(app.get("developer", ""), official.get("developer", ""))
    name_match = _norm(app.get("app_name")) == _norm(official.get("app_name"))
    return package_match, developer_match, name_match


def detect_app(app):
    official_apps = load_official_apps()
    if not official_apps:
        return {"status": "UNKNOWN", "risk_score": 100, "risk_level": "HIGH", "reasons": ["No official app registry is configured"]}

    # First priority: package ID is the strongest identity signal available from the
    # text-only scanner. This prevents unrelated brands (e.g. Paytm) from being
    # selected simply because their fuzzy score is higher.
    package = _norm_package(app.get("package_id"))
    exact_package = [o for o in official_apps if _norm_package(o.get("package_id")) == package and package]

    if exact_package:
        official = exact_package[0]
        package_match, developer_match, name_match = _is_exact_identity(app, official)
        name_score = name_similarity(app.get("app_name", ""), official["app_name"])
        developer_score = developer_similarity(app.get("developer", ""), official["developer"])
        description_score = description_similarity(app.get("description", ""), official["description"])

        if developer_match and name_match:
            return {
                "status": "OFFICIAL",
                "target_brand": official["brand"],
                "official_app": official["app_name"],
                "scanned_app": app["app_name"],
                "package_id": app["package_id"],
                "developer": app["developer"],
                "matched_package_id": official["package_id"],
                "official_developer": official["developer"],
                "name_similarity": name_score,
                "developer_similarity": developer_score,
                "description_similarity": description_score,
                "package_match": True,
                "developer_match": True,
                "risk_score": 0,
                "risk_level": "LOW",
                "confidence": 100,
                "reasons": [
                    "Package ID exactly matches the registered official application",
                    "Developer matches the registered official developer",
                    "App name matches the registered official application"
                ],
                "verification_note": "Identity matches the local official-app registry. An APK signature/certificate check is still required for cryptographic verification."
            }

        reasons = []
        if not developer_match:
            reasons.append("Package ID matches an official app, but the developer does not match")
        if not name_match:
            reasons.append("Package ID matches an official app, but the app name does not match")
        return {
            "status": "SUSPICIOUS",
            "target_brand": official["brand"],
            "official_app": official["app_name"],
            "scanned_app": app["app_name"],
            "package_id": app["package_id"],
            "developer": app["developer"],
            "matched_package_id": official["package_id"],
            "official_developer": official["developer"],
            "name_similarity": name_score,
            "developer_similarity": developer_score,
            "description_similarity": description_score,
            "package_match": True,
            "developer_match": developer_match,
            "risk_score": 80 if not developer_match else 60,
            "risk_level": "HIGH" if not developer_match else "MEDIUM",
            "confidence": 95,
            "reasons": reasons,
            "verification_note": "The supplied identity is inconsistent with the official registry. Verify the installed APK signature and store source."
        }

    # No exact package: choose the closest official identity, then score it.
    candidates = []
    for official in official_apps:
        name_score = name_similarity(app.get("app_name", ""), official["app_name"])
        developer_score = developer_similarity(app.get("developer", ""), official["developer"])
        description_score = description_similarity(app.get("description", ""), official["description"])
        score = name_score * 0.55 + developer_score * 0.35 + description_score * 0.10
        candidates.append((score, official, name_score, developer_score, description_score))

    _, official, name_score, developer_score, description_score = max(candidates, key=lambda x: x[0])
    risk = calculate_risk(
        name_score=name_score,
        developer_score=developer_score,
        description_score=description_score,
        package_match=False,
        logo_score=0,
    )

    # If it looks strongly like a known app but has a different package, treat it
    # as possible impersonation rather than calling it official.
    likely_impersonation = name_score >= 80 or (name_score >= 65 and developer_score >= 65)
    if likely_impersonation:
        status = "SUSPICIOUS"
        risk["risk_score"] = max(risk["risk_score"], 70)
        risk["risk_level"] = "HIGH" if risk["risk_score"] >= 80 else "MEDIUM"
    else:
        status = "UNKNOWN"
        risk["risk_score"] = max(risk["risk_score"], 35)
        risk["risk_level"] = "MEDIUM" if risk["risk_score"] >= 50 else "LOW"
        risk["reasons"].append("No exact package match was found in the official app registry")

    return {
        "status": status,
        "target_brand": official["brand"],
        "official_app": official["app_name"],
        "scanned_app": app["app_name"],
        "package_id": app["package_id"],
        "developer": app["developer"],
        "matched_package_id": official["package_id"],
        "official_developer": official["developer"],
        "name_similarity": name_score,
        "developer_similarity": developer_score,
        "description_similarity": description_score,
        "package_match": False,
        "developer_match": _developer_match(app.get("developer", ""), official.get("developer", "")),
        "risk_score": risk["risk_score"],
        "risk_level": risk["risk_level"],
        "confidence": round(max(name_score, developer_score) if likely_impersonation else 60, 2),
        "reasons": risk["reasons"],
        "verification_note": "This is a risk assessment based on the local official-app registry, not cryptographic proof."
    }
