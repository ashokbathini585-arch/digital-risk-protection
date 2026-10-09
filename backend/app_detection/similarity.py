from rapidfuzz.fuzz import ratio


def text_similarity(text1: str, text2: str) -> float:
    if not text1 or not text2:
        return 0.0

    return round(ratio(
        text1.lower().strip(),
        text2.lower().strip()
    ), 2)


def name_similarity(app_name, official_name):
    return text_similarity(app_name, official_name)


def developer_similarity(developer, official_developer):
    return text_similarity(developer, official_developer)


def description_similarity(description, official_description):
    return text_similarity(
        description,
        official_description
    )