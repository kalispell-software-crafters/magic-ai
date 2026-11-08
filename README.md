# MTG AI Project

This is a learning project focused on creating an AI chatbot for the Magic: The Gathering card game. Users can ask questions to search for cards. Like, "show me all the blue cards that include trees in the artwork." It will have an initial focus on the Commander format.

This project is unofficial Fan Content permitted under the [Fan Content Policy](https://company.wizards.com/en/legal/fancontentpolicy). Not approved/endorsed by Wizards. Portions of the materials used are property of Wizards of the Coast. ©Wizards of the Coast LLC.

## Contents

- [Card Data Download](#card-data-download)
- [Research Concepts](#research-concepts)

## Card Data Download

The script under `card-data-download` pulls bulk card data from Scrfall.com's API. This data will be transformed and inserted into a database for reference.

Run the script with:
```shell
python3 card-data-download/driver.py
```

By default, it downloads the `default_cards` bulk file and writes results into the `bulk-data` folder at the project root:

- `bulk-data/bulk-data-catalog.json` (bulk metadata)
- `bulk-data/<downloaded-file>` (for example `oracle-cards-YYYYMMDDHHMMSS.jsonl.gz`)

To download a different bulk type, set `SCRYFALL_BULK_TYPE`, for example:

```shell
SCRYFALL_BULK_TYPE=oracle_cards python3 card-data-download/driver.py
```

You can also use Makefile targets for each bulk type:

```shell
make bulk-default-cards
make bulk-oracle-cards
make bulk-unique-artwork
make bulk-all-cards
make bulk-rulings
make bulk-art-tags
make bulk-oracle-tags
```

To run all bulk data downloads in one command:

```shell
make bulk-all
```

Valid Bulk Data Types

- oracle_cards
- unique_artwork
- default_cards
- all_cards
- rulings
- art_tags
- oracle_tags

- [Bulk Data Files - Scrfall](https://scryfall.com/docs/api/bulk-data)

## Research Concepts

The `research-concepts` folder holds artifacts from our development. Such as initial system design concepts, prototype scripts or items we individually wanted to explore as part of this learning project.
