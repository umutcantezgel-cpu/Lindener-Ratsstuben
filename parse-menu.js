const fs = require('fs');
const mammoth = require('mammoth');

async function run() {
  const result = await mammoth.convertToHtml({path: "mittagskarte/23-26.06.2026 Mittags Karte.docx"});
  const html = result.value;
  
  const data = {
    active: true,
    html: html,
    uploadDate: "Samstag, 20. Juni 2026",
    fileName: "23-26.06.2026 Mittags Karte.docx"
  };
  
  fs.writeFileSync('public/mittagskarte.json', JSON.stringify(data, null, 2));
  console.log("Done");
}
run();
