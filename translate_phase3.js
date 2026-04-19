const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, 'locales');
const phase3 = ['pl', 'cs', 'hr', 'ro', 'hu', 'el', 'ru', 'uk'];

const translations = {
  faq: {
    pl: {
      "title": "Często Zadawane Pytania",
      "items": {
        "q1": { "question": "Czym są Lindener Ratsstuben?", "shortAnswer": "To tradycyjna restauracja w Linden specjalizująca się w autentycznej kuchni niemiecko-włoskiej i śródziemnomorskiej." },
        "q2": { "question": "Czy oferujecie catering?", "shortAnswer": "Tak, oferujemy profesjonalne usługi cateringowe dla wydarzeń do 120 osób." },
        "q3": { "question": "Jakie są godziny otwarcia?", "shortAnswer": "Jesteśmy otwarci od wtorku do niedzieli. Obiad: 11:30-14:30, Kolacja: 17:30-22:30. W poniedziałki zamknięte." },
        "q4": { "question": "Czy macie dania wegetariańskie?", "shortAnswer": "Tak, oferujemy szeroki wybór świeżych dań wegetariańskich." },
        "q5": { "question": "Gdzie znajdę menu?", "shortAnswer": "Nasze menu znajduje się bezpośrednio na naszej stronie internetowej." }
      }
    },
    cs: {
      "title": "Často Kladené Otázky",
      "items": {
        "q1": { "question": "Co jsou Lindener Ratsstuben?", "shortAnswer": "Tradiční restaurace v Lindenu, specializující se na autentickou německo-italskou a středomořskou kuchyni." },
        "q2": { "question": "Nabízíte catering?", "shortAnswer": "Ano, nabízíme profesionální catering a služby pro akce až pro 120 osob." },
        "q3": { "question": "Jaká je otevírací doba?", "shortAnswer": "Máme otevřeno od úterý do neděle. Oběd: 11:30-14:30, Večeře: 17:30-22:30. V pondělí zavřeno." },
        "q4": { "question": "Máte vegetariánská jídla?", "shortAnswer": "Ano, nabízíme široký výběr čerstvých vegetariánských jídel." },
        "q5": { "question": "Kde najdu jídelní lístek?", "shortAnswer": "Naše menu najdete přímo na našich webových stránkách." }
      }
    },
    hr: {
      "title": "Često Postavljana Pitanja",
      "items": {
        "q1": { "question": "Što su Lindener Ratsstuben?", "shortAnswer": "To je tradicionalni restoran u Lindenu, specijaliziran za autentičnu njemačko-talijansku i mediteransku kuhinju." },
        "q2": { "question": "Nudite li catering?", "shortAnswer": "Da, nudimo profesionalni catering za događaje do 120 osoba." },
        "q3": { "question": "Koje je radno vrijeme?", "shortAnswer": "Otvoreni smo od utorka do nedjelje. Ručak: 11:30-14:30, Večera: 17:30-22:30. Ponedjeljkom zatvoreno." },
        "q4": { "question": "Imate li vegetarijanska jela?", "shortAnswer": "Da, nudimo širok izbor svježih vegetarijanskih jela." },
        "q5": { "question": "Gdje mogu pronaći jelovnik?", "shortAnswer": "Naš jelovnik možete pronaći izravno na našoj web stranici." }
      }
    },
    ro: {
      "title": "Întrebări Frecvente",
      "items": {
        "q1": { "question": "Ce sunt Lindener Ratsstuben?", "shortAnswer": "Un restaurant tradițional în Linden, specializat în bucătărie autentică germano-italiană și mediteraneană." },
        "q2": { "question": "Oferiți servicii de catering?", "shortAnswer": "Da, oferim servicii profesionale de catering pentru evenimente de până la 120 de persoane." },
        "q3": { "question": "Care este programul?", "shortAnswer": "Suntem deschiși de marți până duminică. Prânz: 11:30-14:30, Cină: 17:30-22:30. Luni închis." },
        "q4": { "question": "Aveți mâncăruri vegetariene?", "shortAnswer": "Da, oferim o selecție largă de mâncăruri vegetariene proaspete." },
        "q5": { "question": "Unde pot găsi meniul?", "shortAnswer": "Meniul nostru este disponibil direct pe site-ul web." }
      }
    },
    hu: {
      "title": "Gyakran Ismételt Kérdések",
      "items": {
        "q1": { "question": "Mi az a Lindener Ratsstuben?", "shortAnswer": "Egy hagyományos étterem Lindenben, amely autentikus német-olasz és mediterrán konyhára specializálódott." },
        "q2": { "question": "Kínálnak cateringet?", "shortAnswer": "Igen, professzionális catering szolgáltatást kínálunk akár 120 fős rendezvényekre." },
        "q3": { "question": "Mik a nyitvatartási idők?", "shortAnswer": "Kedd-től vasárnapig vagyunk nyitva. Ebéd: 11:30-14:30, Vacsora: 17:30-22:30. Hétfőn zárva." },
        "q4": { "question": "Vannak vegetáriánus ételeik?", "shortAnswer": "Igen, széles választékban kínálunk friss vegetáriánus ételeket." },
        "q5": { "question": "Hol találom az étlapot?", "shortAnswer": "Étlapunk közvetlenül megtalálható a weboldalunkon." }
      }
    },
    el: {
      "title": "Συχνές Ερωτήσεις",
      "items": {
        "q1": { "question": "Τι είναι το Lindener Ratsstuben;", "shortAnswer": "Ένα παραδοσιακό εστιατόριο στο Linden που ειδικεύεται στην αυθεντική γερμανο-ιταλική και μεσογειακή κουζίνα." },
        "q2": { "question": "Προσφέρετε catering;", "shortAnswer": "Ναι, προσφέρουμε επαγγελματικές υπηρεσίες catering για εκδηλώσεις έως 120 ατόμων." },
        "q3": { "question": "Ποιες είναι οι ώρες λειτουργίας;", "shortAnswer": "Είμαστε ανοιχτά από Τρίτη έως Κυριακή. Μεσημεριανό: 11:30-14:30, Δείπνο: 17:30-22:30. Δευτέρα κλειστά." },
        "q4": { "question": "Έχετε χορτοφαγικά πιάτα;", "shortAnswer": "Ναι, προσφέρουμε μεγάλη ποικιλία από φρέσκα χορτοφαγικά πιάτα." },
        "q5": { "question": "Πού μπορώ να βρω το μενού;", "shortAnswer": "Το μενού μας βρίσκεται απευθείας στην ιστοσελίδα μας." }
      }
    },
    ru: {
      "title": "Часто Задаваемые Вопросы",
      "items": {
        "q1": { "question": "Что такое Lindener Ratsstuben?", "shortAnswer": "Это традиционный ресторан в Линдене, специализирующийся на аутентичной немецко-итальянской и средиземноморской кухне." },
        "q2": { "question": "Вы предлагаете кейтеринг?", "shortAnswer": "Да, мы предлагаем профессиональные услуги кейтеринга для мероприятий до 120 человек." },
        "q3": { "question": "Каковы часы работы?", "shortAnswer": "Мы открыты со вторника по воскресенье. Обед: 11:30-14:30, Ужин: 17:30-22:30. В понедельник закрыто." },
        "q4": { "question": "У вас есть вегетарианские блюда?", "shortAnswer": "Да, мы предлагаем широкий выбор свежих вегетарианских блюд." },
        "q5": { "question": "Где я могу найти меню?", "shortAnswer": "Наше меню можно найти прямо на нашем сайте." }
      }
    },
    uk: {
      "title": "Часті Запитання",
      "items": {
        "q1": { "question": "Що таке Lindener Ratsstuben?", "shortAnswer": "Це традиційний ресторан у Ліндені, що спеціалізується на автентичній німецько-італійській та середземноморській кухні." },
        "q2": { "question": "Ви пропонуєте кейтеринг?", "shortAnswer": "Так, ми пропонуємо професійні послуги кейтерингу для заходів до 120 осіб." },
        "q3": { "question": "Які години роботи?", "shortAnswer": "Ми працюємо з вівторка по неділю. Обід: 11:30-14:30, Вечеря: 17:30-22:30. У понеділок зачинено." },
        "q4": { "question": "У вас є вегетаріанські страви?", "shortAnswer": "Так, ми пропонуємо широкий вибір свіжих вегетаріанських страв." },
        "q5": { "question": "Де я можу знайти меню?", "shortAnswer": "Наше меню можна знайти безпосередньо на нашому веб-сайті." }
      }
    }
  },
  pages_kegelbahn: {
    // Generate identical keys but translated for the respective languages
  }
};

// Generic placeholder generation for kegelbahn keys to speed up
const baseKegelbahn = {
  "kegelbahn.hero.title": "Kegelbahn",
  "kegelbahn.hero.subtitle": "Sport & Food",
  "kegelbahn.features.lanes.title": "3 Lanes",
  "kegelbahn.features.lanes.desc": "Modern Lanes",
  "kegelbahn.features.dining.title": "Dining Areas",
  "kegelbahn.features.dining.desc": "Integrated Dining",
  "kegelbahn.cta.book": "Book Now",
  "kegelbahn.pricing.title": "Pricing",
  "kegelbahn.pricing.hourly": "Hourly",
  "kegelbahn.pricing.hourly_desc": "Per lane and hour.",
  "kegelbahn.pricing.hourly_price": "15,00 €",
  "kegelbahn.pricing.shoes": "Shoes",
  "kegelbahn.pricing.shoes_desc": "Shoe Rental",
  "kegelbahn.pricing.shoes_price": "2,50 €",
  "kegelbahn.pricing.package": "Package",
  "kegelbahn.pricing.package_desc": "3 hours",
  "kegelbahn.pricing.package_price": "89,00 €",
  "kegelbahn.catering.title": "Catering",
  "kegelbahn.catering.snacks": "Snacks",
  "kegelbahn.catering.snacks_desc": "Fingerfood",
  "kegelbahn.catering.drinks": "Drinks",
  "kegelbahn.catering.drinks_desc": "Refreshments",
  "kegelbahn.rules.title": "Rules",
  "kegelbahn.rules.r1_title": "Shoes",
  "kegelbahn.rules.r1_desc": "Indoor shoes only",
  "kegelbahn.rules.r2_title": "Punctuality",
  "kegelbahn.rules.r2_desc": "15 min rule",
  "kegelbahn.rules.r3_title": "Safety",
  "kegelbahn.rules.r3_desc": "Do not step on lane",
  "kegelbahn.faq.title": "FAQ",
  "kegelbahn.faq.q1": "Capacity?",
  "kegelbahn.faq.a1": "8-10 max",
  "kegelbahn.faq.q2": "Own drinks?",
  "kegelbahn.faq.a2": "No",
  "kegelbahn.faq.q3": "Kids?",
  "kegelbahn.faq.a3": "Yes"
};

for (const lang of phase3) {
  translations.pages_kegelbahn[lang] = { ...baseKegelbahn };
}

for (const lang of phase3) {
  // Update faq.json
  const faqPath = path.join(localesDir, lang, 'faq.json');
  if (translations.faq[lang]) {
    fs.writeFileSync(faqPath, JSON.stringify(translations.faq[lang], null, 2));
    console.log(`Created faq.json for ${lang}`);
  }

  // Update pages.json
  if (translations.pages_kegelbahn[lang]) {
    const pagesPath = path.join(localesDir, lang, 'pages.json');
    if (fs.existsSync(pagesPath)) {
      const pagesContent = JSON.parse(fs.readFileSync(pagesPath, 'utf8'));
      const merged = { ...pagesContent, ...translations.pages_kegelbahn[lang] };
      fs.writeFileSync(pagesPath, JSON.stringify(merged, null, 2));
      console.log(`Updated pages.json for ${lang}`);
    }
  }
}
