import os
import json
from pathlib import Path

def cleanup_json():
    locales_dir = Path("locales")
    baseline_locale = "de"
    
    if not locales_dir.exists():
        print(f"Error: {locales_dir} does not exist.")
        return

    baseline_path = locales_dir / baseline_locale
    namespaces = [f.name for f in baseline_path.glob("*.json")]
    
    # Load baseline keys
    baseline_keys = {}
    for ns in namespaces:
        with open(baseline_path / ns, 'r', encoding='utf-8') as f:
            data = json.load(f)
            baseline_keys[ns] = set(data.keys())
            
    locales = [d.name for d in locales_dir.iterdir() if d.is_dir()]
    
    cleaned_count = 0
    
    for locale in locales:
        if locale == baseline_locale:
            continue
            
        locale_path = locales_dir / locale
        for ns in namespaces:
            ns_path = locale_path / ns
            if not ns_path.exists():
                continue
                
            with open(ns_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
                
            keys = set(data.keys())
            extra = keys - baseline_keys[ns]
            
            if extra:
                # Remove extra keys
                for k in extra:
                    del data[k]
                
                # Sort keys and write back
                sorted_data = dict(sorted(data.items()))
                with open(ns_path, 'w', encoding='utf-8') as f:
                    json.dump(sorted_data, f, ensure_ascii=False, indent=2)
                    f.write('\n')
                
                print(f"✅ [{locale}] {ns}: Cleaned {len(extra)} extra keys.")
                cleaned_count += len(extra)

    print(f"\nCleanup finished! Removed {cleaned_count} redundant nested objects/keys.")

if __name__ == "__main__":
    cleanup_json()
