const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'y7v1w9tz', // just a guess, I will parse the env
  dataset: 'production',
  apiVersion: '2023-05-03',
  useCdn: true,
});

async function main() {
  const cats = await client.fetch(`*[_type == "category"]{_id, title_de}`);
  console.log("Categories:", cats.slice(0, 3));
}
main().catch(console.error);
