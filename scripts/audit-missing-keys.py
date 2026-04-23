import os
import json
from pathlib import Path

def audit_keys():
    locales_dir = Path("locales")
    baseline_locale = "de"
    
    if not locales_dir.exists():
        print(f"Error: {locales_dir} does not exist.")
        return

    # Gather all namespaces from the baseline locale
    baseline_path = locales_dir / baseline_locale
    if not baseline_path.exists():
        print(f"Error: Baseline locale {baseline_locale} not found.")
        return
        
    namespaces = [f.name for f in baseline_path.glob("*.json")]
    
    # Store keys per namespace for baseline
    baseline_keys = {}
    for ns in namespaces:
        with open(baseline_path / ns, 'r', encoding='utf-8') as f:
            try:
                data = json.load(f)
                baseline_keys[ns] = set(data.keys())
            except json.JSONDecodeError:
                print(f"Error reading {ns} in {baseline_locale}")
                
    locales = [d.name for d in locales_dir.iterdir() if d.is_dir()]
    
    all_perfect = True
    
    for locale in locales:
        if locale == baseline_locale:
            continue
            
        locale_path = locales_dir / locale
        for ns in namespaces:
            ns_path = locale_path / ns
            if not ns_path.exists():
                print(f"❌ [{locale}] Missing namespace: {ns}")
                all_perfect = False
                continue
                
            with open(ns_path, 'r', encoding='utf-8') as f:
                try:
                    data = json.load(f)
                    keys = set(data.keys())
                    
                    missing = baseline_keys[ns] - keys
                    extra = keys - baseline_keys[ns]
                    
                    if missing:
                        print(f"❌ [{locale}] {ns}: Missing keys: {missing}")
                        all_perfect = False
                    if extra:
                        print(f"⚠️ [{locale}] {ns}: Extra keys (can be cleaned): {extra}")
                        all_perfect = False
                        
                except json.JSONDecodeError:
                    print(f"❌ [{locale}] {ns}: Invalid JSON")
                    all_perfect = False
                    
    if all_perfect:
        print("\n✅ PERFECT MATCH! All 25 locales have exactly the same keys as the 'de' baseline.")
    else:
        print("\n❌ Audit failed. Some locales are missing keys or have extra keys.")

if __name__ == "__main__":
    audit_keys()
