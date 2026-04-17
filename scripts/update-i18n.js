const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, '../locales');

const translations = {
  de: {
    "hero.tagline": "Kulinarische Exzellenz seit 1998",
    "hero.scroll_indicator": "Entdecken",
    "hero.glasspane.rating_stars": "4.8/5 Sterne",
    "hero.glasspane.rating_quote": "Atemberaubende Aromen. Eines der exquisitesten Dinner-Erlebnisse in Hannover.",
    "hero.glasspane.rating_alt": "Gast",
    "hero.glasspane.hours_title": "Gourmet Zeiten",
    "hero.glasspane.hours_lunch": "Mittags",
    "hero.glasspane.hours_dinner": "Abends",
    "company.time_suffix": "Uhr"
  },
  en: {
    "hero.tagline": "Culinary Excellence since 1998",
    "hero.scroll_indicator": "Explore",
    "hero.glasspane.rating_stars": "4.8/5 Stars",
    "hero.glasspane.rating_quote": "Breathtaking flavors. One of the most exquisite dining experiences in Hannover.",
    "hero.glasspane.rating_alt": "Guest",
    "hero.glasspane.hours_title": "Gourmet Hours",
    "hero.glasspane.hours_lunch": "Lunch",
    "hero.glasspane.hours_dinner": "Dinner",
    "company.time_suffix": ""
  },
  fr: {
    "hero.tagline": "L'excellence culinaire depuis 1998",
    "hero.scroll_indicator": "Découvrir",
    "hero.glasspane.rating_stars": "4,8/5 Étoiles",
    "hero.glasspane.rating_quote": "Des saveurs époustouflantes. L'une des expériences gastronomiques les plus exquises de Hanovre.",
    "hero.glasspane.rating_alt": "Invité",
    "hero.glasspane.hours_title": "Heures Gourmandes",
    "hero.glasspane.hours_lunch": "Midi",
    "hero.glasspane.hours_dinner": "Soir",
    "company.time_suffix": "H"
  },
  ar: {
    "hero.tagline": "التميز في الطهي منذ عام 1998",
    "hero.scroll_indicator": "استكشف",
    "hero.glasspane.rating_stars": "4.8/5 نجوم",
    "hero.glasspane.rating_quote": "نكهات تحبس الأنفاس. واحدة من أروع تجارب تناول الطعام في هانوفر.",
    "hero.glasspane.rating_alt": "ضيف",
    "hero.glasspane.hours_title": "أوقات الذواقة",
    "hero.glasspane.hours_lunch": "الغداء",
    "hero.glasspane.hours_dinner": "العشاء",
    "company.time_suffix": ""
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
