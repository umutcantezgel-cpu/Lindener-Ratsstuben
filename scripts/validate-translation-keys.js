const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, '..', 'locales');
const baseLocale = 'en';

function validateFlatStructure(jsonObj, filePath) {
  for (const [key, value] of Object.entries(jsonObj)) {
    if (typeof value === 'object' && value !== null) {
      console.error(`❌ [Validation Error] Deeply nested translation keys are forbidden.`);
      console.error(`   Found nesting at "${key}" in file: ${filePath}`);
      console.error(`   Please use dot notation e.g. "form.email.label" instead of nested objects.`);
      process.exit(1);
    }
  }
}

function runValidation() {
  const locales = fs.readdirSync(localesDir).filter((file) => fs.statSync(path.join(localesDir, file)).isDirectory());
  
  if (!locales.includes(baseLocale)) {
    console.warn(`Base locale "${baseLocale}" not found.`);
    return;
  }

  // 1. Load Base Namespace Keys
  const baseFiles = fs.readdirSync(path.join(localesDir, baseLocale)).filter(f => f.endsWith('.json'));
  const baseKeysMap = new Map();

  for (const file of baseFiles) {
    const raw = fs.readFileSync(path.join(localesDir, baseLocale, file), 'utf-8');
    const json = JSON.parse(raw);
    validateFlatStructure(json, path.join(baseLocale, file));
    baseKeysMap.set(file, Object.keys(json));
  }

  // 2. Cross-reference other Locales
  let hasErrors = false;
  for (const locale of locales) {
    if (locale === baseLocale) continue;
    
    for (const [file, baseKeys] of baseKeysMap.entries()) {
      const targetPath = path.join(localesDir, locale, file);
      if (!fs.existsSync(targetPath)) {
        // We aren't failing hard for missing files right now because we use fallback chain
        continue; 
      }
      
      const raw = fs.readFileSync(targetPath, 'utf-8');
      const json = Object.keys(JSON.parse(raw)).length ? JSON.parse(raw) : {};
      
      validateFlatStructure(json, targetPath);
      
      // We skip exact key-matching validation for now, because the translation 
      // system is meant to fall back to 'en' gracefully when keys are missing.
      // But we can check for keys that exist in target but NOT in base.
      for (const tKey of Object.keys(json)) {
        if (!baseKeys.includes(tKey)) {
          console.warn(`⚠️  [Warning] Extra key "${tKey}" found in ${locale}/${file} that is missing from base ${baseLocale}/${file}`);
        }
      }
    }
  }

  if (!hasErrors) {
    console.log('✅ Translation namespaces validated. Flat structure confirmed.');
  }
}

runValidation();
