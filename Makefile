PYTHON ?= python3
DRIVER := card-data-download/driver.py

.PHONY: help \
	bulk-default-cards \
	bulk-oracle-cards \
	bulk-unique-artwork \
	bulk-all-cards \
	bulk-rulings \
	bulk-art-tags \
	bulk-oracle-tags \
	bulk-all

help:
	@echo "MTG AI bulk data download targets:"
	@echo "  make bulk-default-cards"
	@echo "  make bulk-oracle-cards"
	@echo "  make bulk-unique-artwork"
	@echo "  make bulk-all-cards"
	@echo "  make bulk-rulings"
	@echo "  make bulk-art-tags"
	@echo "  make bulk-oracle-tags"
	@echo "  make bulk-all"

bulk-default-cards:
	$(PYTHON) $(DRIVER)

bulk-oracle-cards:
	SCRYFALL_BULK_TYPE=oracle_cards $(PYTHON) $(DRIVER)

bulk-unique-artwork:
	SCRYFALL_BULK_TYPE=unique_artwork $(PYTHON) $(DRIVER)

bulk-all-cards:
	SCRYFALL_BULK_TYPE=all_cards $(PYTHON) $(DRIVER)

bulk-rulings:
	SCRYFALL_BULK_TYPE=rulings $(PYTHON) $(DRIVER)

bulk-art-tags:
	SCRYFALL_BULK_TYPE=art_tags $(PYTHON) $(DRIVER)

bulk-oracle-tags:
	SCRYFALL_BULK_TYPE=oracle_tags $(PYTHON) $(DRIVER)

bulk-all: \
	bulk-oracle-cards \
	bulk-unique-artwork \
	bulk-default-cards \
	bulk-all-cards \
	bulk-rulings \
	bulk-art-tags \
	bulk-oracle-tags
