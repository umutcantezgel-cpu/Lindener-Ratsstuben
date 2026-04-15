import fs from 'fs';
import path from 'path';
import { ContentDocument } from '../src/lib/content/schema';
import { validateDocument, ValidationReport } from '../src/lib/content/validation';
import { writeJsonCache } from '../src/lib/content/cache';

const CACHE_DIR = path.join(process.cwd(), '.content-cache');
const SLUGS_INDEX = path.join(CACHE_DIR, 'slugs-index.json');

async function main() {
  console.log('[CW-05] Starting Content Validation Pipeline...');

  if (!fs.existsSync(SLUGS_INDEX)) {
    console.error('[CW-05] ERROR: slugs-index.json not found. Run content:build first.');
    process.exit(1);
  }

  const slugsMap: Record<string, ContentDocument> = JSON.parse(
    fs.readFileSync(SLUGS_INDEX, 'utf-8')
  );

  const allDocs = Object.values(slugsMap);
  const reports: Record<string, ValidationReport> = {};
  let passCount = 0;
  let warnCount = 0;
  let failCount = 0;

  for (const doc of allDocs) {
    const report = validateDocument(doc, allDocs);
    reports[doc.slug] = report;

    const icon = report.status === 'PASS' ? '✅' : report.status === 'PASS_WITH_WARNINGS' ? '⚠️' : '❌';
    console.log(`[CW-05] ${icon} ${doc.slug}: ${report.status} (words: ${report.wordCount}, FK: ${report.readabilityScores.fleschKincaid}, errors: ${report.errors.length})`);

    if (report.status === 'PASS') passCount++;
    else if (report.status === 'PASS_WITH_WARNINGS') warnCount++;
    else failCount++;
  }

  writeJsonCache('validation-report.json', reports);

  console.log(`\n[CW-05] SUMMARY: ${passCount} PASS, ${warnCount} WARNINGS, ${failCount} FAIL`);
  console.log('[CW-05] Pipeline CW-05 successfully completed.');
}

main().catch((err) => {
  console.error('[CW-05] Fatal error', err);
  process.exit(1);
});
