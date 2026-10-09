from PIL import Image, ImageDraw

official = Image.new("RGB", (200, 200), "white")
draw = ImageDraw.Draw(official)
draw.rectangle((50, 50, 150, 150), fill="black")
official.save("social_detection/data/images/official_logo.png")

candidate = Image.new("RGB", (200, 200), "white")
draw = ImageDraw.Draw(candidate)
draw.rectangle((55, 55, 145, 145), fill="black")
candidate.save("social_detection/data/images/candidate_logo.png")

print("Test logos created")