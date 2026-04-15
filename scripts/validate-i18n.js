#!/usr/bin/env node
/**
 * i18n Validation Script — Deep Audit Version
 * Checks all locale files against the DE baseline for:
 *   1. Missing keys
 *   2. Empty strings
 *   3. DE-identical values (with cognate whitelist)
 *   4. Placeholder parity ({name}, {link}, etc.)
 * Run: node scripts/validate-i18n.js [--deep]
 */
const fs = require('fs');
const path = require('path');

const localesDir = path.resolve(__dirname, '../locales');
const namespaces = ['common', 'forms', 'home', 'legal', 'menu', 'meta', 'navigation', 'pages'];
const locales = fs.readdirSync(localesDir).filter(f =>
  fs.statSync(path.join(localesDir, f)).isDirectory()
);

const isDeep = process.argv.includes('--deep');

// Known international cognates that are legitimately the same across languages
const COGNATE_VALUES = new Set([
  'Pizza', 'Pasta', 'Telefon', 'Kontakt', 'Impressum', 'Datum', 'Galerie',
  'Adresse', 'Schnitzel', 'Salate', 'Feedback', 'Details', 'Personen',
  'Filter', 'Name', 'E-mail', 'E-Mail', '+49...', 'Signature Dishes',
]);

// Build DE baseline
const deData = {};
let deTotal = 0;
for (const ns of namespaces) {
  deData[ns] = JSON.parse(fs.readFileSync(path.join(localesDir, 'de', `${ns}.json`), 'utf8'));
  deTotal += Object.keys(deData[ns]).length;
}

console.log(`\n📊 i18n Validation Report${isDeep ? ' (DEEP MODE)' : ''}`);
console.log(`${'='.repeat(60)}`);
console.log(`Baseline: DE with ${deTotal} keys across ${namespaces.length} namespaces\n`);

let hasErrors = false;
let hasWarnings = false;
const perfectLocales = [];

for (const locale of locales.sort()) {
  if (locale === 'de') continue;
  let totalKeys = 0;
  let totalMissing = 0;
  let totalEmpty = 0;
  let totalDeDuplicates = 0;
  let totalPlaceholderMismatch = 0;
  const issues = [];

  for (const ns of namespaces) {
    const filePath = path.join(localesDir, locale, `${ns}.json`);
    try {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      totalKeys += Object.keys(data).length;

      // Check missing keys
      const missing = Object.keys(deData[ns]).filter(k => !Object.keys(data).includes(k));
      if (missing.length > 0) {
        totalMissing += missing.length;
        issues.push(`   ❌ ${ns}: ${missing.length} missing keys: ${missing.slice(0, 3).join(', ')}${missing.length > 3 ? '...' : ''}`);
      }

      if (isDeep && locale !== 'en') {
        for (const [key, val] of Object.entries(data)) {
          // Check empty strings
          if (typeof val === 'string' && val.trim() === '') {
            totalEmpty++;
            issues.push(`   ⚠️  ${ns}.${key}: EMPTY VALUE`);
          }

          // Check DE-identical (non-cognates only)
          if (deData[ns][key] && val === deData[ns][key] && !COGNATE_VALUES.has(val)) {
            totalDeDuplicates++;
          }

          // Check placeholder parity
          const dePlaceholders = (typeof deData[ns][key] === 'string' ? deData[ns][key].match(/\{[^}]+\}/g) : null) || [];
          const localePlaceholders = (typeof val === 'string' ? val.match(/\{[^}]+\}/g) : null) || [];
          if (dePlaceholders.length !== localePlaceholders.length) {
            totalPlaceholderMismatch++;
            issues.push(`   ⚠️  ${ns}.${key}: Placeholder mismatch (DE: ${dePlaceholders.length}, ${locale}: ${localePlaceholders.length})`);
          }
        }
      }
    } catch {
      totalMissing += Object.keys(deData[ns]).length;
      issues.push(`   ❌ ${ns}: FILE MISSING`);
    }
  }

  const coverage = Math.round((1 - totalMissing / deTotal) * 100);
  const hasIssues = totalMissing > 0 || totalEmpty > 0;

  if (hasIssues) {
    hasErrors = totalMissing > 0;
    hasWarnings = hasWarnings || totalEmpty > 0;
    console.log(`❌ ${locale.toUpperCase()}: ${coverage}% coverage | ${totalMissing} missing | ${totalEmpty} empty`);
    issues.forEach(i => console.log(i));
  } else if (isDeep && totalDeDuplicates > 0) {
    hasWarnings = true;
    console.log(`⚠️  ${locale.toUpperCase()}: 100% keys | ${totalDeDuplicates} DE-identical (cognates excluded) | ${totalPlaceholderMismatch} placeholder mismatches`);
  } else {
    perfectLocales.push(locale.toUpperCase());
  }
}

if (perfectLocales.length > 0) {
  console.log(`\n✅ Perfect locales (${perfectLocales.length}): ${perfectLocales.join(' | ')}`);
}

console.log(`\n${'='.repeat(60)}`);
if (hasErrors) {
  console.log('❌ VALIDATION FAILED: Some locales have missing keys.');
  process.exit(1);
} else if (hasWarnings) {
  console.log(`⚠️  VALIDATION PASSED WITH WARNINGS (${locales.length} locales, ${deTotal} keys each)`);
  process.exit(0);
} else {
  console.log(`✅ ALL ${locales.length} LOCALES VALIDATED — PERFECT PARITY (${deTotal} keys each)`);
  process.exit(0);
}
