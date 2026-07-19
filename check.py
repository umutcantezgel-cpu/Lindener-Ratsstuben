import json
import re

def check_file(filepath):
    print(f"Checking {filepath}")
    with open(filepath, 'r') as f:
        data = json.load(f)
    
    keys = ["home", "about", "menu", "gallery", "reservation", "contact", "kegelbahn", "impressum", "datenschutz", "agb", "widerruf", "cookies"]
    
    for key in keys:
        if key not in data:
            print(f"Key {key} missing")
            continue
        text = data[key]
        
        # Word count (stripping html)
        text_no_html = re.sub(r'<[^>]+>', ' ', text)
        words = len(text_no_html.split())
        
        has_h2 = '<h2>' in text
        has_h3 = '<h3>' in text
        has_b_strong = '<b>' in text or '<strong>' in text
        has_p = text.count('<p>') >= 2 # multiple paragraphs
        has_h1 = '<h1>' in text or '<h1 ' in text
        
        if words < 350 or not has_h2 or not has_h3 or not has_b_strong or not has_p or has_h1:
            print(f"[{key}] FAILED: words={words}, H2={has_h2}, H3={has_h3}, B={has_b_strong}, P>1={has_p}, H1={not has_h1}")
        else:
            print(f"[{key}] PASSED: words={words}")

check_file('locales/hu/seo.json')
check_file('public/locales/hu/seo.json')
