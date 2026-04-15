import { buildAuthorIndex } from '../src/lib/content/authors';

async function main() {
  try {
    buildAuthorIndex();
    console.log('[CW-07] Pipeline CW-07 successfully completed.');
    process.exit(0);
  } catch (err) {
    console.error('[CW-07] Fatal error', err);
    process.exit(1);
  }
}

main();
