const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, '..', 'locales');
const sourceLocale = 'de';
const namespaces = ['common', 'home', 'navigation', 'pages', 'forms', 'faq', 'legal', 'menu', 'meta'];

function sortObjectKeys(obj) {
  return Object.keys(obj)
    .sort()
    .reduce((result, key) => {
      result[key] = obj[key];
      return result;
    }, {});
}

function syncLocales() {
  console.log(`Starting i18n synchronization using '${sourceLocale}' as the source of truth...`);

  // 1. Get all locales
  const allLocales = fs.readdirSync(localesDir).filter(dir => {
    const stat = fs.statSync(path.join(localesDir, dir));
    return stat.isDirectory() && dir !== sourceLocale;
  });

  console.log(`Found ${allLocales.length} target locales to sync.\\n`);

  let totalAdded = 0;

  // 2. Iterate over each namespace
  namespaces.forEach(ns => {
    const sourceFilePath = path.join(localesDir, sourceLocale, `${ns}.json`);
    
    if (!fs.existsSync(sourceFilePath)) {
      console.warn(`⚠️ Source file missing: ${sourceFilePath}`);
      return;
    }

    const sourceData = JSON.parse(fs.readFileSync(sourceFilePath, 'utf8'));

    // 3. Sync across all target locales
    allLocales.forEach(targetLocale => {
      const targetDirPath = path.join(localesDir, targetLocale);
      const targetFilePath = path.join(targetDirPath, `${ns}.json`);

      // Ensure directory exists
      if (!fs.existsSync(targetDirPath)) {
        fs.mkdirSync(targetDirPath, { recursive: true });
      }

      let targetData = {};
      if (fs.existsSync(targetFilePath)) {
        try {
          targetData = JSON.parse(fs.readFileSync(targetFilePath, 'utf8'));
        } catch (e) {
          console.error(`❌ Error parsing ${targetFilePath}. Skipping.`);
          return;
        }
      }

      let addedKeys = 0;

      // Deep copy source keys and append [TODO: targetLocale] for missing ones
      const syncedData = {};
      Object.keys(sourceData).forEach(key => {
        if (targetData[key] !== undefined) {
          syncedData[key] = targetData[key];
        } else {
          // Key missing, add placeholder
          syncedData[key] = `[TODO: ${targetLocale}] ${sourceData[key]}`;
          addedKeys++;
          totalAdded++;
        }
      });

      // Optional: keep extra keys that are in target but not in source? 
      // Usually, we want strict synchronization, so we discard extra keys.
      
      if (addedKeys > 0) {
        console.log(`  [${targetLocale}] ${ns}.json -> Added ${addedKeys} missing keys`);
      }

      // Sort and write
      const sortedData = sortObjectKeys(syncedData);
      fs.writeFileSync(targetFilePath, JSON.stringify(sortedData, null, 2) + '\\n', 'utf8');
    });
  });

  console.log(`\\n✅ Sync complete! Total missing keys added: ${totalAdded}`);
}

syncLocales();
