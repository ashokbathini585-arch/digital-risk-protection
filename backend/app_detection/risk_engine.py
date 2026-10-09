def calculate_risk(
    name_score,
    developer_score,
    description_score,
    package_match,
    logo_score=0
):

    score = 0
    reasons = []

    # APP NAME
    if name_score >= 90:

        score += 30

        reasons.append(
            "App name is highly similar to the official app"
        )

    elif name_score >= 70:

        score += 20

        reasons.append(
            "App name is similar to the official app"
        )

    elif name_score >= 50:

        score += 10

        reasons.append(
            "App name has moderate similarity"
        )

    # DEVELOPER
    if developer_score < 40:

        score += 20

        reasons.append(
            "Developer/publisher is different from official developer"
        )

    elif developer_score < 70:

        score += 10

        reasons.append(
            "Developer similarity is low"
        )

    # DESCRIPTION
    if description_score >= 80:

        score += 10

        reasons.append(
            "Description closely resembles official app"
        )

    # PACKAGE ID
    if not package_match:

        score += 20

        reasons.append(
            "Package ID does not match official application"
        )

    # LOGO
    if logo_score >= 90:

        score += 20

        reasons.append(
            "Logo is highly similar to official app"
        )

    elif logo_score >= 70:

        score += 10

        reasons.append(
            "Logo is similar to official app"
        )

    score = min(score, 100)

    if score >= 80:

        level = "HIGH"

    elif score >= 50:

        level = "MEDIUM"

    else:

        level = "LOW"

    return {
        "risk_score": score,
        "risk_level": level,
        "reasons": reasons
    }