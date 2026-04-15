const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, '..', 'locales');
const baseLocale = 'en';

function run() {
  const baseLocaleDir = path.join(localesDir, baseLocale);
  
  if (!fs.existsSync(baseLocaleDir)) {
    console.error(`❌ [Type Generation Error] Base locale directory not found: ${baseLocaleDir}`);
    process.exit(1);
  }

  const files = fs.readdirSync(baseLocaleDir).filter(f => f.endsWith('.json'));
  
  const allKeys = new Set();
  
  for (const file of files) {
    const raw = fs.readFileSync(path.join(baseLocaleDir, file), 'utf-8');
    const json = JSON.parse(raw);
    
    // We expect flat namespace JSONs based on I18N-02 validation
    Object.keys(json).forEach(key => allKeys.add(key));
  }
  
  if (allKeys.size === 0) {
    console.warn(`[Warning] No keys found in ${baseLocale} namespaces. The output type will be empty.`);
  }

  const keysArray = Array.from(allKeys);
  const typeDefBody = keysArray.map(k => `  | '${k}'`).join('\n');
  
  const typeDefinition = `// THIS FILE IS AUTO-GENERATED. DO NOT EDIT MANUALLY.
// Run 'npm run content:types' to regenerate this file.

export type TranslationKey = 
${typeDefBody || '  | never'};
`;

  const outputDir = path.join(__dirname, '..', 'src', 'lib', 'i18n');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputPath = path.join(outputDir, 'types.ts');
  fs.writeFileSync(outputPath, typeDefinition);
  
  console.log(`✅ [Type Generation] Automatically generated ${keysArray.length} strong keys in src/lib/i18n/types.ts`);
}

run();
