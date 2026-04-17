const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, '../locales');

// English fallback translations for Cookie Banner
const fallbackTranslations = {
  "cookie.customize": "Customize",
  "cookie.imprint_link": "Imprint",
  "cookie.preferences_title": "Cookie Preferences",
  "cookie.preferences_desc": "Here you can manage your personal privacy settings. Necessary cookies cannot be deactivated as they are required for the website to function.",
  "cookie.necessary_title": "Technically Necessary",
  "cookie.necessary_desc": "These cookies are strictly necessary to provide basic website functions like navigation, form submission, and saving these cookie preferences. Without these scripts, the website cannot function.",
  "cookie.always_active": "Always Active",
  "cookie.analytics_title": "Analytics & Statistics",
  "cookie.analytics_desc": "Allows us to collect anonymized data about user behavior. This helps us continuously improve our website's performance.",
  "cookie.marketing_title": "Marketing & External",
  "cookie.marketing_desc": "Allows us to integrate external media (like Google Maps) and provide targeted information.",
  "cookie.back": "Back",
  "cookie.save_selection": "Save Selection"
};

function updateLocales() {
  const dirs = fs.readdirSync(localesDir);
  
  let count = 0;
  dirs.forEach(locale => {
    // Skip updating the German common.json since we just manually added the proper German version
    if (locale === 'de') return;

    const commonJsonPath = path.join(localesDir, locale, 'common.json');
    if (fs.existsSync(commonJsonPath)) {
      const data = fs.readFileSync(commonJsonPath, 'utf8');
      let json = JSON.parse(data);
      
      let updated = false;
      for (const [key, value] of Object.entries(fallbackTranslations)) {
        if (!json[key]) {
          json[key] = value;
          updated = true;
        }
      }
      
      // Update the main cookie description with the English fallback text instead of the short one
      if (json['cookie.description'] === "We use cookies for essential functions and optional analytics." || !json['cookie.description'] || json['cookie.description'].length < 100) {
          json['cookie.description'] = "We (Lindener Ratsstuben) use cookies and similar technologies to optimize our website, continuously improve it, and collect anonymous usage statistics. By clicking 'Accept All', you agree to the use of Analytics and Marketing cookies. Under 'Customize', you can make a detailed, GDPR-compliant selection.";
          updated = true;
      }
      
      if (updated) {
        fs.writeFileSync(commonJsonPath, JSON.stringify(json, null, 2) + '\n');
        console.log(`[SUCCESS] Updated ${locale}/common.json`);
        count++;
      }
    }
  });
  
  console.log(`\n🎉 Processed ${dirs.length} locales. Updated ${count} files.`);
}

updateLocales();
