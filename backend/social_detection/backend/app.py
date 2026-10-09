from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

from .social.detectors.username import username_similarity
from .social.detectors.display_name import display_name_similarity
from .social.detectors.bio import bio_similarity
from .social.detectors.lookalike import lookalike_score
from .social.detectors.scam import scam_score
from .social.detectors.logo import logo_similarity
from .social.risk_engine import calculate_risk


app = FastAPI(title="NEXORA Social Media Detection")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class SocialScanRequest(BaseModel):
    platform: str
    official_username: str
    official_display_name: str
    official_bio: str

    candidate_username: str
    candidate_display_name: str
    candidate_bio: str

    official_logo: str | None = None
    candidate_logo: str | None = None


@app.get("/")
def home():
    return {
        "message": "Social Detection API is running"
    }


@app.post("/social/scan")
def social_scan(data: SocialScanRequest):

    # Official account check
    if (
        data.candidate_username.lower().strip()
        == data.official_username.lower().strip()
    ):
        return {
            "status": "OFFICIAL",
            "risk_score": 0,
            "risk_level": "LOW",
            "reasons": [
                "Candidate account matches the official username"
            ]
        }

    username_score = username_similarity(
        data.official_username,
        data.candidate_username
    )

    display_name_score = display_name_similarity(
        data.official_display_name,
        data.candidate_display_name
    )

    bio_score = bio_similarity(
        data.official_bio,
        data.candidate_bio
    )

    lookalike = lookalike_score(
        data.official_username,
        data.candidate_username
    )

    scam_result = scam_score(data.candidate_bio)
    scam_score_value = scam_result["score"]

    logo_score = 0

    if data.official_logo and data.candidate_logo:
        logo_score = logo_similarity(
            data.official_logo,
            data.candidate_logo
        )

    result = calculate_risk(
        username_score,
        display_name_score,
        bio_score,
        logo_score,
        lookalike,
        scam_score_value
    )

    reasons = []

    if username_score >= 70:
        reasons.append(
            "Username strongly resembles the official account"
        )

    if display_name_score >= 70:
        reasons.append(
            "Display name is highly similar"
        )

    if bio_score >= 70:
        reasons.append(
            "Bio is highly similar to the official account"
        )

    if logo_score >= 70:
        reasons.append(
            "Profile logo is similar to the official logo"
        )

    if lookalike == 100:
        reasons.append(
            "Look-alike username detected"
        )

    if scam_result["matched_keywords"]:
        reasons.append(
            "Suspicious scam language detected"
        )

    if not reasons:
        reasons.append(
            "No strong impersonation indicators detected"
        )

    return {
        "platform": data.platform,
        "status": (
            "SUSPICIOUS"
            if result["risk_score"] >= 50
            else "LOW_RISK"
        ),
        "risk_score": result["risk_score"],
        "risk_level": result["risk_level"],
        "similarity": {
            "username": username_score,
            "display_name": display_name_score,
            "bio": bio_score,
            "logo": logo_score,
            "lookalike": lookalike
        },
        "scam_score": scam_score_value,
        "reasons": reasons
    }