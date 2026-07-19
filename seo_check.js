const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, 'locales');
const locales = fs.readdirSync(localesDir).filter(f => fs.statSync(path.join(localesDir, f)).isDirectory());

let report = "";

for (const locale of locales) {
  const seoPath = path.join(localesDir, locale, 'seo.json');
  const metaPath = path.join(localesDir, locale, 'meta.json');
  
  if (fs.existsSync(metaPath)) {
    const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
    for (const [key, value] of Object.entries(meta)) {
      if (key.endsWith('.title')) {
        if (value.length < 30 || value.length > 60) report += `${locale} ${key} length ${value.length}\n`;
      }
      if (key.endsWith('.description')) {
        if (value.length < 120 || value.length > 160) report += `${locale} ${key} length ${value.length}\n`;
      }
      if (value.includes('-')) report += `${locale} ${key} has hyphen\n`;
      if (/ital/i.test(value) || /german/i.test(value) || /deutsch/i.test(value)) {
         report += `${locale} ${key} has italian/german\n`;
      }
    }
  }

  if (fs.existsSync(seoPath)) {
    const seo = JSON.parse(fs.readFileSync(seoPath, 'utf8'));
    for (const [key, value] of Object.entries(seo)) {
      if (value.includes('-')) report += `${locale} ${key} has hyphen\n`;
      if (/<h1/i.test(value)) report += `${locale} ${key} has H1\n`;
      
      const paragraphs = (value.match(/<p>/gi) || []).length;
      if (paragraphs < 3) report += `${locale} ${key} has only ${paragraphs} paragraphs\n`;
    }
  }
}

fs.writeFileSync('seo_report.txt', report);
console.log('Report generated');
