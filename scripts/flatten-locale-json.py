#!/usr/bin/env python3
"""
Flatten nested JSON locale files into dot-notation format.
The i18n engine expects flat keys like "button.back" but many locale files
store translations as nested objects like {"button": {"back": "Retour"}}.

This script recursively flattens all nested structures while preserving
already-flat keys and maintaining alphabetical ordering.
"""

import json
import os
import sys

LOCALES_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'locales')

NAMESPACES = [
    'common', 'faq', 'forms', 'home', 'legal',
    'menu-data', 'menu', 'meta', 'navigation', 'pages'
]

# DE and EN are already flat — skip them
SKIP_LOCALES = {'de', 'en'}


def flatten_dict(d: dict, parent_key: str = '', sep: str = '.') -> dict:
    """Recursively flatten a nested dict into dot-notation keys."""
    items = {}
    for k, v in d.items():
        new_key = f"{parent_key}{sep}{k}" if parent_key else k
        if isinstance(v, dict):
            items.update(flatten_dict(v, new_key, sep))
        elif isinstance(v, list):
            # Arrays (like in menu-data.json) should be preserved as-is
            items[new_key] = v
        else:
            items[new_key] = v
    return items


def process_file(filepath: str) -> tuple[int, int]:
    """
    Flatten a single JSON file. Returns (nested_count, total_keys).
    """
    with open(filepath, 'r', encoding='utf-8') as f:
        data = json.load(f)

    if not isinstance(data, dict):
        # Skip array-based files (like menu-data.json with array root)
        return 0, 0

    # Count nested objects before flattening
    nested_count = sum(1 for v in data.values() if isinstance(v, dict))

    if nested_count == 0:
        # Already flat — nothing to do
        return 0, len(data)

    # Flatten the structure
    flat = flatten_dict(data)

    # Sort keys alphabetically for consistency
    sorted_flat = dict(sorted(flat.items()))

    # Write back
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(sorted_flat, f, ensure_ascii=False, indent=2)
        f.write('\n')  # Trailing newline

    return nested_count, len(sorted_flat)


def main():
    total_files = 0
    total_fixed = 0
    total_nested = 0

    print("=" * 60)
    print("JSON Locale Flattener — Dot-Notation Normalization")
    print("=" * 60)

    locales = sorted([
        d for d in os.listdir(LOCALES_DIR)
        if os.path.isdir(os.path.join(LOCALES_DIR, d)) and d not in SKIP_LOCALES
    ])

    for locale in locales:
        locale_dir = os.path.join(LOCALES_DIR, locale)
        locale_nested = 0
        locale_fixed = 0

        for ns in NAMESPACES:
            filepath = os.path.join(locale_dir, f"{ns}.json")
            if not os.path.exists(filepath):
                continue

            total_files += 1
            nested, keys = process_file(filepath)

            if nested > 0:
                locale_nested += nested
                locale_fixed += 1
                total_fixed += 1
                total_nested += nested

        status = f"✅ {locale_fixed} files fixed ({locale_nested} nested objects flattened)" if locale_fixed > 0 else "✓ already flat"
        print(f"  {locale}: {status}")

    print()
    print(f"Summary: {total_fixed}/{total_files} files fixed, {total_nested} nested objects flattened")


if __name__ == '__main__':
    main()
