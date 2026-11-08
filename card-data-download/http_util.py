import json
import urllib.request

def fetch_data(url: str) -> any:
    request = urllib.request.Request(
        url,
        headers={
            "User-Agent": "mtg-ai/0.1 (kalispell-software-crafters)",
            "Accept": "application/json",
        }
    )
    with urllib.request.urlopen(request) as response:
        return json.load(response)


def download_file(url: str, destination_path: str) -> None:
    request = urllib.request.Request(
        url,
        headers={
            "User-Agent": "mtg-ai/0.1 (kalispell-software-crafters)",
            "Accept": "*/*",
        }
    )
    with urllib.request.urlopen(request) as response, open(destination_path, "wb") as output_file:
        output_file.write(response.read())
