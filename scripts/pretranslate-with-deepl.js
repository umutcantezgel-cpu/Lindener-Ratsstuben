const fs = require('fs');
const path = require('path');

// NOTE: To activate this script, install the DeepL SDK:
// npm install deepl-node
// And set your DEEPL_API_KEY inside the .env file.

let deepl;
try {
  deepl = require('deepl-node');
} catch (e) {
  deepl = null;
}

const TARGET_LANGUAGES = ['de', 'fr', 'es', 'ja', 'pt', 'zh', 'ar'];

async function run() {
  if (!deepl) {
    console.log('ℹ️ [DeepL Pre-Translation] Subsystem skipped. (Run "npm i deepl-node" and provide API Key to enable machine pre-translation).');
    return;
  }

  if (!process.env.DEEPL_API_KEY) {
    console.log('⚠️ [DeepL Pre-Translation] Missing DEEPL_API_KEY environment variable. Skipping.');
    return;
  }

  const translator = new deepl.Translator(process.env.DEEPL_API_KEY);
  const commonSrc = path.join(__dirname, '..', 'locales', 'en', 'common.json');
  
  if (!fs.existsSync(commonSrc)) {
    console.error(`❌ Source not found: ${commonSrc}`);
    process.exit(1);
  }

  const sourceData = JSON.parse(fs.readFileSync(commonSrc, 'utf-8'));

  console.log(`🚀 Starting Machine Translation pre-fill for ${Object.keys(sourceData).length} keys...`);

  for (const lang of TARGET_LANGUAGES) {
    console.log(`Translating into locale: [${lang.toUpperCase()}]`);
    const translated = {};
    
    // DeepL uses 'ZH' for Chinese etc., depending on SDK specifics you might need to map them.
    // Assuming simple mapping here.
    const deepLLangTarget = lang.toUpperCase() === 'ZH' ? 'ZH' : lang.toUpperCase();

    for (const [key, value] of Object.entries(sourceData)) {
      if (typeof value === 'string') {
        try {
          const result = await translator.translateText(value, 'EN', deepLLangTarget);
          translated[key] = result.text;
        } catch (e) {
          console.error(`Failed to translate key ${key} to ${lang}:`, e.message);
          translated[key] = value; // fallback
        }
      }
    }
    
    // Save to the respective locale folder
    const targetDir = path.join(__dirname, '..', 'locales', lang);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    fs.writeFileSync(
      path.join(targetDir, 'common.json'),
      JSON.stringify(translated, null, 2)
    );
  }

  console.log('✅ DeepL Translation Pre-Fill Completed.');
}

run();
