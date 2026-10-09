import json
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
DATA_FILE = BASE_DIR / "data" / "official_apps.json"


def load_official_apps():
    with open(DATA_FILE, "r", encoding="utf-8") as file:
        return json.load(file)


def find_official_app(package_id):
    official_apps = load_official_apps()
    for app in official_apps:
        if app["package_id"].lower() == package_id.lower():
            return app
    return None
