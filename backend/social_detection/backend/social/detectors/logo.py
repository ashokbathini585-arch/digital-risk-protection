from PIL import Image


def average_hash(image_path):
    image = Image.open(image_path).convert("L")
    image = image.resize((8, 8))

    pixels = list(image.getdata())
    average = sum(pixels) / len(pixels)

    return [1 if pixel >= average else 0 for pixel in pixels]


def logo_similarity(official_path, candidate_path):
    official_hash = average_hash(official_path)
    candidate_hash = average_hash(candidate_path)

    matches = sum(
        a == b
        for a, b in zip(official_hash, candidate_hash)
    )

    score = (matches / len(official_hash)) * 100

    return round(score, 2) 