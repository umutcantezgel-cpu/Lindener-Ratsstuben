const { execSync } = require('child_process');

function getChangedKeys() {
  try {
    // Detect changes in the English base locale against the main branch
    const diff = execSync('git diff main locales/en/').toString();
    const changedKeys = new Set();
    
    diff.split('\n').forEach(line => {
      // Matches newly added/changed JSON keys in the diff
      const match = line.match(/[+-]\s+"([^"]+)":\s+"([^"]*)"/);
      if (match) changedKeys.add(match[1]);
    });
    
    return Array.from(changedKeys);
  } catch (e) {
    // Falls back gracefully if git diff fails (e.g. no main branch, CI contexts)
    console.warn('[Change Detection] Could not run git diff. Treating as 0 changes for now.');
    return [];
  }
}

function run() {
  const changes = getChangedKeys();
  if (changes.length > 20) {
    console.warn(`⚠️ WARNING: ${changes.length} source keys changed. Manual review recommended before syncing to TMS.`);
  } else if (changes.length > 0) {
    console.log(`ℹ️ [TMS Sync] ${changes.length} source keys changed. Ready for translation sync.`);
  } else {
    console.log('✅ No source English translation changes detected.');
  }
}

run();
