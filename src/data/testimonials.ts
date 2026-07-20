import { Id, createId } from '@/types';

export type PrimaryInterest = 'kultur' | 'natur' | 'kulinarik' | 'business' | 'romantik' | 'familie' | 'general';

export interface Testimonial {
    id: Id;
    name: string;
    rating: number;
    quote: string;
    source: string;
    date: string;
    avatar?: string;
    segment?: PrimaryInterest;
}

export const testimonials: Testimonial[] = [
    {
        id: createId("t1"),
        name: "Michael K.",
        rating: 5,
        quote: "Der Lindener Rucksack ist ein Traum! Sehr authentisch, große Portionen und unglaublich freundlicher Service. Wir kommen auf jeden Fall wieder.",
        source: "Google Reviews",
        date: "Vor 2 Wochen",
        segment: 'familie',
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d"
    },
    {
        id: createId("t2"),
        name: "Sabrina M.",
        rating: 5,
        quote: "Wir haben unseren Jahrestag hier gefeiert. Die Kombination aus erstklassigem Essen und hervorragender Weinbegleitung war perfekt.",
        source: "TripAdvisor",
        date: "Vor 1 Monat",
        segment: 'romantik',
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d"
    },
    {
        id: createId("t3"),
        name: "Dr. Thomas L.",
        rating: 5,
        quote: "Diskret, exzellenter Service und ein fantastisches Menü. Perfekter Abschluss für unser erfolgreiches Firmen-Event.",
        source: "Google Reviews",
        date: "Vor 3 Monaten",
        segment: 'business',
        avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d"
    },
    {
        id: createId("t4"),
        name: "Jana S.",
        rating: 5,
        quote: "Nach der ausgiebigen Dünsberg-Wanderung genau das Richtige: Herzhafte, meisterhafte Küche in wunderbarem Ambiente.",
        source: "Google Reviews",
        date: "Vor 2 Tagen",
        segment: 'natur',
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026702d"
    },
    {
        id: createId("t5"),
        name: "Marcus H.",
        rating: 5,
        quote: "Wirklich Gourmet-Niveau. Jedes Gericht ist ein Kunstwerk. Ein Muss für jeden echten Feinschmecker.",
        source: "TripAdvisor",
        date: "Vor 1 Woche",
        segment: 'kulinarik',
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026703d"
    },
    {
        id: createId("t6"),
        name: "Oliver Burk",
        rating: 5,
        quote: "Ein klasse Lokal mit top Service und klasse Speisen. Immer wieder gerne.",
        source: "Google Reviews",
        date: "Vor 6 Tagen",
        segment: 'general'
    },
    {
        id: createId("t7"),
        name: "Silke AckSu",
        rating: 5,
        quote: "Wir gehen in der Regel nur dort essen, wo auf natürliche Art gekocht wird, das Ambiente und die Atmosphäre sowie die...",
        source: "Google Reviews",
        date: "Vor 3 Wochen",
        segment: 'general'
    },
    {
        id: createId("t8"),
        name: "Alexander Heinrich",
        rating: 5,
        quote: "Das essen schmeckt und das personal ist richtig nett. Das restaurant selber ist schick und toll und die der kegel...",
        source: "Google Reviews",
        date: "Vor 3 Wochen",
        segment: 'general'
    },
    {
        id: createId("t9"),
        name: "Володимир Верна",
        rating: 5,
        quote: "Es war wirklich toll.!",
        source: "Google Reviews",
        date: "Vor 3 Wochen",
        segment: 'general'
    },
    {
        id: createId("t10"),
        name: "Hamidah Abdoul",
        rating: 5,
        quote: "Essen und Service ist perfekt.Die Umgebung ist ziemlich schick 😍",
        source: "Google Reviews",
        date: "Vor 3 Wochen",
        segment: 'general'
    },
    {
        id: createId("t11"),
        name: "tami reinemer",
        rating: 5,
        quote: "Super liebes Team. Haben mit 25 Personen spontan noch einen Tisch bekommen. Essen war total lecker! Gerne wieder :)",
        source: "Google Reviews",
        date: "Vor 4 Wochen",
        segment: 'general'
    },
    {
        id: createId("t12"),
        name: "Tayfun Aslan",
        rating: 5,
        quote: "Ich hatte einen sehr schönen Besuch in diesem Restaurant und kann es nur weiterempfehlen....",
        source: "Google Reviews",
        date: "Vor 4 Wochen",
        segment: 'general'
    },
    {
        id: createId("t13"),
        name: "Jürgen Frey",
        rating: 5,
        quote: "Sehr aufmerksamer und netter Service bei schönem Ambiente. Gerade im Sommer im Biergarten kann man es hier wunderbar aushalten. Sehr gutes Essen.",
        source: "Google Reviews",
        date: "Vor 6 Wochen",
        segment: 'general'
    },
    {
        id: createId("t14"),
        name: "Ružica Ladof Rašić",
        rating: 5,
        quote: "Wenn es 10 Sterne gäbe, würde ich 10 vergeben! Sie haben sie in jeder Hinsicht...",
        source: "Google Reviews",
        date: "Vor 7 Wochen",
        segment: 'general'
    },
    {
        id: createId("t15"),
        name: "Natalie Weighardt",
        rating: 5,
        quote: "Die Bedienung ist sehr nett und lustig es ist auch wirklich angenehm zu sitzen und einfach zu reden. Wirklich schön und das Essen ist super :)",
        source: "Google Reviews",
        date: "Vor 7 Wochen",
        segment: 'general'
    },
    {
        id: createId("t16"),
        name: "Mike Moor",
        rating: 5,
        quote: "Ein fantastisches Restaurant mit einer großartigen Auswahl. Man schmeckt die absolute Frische und die Liebe zum Detail...",
        source: "Google Reviews",
        date: "Vor 7 Wochen",
        segment: 'kulinarik'
    },
    {
        id: createId("t17"),
        name: "Gabriel Alves",
        rating: 5,
        quote: "Top Essen! Und Top Kellnerin 😘",
        source: "Google Reviews",
        date: "Vor 8 Wochen",
        segment: 'general'
    },
    {
        id: createId("t18"),
        name: "Iris Brückmann-weller",
        rating: 5,
        quote: "Gutes Essen, sehr nettes Personal .. wir sind schon einge Jahre dort Gäste.. Absolute empfehlenswert !",
        source: "Google Reviews",
        date: "Vor 8 Wochen",
        segment: 'general'
    },
    {
        id: createId("t19"),
        name: "Michael Müller-Erichsen",
        rating: 5,
        quote: "Super lecker. 5 von 5 ehrlich verdient. Deswegen kommen wir immer wieder gerne.",
        source: "Google Reviews",
        date: "Vor 8 Wochen",
        segment: 'general'
    },
    {
        id: createId("t20"),
        name: "Benjamin Nlai",
        rating: 5,
        quote: "Das essen war sehr sehr lecker die Bedienung ist soo nett auch die Toiletten sind sehr sauber man kann drin und draußen...",
        source: "Google Reviews",
        date: "Vor 8 Wochen",
        segment: 'familie'
    },
    {
        id: createId("t21"),
        name: "Sabrina Rösgen",
        rating: 5,
        quote: "Wunderschöne Lokation Super leckeres Essen... Super nette Bedienung",
        source: "Google Reviews",
        date: "Vor 8 Wochen",
        segment: 'general'
    },
    {
        id: createId("t22"),
        name: "Jacqueline Konir",
        rating: 5,
        quote: "Sehr schönes Ambiente und wunderbarer Service. Kann man nur weiterempfehlen Wirklich Top",
        source: "Google Reviews",
        date: "Vor 8 Wochen",
        segment: 'general'
    },
    {
        id: createId("t23"),
        name: "Phoenix",
        rating: 5,
        quote: "Wir waren rundum begeistert! ☺️ Das Essen war unglaublich gut, von sehr...",
        source: "Google Reviews",
        date: "Vor 10 Wochen",
        segment: 'general'
    },
    {
        id: createId("t24"),
        name: "Alisa B.",
        rating: 5,
        quote: "Wir waren mit einer großen Gruppe da und wurden super gut bedient. Essen und Getränke waren sehr schnell da. Es hat uns allen sehr gut geschmeckt.",
        source: "Google Reviews",
        date: "Vor 12 Wochen",
        segment: 'general'
    },
    {
        id: createId("t25"),
        name: "Umutcan tezgel",
        rating: 5,
        quote: "Ein wunderbares Ambiente gepaart mit überaus freundlichem Personal. Der Besuch in dieser Ratsstube hat mir den Nachmittag wirklich versüßt.",
        source: "Google Reviews",
        date: "Vor 12 Wochen",
        segment: 'general'
    },
    {
        id: createId("t26"),
        name: "Serife Glc",
        rating: 5,
        quote: "Wir hatten einen wunderbaren Abend! Das Essen war nicht nur optisch ein Highlight, sondern auch geschmacklich auf...",
        source: "Google Reviews",
        date: "Vor 13 Wochen",
        segment: 'kulinarik'
    },
    {
        id: createId("t27"),
        name: "Christina Rivera",
        rating: 5,
        quote: "Tolles Essen, nettes Personal, sauberes Haus. Rumpsteak ist besonders lecker 🤗",
        source: "Google Reviews",
        date: "Vor 15 Wochen",
        segment: 'general'
    },
    {
        id: createId("t28"),
        name: "Carsten H",
        rating: 5,
        quote: "Sehr schöne Auswahl an Vorspeisen und Hauptgerichten. Das Fleisch von Lammhaxen und Hasenrücken war super zart zubereitet und auch die Soßen waren interessant gewürzt. Auf jeden Fall eine Empfehlung wert.",
        source: "Google Reviews",
        date: "Vor 15 Wochen",
        segment: 'kulinarik'
    },
    {
        id: createId("t29"),
        name: "TimCorbinian Schubert",
        rating: 5,
        quote: "Ich war mittlerweile schon oft dort Kunde und bin jedesmal sehr zufrieden sowohl mit dem Essen (hauptsächlich Pizza),...",
        source: "Google Reviews",
        date: "Vor 16 Wochen",
        segment: 'general'
    },
    {
        id: createId("t30"),
        name: "Jennifer H",
        rating: 5,
        quote: "Schöner Biergarten, ruhig gelegen. Netter Service und gute Auswahl an Speisen. Gerne wieder.",
        source: "Google Reviews",
        date: "Vor 19 Wochen",
        segment: 'natur'
    },
    {
        id: createId("t31"),
        name: "Alina Parson",
        rating: 5,
        quote: "Das Essen ist prima. Jerome die servicekraft ist 1A. Haha:D",
        source: "Google Reviews",
        date: "Vor 21 Wochen",
        segment: 'general'
    },
    {
        id: createId("t32"),
        name: "Martin Demske",
        rating: 5,
        quote: "War gestern zum ersten Mal da, das Essen und der Service waren vom Allerfeinsten, nur zu Empfehlen, ich werde auf jeden Fall wiederkommen!",
        source: "Google Reviews",
        date: "Vor 21 Wochen",
        segment: 'general'
    },
    {
        id: createId("t33"),
        name: "Katja Schmidt",
        rating: 5,
        quote: "Das Essen ist immer hervorragend. Besonders hervorzuheben ist aber das Personal. So freundlich, aufmerksam und wertschätzend wird man sonst selten bedient. Wir kommen immer wieder gerne ☺️",
        source: "Google Reviews",
        date: "Vor 22 Wochen",
        segment: 'general'
    },
    {
        id: createId("t34"),
        name: "Jenz Kuschel",
        rating: 5,
        quote: "Sehr leckere Bandnudeln heute Mittag! Danke und liebe Grüße",
        source: "Google Reviews",
        date: "Vor 23 Wochen",
        segment: 'kulinarik'
    },
    {
        id: createId("t35"),
        name: "Daniel T",
        rating: 5,
        quote: "Wir waren mit einer kleinen Gruppe dort essen. Personal war freundlich und bemüht, trotz vollem Haus. Getränke und Essen kamen zügig und waren einwandfrei. Der 'Lindner Rucksack' ist sehr zu empfehlen!",
        source: "Google Reviews",
        date: "Vor 27 Wochen",
        segment: 'general'
    }
];

// ═══ GETTER FUNKTIONEN (STRICT TYPED ARCHITECTURE) ═══
export function getAllTestimonials(): Testimonial[] {
    return [...testimonials];
}

export function getTestimonialsBySegment(segment: PrimaryInterest | 'general'): Testimonial[] {
    if (segment === 'general') return getAllTestimonials().slice(0, 3);
    
    // Sort array so the target segment comes first
    const sorted = [...testimonials].sort((a, b) => {
        if (a.segment === segment) return -1;
        if (b.segment === segment) return 1;
        return 0;
    });
    
    return sorted.slice(0, 3);
}

export function getTestimonialById(id: Id | string): Testimonial | undefined {
    const targetId = typeof id === 'string' ? id : (id as string);
    return testimonials.find(t => (t.id as unknown as string) === targetId);
}

// ═══ DEVELOPMENT-MODE ASSERTIONS ═══
if (process.env.NODE_ENV === 'development') {
    const tIds = new Set<string>();
    for (const t of testimonials) {
        if (tIds.has(t.id as unknown as string)) {
            console.error(`[Data Layer] ERROR: Duplicate Testimonial ID: ${t.id as unknown as string}`);
        }
        tIds.add(t.id as unknown as string);
        if (t.rating < 1 || t.rating > 5) {
            console.warn(`[Data Layer] WARN: Testimonial rating out of bound: ${t.id as unknown as string}`);
        }
    }
}
