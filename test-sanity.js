const { createClient } = require('next-sanity');

const client = createClient({
  projectId: 'sqgqbi4y',
  dataset: 'production',
  apiVersion: '2021-03-25',
  useCdn: false
});

client.fetch('count(*[_type == "dish"])')
  .then(data => console.log('Total dishes in Sanity:', data))
  .catch(err => console.error('Sanity Server Fetch Error:', err));
