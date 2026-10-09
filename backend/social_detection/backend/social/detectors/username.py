from difflib import SequenceMatcher


def username_similarity(official, candidate):
    official = official.lower().replace("_", "").replace(".", "")
    candidate = candidate.lower().replace("_", "").replace(".", "")

    score = SequenceMatcher(None, official, candidate).ratio()

    return round(score * 100, 2)