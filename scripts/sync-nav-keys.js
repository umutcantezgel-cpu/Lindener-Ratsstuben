const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, '../locales');
const deNavPath = path.join(localesDir, 'de', 'navigation.json');
const deNav = JSON.parse(fs.readFileSync(deNavPath, 'utf8'));

const locales = fs.readdirSync(localesDir).filter(f => fs.statSync(path.join(localesDir, f)).isDirectory());

locales.forEach(locale => {
  if (locale === 'de') return;
  const navPath = path.join(localesDir, locale, 'navigation.json');
  if (fs.existsSync(navPath)) {
    const nav = JSON.parse(fs.readFileSync(navPath, 'utf8'));
    let changed = false;
    for (const key in deNav) {
      if (!nav[key]) {
        nav[key] = deNav[key]; // fallback to DE
        changed = true;
      }
    }
    if (changed) {
      fs.writeFileSync(navPath, JSON.stringify(nav, null, 2) + '\n');
      console.log(`Synced ${locale}`);
    }
  }
});
