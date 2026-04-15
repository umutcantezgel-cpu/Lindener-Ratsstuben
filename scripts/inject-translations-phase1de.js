#!/usr/bin/env node
/**
 * Phase 1D+1E: Form labels, navigation, page titles, common UI, home info, legal, meta
 * Injects professional translations across all 23 non-DE/EN locales.
 */
const fs = require('fs');
const path = require('path');

const LOCALES_DIR = path.join(__dirname, '..', 'locales');

function injectIntoNamespace(locale, namespace, translations) {
  const filePath = path.join(LOCALES_DIR, locale, `${namespace}.json`);
  if (!fs.existsSync(filePath)) { console.warn(`  ⚠ Missing: ${filePath}`); return 0; }
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  let count = 0;
  for (const [key, val] of Object.entries(translations)) { data[key] = val; count++; }
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n');
  return count;
}

// ============================================================================
// PHASE 1D: FORM LABELS
// ============================================================================
const formTranslations = {
  fr: { 'contact.phone_label': 'Téléphone', 'contact.phone_placeholder': '+33...', 'contact.email_label': 'E-mail', 'contact.name_label': 'Nom', 'contact.subject_feedback': 'Retour d\'expérience', 'reservation.date_label': 'Date', 'reservation.guests_label': 'Personnes', 'reservation.phone_placeholder': '+33...' },
  es: { 'contact.phone_label': 'Teléfono', 'contact.phone_placeholder': '+34...', 'contact.email_label': 'Correo electrónico', 'contact.name_label': 'Nombre', 'contact.subject_feedback': 'Comentarios', 'reservation.date_label': 'Fecha', 'reservation.guests_label': 'Personas', 'reservation.phone_placeholder': '+34...' },
  pt: { 'contact.phone_label': 'Telefone', 'contact.phone_placeholder': '+351...', 'contact.email_label': 'E-mail', 'contact.name_label': 'Nome', 'contact.subject_feedback': 'Comentários', 'reservation.date_label': 'Data', 'reservation.guests_label': 'Pessoas', 'reservation.phone_placeholder': '+351...' },
  it: { 'contact.phone_label': 'Telefono', 'contact.phone_placeholder': '+39...', 'contact.email_label': 'E-mail', 'contact.name_label': 'Nome', 'contact.subject_feedback': 'Feedback', 'reservation.date_label': 'Data', 'reservation.guests_label': 'Persone', 'reservation.phone_placeholder': '+39...' },
  ro: { 'contact.phone_label': 'Telefon', 'contact.phone_placeholder': '+40...', 'contact.email_label': 'E-mail', 'contact.name_label': 'Nume', 'contact.subject_feedback': 'Părere', 'reservation.date_label': 'Dată', 'reservation.guests_label': 'Persoane', 'reservation.phone_placeholder': '+40...' },
  nl: { 'contact.phone_label': 'Telefoon', 'contact.phone_placeholder': '+31...', 'contact.email_label': 'E-mail', 'contact.name_label': 'Naam', 'contact.subject_feedback': 'Feedback', 'reservation.date_label': 'Datum', 'reservation.guests_label': 'Personen', 'reservation.phone_placeholder': '+31...' },
  sv: { 'contact.phone_label': 'Telefon', 'contact.phone_placeholder': '+46...', 'contact.email_label': 'E-post', 'contact.name_label': 'Namn', 'contact.subject_feedback': 'Synpunkter', 'reservation.date_label': 'Datum', 'reservation.guests_label': 'Personer', 'reservation.phone_placeholder': '+46...' },
  no: { 'contact.phone_label': 'Telefon', 'contact.phone_placeholder': '+47...', 'contact.email_label': 'E-post', 'contact.name_label': 'Navn', 'contact.subject_feedback': 'Tilbakemelding', 'reservation.date_label': 'Dato', 'reservation.guests_label': 'Personer', 'reservation.phone_placeholder': '+47...' },
  da: { 'contact.phone_label': 'Telefon', 'contact.phone_placeholder': '+45...', 'contact.email_label': 'E-mail', 'contact.name_label': 'Navn', 'contact.subject_feedback': 'Tilbagemelding', 'reservation.date_label': 'Dato', 'reservation.guests_label': 'Personer', 'reservation.phone_placeholder': '+45...' },
  fi: { 'contact.phone_label': 'Puhelin', 'contact.phone_placeholder': '+358...', 'contact.email_label': 'Sähköposti', 'contact.name_label': 'Nimi', 'contact.subject_feedback': 'Palaute', 'reservation.date_label': 'Päivämäärä', 'reservation.guests_label': 'Henkilöä', 'reservation.phone_placeholder': '+358...' },
  pl: { 'contact.phone_label': 'Telefon', 'contact.phone_placeholder': '+48...', 'contact.email_label': 'E-mail', 'contact.name_label': 'Imię', 'contact.subject_feedback': 'Opinia', 'reservation.date_label': 'Data', 'reservation.guests_label': 'Osoby', 'reservation.phone_placeholder': '+48...' },
  cs: { 'contact.phone_label': 'Telefon', 'contact.phone_placeholder': '+420...', 'contact.email_label': 'E-mail', 'contact.name_label': 'Jméno', 'contact.subject_feedback': 'Zpětná vazba', 'reservation.date_label': 'Datum', 'reservation.guests_label': 'Osoby', 'reservation.phone_placeholder': '+420...' },
  hr: { 'contact.phone_label': 'Telefon', 'contact.phone_placeholder': '+385...', 'contact.email_label': 'E-mail', 'contact.name_label': 'Ime', 'contact.subject_feedback': 'Povratna informacija', 'reservation.date_label': 'Datum', 'reservation.guests_label': 'Osobe', 'reservation.phone_placeholder': '+385...' },
  uk: { 'contact.phone_label': 'Телефон', 'contact.phone_placeholder': '+380...', 'contact.email_label': 'Ел. пошта', 'contact.name_label': "Ім'я", 'contact.subject_feedback': 'Відгук', 'reservation.date_label': 'Дата', 'reservation.guests_label': 'Осіб', 'reservation.phone_placeholder': '+380...' },
  ru: { 'contact.phone_label': 'Телефон', 'contact.phone_placeholder': '+7...', 'contact.email_label': 'Эл. почта', 'contact.name_label': 'Имя', 'contact.subject_feedback': 'Отзыв', 'reservation.date_label': 'Дата', 'reservation.guests_label': 'Гостей', 'reservation.phone_placeholder': '+7...' },
  tr: { 'contact.phone_label': 'Telefon', 'contact.phone_placeholder': '+90...', 'contact.email_label': 'E-posta', 'contact.name_label': 'Ad', 'contact.subject_feedback': 'Geri bildirim', 'reservation.date_label': 'Tarih', 'reservation.guests_label': 'Kişi', 'reservation.phone_placeholder': '+90...' },
  ar: { 'contact.phone_label': 'الهاتف', 'contact.phone_placeholder': '+966...', 'contact.email_label': 'البريد الإلكتروني', 'contact.name_label': 'الاسم', 'contact.subject_feedback': 'ملاحظات', 'reservation.date_label': 'التاريخ', 'reservation.guests_label': 'الأشخاص', 'reservation.phone_placeholder': '+966...' },
  ja: { 'contact.phone_label': '電話番号', 'contact.phone_placeholder': '+81...', 'contact.email_label': 'メールアドレス', 'contact.name_label': 'お名前', 'contact.subject_feedback': 'ご意見', 'reservation.date_label': '日付', 'reservation.guests_label': '人数', 'reservation.phone_placeholder': '+81...' },
  zh: { 'contact.phone_label': '电话', 'contact.phone_placeholder': '+86...', 'contact.email_label': '电子邮件', 'contact.name_label': '姓名', 'contact.subject_feedback': '反馈', 'reservation.date_label': '日期', 'reservation.guests_label': '人数', 'reservation.phone_placeholder': '+86...' },
  ko: { 'contact.phone_label': '전화번호', 'contact.phone_placeholder': '+82...', 'contact.email_label': '이메일', 'contact.name_label': '이름', 'contact.subject_feedback': '피드백', 'reservation.date_label': '날짜', 'reservation.guests_label': '인원', 'reservation.phone_placeholder': '+82...' },
  hi: { 'contact.phone_label': 'फ़ोन', 'contact.phone_placeholder': '+91...', 'contact.email_label': 'ईमेल', 'contact.name_label': 'नाम', 'contact.subject_feedback': 'प्रतिक्रिया', 'reservation.date_label': 'तिथि', 'reservation.guests_label': 'व्यक्ति', 'reservation.phone_placeholder': '+91...' },
  el: { 'contact.phone_label': 'Τηλέφωνο', 'contact.phone_placeholder': '+30...', 'contact.email_label': 'E-mail', 'contact.name_label': 'Όνομα', 'contact.subject_feedback': 'Σχόλια', 'reservation.date_label': 'Ημερομηνία', 'reservation.guests_label': 'Άτομα', 'reservation.phone_placeholder': '+30...' },
  hu: { 'contact.phone_label': 'Telefon', 'contact.phone_placeholder': '+36...', 'contact.email_label': 'E-mail', 'contact.name_label': 'Név', 'contact.subject_feedback': 'Visszajelzés', 'reservation.date_label': 'Dátum', 'reservation.guests_label': 'Fő', 'reservation.phone_placeholder': '+36...' },
};

// ============================================================================
// PHASE 1E: COMMON, HOME, PAGES, NAVIGATION, LEGAL, META
// ============================================================================
const commonTranslations = {
  fr: { 'button.details': 'Détails', 'form.feedback': 'Retour d\'expérience' },
  es: { 'button.details': 'Detalles', 'form.feedback': 'Comentarios' },
  pt: { 'button.details': 'Detalhes', 'form.feedback': 'Comentários' },
  it: { 'button.details': 'Dettagli', 'form.feedback': 'Feedback' },
  ro: { 'button.details': 'Detalii', 'form.feedback': 'Părere' },
  nl: { 'button.details': 'Details', 'form.feedback': 'Feedback' },
  sv: { 'button.details': 'Detaljer', 'form.feedback': 'Synpunkter' },
  no: { 'button.details': 'Detaljer', 'form.feedback': 'Tilbakemelding' },
  da: { 'button.details': 'Detaljer', 'form.feedback': 'Tilbagemelding' },
  fi: { 'button.details': 'Tiedot', 'form.feedback': 'Palaute' },
  pl: { 'button.details': 'Szczegóły', 'form.feedback': 'Opinia' },
  cs: { 'button.details': 'Podrobnosti', 'form.feedback': 'Zpětná vazba' },
  hr: { 'button.details': 'Detalji', 'form.feedback': 'Povratna informacija' },
  uk: { 'button.details': 'Деталі', 'form.feedback': 'Відгук' },
  ru: { 'button.details': 'Подробнее', 'form.feedback': 'Отзыв' },
  tr: { 'button.details': 'Ayrıntılar', 'form.feedback': 'Geri bildirim' },
  ar: { 'button.details': 'التفاصيل', 'form.feedback': 'ملاحظات' },
  ja: { 'button.details': '詳細', 'form.feedback': 'ご意見' },
  zh: { 'button.details': '详情', 'form.feedback': '反馈' },
  ko: { 'button.details': '상세보기', 'form.feedback': '피드백' },
  hi: { 'button.details': 'विवरण', 'form.feedback': 'प्रतिक्रिया' },
  el: { 'button.details': 'Λεπτομέρειες', 'form.feedback': 'Σχόλια' },
  hu: { 'button.details': 'Részletek', 'form.feedback': 'Visszajelzés' },
};

const homeTranslations = {
  fr: { 'highlights.label': 'Spécialités du Chef', 'highlights.details': 'Détails', 'info.address_title': 'Adresse', 'info.phone_title': 'Téléphone', 'info.email_title': 'E-mail' },
  es: { 'highlights.label': 'Especialidades del Chef', 'highlights.details': 'Detalles', 'info.address_title': 'Dirección', 'info.phone_title': 'Teléfono', 'info.email_title': 'Correo electrónico' },
  pt: { 'highlights.label': 'Especialidades do Chef', 'highlights.details': 'Detalhes', 'info.address_title': 'Endereço', 'info.phone_title': 'Telefone', 'info.email_title': 'E-mail' },
  it: { 'highlights.label': 'Specialità dello Chef', 'highlights.details': 'Dettagli', 'info.address_title': 'Indirizzo', 'info.phone_title': 'Telefono', 'info.email_title': 'E-mail' },
  ro: { 'highlights.label': 'Specialitățile Chef-ului', 'highlights.details': 'Detalii', 'info.address_title': 'Adresă', 'info.phone_title': 'Telefon', 'info.email_title': 'E-mail' },
  nl: { 'highlights.label': 'Specialiteiten van de Chef', 'highlights.details': 'Details', 'info.address_title': 'Adres', 'info.phone_title': 'Telefoon', 'info.email_title': 'E-mail' },
  sv: { 'highlights.label': 'Kockens specialiteter', 'highlights.details': 'Detaljer', 'info.address_title': 'Adress', 'info.phone_title': 'Telefon', 'info.email_title': 'E-post' },
  no: { 'highlights.label': 'Kokkens spesialiteter', 'highlights.details': 'Detaljer', 'info.address_title': 'Adresse', 'info.phone_title': 'Telefon', 'info.email_title': 'E-post' },
  da: { 'highlights.label': 'Kokkens specialiteter', 'highlights.details': 'Detaljer', 'info.address_title': 'Adresse', 'info.phone_title': 'Telefon', 'info.email_title': 'E-mail' },
  fi: { 'highlights.label': 'Kokin erikoisuudet', 'highlights.details': 'Tiedot', 'info.address_title': 'Osoite', 'info.phone_title': 'Puhelin', 'info.email_title': 'Sähköposti' },
  pl: { 'highlights.label': 'Specjały Szefa Kuchni', 'highlights.details': 'Szczegóły', 'info.address_title': 'Adres', 'info.phone_title': 'Telefon', 'info.email_title': 'E-mail' },
  cs: { 'highlights.label': 'Speciality šéfkuchaře', 'highlights.details': 'Podrobnosti', 'info.address_title': 'Adresa', 'info.phone_title': 'Telefon', 'info.email_title': 'E-mail' },
  hr: { 'highlights.label': 'Specijaliteti kuhara', 'highlights.details': 'Detalji', 'info.address_title': 'Adresa', 'info.phone_title': 'Telefon', 'info.email_title': 'E-mail' },
  uk: { 'highlights.label': 'Фірмові страви шеф-кухаря', 'highlights.details': 'Деталі', 'info.address_title': 'Адреса', 'info.phone_title': 'Телефон', 'info.email_title': 'Ел. пошта' },
  ru: { 'highlights.label': 'Фирменные блюда шеф-повара', 'highlights.details': 'Подробнее', 'info.address_title': 'Адрес', 'info.phone_title': 'Телефон', 'info.email_title': 'Эл. почта' },
  tr: { 'highlights.label': 'Şef\'in Özel Yemekleri', 'highlights.details': 'Ayrıntılar', 'info.address_title': 'Adres', 'info.phone_title': 'Telefon', 'info.email_title': 'E-posta' },
  ar: { 'highlights.label': 'تخصصات الشيف', 'highlights.details': 'التفاصيل', 'info.address_title': 'العنوان', 'info.phone_title': 'الهاتف', 'info.email_title': 'البريد الإلكتروني' },
  ja: { 'highlights.label': 'シェフのおすすめ', 'highlights.details': '詳細', 'info.address_title': '住所', 'info.phone_title': '電話番号', 'info.email_title': 'メール' },
  zh: { 'highlights.label': '主厨推荐', 'highlights.details': '详情', 'info.address_title': '地址', 'info.phone_title': '电话', 'info.email_title': '电子邮件' },
  ko: { 'highlights.label': '셰프 추천 요리', 'highlights.details': '상세보기', 'info.address_title': '주소', 'info.phone_title': '전화번호', 'info.email_title': '이메일' },
  hi: { 'highlights.label': 'शेफ की विशेष रचनाएँ', 'highlights.details': 'विवरण', 'info.address_title': 'पता', 'info.phone_title': 'फ़ोन', 'info.email_title': 'ईमेल' },
  el: { 'highlights.label': 'Σπεσιαλιτέ του Σεφ', 'highlights.details': 'Λεπτομέρειες', 'info.address_title': 'Διεύθυνση', 'info.phone_title': 'Τηλέφωνο', 'info.email_title': 'E-mail' },
  hu: { 'highlights.label': 'Séf ajánlata', 'highlights.details': 'Részletek', 'info.address_title': 'Cím', 'info.phone_title': 'Telefon', 'info.email_title': 'E-mail' },
};

const pagesTranslations = {
  fr: { 'about.tradition_title': 'Notre tradition', 'contact.title': 'Contact', 'contact.address': 'Adresse', 'contact.email': 'E-mail', 'contact.phone': 'Téléphone', 'gallery.title': 'Galerie', 'menu.bestseller': 'Meilleures ventes', 'menu.filter': 'Filtrer' },
  es: { 'about.tradition_title': 'Nuestra tradición', 'contact.title': 'Contacto', 'contact.address': 'Dirección', 'contact.email': 'Correo electrónico', 'contact.phone': 'Teléfono', 'gallery.title': 'Galería', 'menu.bestseller': 'Los más vendidos', 'menu.filter': 'Filtrar' },
  pt: { 'about.tradition_title': 'A nossa tradição', 'contact.title': 'Contacto', 'contact.address': 'Endereço', 'contact.email': 'E-mail', 'contact.phone': 'Telefone', 'gallery.title': 'Galeria', 'menu.bestseller': 'Mais vendidos', 'menu.filter': 'Filtrar' },
  it: { 'about.tradition_title': 'La nostra tradizione', 'contact.title': 'Contatto', 'contact.address': 'Indirizzo', 'contact.email': 'E-mail', 'contact.phone': 'Telefono', 'gallery.title': 'Galleria', 'menu.bestseller': 'I più venduti', 'menu.filter': 'Filtra' },
  ro: { 'about.tradition_title': 'Tradiția noastră', 'contact.title': 'Contact', 'contact.address': 'Adresă', 'contact.email': 'E-mail', 'contact.phone': 'Telefon', 'gallery.title': 'Galerie', 'menu.bestseller': 'Cele mai vândute', 'menu.filter': 'Filtrează' },
  nl: { 'about.tradition_title': 'Onze traditie', 'contact.title': 'Contact', 'contact.address': 'Adres', 'contact.email': 'E-mail', 'contact.phone': 'Telefoon', 'gallery.title': 'Galerij', 'menu.bestseller': 'Bestsellers', 'menu.filter': 'Filter' },
  sv: { 'about.tradition_title': 'Vår tradition', 'contact.title': 'Kontakt', 'contact.address': 'Adress', 'contact.email': 'E-post', 'contact.phone': 'Telefon', 'gallery.title': 'Galleri', 'menu.bestseller': 'Bästsäljare', 'menu.filter': 'Filtrera' },
  no: { 'about.tradition_title': 'Vår tradisjon', 'contact.title': 'Kontakt', 'contact.address': 'Adresse', 'contact.email': 'E-post', 'contact.phone': 'Telefon', 'gallery.title': 'Galleri', 'menu.bestseller': 'Bestselgere', 'menu.filter': 'Filtrer' },
  da: { 'about.tradition_title': 'Vores tradition', 'contact.title': 'Kontakt', 'contact.address': 'Adresse', 'contact.email': 'E-mail', 'contact.phone': 'Telefon', 'gallery.title': 'Galleri', 'menu.bestseller': 'Bestsellere', 'menu.filter': 'Filtrer' },
  fi: { 'about.tradition_title': 'Perinteemme', 'contact.title': 'Yhteystiedot', 'contact.address': 'Osoite', 'contact.email': 'Sähköposti', 'contact.phone': 'Puhelin', 'gallery.title': 'Galleria', 'menu.bestseller': 'Suosituimmat', 'menu.filter': 'Suodata' },
  pl: { 'about.tradition_title': 'Nasza tradycja', 'contact.title': 'Kontakt', 'contact.address': 'Adres', 'contact.email': 'E-mail', 'contact.phone': 'Telefon', 'gallery.title': 'Galeria', 'menu.bestseller': 'Bestsellery', 'menu.filter': 'Filtruj' },
  cs: { 'about.tradition_title': 'Naše tradice', 'contact.title': 'Kontakt', 'contact.address': 'Adresa', 'contact.email': 'E-mail', 'contact.phone': 'Telefon', 'gallery.title': 'Galerie', 'menu.bestseller': 'Nejprodávanější', 'menu.filter': 'Filtrovat' },
  hr: { 'about.tradition_title': 'Naša tradicija', 'contact.title': 'Kontakt', 'contact.address': 'Adresa', 'contact.email': 'E-mail', 'contact.phone': 'Telefon', 'gallery.title': 'Galerija', 'menu.bestseller': 'Najprodavanije', 'menu.filter': 'Filtriraj' },
  uk: { 'about.tradition_title': 'Наша традиція', 'contact.title': 'Контакти', 'contact.address': 'Адреса', 'contact.email': 'Ел. пошта', 'contact.phone': 'Телефон', 'gallery.title': 'Галерея', 'menu.bestseller': 'Хіти продажів', 'menu.filter': 'Фільтрувати' },
  ru: { 'about.tradition_title': 'Наша традиция', 'contact.title': 'Контакты', 'contact.address': 'Адрес', 'contact.email': 'Эл. почта', 'contact.phone': 'Телефон', 'gallery.title': 'Галерея', 'menu.bestseller': 'Хиты продаж', 'menu.filter': 'Фильтровать' },
  tr: { 'about.tradition_title': 'Geleneğimiz', 'contact.title': 'İletişim', 'contact.address': 'Adres', 'contact.email': 'E-posta', 'contact.phone': 'Telefon', 'gallery.title': 'Galeri', 'menu.bestseller': 'En çok satanlar', 'menu.filter': 'Filtrele' },
  ar: { 'about.tradition_title': 'تقاليدنا', 'contact.title': 'اتصل بنا', 'contact.address': 'العنوان', 'contact.email': 'البريد الإلكتروني', 'contact.phone': 'الهاتف', 'gallery.title': 'المعرض', 'menu.bestseller': 'الأكثر مبيعاً', 'menu.filter': 'تصفية' },
  ja: { 'about.tradition_title': '私たちの伝統', 'contact.title': 'お問い合わせ', 'contact.address': '住所', 'contact.email': 'メール', 'contact.phone': '電話番号', 'gallery.title': 'ギャラリー', 'menu.bestseller': '人気メニュー', 'menu.filter': '絞り込み' },
  zh: { 'about.tradition_title': '我们的传统', 'contact.title': '联系我们', 'contact.address': '地址', 'contact.email': '电子邮件', 'contact.phone': '电话', 'gallery.title': '图片库', 'menu.bestseller': '畅销菜品', 'menu.filter': '筛选' },
  ko: { 'about.tradition_title': '우리의 전통', 'contact.title': '문의하기', 'contact.address': '주소', 'contact.email': '이메일', 'contact.phone': '전화번호', 'gallery.title': '갤러리', 'menu.bestseller': '인기 메뉴', 'menu.filter': '필터' },
  hi: { 'about.tradition_title': 'हमारी परंपरा', 'contact.title': 'संपर्क', 'contact.address': 'पता', 'contact.email': 'ईमेल', 'contact.phone': 'फ़ोन', 'gallery.title': 'गैलरी', 'menu.bestseller': 'सबसे लोकप्रिय', 'menu.filter': 'फ़िल्टर' },
  el: { 'about.tradition_title': 'Η παράδοσή μας', 'contact.title': 'Επικοινωνία', 'contact.address': 'Διεύθυνση', 'contact.email': 'E-mail', 'contact.phone': 'Τηλέφωνο', 'gallery.title': 'Γκαλερί', 'menu.bestseller': 'Δημοφιλή', 'menu.filter': 'Φίλτρο' },
  hu: { 'about.tradition_title': 'Hagyományunk', 'contact.title': 'Kapcsolat', 'contact.address': 'Cím', 'contact.email': 'E-mail', 'contact.phone': 'Telefon', 'gallery.title': 'Galéria', 'menu.bestseller': 'Legnépszerűbb', 'menu.filter': 'Szűrés' },
};

const navigationTranslations = {
  fr: { 'nav.gallery': 'Galerie' }, es: { 'nav.gallery': 'Galería' }, pt: { 'nav.gallery': 'Galeria' },
  it: { 'nav.gallery': 'Galleria' }, ro: { 'nav.gallery': 'Galerie' }, nl: { 'nav.gallery': 'Galerij' },
  sv: { 'nav.gallery': 'Galleri' }, no: { 'nav.gallery': 'Galleri' }, da: { 'nav.gallery': 'Galleri' },
  fi: { 'nav.gallery': 'Galleria' }, pl: { 'nav.gallery': 'Galeria' }, cs: { 'nav.gallery': 'Galerie' },
  hr: { 'nav.gallery': 'Galerija' }, uk: { 'nav.gallery': 'Галерея' }, ru: { 'nav.gallery': 'Галерея' },
  tr: { 'nav.gallery': 'Galeri' }, ar: { 'nav.gallery': 'المعرض' }, ja: { 'nav.gallery': 'ギャラリー' },
  zh: { 'nav.gallery': '图片库' }, ko: { 'nav.gallery': '갤러리' }, hi: { 'nav.gallery': 'गैलरी' },
  el: { 'nav.gallery': 'Γκαλερί' }, hu: { 'nav.gallery': 'Galéria' },
};

const legalTranslations = {
  fr: { 'imprint.title': 'Mentions légales' }, es: { 'imprint.title': 'Aviso legal' }, pt: { 'imprint.title': 'Aviso legal' },
  it: { 'imprint.title': 'Note legali' }, ro: { 'imprint.title': 'Informații legale' }, nl: { 'imprint.title': 'Colofon' },
  sv: { 'imprint.title': 'Impressum' }, no: { 'imprint.title': 'Juridisk informasjon' }, da: { 'imprint.title': 'Impressum' },
  fi: { 'imprint.title': 'Lailliset tiedot' }, pl: { 'imprint.title': 'Impressum' }, cs: { 'imprint.title': 'Impressum' },
  hr: { 'imprint.title': 'Impressum' }, uk: { 'imprint.title': 'Правова інформація' }, ru: { 'imprint.title': 'Правовая информация' },
  tr: { 'imprint.title': 'Yasal bilgiler' }, ar: { 'imprint.title': 'البيانات القانونية' }, ja: { 'imprint.title': '法的情報' },
  zh: { 'imprint.title': '法律信息' }, ko: { 'imprint.title': '법적 고지' }, hi: { 'imprint.title': 'कानूनी जानकारी' },
  el: { 'imprint.title': 'Νομικές πληροφορίες' }, hu: { 'imprint.title': 'Impresszum' },
};

const metaTranslations = {
  fr: { 'contact.title': 'Contact — Lindener Ratsstuben', 'gallery.title': 'Galerie — Lindener Ratsstuben' },
  es: { 'contact.title': 'Contacto — Lindener Ratsstuben', 'gallery.title': 'Galería — Lindener Ratsstuben' },
  pt: { 'contact.title': 'Contacto — Lindener Ratsstuben', 'gallery.title': 'Galeria — Lindener Ratsstuben' },
  it: { 'contact.title': 'Contatto — Lindener Ratsstuben', 'gallery.title': 'Galleria — Lindener Ratsstuben' },
  ro: { 'contact.title': 'Contact — Lindener Ratsstuben', 'gallery.title': 'Galerie — Lindener Ratsstuben' },
  nl: { 'contact.title': 'Contact — Lindener Ratsstuben', 'gallery.title': 'Galerij — Lindener Ratsstuben' },
  sv: { 'contact.title': 'Kontakt — Lindener Ratsstuben', 'gallery.title': 'Galleri — Lindener Ratsstuben' },
  no: { 'contact.title': 'Kontakt — Lindener Ratsstuben', 'gallery.title': 'Galleri — Lindener Ratsstuben' },
  da: { 'contact.title': 'Kontakt — Lindener Ratsstuben', 'gallery.title': 'Galleri — Lindener Ratsstuben' },
  fi: { 'contact.title': 'Yhteystiedot — Lindener Ratsstuben', 'gallery.title': 'Galleria — Lindener Ratsstuben' },
  pl: { 'contact.title': 'Kontakt — Lindener Ratsstuben', 'gallery.title': 'Galeria — Lindener Ratsstuben' },
  cs: { 'contact.title': 'Kontakt — Lindener Ratsstuben', 'gallery.title': 'Galerie — Lindener Ratsstuben' },
  hr: { 'contact.title': 'Kontakt — Lindener Ratsstuben', 'gallery.title': 'Galerija — Lindener Ratsstuben' },
  uk: { 'contact.title': 'Контакти — Lindener Ratsstuben', 'gallery.title': 'Галерея — Lindener Ratsstuben' },
  ru: { 'contact.title': 'Контакты — Lindener Ratsstuben', 'gallery.title': 'Галерея — Lindener Ratsstuben' },
  tr: { 'contact.title': 'İletişim — Lindener Ratsstuben', 'gallery.title': 'Galeri — Lindener Ratsstuben' },
  ar: { 'contact.title': 'اتصل بنا — Lindener Ratsstuben', 'gallery.title': 'المعرض — Lindener Ratsstuben' },
  ja: { 'contact.title': 'お問い合わせ — Lindener Ratsstuben', 'gallery.title': 'ギャラリー — Lindener Ratsstuben' },
  zh: { 'contact.title': '联系我们 — Lindener Ratsstuben', 'gallery.title': '图片库 — Lindener Ratsstuben' },
  ko: { 'contact.title': '문의하기 — Lindener Ratsstuben', 'gallery.title': '갤러리 — Lindener Ratsstuben' },
  hi: { 'contact.title': 'संपर्क — Lindener Ratsstuben', 'gallery.title': 'गैलरी — Lindener Ratsstuben' },
  el: { 'contact.title': 'Επικοινωνία — Lindener Ratsstuben', 'gallery.title': 'Γκαλερί — Lindener Ratsstuben' },
  hu: { 'contact.title': 'Kapcsolat — Lindener Ratsstuben', 'gallery.title': 'Galéria — Lindener Ratsstuben' },
};

// ============================================================================
// EXECUTION
// ============================================================================
let totalInjected = 0;
const locales = Object.keys(commonTranslations);

for (const locale of locales) {
  let localeCount = 0;
  localeCount += injectIntoNamespace(locale, 'forms', formTranslations[locale] || {});
  localeCount += injectIntoNamespace(locale, 'common', commonTranslations[locale] || {});
  localeCount += injectIntoNamespace(locale, 'home', homeTranslations[locale] || {});
  localeCount += injectIntoNamespace(locale, 'pages', pagesTranslations[locale] || {});
  localeCount += injectIntoNamespace(locale, 'navigation', navigationTranslations[locale] || {});
  localeCount += injectIntoNamespace(locale, 'legal', legalTranslations[locale] || {});
  localeCount += injectIntoNamespace(locale, 'meta', metaTranslations[locale] || {});
  totalInjected += localeCount;
  console.log(`✅ ${locale.toUpperCase()}: ${localeCount} keys injected (forms/common/home/pages/nav/legal/meta)`);
}

console.log(`\n🎯 TOTAL: ${totalInjected} translations injected across ${locales.length} locales`);
