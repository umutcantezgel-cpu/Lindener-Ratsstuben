const fs = require('fs');
const path = require('path');

/**
 * I18N Bundle Size Analyzer
 * 
 * Scans the built .next output to report chunk sizes.
 * Also reports the raw size of each locale's JSON namespace files.
 * 
 * Usage: npm run build && node scripts/bundle-analyzer.js
 */

const LOCALES_DIR = path.join(__dirname, '..', 'locales');
const BUILD_DIR = path.join(__dirname, '..', '.next', 'static', 'chunks');

function getDirectorySize(dirPath) {
  if (!fs.existsSync(dirPath)) return 0;
  let totalSize = 0;
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isFile()) {
      totalSize += fs.statSync(fullPath).size;
    } else if (entry.isDirectory()) {
      totalSize += getDirectorySize(fullPath);
    }
  }
  return totalSize;
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function analyzeLocaleJsonSizes() {
  console.log('\n📦 I18N Locale JSON Sizes (Source)');
  console.log('─'.repeat(50));

  if (!fs.existsSync(LOCALES_DIR)) {
    console.warn('⚠️  Locales directory not found. Skipping JSON analysis.');
    return;
  }

  const locales = fs.readdirSync(LOCALES_DIR, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name);

  const report = {};

  for (const locale of locales) {
    const localeDir = path.join(LOCALES_DIR, locale);
    const files = fs.readdirSync(localeDir).filter(f => f.endsWith('.json'));
    let totalBytes = 0;
    const namespaces = {};

    for (const file of files) {
      const size = fs.statSync(path.join(localeDir, file)).size;
      totalBytes += size;
      namespaces[file] = formatBytes(size);
    }

    report[locale] = {
      total: formatBytes(totalBytes),
      totalBytes,
      namespaces,
      fileCount: files.length,
    };
  }

  // Print table
  const tableData = Object.entries(report).map(([locale, data]) => ({
    Locale: locale,
    Files: data.fileCount,
    'Total Size': data.total,
  }));

  console.table(tableData);

  // Flag outliers (> 2x the average)
  const sizes = Object.values(report).map(d => d.totalBytes);
  const avgSize = sizes.reduce((a, b) => a + b, 0) / sizes.length;

  Object.entries(report).forEach(([locale, data]) => {
    if (data.totalBytes > avgSize * 2) {
      console.warn(`⚠️  Locale "${locale}" is ${formatBytes(data.totalBytes)} — significantly larger than average (${formatBytes(avgSize)}).`);
    }
  });
}

function analyzeChunkSizes() {
  console.log('\n📊 Next.js Build Chunk Analysis');
  console.log('─'.repeat(50));

  if (!fs.existsSync(BUILD_DIR)) {
    console.warn('⚠️  Build directory not found. Run `npm run build` first.');
    return;
  }

  const totalBuildSize = getDirectorySize(BUILD_DIR);
  console.log(`Total chunks size: ${formatBytes(totalBuildSize)}`);

  // Count JS files
  const jsFiles = fs.readdirSync(BUILD_DIR).filter(f => f.endsWith('.js'));
  console.log(`Total JS chunks: ${jsFiles.length}`);

  // Show top 5 largest chunks
  const chunkSizes = jsFiles.map(f => ({
    name: f,
    size: fs.statSync(path.join(BUILD_DIR, f)).size,
  })).sort((a, b) => b.size - a.size);

  console.log('\nTop 5 largest chunks:');
  chunkSizes.slice(0, 5).forEach((c, i) => {
    console.log(`  ${i + 1}. ${c.name} — ${formatBytes(c.size)}`);
  });
}

function run() {
  console.log('🔍 I18N Bundle Analyzer');
  console.log('═'.repeat(50));
  analyzeLocaleJsonSizes();
  analyzeChunkSizes();
  console.log('\n✅ Analysis complete.');
}

run();
