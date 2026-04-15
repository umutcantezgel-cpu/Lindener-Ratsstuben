// This is a static representation for CI/CD content decay alerting.
// In a real scenario with a CMS, this queries the CMS API.
const CONTENT_REGISTRY: Record<string, string> = {
    "/": "2024-01-01",
    "/menu": "2024-03-01",
    "/about": "2023-11-01",
    "/gallery": "2024-02-15"
};

export function checkContentDecay() {
    const DECAY_THRESHOLD_DAYS = 90;
    const now = new Date();
    let hasDecayedContent = false;

    console.log("Starting Content Decay Audit...");

    for (const [route, lastUpdatedStr] of Object.entries(CONTENT_REGISTRY)) {
        const lastUpdated = new Date(lastUpdatedStr);
        const daysSinceUpdate = Math.floor((now.getTime() - lastUpdated.getTime()) / (1000 * 3600 * 24));

        if (daysSinceUpdate > DECAY_THRESHOLD_DAYS) {
            console.warn(`[WARNING] Content Decay Detected on ${route}: Last updated ${daysSinceUpdate} days ago.`);
            hasDecayedContent = true;
        } else {
            console.log(`[OK] ${route}: Fresh (${daysSinceUpdate} days old)`);
        }
    }

    if (hasDecayedContent) {
        console.warn("\nRecommendation: Review decayed content to maintain E-E-A-T and Freshness signals.");
    } else {
        console.log("\nAll core content is fresh.");
    }
}

// Support direct execution via ts-node
if (require.main === module) {
    checkContentDecay();
}
