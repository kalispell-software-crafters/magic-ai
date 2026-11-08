from http_util import download_file, fetch_data
import json
import os
from pathlib import Path
from urllib.parse import urlparse

SCRYFALL_BULK_DATA_URL = "https://api.scryfall.com/bulk-data"
DEFAULT_BULK_TYPE = "default_cards"


def _find_bulk_item(items: list[dict], bulk_type: str) -> dict:
    for item in items:
        if item.get("type") == bulk_type:
            return item
    raise ValueError(f"No Scryfall bulk data item found for type '{bulk_type}'.")


def _get_output_directory() -> Path:
    project_root = Path(__file__).resolve().parent.parent
    output_dir = project_root / "bulk-data"
    output_dir.mkdir(parents=True, exist_ok=True)
    return output_dir

if __name__ == "__main__":
    requested_bulk_type = os.getenv("SCRYFALL_BULK_TYPE", DEFAULT_BULK_TYPE)
    print("Fetching Scryfall bulk data catalog...")

    catalog_data = fetch_data(SCRYFALL_BULK_DATA_URL)
    output_dir = _get_output_directory()

    catalog_path = output_dir / "bulk-data-catalog.json"
    with open(catalog_path, "w", encoding="utf-8") as catalog_file:
        json.dump(catalog_data, catalog_file, indent=2)
    print(f"Saved catalog metadata to: {catalog_path}")

    bulk_items = catalog_data.get("data", [])
    bulk_item = _find_bulk_item(bulk_items, requested_bulk_type)

    download_url = bulk_item.get("download_uri") or bulk_item.get("jsonl_download_uri")
    if not download_url:
        raise ValueError(
            f"Bulk data item '{requested_bulk_type}' does not include a download URL field "
            "(expected download_uri or jsonl_download_uri)."
        )

    output_filename = Path(urlparse(download_url).path).name or f"{requested_bulk_type}.json"
    bulk_output_path = output_dir / output_filename

    print(f"Downloading bulk data type '{requested_bulk_type}'...")
    download_file(download_url, str(bulk_output_path))
    print(f"Saved bulk data file to: {bulk_output_path}")
