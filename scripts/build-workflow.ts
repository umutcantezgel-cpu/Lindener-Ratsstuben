import { syncWorkflowState } from '../src/lib/content/workflow';

async function main() {
  try {
    syncWorkflowState();
    process.exit(0);
  } catch (err) {
    console.error('Fatal error during workflow sync:', err);
    process.exit(1);
  }
}

main();
