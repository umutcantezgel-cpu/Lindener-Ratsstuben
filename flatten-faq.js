const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, 'locales');
const locales = fs.readdirSync(localesDir).filter(f => fs.statSync(path.join(localesDir, f)).isDirectory());

locales.forEach(locale => {
    const faqPath = path.join(localesDir, locale, 'faq.json');
    if (!fs.existsSync(faqPath)) return;
    
    const raw = fs.readFileSync(faqPath, 'utf-8');
    const json = JSON.parse(raw);
    
    const newJson = {};
    if (json.title) newJson.title = json.title;
    
    if (json.items) {
        for (const [qKey, qObj] of Object.entries(json.items)) {
            newJson[`items.${qKey}.question`] = qObj.question;
            newJson[`items.${qKey}.shortAnswer`] = qObj.shortAnswer;
        }
    } else {
        // already flat or no items
        Object.assign(newJson, json);
    }
    
    fs.writeFileSync(faqPath, JSON.stringify(newJson, null, 2) + '\n', 'utf-8');
    console.log(`Flattened ${locale}/faq.json`);
});
