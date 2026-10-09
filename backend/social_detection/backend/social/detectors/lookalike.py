def normalize_name(name):
    replacements = {
        "0": "o",
        "1": "i",
        "3": "e",
        "5": "s",
        "7": "t"
    }

    name = name.lower()

    for old, new in replacements.items():
        name = name.replace(old, new)

    return name.replace("_", "").replace("-", "").replace(".", "").replace(" ", "")


def lookalike_score(official, candidate):
    official = normalize_name(official)
    candidate = normalize_name(candidate)

    if official == candidate:
        return 100

    return 0