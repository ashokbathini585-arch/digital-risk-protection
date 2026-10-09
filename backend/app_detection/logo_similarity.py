from PIL import Image
import numpy as np


def calculate_logo_similarity(
    official_logo_path,
    scanned_logo_path
):
    try:
        official = Image.open(
            official_logo_path
        ).convert("RGB")

        scanned = Image.open(
            scanned_logo_path
        ).convert("RGB")

        # Same size
        official = official.resize((100, 100))
        scanned = scanned.resize((100, 100))

        # Convert to arrays
        img1 = np.array(official).astype(float)
        img2 = np.array(scanned).astype(float)

        # Pixel difference
        difference = np.mean(
            np.abs(img1 - img2)
        )

        # Convert difference to similarity
        similarity = max(
            0,
            100 - (difference / 255 * 100)
        )

        return round(similarity, 2)

    except Exception as error:

        print("Logo comparison error:", error)

        return 0.0