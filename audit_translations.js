const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, 'locales');
const baseLang = 'de';
const languages = fs.readdirSync(localesDir).filter(f => fs.statSync(path.join(localesDir, f)).isDirectory());

const baseFiles = fs.readdirSync(path.join(localesDir, baseLang)).filter(f => f.endsWith('.json'));

let totalMissing = 0;
const report = {};

function flattenKeys(obj, prefix = '') {
  let keys = [];
  for (const key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      keys = keys.concat(flattenKeys(obj[key], `${prefix}${key}.`));
    } else {
      keys.push(`${prefix}${key}`);
    }
  }
  return keys;
}

for (const lang of languages) {
  if (lang === baseLang) continue;
  report[lang] = {};
  
  for (const file of baseFiles) {
    const basePath = path.join(localesDir, baseLang, file);
    const targetPath = path.join(localesDir, lang, file);
    
    const baseContent = JSON.parse(fs.readFileSync(basePath, 'utf8'));
    const baseKeys = flattenKeys(baseContent);
    
    if (!fs.existsSync(targetPath)) {
      report[lang][file] = { status: 'MISSING_FILE', missingKeys: baseKeys.length };
      totalMissing += baseKeys.length;
      continue;
    }
    
    const targetContent = JSON.parse(fs.readFileSync(targetPath, 'utf8'));
    const targetKeys = flattenKeys(targetContent);
    
    const missingKeys = baseKeys.filter(k => !targetKeys.includes(k));
    
    if (missingKeys.length > 0) {
      report[lang][file] = { status: 'MISSING_KEYS', missingKeys: missingKeys.length, keys: missingKeys.slice(0, 5).concat(missingKeys.length > 5 ? ['...'] : []) };
      totalMissing += missingKeys.length;
    }
  }
}

console.log(JSON.stringify({ totalMissing, report }, null, 2));
