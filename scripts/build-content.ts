import { buildContentIndex } from '../src/lib/content/engine';

async function main() {
  try {
    buildContentIndex();
    process.exit(0);
  } catch (err) {
    console.error('Fatal error during content build:', err);
    process.exit(1);
  }
}

main();
