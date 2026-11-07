import json
import urllib.request


"""
    This script fetches data from the Scryfall API and prints it in a formatted JSON structure.
    This is a quick prototype to test the API and see what data is returned for a specific card.
    
    Base URL: https://api.scryfall.com
"""

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
    
if __name__ == "__main__":
    print("Getting data from Scryfall...")
    json_data = fetch_data("https://api.scryfall.com/cards/named?exact=Black%20Lotus")
    print("json_data: ", json.dumps(json_data, indent=4))
