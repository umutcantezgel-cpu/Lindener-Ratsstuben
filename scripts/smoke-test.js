async function runSmokeTests() {
  const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
  console.log(`Starting smoke tests against ${BASE_URL} ...`);

  const endpoints = [
    { url: '/', status: 200 },
    { url: '/contact', status: 200 },
    { url: '/reservation', status: 200 },
    { url: '/api/health', status: 200 },
  ];

  let passed = true;

  for (const endpoint of endpoints) {
    try {
      const res = await fetch(`${BASE_URL}${endpoint.url}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json, text/html',
        }
      });
      
      if (res.status !== endpoint.status) {
        console.error(`❌ [FAILED] ${endpoint.url} returned status ${res.status}. Expected ${endpoint.status}.`);
        passed = false;
      } else {
        console.log(`✅ [OK] ${endpoint.url}`);
      }
    } catch (e) {
      console.error(`❌ [FAILED] Error fetching ${endpoint.url}:`, e.message);
      passed = false;
    }
  }

  if (!passed) {
    console.error('Smoke tests failed. 🚨');
    process.exit(1);
  } else {
    console.log('✓ All smoke tests passed. 🚀');
    process.exit(0);
  }
}

runSmokeTests();
