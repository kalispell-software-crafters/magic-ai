# Scripts

This area contains prototype test scripts for the project.

## Contents

- [Fetching Card Data](#fetching-card-data)

## Fetching Card Data

The `fetch.py` script is an example of fetching data from Scryfall's API. Run the following commands to see the output. The output is also in the `fetch-object-example.json` file. The same object from a [bulk download](https://scryfall.com/docs/api/bulk-data) is in the `bulk-object-example.json` file. They are identical (from a test run in early 2026).

Steps to run the script:

```bash
python3 -m venv .venv
source .venv/bin/activate
python3 fetch/fetch.py
deactivate
```
