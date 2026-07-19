import json
import re

files = [
    '/Users/umurey/Downloads/Lindener-Ratsstuben-main/locales/hi/seo.json',
    '/Users/umurey/Downloads/Lindener-Ratsstuben-main/public/locales/hi/seo.json'
]

keys = ['home', 'about', 'menu', 'gallery', 'reservation', 'contact', 'kegelbahn', 'impressum', 'datenschutz', 'agb', 'widerruf', 'cookies']

for file in files:
    try:
        with open(file, 'r', encoding='utf-8') as f:
            data = json.load(f)
    except FileNotFoundError:
        print(f"File not found: {file}")
        continue
    
    print(f"Checking {file}:")
    for key in keys:
        if key not in data:
            print(f"  Missing key: {key}")
            continue
        text = data[key]
        
        # 1. At least 350 words
        # Remove HTML tags for word count
        text_no_html = re.sub(r'<[^>]+>', ' ', text)
        words = len(text_no_html.split())
        
        # 2. Uses H2 and H3 tags
        has_h2 = '<h2>' in text or '<h2 ' in text
        has_h3 = '<h3>' in text or '<h3 ' in text
        
        # 3. Uses bolded text
        has_bold = '<b>' in text or '<strong>' in text
        
        # 4. Uses multiple paragraphs
        p_count = len(re.findall(r'<p>', text))
        
        # 5. NO H1 tags
        has_h1 = '<h1>' in text or '<h1 ' in text
        
        errors = []
        if words < 350:
            errors.append(f"Word count is {words} (needs 350+)")
        if not (has_h2 and has_h3):
            errors.append("Missing H2 or H3 tags")
        if not has_bold:
            errors.append("Missing bold tags")
        if p_count < 2:
            errors.append(f"Only {p_count} <p> tags")
        if has_h1:
            errors.append("Contains H1 tags")
            
        if errors:
            print(f"  {key}: {', '.join(errors)}")
        else:
            print(f"  {key}: Pass (words: {words})")
