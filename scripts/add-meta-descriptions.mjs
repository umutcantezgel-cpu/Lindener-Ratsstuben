import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const localesDir = path.join(__dirname, '..', 'locales');

const descriptions = {
  de: {
    "agb.description": "Allgemeine Geschäftsbedingungen (AGB) für Reservierungen, Veranstaltungen und Catering in den Lindener Ratsstuben.",
    "datenschutz.description": "Datenschutzerklärung der Lindener Ratsstuben gemäß DSGVO und TDDDG.",
    "impressum.description": "Impressum und rechtliche Angaben der Lindener Ratsstuben gemäß § 5 TMG.",
    "widerruf.description": "Informationen zum Widerrufsrecht und Stornierungsbedingungen der Lindener Ratsstuben.",
    "cookies.description": "Übersicht der eingesetzten Cookies und Tracking-Technologien auf der Website der Lindener Ratsstuben.",
    "barrierefreiheit.description": "Erklärung zur Barrierefreiheit der Lindener Ratsstuben gemäß BITV 2.0 und WCAG 2.1.",
    "cookie_richtlinie.description": "Cookie-Richtlinie der Lindener Ratsstuben. Erfahren Sie, welche Cookies wir verwenden."
  },
  en: {
    "agb.description": "General Terms and Conditions for reservations, events and catering at Lindener Ratsstuben.",
    "datenschutz.description": "Privacy Policy of Lindener Ratsstuben in accordance with GDPR.",
    "impressum.description": "Legal notice and company information of Lindener Ratsstuben.",
    "widerruf.description": "Information on cancellation rights and cancellation conditions at Lindener Ratsstuben.",
    "cookies.description": "Overview of cookies and tracking technologies used on the Lindener Ratsstuben website.",
    "barrierefreiheit.description": "Accessibility statement of Lindener Ratsstuben according to BITV 2.0 and WCAG 2.1.",
    "cookie_richtlinie.description": "Cookie Policy of Lindener Ratsstuben. Learn about the cookies we use."
  },
  tr: {
    "agb.description": "Lindener Ratsstuben'de rezervasyonlar, etkinlikler ve catering için genel şartlar ve koşullar.",
    "datenschutz.description": "GDPR uyarınca Lindener Ratsstuben gizlilik politikası.",
    "impressum.description": "Lindener Ratsstuben yasal bilgiler ve şirket bilgileri.",
    "widerruf.description": "Lindener Ratsstuben iptal hakları ve iptal koşulları hakkında bilgi.",
    "cookies.description": "Lindener Ratsstuben web sitesinde kullanılan çerezlere ve izleme teknolojilerine genel bakış.",
    "barrierefreiheit.description": "BITV 2.0 ve WCAG 2.1'e göre Lindener Ratsstuben erişilebilirlik beyanı.",
    "cookie_richtlinie.description": "Lindener Ratsstuben çerez politikası. Kullandığımız çerezler hakkında bilgi edinin."
  },
  it: {
    "agb.description": "Termini e condizioni generali per prenotazioni, eventi e catering presso Lindener Ratsstuben.",
    "datenschutz.description": "Informativa sulla privacy di Lindener Ratsstuben ai sensi del GDPR.",
    "impressum.description": "Note legali e informazioni aziendali di Lindener Ratsstuben.",
    "widerruf.description": "Informazioni sul diritto di recesso e condizioni di cancellazione di Lindener Ratsstuben.",
    "cookies.description": "Panoramica dei cookie e delle tecnologie di tracciamento utilizzati sul sito web di Lindener Ratsstuben.",
    "barrierefreiheit.description": "Dichiarazione di accessibilità di Lindener Ratsstuben secondo BITV 2.0 e WCAG 2.1.",
    "cookie_richtlinie.description": "Politica sui cookie di Lindener Ratsstuben. Scopri i cookie che utilizziamo."
  },
  fr: {
    "agb.description": "Conditions générales pour les réservations, événements et traiteur chez Lindener Ratsstuben.",
    "datenschutz.description": "Politique de confidentialité de Lindener Ratsstuben conformément au RGPD.",
    "impressum.description": "Mentions légales et informations sur l'entreprise Lindener Ratsstuben.",
    "widerruf.description": "Informations sur le droit de rétractation et les conditions d'annulation de Lindener Ratsstuben.",
    "cookies.description": "Aperçu des cookies et technologies de suivi utilisés sur le site web de Lindener Ratsstuben.",
    "barrierefreiheit.description": "Déclaration d'accessibilité de Lindener Ratsstuben selon BITV 2.0 et WCAG 2.1.",
    "cookie_richtlinie.description": "Politique de cookies de Lindener Ratsstuben. Découvrez les cookies que nous utilisons."
  },
  es: {
    "agb.description": "Términos y condiciones generales para reservas, eventos y catering en Lindener Ratsstuben.",
    "datenschutz.description": "Política de privacidad de Lindener Ratsstuben de acuerdo con el RGPD.",
    "impressum.description": "Aviso legal e información de la empresa Lindener Ratsstuben.",
    "widerruf.description": "Información sobre el derecho de desistimiento y condiciones de cancelación de Lindener Ratsstuben.",
    "cookies.description": "Resumen de las cookies y tecnologías de seguimiento utilizadas en el sitio web de Lindener Ratsstuben.",
    "barrierefreiheit.description": "Declaración de accesibilidad de Lindener Ratsstuben según BITV 2.0 y WCAG 2.1.",
    "cookie_richtlinie.description": "Política de cookies de Lindener Ratsstuben. Conozca las cookies que utilizamos."
  },
  pt: {
    "agb.description": "Termos e condições gerais para reservas, eventos e catering no Lindener Ratsstuben.",
    "datenschutz.description": "Política de privacidade do Lindener Ratsstuben de acordo com o RGPD.",
    "impressum.description": "Aviso legal e informações da empresa Lindener Ratsstuben.",
    "widerruf.description": "Informações sobre o direito de cancelamento e condições de cancelamento do Lindener Ratsstuben.",
    "cookies.description": "Visão geral dos cookies e tecnologias de rastreamento usados no site do Lindener Ratsstuben.",
    "barrierefreiheit.description": "Declaração de acessibilidade do Lindener Ratsstuben segundo BITV 2.0 e WCAG 2.1.",
    "cookie_richtlinie.description": "Política de cookies do Lindener Ratsstuben. Saiba mais sobre os cookies que usamos."
  },
  ru: {
    "agb.description": "Общие условия для бронирования, мероприятий и кейтеринга в Lindener Ratsstuben.",
    "datenschutz.description": "Политика конфиденциальности Lindener Ratsstuben в соответствии с GDPR.",
    "impressum.description": "Юридическая информация и сведения о компании Lindener Ratsstuben.",
    "widerruf.description": "Информация о праве на отмену и условиях аннулирования Lindener Ratsstuben.",
    "cookies.description": "Обзор файлов cookie и технологий отслеживания, используемых на сайте Lindener Ratsstuben.",
    "barrierefreiheit.description": "Заявление о доступности Lindener Ratsstuben согласно BITV 2.0 и WCAG 2.1.",
    "cookie_richtlinie.description": "Политика использования файлов cookie Lindener Ratsstuben."
  },
  nl: {
    "agb.description": "Algemene voorwaarden voor reserveringen, evenementen en catering bij Lindener Ratsstuben.",
    "datenschutz.description": "Privacybeleid van Lindener Ratsstuben conform de AVG.",
    "impressum.description": "Juridische kennisgeving en bedrijfsinformatie van Lindener Ratsstuben.",
    "widerruf.description": "Informatie over herroepingsrecht en annuleringsvoorwaarden van Lindener Ratsstuben.",
    "cookies.description": "Overzicht van cookies en trackingtechnologieën op de website van Lindener Ratsstuben.",
    "barrierefreiheit.description": "Toegankelijkheidsverklaring van Lindener Ratsstuben volgens BITV 2.0 en WCAG 2.1.",
    "cookie_richtlinie.description": "Cookiebeleid van Lindener Ratsstuben. Leer over de cookies die we gebruiken."
  },
  pl: {
    "agb.description": "Ogólne warunki rezerwacji, wydarzeń i cateringu w Lindener Ratsstuben.",
    "datenschutz.description": "Polityka prywatności Lindener Ratsstuben zgodnie z RODO.",
    "impressum.description": "Informacje prawne i dane firmy Lindener Ratsstuben.",
    "widerruf.description": "Informacje o prawie do odstąpienia i warunkach anulowania w Lindener Ratsstuben.",
    "cookies.description": "Przegląd plików cookie i technologii śledzenia na stronie Lindener Ratsstuben.",
    "barrierefreiheit.description": "Oświadczenie o dostępności Lindener Ratsstuben zgodnie z BITV 2.0 i WCAG 2.1.",
    "cookie_richtlinie.description": "Polityka plików cookie Lindener Ratsstuben. Dowiedz się o plikach cookie, których używamy."
  },
  ja: {
    "agb.description": "Lindener Ratsstubenの予約、イベント、ケータリングに関する一般利用規約。",
    "datenschutz.description": "GDPRに準拠したLindener Ratsstubenのプライバシーポリシー。",
    "impressum.description": "Lindener Ratsstubenの法的情報と会社概要。",
    "widerruf.description": "Lindener Ratsstubenのキャンセル権とキャンセル条件に関する情報。",
    "cookies.description": "Lindener Ratsstubenのウェブサイトで使用されるCookieとトラッキング技術の概要。",
    "barrierefreiheit.description": "BITV 2.0およびWCAG 2.1に基づくLindener Ratsstubenのアクセシビリティ宣言。",
    "cookie_richtlinie.description": "Lindener RatsstubenのCookieポリシー。使用しているCookieについて。"
  },
  zh: {
    "agb.description": "Lindener Ratsstuben预订、活动和餐饮的一般条款和条件。",
    "datenschutz.description": "根据GDPR制定的Lindener Ratsstuben隐私政策。",
    "impressum.description": "Lindener Ratsstuben的法律声明和公司信息。",
    "widerruf.description": "有关Lindener Ratsstuben取消权和取消条件的信息。",
    "cookies.description": "Lindener Ratsstuben网站上使用的Cookie和跟踪技术概述。",
    "barrierefreiheit.description": "根据BITV 2.0和WCAG 2.1的Lindener Ratsstuben无障碍声明。",
    "cookie_richtlinie.description": "Lindener Ratsstuben的Cookie政策。了解我们使用的Cookie。"
  },
  ko: {
    "agb.description": "Lindener Ratsstuben의 예약, 이벤트 및 케이터링에 대한 일반 이용약관.",
    "datenschutz.description": "GDPR에 따른 Lindener Ratsstuben 개인정보 보호정책.",
    "impressum.description": "Lindener Ratsstuben의 법적 고지 및 회사 정보.",
    "widerruf.description": "Lindener Ratsstuben의 취소 권리 및 취소 조건에 대한 정보.",
    "cookies.description": "Lindener Ratsstuben 웹사이트에서 사용되는 쿠키 및 추적 기술 개요.",
    "barrierefreiheit.description": "BITV 2.0 및 WCAG 2.1에 따른 Lindener Ratsstuben 접근성 선언.",
    "cookie_richtlinie.description": "Lindener Ratsstuben 쿠키 정책. 사용하는 쿠키에 대해 알아보세요."
  },
  ar: {
    "agb.description": "الشروط والأحكام العامة للحجوزات والفعاليات وخدمات التموين في Lindener Ratsstuben.",
    "datenschutz.description": "سياسة الخصوصية لـ Lindener Ratsstuben وفقًا للائحة العامة لحماية البيانات.",
    "impressum.description": "الإشعار القانوني ومعلومات الشركة لـ Lindener Ratsstuben.",
    "widerruf.description": "معلومات حول حق الإلغاء وشروط الإلغاء في Lindener Ratsstuben.",
    "cookies.description": "نظرة عامة على ملفات تعريف الارتباط وتقنيات التتبع المستخدمة في موقع Lindener Ratsstuben.",
    "barrierefreiheit.description": "بيان إمكانية الوصول لـ Lindener Ratsstuben وفقًا لـ BITV 2.0 و WCAG 2.1.",
    "cookie_richtlinie.description": "سياسة ملفات تعريف الارتباط لـ Lindener Ratsstuben."
  },
  hi: {
    "agb.description": "Lindener Ratsstuben में आरक्षण, कार्यक्रमों और केटरिंग के लिए सामान्य नियम और शर्तें।",
    "datenschutz.description": "GDPR के अनुसार Lindener Ratsstuben की गोपनीयता नीति।",
    "impressum.description": "Lindener Ratsstuben की कानूनी सूचना और कंपनी की जानकारी।",
    "widerruf.description": "Lindener Ratsstuben में रद्दीकरण अधिकारों और शर्तों के बारे में जानकारी।",
    "cookies.description": "Lindener Ratsstuben वेबसाइट पर उपयोग की जाने वाली कुकीज़ और ट्रैकिंग तकनीकों का अवलोकन।",
    "barrierefreiheit.description": "BITV 2.0 और WCAG 2.1 के अनुसार Lindener Ratsstuben की पहुँच घोषणा।",
    "cookie_richtlinie.description": "Lindener Ratsstuben की कुकी नीति। हमारे द्वारा उपयोग की जाने वाली कुकीज़ के बारे में जानें।"
  },
  uk: {
    "agb.description": "Загальні умови для бронювання, заходів та кейтерингу в Lindener Ratsstuben.",
    "datenschutz.description": "Політика конфіденційності Lindener Ratsstuben відповідно до GDPR.",
    "impressum.description": "Юридична інформація та відомості про компанію Lindener Ratsstuben.",
    "widerruf.description": "Інформація про право на скасування та умови скасування Lindener Ratsstuben.",
    "cookies.description": "Огляд файлів cookie та технологій відстеження на сайті Lindener Ratsstuben.",
    "barrierefreiheit.description": "Заява про доступність Lindener Ratsstuben згідно з BITV 2.0 та WCAG 2.1.",
    "cookie_richtlinie.description": "Політика файлів cookie Lindener Ratsstuben."
  },
  cs: {
    "agb.description": "Všeobecné obchodní podmínky pro rezervace, akce a catering v Lindener Ratsstuben.",
    "datenschutz.description": "Zásady ochrany osobních údajů Lindener Ratsstuben v souladu s GDPR.",
    "impressum.description": "Právní informace a údaje o společnosti Lindener Ratsstuben.",
    "widerruf.description": "Informace o právu na odstoupení a podmínkách zrušení v Lindener Ratsstuben.",
    "cookies.description": "Přehled souborů cookie a sledovacích technologií na webu Lindener Ratsstuben.",
    "barrierefreiheit.description": "Prohlášení o přístupnosti Lindener Ratsstuben podle BITV 2.0 a WCAG 2.1.",
    "cookie_richtlinie.description": "Zásady používání souborů cookie Lindener Ratsstuben."
  },
  sv: {
    "agb.description": "Allmänna villkor för bokningar, evenemang och catering på Lindener Ratsstuben.",
    "datenschutz.description": "Integritetspolicy för Lindener Ratsstuben i enlighet med GDPR.",
    "impressum.description": "Juridisk information och företagsuppgifter för Lindener Ratsstuben.",
    "widerruf.description": "Information om ångerrätt och avbokningsvillkor för Lindener Ratsstuben.",
    "cookies.description": "Översikt av cookies och spårningstekniker på Lindener Ratsstubens webbplats.",
    "barrierefreiheit.description": "Tillgänglighetsförklaring för Lindener Ratsstuben enligt BITV 2.0 och WCAG 2.1.",
    "cookie_richtlinie.description": "Cookiepolicy för Lindener Ratsstuben. Läs om vilka cookies vi använder."
  },
  da: {
    "agb.description": "Generelle vilkår og betingelser for reservationer, arrangementer og catering hos Lindener Ratsstuben.",
    "datenschutz.description": "Privatlivspolitik for Lindener Ratsstuben i overensstemmelse med GDPR.",
    "impressum.description": "Juridisk meddelelse og virksomhedsoplysninger for Lindener Ratsstuben.",
    "widerruf.description": "Oplysninger om fortrydelsesret og annulleringsbetingelser for Lindener Ratsstuben.",
    "cookies.description": "Oversigt over cookies og sporingsteknologier på Lindener Ratsstubens hjemmeside.",
    "barrierefreiheit.description": "Tilgængelighedserklæring for Lindener Ratsstuben ifølge BITV 2.0 og WCAG 2.1.",
    "cookie_richtlinie.description": "Cookiepolitik for Lindener Ratsstuben. Læs om de cookies, vi bruger."
  },
  fi: {
    "agb.description": "Lindener Ratsstubenin varausten, tapahtumien ja cateringin yleiset ehdot.",
    "datenschutz.description": "Lindener Ratsstubenin tietosuojakäytäntö GDPR:n mukaisesti.",
    "impressum.description": "Lindener Ratsstubenin oikeudelliset tiedot ja yritystiedot.",
    "widerruf.description": "Tietoa peruutusoikeudesta ja peruutusehdoista Lindener Ratsstubenissa.",
    "cookies.description": "Yleiskatsaus Lindener Ratsstubenin verkkosivustolla käytetyistä evästeistä ja seurantatekniikoista.",
    "barrierefreiheit.description": "Lindener Ratsstubenin saavutettavuusseloste BITV 2.0 ja WCAG 2.1 mukaisesti.",
    "cookie_richtlinie.description": "Lindener Ratsstubenin evästekäytäntö. Lue käyttämistämme evästeistä."
  },
  no: {
    "agb.description": "Generelle vilkår for reservasjoner, arrangementer og catering hos Lindener Ratsstuben.",
    "datenschutz.description": "Personvernerklæring for Lindener Ratsstuben i samsvar med GDPR.",
    "impressum.description": "Juridisk informasjon og selskapsinformasjon for Lindener Ratsstuben.",
    "widerruf.description": "Informasjon om angrerett og avbestillingsvilkår for Lindener Ratsstuben.",
    "cookies.description": "Oversikt over informasjonskapsler og sporingsteknologier på Lindener Ratsstubens nettsted.",
    "barrierefreiheit.description": "Tilgjengelighetserklæring for Lindener Ratsstuben i henhold til BITV 2.0 og WCAG 2.1.",
    "cookie_richtlinie.description": "Informasjonskapselretningslinjer for Lindener Ratsstuben."
  },
  el: {
    "agb.description": "Γενικοί όροι και προϋποθέσεις για κρατήσεις, εκδηλώσεις και catering στο Lindener Ratsstuben.",
    "datenschutz.description": "Πολιτική απορρήτου του Lindener Ratsstuben σύμφωνα με τον GDPR.",
    "impressum.description": "Νομικές πληροφορίες και στοιχεία εταιρείας του Lindener Ratsstuben.",
    "widerruf.description": "Πληροφορίες σχετικά με το δικαίωμα ακύρωσης και τους όρους ακύρωσης του Lindener Ratsstuben.",
    "cookies.description": "Επισκόπηση cookies και τεχνολογιών παρακολούθησης στον ιστότοπο Lindener Ratsstuben.",
    "barrierefreiheit.description": "Δήλωση προσβασιμότητας του Lindener Ratsstuben σύμφωνα με BITV 2.0 και WCAG 2.1.",
    "cookie_richtlinie.description": "Πολιτική cookies του Lindener Ratsstuben. Μάθετε για τα cookies που χρησιμοποιούμε."
  },
  hu: {
    "agb.description": "Általános szerződési feltételek foglalásokhoz, rendezvényekhez és cateringhez a Lindener Ratsstubenben.",
    "datenschutz.description": "A Lindener Ratsstuben adatvédelmi nyilatkozata a GDPR szerint.",
    "impressum.description": "A Lindener Ratsstuben jogi közleménye és céginformációi.",
    "widerruf.description": "Információk a Lindener Ratsstuben lemondási jogáról és feltételeiről.",
    "cookies.description": "A Lindener Ratsstuben weboldalán használt sütik és nyomkövető technológiák áttekintése.",
    "barrierefreiheit.description": "A Lindener Ratsstuben akadálymentességi nyilatkozata a BITV 2.0 és WCAG 2.1 szerint.",
    "cookie_richtlinie.description": "A Lindener Ratsstuben cookie-szabályzata. Tudjon meg többet az általunk használt sütikről."
  },
  ro: {
    "agb.description": "Termeni și condiții generale pentru rezervări, evenimente și catering la Lindener Ratsstuben.",
    "datenschutz.description": "Politica de confidențialitate a Lindener Ratsstuben în conformitate cu GDPR.",
    "impressum.description": "Notă juridică și informații despre compania Lindener Ratsstuben.",
    "widerruf.description": "Informații despre dreptul de anulare și condițiile de anulare la Lindener Ratsstuben.",
    "cookies.description": "Prezentare generală a cookie-urilor și tehnologiilor de urmărire de pe site-ul Lindener Ratsstuben.",
    "barrierefreiheit.description": "Declarația de accesibilitate a Lindener Ratsstuben conform BITV 2.0 și WCAG 2.1.",
    "cookie_richtlinie.description": "Politica de cookie-uri a Lindener Ratsstuben. Aflați despre cookie-urile pe care le folosim."
  },
  hr: {
    "agb.description": "Opći uvjeti za rezervacije, događanja i catering u Lindener Ratsstuben.",
    "datenschutz.description": "Politika privatnosti Lindener Ratsstuben u skladu s GDPR-om.",
    "impressum.description": "Pravna obavijest i podaci o tvrtki Lindener Ratsstuben.",
    "widerruf.description": "Informacije o pravu na otkazivanje i uvjetima otkazivanja u Lindener Ratsstuben.",
    "cookies.description": "Pregled kolačića i tehnologija praćenja na web stranici Lindener Ratsstuben.",
    "barrierefreiheit.description": "Izjava o pristupačnosti Lindener Ratsstuben prema BITV 2.0 i WCAG 2.1.",
    "cookie_richtlinie.description": "Politika kolačića Lindener Ratsstuben. Saznajte o kolačićima koje koristimo."
  }
};

let updated = 0;
for (const [locale, newKeys] of Object.entries(descriptions)) {
  const metaPath = path.join(localesDir, locale, 'meta.json');
  if (!fs.existsSync(metaPath)) { console.log(`SKIP: ${locale} - no meta.json`); continue; }
  const existing = JSON.parse(fs.readFileSync(metaPath, 'utf-8'));
  const merged = { ...existing, ...newKeys };
  const sorted = Object.fromEntries(Object.entries(merged).sort(([a],[b]) => a.localeCompare(b)));
  fs.writeFileSync(metaPath, JSON.stringify(sorted, null, 2) + '\n');
  updated++;
  console.log(`✅ ${locale}: added ${Object.keys(newKeys).length} description keys`);
}
console.log(`\nDone: ${updated} locales updated.`);
