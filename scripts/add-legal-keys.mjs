import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const localesDir = path.join(__dirname, '..', 'locales');

// New keys to add to legal.json for the hybrid approach
const legalKeys = {
  de: {
    "legal.binding_notice": "Rechtsverbindlich ist ausschließlich die deutsche Fassung dieses Dokuments.",
    "legal.original_below": "Der deutsche Originaltext wird nachfolgend angezeigt.",
    "legal.last_updated": "Stand"
  },
  en: {
    "legal.binding_notice": "Only the German version of this document is legally binding.",
    "legal.original_below": "The original German text is shown below.",
    "legal.last_updated": "Last updated"
  },
  tr: {
    "legal.binding_notice": "Bu belgenin yalnızca Almanca versiyonu hukuken bağlayıcıdır.",
    "legal.original_below": "Orijinal Almanca metin aşağıda gösterilmektedir.",
    "legal.last_updated": "Son güncelleme"
  },
  it: {
    "legal.binding_notice": "Solo la versione tedesca di questo documento è giuridicamente vincolante.",
    "legal.original_below": "Il testo originale in tedesco è mostrato di seguito.",
    "legal.last_updated": "Aggiornato al"
  },
  fr: {
    "legal.binding_notice": "Seule la version allemande de ce document fait foi.",
    "legal.original_below": "Le texte original en allemand est affiché ci-dessous.",
    "legal.last_updated": "Mise à jour"
  },
  es: {
    "legal.binding_notice": "Solo la versión en alemán de este documento es legalmente vinculante.",
    "legal.original_below": "El texto original en alemán se muestra a continuación.",
    "legal.last_updated": "Última actualización"
  },
  pt: {
    "legal.binding_notice": "Apenas a versão em alemão deste documento é juridicamente vinculativa.",
    "legal.original_below": "O texto original em alemão é apresentado abaixo.",
    "legal.last_updated": "Última atualização"
  },
  ru: {
    "legal.binding_notice": "Юридически обязательной является только немецкая версия данного документа.",
    "legal.original_below": "Оригинальный текст на немецком языке представлен ниже.",
    "legal.last_updated": "Обновлено"
  },
  nl: {
    "legal.binding_notice": "Alleen de Duitse versie van dit document is juridisch bindend.",
    "legal.original_below": "De originele Duitse tekst wordt hieronder weergegeven.",
    "legal.last_updated": "Laatst bijgewerkt"
  },
  pl: {
    "legal.binding_notice": "Prawnie wiążąca jest wyłącznie niemiecka wersja tego dokumentu.",
    "legal.original_below": "Oryginalny tekst w języku niemieckim znajduje się poniżej.",
    "legal.last_updated": "Ostatnia aktualizacja"
  },
  ja: {
    "legal.binding_notice": "本文書のドイツ語版のみが法的拘束力を有します。",
    "legal.original_below": "ドイツ語の原文は以下に表示されています。",
    "legal.last_updated": "最終更新"
  },
  zh: {
    "legal.binding_notice": "仅本文件的德语版本具有法律约束力。",
    "legal.original_below": "德语原文显示如下。",
    "legal.last_updated": "最后更新"
  },
  ko: {
    "legal.binding_notice": "본 문서의 독일어 버전만 법적 구속력이 있습니다.",
    "legal.original_below": "독일어 원문은 아래에 표시됩니다.",
    "legal.last_updated": "최종 업데이트"
  },
  ar: {
    "legal.binding_notice": "النسخة الألمانية من هذا المستند هي الملزمة قانونيًا فقط.",
    "legal.original_below": "النص الألماني الأصلي معروض أدناه.",
    "legal.last_updated": "آخر تحديث"
  },
  hi: {
    "legal.binding_notice": "इस दस्तावेज़ का केवल जर्मन संस्करण कानूनी रूप से बाध्यकारी है।",
    "legal.original_below": "मूल जर्मन पाठ नीचे प्रदर्शित है।",
    "legal.last_updated": "अंतिम अपडेट"
  },
  uk: {
    "legal.binding_notice": "Юридично обов'язковою є лише німецька версія цього документа.",
    "legal.original_below": "Оригінальний текст німецькою мовою наведено нижче.",
    "legal.last_updated": "Оновлено"
  },
  cs: {
    "legal.binding_notice": "Právně závazná je pouze německá verze tohoto dokumentu.",
    "legal.original_below": "Originální německý text je uveden níže.",
    "legal.last_updated": "Poslední aktualizace"
  },
  sv: {
    "legal.binding_notice": "Endast den tyska versionen av detta dokument är juridiskt bindande.",
    "legal.original_below": "Den ursprungliga tyska texten visas nedan.",
    "legal.last_updated": "Senast uppdaterad"
  },
  da: {
    "legal.binding_notice": "Kun den tyske version af dette dokument er juridisk bindende.",
    "legal.original_below": "Den originale tyske tekst vises nedenfor.",
    "legal.last_updated": "Sidst opdateret"
  },
  fi: {
    "legal.binding_notice": "Vain tämän asiakirjan saksankielinen versio on oikeudellisesti sitova.",
    "legal.original_below": "Alkuperäinen saksankielinen teksti näkyy alla.",
    "legal.last_updated": "Viimeksi päivitetty"
  },
  no: {
    "legal.binding_notice": "Kun den tyske versjonen av dette dokumentet er juridisk bindende.",
    "legal.original_below": "Den originale tyske teksten vises nedenfor.",
    "legal.last_updated": "Sist oppdatert"
  },
  el: {
    "legal.binding_notice": "Μόνο η γερμανική έκδοση αυτού του εγγράφου είναι νομικά δεσμευτική.",
    "legal.original_below": "Το πρωτότυπο γερμανικό κείμενο εμφανίζεται παρακάτω.",
    "legal.last_updated": "Τελευταία ενημέρωση"
  },
  hu: {
    "legal.binding_notice": "Csak a dokumentum német nyelvű változata jogilag kötelező érvényű.",
    "legal.original_below": "Az eredeti német szöveg alább látható.",
    "legal.last_updated": "Utolsó frissítés"
  },
  ro: {
    "legal.binding_notice": "Doar versiunea în limba germană a acestui document este obligatorie din punct de vedere juridic.",
    "legal.original_below": "Textul original în limba germană este afișat mai jos.",
    "legal.last_updated": "Ultima actualizare"
  },
  hr: {
    "legal.binding_notice": "Samo njemačka verzija ovog dokumenta pravno je obvezujuća.",
    "legal.original_below": "Izvorni njemački tekst prikazan je u nastavku.",
    "legal.last_updated": "Zadnje ažuriranje"
  }
};

let updated = 0;
for (const [locale, newKeys] of Object.entries(legalKeys)) {
  const legalPath = path.join(localesDir, locale, 'legal.json');
  if (!fs.existsSync(legalPath)) { console.log(`SKIP: ${locale}`); continue; }
  const existing = JSON.parse(fs.readFileSync(legalPath, 'utf-8'));
  const merged = { ...existing, ...newKeys };
  const sorted = Object.fromEntries(Object.entries(merged).sort(([a],[b]) => a.localeCompare(b)));
  fs.writeFileSync(legalPath, JSON.stringify(sorted, null, 2) + '\n');
  updated++;
  console.log(`✅ ${locale}: legal.json updated`);
}
console.log(`\nDone: ${updated} locales updated.`);
