from difflib import SequenceMatcher


def display_name_similarity(official, candidate):
    official = official.lower().strip()
    candidate = candidate.lower().strip()

    score = SequenceMatcher(None, official, candidate).ratio()

    return round(score * 100, 2)