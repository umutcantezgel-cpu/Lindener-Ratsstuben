import { buildAnalyticsBaseline } from '../src/lib/content/analytics';

async function main() {
  try {
    buildAnalyticsBaseline();
    console.log('[CW-08] Pipeline CW-08 successfully completed.');
    process.exit(0);
  } catch (err) {
    console.error('[CW-08] Fatal error', err);
    process.exit(1);
  }
}

main();
