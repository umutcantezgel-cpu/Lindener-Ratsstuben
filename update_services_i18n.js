const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, 'public', 'locales');

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
    "services.accessibility": "Accessibility",
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
  },
  fr: {
    "services.label": "Nos Services",
    "services.accessibility": "Accessible pour les handicapés",
    "services.buffet": "Buffet",
    "services.catering": "Service traiteur",
    "services.outdoor": "Espace extérieur",
    "services.parking": "Parking",
    "services.private_events": "Événements privés",
    "services.takeaway": "Plats à emporter",
    "services.heated_terrace": "Terrasse chauffée",
    "services.weddings": "Mariages",
    "services.free_wifi": "WiFi gratuit",
    "services.pets_allowed": "Animaux de compagnie acceptés"
  },
  es: {
    "services.label": "Nuestros Servicios",
    "services.accessibility": "Accesible para discapacitados",
    "services.buffet": "Buffet",
    "services.catering": "Catering",
    "services.outdoor": "Zona exterior",
    "services.parking": "Aparcamiento",
    "services.private_events": "Eventos privados",
    "services.takeaway": "Comida para llevar",
    "services.heated_terrace": "Terraza calefactada",
    "services.weddings": "Bodas",
    "services.free_wifi": "WiFi gratuito",
    "services.pets_allowed": "Se admiten mascotas"
  },
  it: {
    "services.label": "I Nostri Servizi",
    "services.accessibility": "Accessibile disabili",
    "services.buffet": "Buffet",
    "services.catering": "Servizio catering",
    "services.outdoor": "Area esterna",
    "services.parking": "Parcheggio",
    "services.private_events": "Eventi privati",
    "services.takeaway": "Da asporto",
    "services.heated_terrace": "Terrazza riscaldata",
    "services.weddings": "Matrimoni",
    "services.free_wifi": "WiFi gratuito",
    "services.pets_allowed": "Animali domestici ammessi"
  },
  ar: {
    "services.label": "خدماتنا",
    "services.accessibility": "سهولة الوصول للكراسي المتحركة",
    "services.buffet": "بوفيه",
    "services.catering": "تموين الحفلات",
    "services.outdoor": "منطقة جلوس خارجية",
    "services.parking": "مواقف للسيارات",
    "services.private_events": "مناسبات خاصة",
    "services.takeaway": "طعام سفري",
    "services.heated_terrace": "تراس مدفأ",
    "services.weddings": "حفلات زفاف",
    "services.free_wifi": "واي فاي مجاني",
    "services.pets_allowed": "يسمح باصطحاب الحيوانات الأليفة"
  },
  tr: {
    "services.label": "Hizmetlerimiz",
    "services.accessibility": "Engelli erişimine uygun",
    "services.buffet": "Açık Büfe",
    "services.catering": "Catering hizmeti",
    "services.outdoor": "Açık oturma alanı",
    "services.parking": "Otopark",
    "services.private_events": "Özel etkinlikler",
    "services.takeaway": "Paket servis",
    "services.heated_terrace": "Isıtmalı teras",
    "services.weddings": "Düğünler",
    "services.free_wifi": "Ücretsiz WiFi",
    "services.pets_allowed": "Evcil hayvan kabul edilir"
  },
  nl: {
    "services.label": "Onze Diensten",
    "services.accessibility": "Rolstoeltoegankelijk",
    "services.buffet": "Buffet",
    "services.catering": "Catering",
    "services.outdoor": "Buitenruimte",
    "services.parking": "Parkeerplaats",
    "services.private_events": "Privé-evenementen",
    "services.takeaway": "Afhalen",
    "services.heated_terrace": "Verwarmd terras",
    "services.weddings": "Bruiloften",
    "services.free_wifi": "Gratis WiFi",
    "services.pets_allowed": "Huisdieren toegestaan"
  },
  pl: {
    "services.label": "Nasze Usługi",
    "services.accessibility": "Dostępność dla wózków",
    "services.buffet": "Bufet",
    "services.catering": "Catering",
    "services.outdoor": "Miejsca na zewnątrz",
    "services.parking": "Parking",
    "services.private_events": "Imprezy zamknięte",
    "services.takeaway": "Na wynos",
    "services.heated_terrace": "Ogrzewany taras",
    "services.weddings": "Wesela",
    "services.free_wifi": "Darmowe WiFi",
    "services.pets_allowed": "Zwierzęta akceptowane"
  },
  ru: {
    "services.label": "Наши Услуги",
    "services.accessibility": "Доступно для инвалидов",
    "services.buffet": "Шведский стол",
    "services.catering": "Кейтеринг",
    "services.outdoor": "Зона снаружи",
    "services.parking": "Парковка",
    "services.private_events": "Частные мероприятия",
    "services.takeaway": "Еда навынос",
    "services.heated_terrace": "Обогреваемая терраса",
    "services.weddings": "Свадьбы",
    "services.free_wifi": "Бесплатный WiFi",
    "services.pets_allowed": "Можно с животными"
  },
  zh: {
    "services.label": "我们的服务",
    "services.accessibility": "无障碍设施",
    "services.buffet": "自助餐",
    "services.catering": "餐饮服务",
    "services.outdoor": "户外座位",
    "services.parking": "停车场",
    "services.private_events": "私人活动",
    "services.takeaway": "外带",
    "services.heated_terrace": "加热露台",
    "services.weddings": "婚礼",
    "services.free_wifi": "免费WiFi",
    "services.pets_allowed": "允许带宠物"
  },
  ja: {
    "services.label": "当レストランのサービス",
    "services.accessibility": "バリアフリー",
    "services.buffet": "ビュッフェ",
    "services.catering": "ケータリング",
    "services.outdoor": "屋外席",
    "services.parking": "駐車場",
    "services.private_events": "プライベートイベント",
    "services.takeaway": "テイクアウト",
    "services.heated_terrace": "暖房付きテラス",
    "services.weddings": "結婚式",
    "services.free_wifi": "無料WiFi",
    "services.pets_allowed": "ペット可"
  },
  pt: {
    "services.label": "Nossos Serviços",
    "services.accessibility": "Acessibilidade",
    "services.buffet": "Buffet",
    "services.catering": "Catering",
    "services.outdoor": "Área externa",
    "services.parking": "Estacionamento",
    "services.private_events": "Eventos privados",
    "services.takeaway": "Para levar",
    "services.heated_terrace": "Terraço aquecido",
    "services.weddings": "Casamentos",
    "services.free_wifi": "WiFi grátis",
    "services.pets_allowed": "Animais permitidos"
  }
};

const dirs = fs.readdirSync(localesDir);

dirs.forEach(lang => {
  const homeJsonPath = path.join(localesDir, lang, 'home.json');
  if (fs.existsSync(homeJsonPath)) {
    let data = JSON.parse(fs.readFileSync(homeJsonPath, 'utf8'));
    const t = translations[lang] || translations['en'];
    
    // Add missing translation keys
    for (const [key, value] of Object.entries(t)) {
      data[key] = value;
    }
    
    fs.writeFileSync(homeJsonPath, JSON.stringify(data, null, 2));
    console.log(`Updated translations for ${lang}`);
  }
});
