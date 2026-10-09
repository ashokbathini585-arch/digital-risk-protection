SUSPICIOUS_KEYWORDS = [
    "claim your reward",
    "send otp",
    "verify your account",
    "free money",
    "limited offer",
    "click this link",
    "contact whatsapp",
    "send money",
    "giveaway",
]


def scam_score(text):
    text = text.lower()

    found = []

    for keyword in SUSPICIOUS_KEYWORDS:
        if keyword in text:
            found.append(keyword)

    score = min(len(found) * 20, 100)

    return {
        "score": score,
        "matched_keywords": found
    }