const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, '../locales');

const translations = {
  de: {
    "services.label": "Unsere Services",
    "services.accessibility": "Barrierefrei",
    "services.buffet": "Büfett",
    "services.catering": "Catering",
    "services.outdoor": "Außenbereich",
    "services.parking": "Parkplätze",
    "services.private_events": "Private Veranstaltungen",
    "services.takeaway": "Essen zum Mitnehmen",
    "services.heated_terrace": "Beheizte Terrasse",
    "services.weddings": "Hochzeiten",
    "services.free_wifi": "Kostenloses WLAN",
    "services.pets_allowed": "Haustiere erlaubt"
  },
  en: {
    "services.label": "Our Services",
    "services.accessibility": "Wheelchair Accessible",
    "services.buffet": "Buffet",
    "services.catering": "Catering",
    "services.outdoor": "Outdoor Seating",
    "services.parking": "Parking",
    "services.private_events": "Private Events",
    "services.takeaway": "Takeaway",
    "services.heated_terrace": "Heated Terrace",
    "services.weddings": "Weddings",
    "services.free_wifi": "Free WiFi",
    "services.pets_allowed": "Pets Allowed"
  }
};

const fallbackTranslations = translations.en;

function updateLocales() {
  const dirs = fs.readdirSync(localesDir);
  
  let count = 0;
  dirs.forEach(locale => {
    const homeJsonPath = path.join(localesDir, locale, 'home.json');
    if (fs.existsSync(homeJsonPath)) {
      const data = fs.readFileSync(homeJsonPath, 'utf8');
      let json = JSON.parse(data);
      
      const newKeys = translations[locale] || fallbackTranslations;
      
      let updated = false;
      for (const [key, value] of Object.entries(newKeys)) {
        if (!json[key]) {
          json[key] = value;
          updated = true;
        }
      }
      
      if (updated) {
        fs.writeFileSync(homeJsonPath, JSON.stringify(json, null, 2) + '\n');
        console.log(`[SUCCESS] Updated ${locale}/home.json`);
        count++;
      }
    }
  });
  
  console.log(`\n🎉 Processed ${dirs.length} locales. Updated ${count} files.`);
}

updateLocales();
