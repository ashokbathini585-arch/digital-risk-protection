def calculate_risk(
    username_score,
    display_name_score,
    bio_score,
    logo_score,
    lookalike_score,
    scam_score
):
    risk_score = (
        username_score * 0.20 +
        display_name_score * 0.15 +
        bio_score * 0.15 +
        logo_score * 0.20 +
        lookalike_score * 0.10 +
        scam_score * 0.20
    )

    # Very strong logo + identity match
    if (
        logo_score >= 90
        and username_score >= 70
        and display_name_score >= 70
    ):
        risk_score = max(risk_score, 85)

    # Strong identity match + suspicious language
    if (
        username_score >= 70
        and display_name_score >= 70
        and scam_score >= 40
    ):
        risk_score = max(risk_score, 70)

    # Very strong identity match + strong scam indicators
    if (
        username_score >= 70
        and display_name_score >= 70
        and scam_score >= 60
    ):
        risk_score = max(risk_score, 80)

    # Very strong look-alike
    if (
        lookalike_score >= 90
        and username_score >= 70
    ):
        risk_score = max(risk_score, 85)

    risk_score = round(risk_score, 2)

    if risk_score >= 80:
        risk_level = "HIGH"
    elif risk_score >= 50:
        risk_level = "MEDIUM"
    else:
        risk_level = "LOW"

    return {
        "risk_score": risk_score,
        "risk_level": risk_level
    }