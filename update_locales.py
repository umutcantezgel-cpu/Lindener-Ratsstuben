import os
import json

base_dir = '/Users/umurey/Downloads/Lindener-Ratsstuben-main/public/locales'
mapping = {
    'allergen.A': 'temp.O',
    'allergen.B': 'temp.G',
    'allergen.C': 'temp.H',
    'allergen.D': 'temp.N',
    'allergen.E': 'temp.A',
    'allergen.F': 'temp.L',
    'allergen.G': 'temp.M',
    'allergen.H': 'temp.B',
    'allergen.I': 'temp.C',
    'allergen.K': 'temp.D',
    'allergen.M': 'temp.R',
    'allergen.O': 'temp.P',
    'allergen.P': 'temp.F',
}

for root, dirs, files in os.walk(base_dir):
    for file in files:
        if file == 'menu.json':
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                data = json.load(f)
            
            new_data = {}
            for k, v in data.items():
                if k in mapping:
                    new_data[mapping[k]] = v
                else:
                    new_data[k] = v
                    
            # second pass to remove temp
            final_data = {}
            for k, v in new_data.items():
                if k.startswith('temp.'):
                    final_data[k.replace('temp.', 'allergen.')] = v
                else:
                    final_data[k] = v
            
            # sort keys
            final_data_sorted = {k: final_data[k] for k in sorted(final_data.keys())}
            
            with open(path, 'w', encoding='utf-8') as f:
                json.dump(final_data_sorted, f, indent=2, ensure_ascii=False)

print("Locales updated.")
