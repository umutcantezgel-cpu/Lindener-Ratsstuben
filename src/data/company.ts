import { CompanyData } from '@/types';

export const companyData: CompanyData = {
    companyName: "Lindener Ratsstuben",
    zusatz: "Restaurant und Kegelzentrum",
    tagline: "Deutsch - Italienische Küche",
    ownerName: "H. Toker",
    email: "hasantoker38@hotmail.de",
    phone: "+49640364556",
    displayPhone: "06403 - 64556",
    facebook: "https://www.facebook.com/Lindenerratsstube",
    address: {
        street: "Konrad-Adenauer-Straße 26",
        zip: "35440",
        city: "Linden",
        country: "Deutschland"
    },
    mapLink: "https://ratsstubelinden.eatbu.com/?lang=de#map",
    services: [
        "Barrierefrei",
        "Büfett",
        "Catering",
        "Außenbereich",
        "Parkplätze",
        "Private Veranstaltungen",
        "Essen zum Mitnehmen",
        "Beheizte Terrasse",
        "Hochzeiten",
        "Kostenloses WLAN",
        "Haustiere erlaubt"
    ],
    paymentMethods: [
        "Barzahlung",
        "EC-Karte"
    ],
    openingHours: {
        monday: "Geschlossen (außer an Feiertagen)",
        tuesdayToSunday: "11:30 - 14:30 & 17:30 - 22:30",
        // Structured data for detailed rendering
        regulaer: {
            tage: "Dienstag - Sonntag",
            mittags: "11:30 - 14:30 Uhr",
            abends: "17:30 - 22:30 Uhr"
        },
        ruhetag: {
            tag: "Montag",
            ausnahme: "außer an Feiertagen"
        }
    },
    eventCatering: {
        titel: "Event- und Cateringservice",
        beschreibung: "Gerne können Sie unsere Räumlichkeiten oder Terrasse für Ihre Kommunion, Hochzeit, Geburtstag oder Firmenjubiläum buchen. Sprechen Sie uns an.",
        sitzplaetze: {
            terrasse: 100,
            gaststaette: 70,
            saal: 120
        }
    },
    tagesangebot: {
        name: "2-Gänge-Menü",
        beschreibung: "Täglich wechselndes 2-Gänge-Menü",
        tage: "Dienstag - Freitag",
        ausnahme: "außer an Feiertagen"
    },
    menuLink: "https://cdn.website.dish.co/media/06/bb/8657909/Speisekarte.pdf"
};

// ═══ GETTER FUNKTIONEN (STRICT TYPED ARCHITECTURE) ═══

/**
 * Returns the central company singleton data payload.
 * @returns {CompanyData}
 */
export function getCompanyData(): CompanyData {
    return companyData;
}

// ═══ DEVELOPMENT-MODE ASSERTIONS ═══
if (process.env.NODE_ENV === 'development') {
    if (!companyData.companyName || !companyData.email) {
        console.error('[Data Layer] ERROR: Critical CompanyData missing (name or email).');
    }
}
