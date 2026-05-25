import { CompanyData } from '@/types';

export const companyData: CompanyData = {
    companyName: "Lindener Ratsstuben",
    zusatz: "Restaurant und Kegelzentrum",
    tagline: "Deutsch - Italienische Küche",
    ownerName: "Hasan Toker",
    email: "hasantoker38@hotmail.de",
    phone: "+49640364556",
    displayPhone: "06403 - 64556",
    facebook: "https://www.facebook.com/Lindenerratsstube",
    instagram: "https://www.instagram.com/lindener.ratsstuben/",
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
        // Structured data for detailed rendering and dynamic formatting
        regulaer: {
            tageKey: "footer.tuesday_saturday",
            mittags: { start: "12:30", end: "14:30" },
            abends: { start: "17:30", end: "22:30" }
        },
        sonntag: {
            tageKey: "footer.sunday",
            mittags: { start: "12:30", end: "14:30" },
            abends: { start: "17:30", end: "21:00" }
        },
        ruhetag: {
            tagKey: "footer.monday",
            ausnahmeKey: "opening_hours.exception_holidays"
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
        ausnahme: "Außer an Feiertagen"
    }
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
