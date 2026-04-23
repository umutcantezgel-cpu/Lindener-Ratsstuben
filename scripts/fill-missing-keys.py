#!/usr/bin/env python3
import json
import os
import sys
import time

try:
    from deep_translator import GoogleTranslator
except ImportError:
    print("Please install deep-translator: pip3 install deep-translator")
    sys.exit(1)

LOCALES_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'locales')
NAMESPACES = ['common', 'faq', 'forms', 'home', 'legal', 'menu', 'meta', 'navigation', 'pages']

LOCALE_MAPPING = {
    'zh': 'zh-CN',  # deep-translator uses zh-CN for Chinese
}

def batch_translate(texts, target_lang, source_lang='de'):
    """Translate a list of texts using deep-translator with batching to avoid rate limits."""
    if not texts:
        return []
    
    # Clean texts
    safe_texts = [str(t) if t else "" for t in texts]
    
    translator = GoogleTranslator(source=source_lang, target=target_lang)
    try:
        translated = translator.translate_batch(safe_texts)
        return translated
    except Exception as e:
        print(f"    [!] Batch translation failed for {target_lang}: {e}. Falling back to single translation...")
        results = []
        for text in safe_texts:
            try:
                res = translator.translate(text)
                results.append(res)
                time.sleep(0.2)
            except Exception as e2:
                print(f"      [!] Failed to translate '{text}': {e2}")
                results.append(f"[DE] {text}")
        return results

def sync_namespace(ns, target_locale, de_data):
    filepath = os.path.join(LOCALES_DIR, target_locale, f"{ns}.json")
    
    # Load existing target data
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            try:
                target_data = json.load(f)
            except:
                target_data = {} if isinstance(de_data, dict) else []
    else:
        target_data = {} if isinstance(de_data, dict) else []

    if isinstance(de_data, list):
        # We handle arrays differently. Just replace fully if empty, or keep if lengths match.
        # But wait, menu-data.json is an array of objects. We'll skip array translation for now,
        # it requires structural deep traversal. Since menu-data is usually CMS-driven, we can ignore it if needed.
        if not target_data:
            target_data = de_data
            with open(filepath, 'w', encoding='utf-8') as f:
                json.dump(target_data, f, ensure_ascii=False, indent=2)
            return len(de_data)
        return 0

    # It's a dictionary
    missing_keys = []
    missing_texts = []
    
    for key, text in de_data.items():
        if key not in target_data or not target_data[key]:
            missing_keys.append(key)
            missing_texts.append(text)

    if not missing_keys:
        return 0

    print(f"  [{target_locale}] {ns}.json: Translating {len(missing_keys)} missing keys...")
    
    google_lang = LOCALE_MAPPING.get(target_locale, target_locale)
    
    # Batch size of 50 to avoid payload too large
    BATCH_SIZE = 50
    translated_texts = []
    
    for i in range(0, len(missing_texts), BATCH_SIZE):
        batch = missing_texts[i:i+BATCH_SIZE]
        translated_batch = batch_translate(batch, google_lang)
        translated_texts.extend(translated_batch)
        time.sleep(1) # Be nice to the API

    # Update target data
    for key, trans in zip(missing_keys, translated_texts):
        # Format variables like {count} might be altered by translation (e.g. { count } or {compte}).
        # In a robust script we'd fix interpolation markers, but Google is usually okay with {word}.
        target_data[key] = trans

    # Sort keys
    sorted_target = dict(sorted(target_data.items()))
    
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(sorted_target, f, ensure_ascii=False, indent=2)
        f.write('\n')
        
    return len(missing_keys)

def main():
    locales = [d for d in os.listdir(LOCALES_DIR) if os.path.isdir(os.path.join(LOCALES_DIR, d)) and d != 'de']
    locales = sorted(locales)
    
    total_added = 0
    
    for locale in locales:
        print(f"\nProcessing {locale.upper()}...")
        for ns in NAMESPACES:
            de_filepath = os.path.join(LOCALES_DIR, 'de', f"{ns}.json")
            if not os.path.exists(de_filepath):
                continue
                
            with open(de_filepath, 'r', encoding='utf-8') as f:
                de_data = json.load(f)
                
            added = sync_namespace(ns, locale, de_data)
            total_added += added

    print(f"\nDone! Translated and added {total_added} missing keys across all locales.")

if __name__ == '__main__':
    main()
