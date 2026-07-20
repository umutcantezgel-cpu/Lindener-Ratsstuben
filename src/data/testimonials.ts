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
    },
    {
        id: createId("t36"),
        name: "Oliver Burk",
        rating: 5,
        quote: "Ein klasse Lokal mit top Service und klasse Speisen. Immer wieder gerne.",
        source: "Google Reviews",
        date: "Vor 7 Tagen",
        segment: 'general'
    },
    {
        id: createId("t37"),
        name: "Silke AckSu",
        rating: 5,
        quote: "Wir gehen in der Regel nur dort essen, wo auf natürliche Art gekocht wird, das Ambiente und die Atmosphäre sowie die...",
        source: "Google Reviews",
        date: "Vor 3 Wochen",
        segment: 'general'
    },
    {
        id: createId("t38"),
        name: "Alexander Heinrich",
        rating: 5,
        quote: "Das essen schmeckt und das personal ist richtig nett. Das restaurant selber ist schick und toll und die der kegel...",
        source: "Google Reviews",
        date: "Vor 4 Wochen",
        segment: 'general'
    },
    {
        id: createId("t39"),
        name: "Володимир Верна",
        rating: 5,
        quote: "Es war wirklich toll.!",
        source: "Google Reviews",
        date: "Vor 4 Wochen",
        segment: 'general'
    },
    {
        id: createId("t40"),
        name: "Hamidah Abdoul",
        rating: 5,
        quote: "Essen und Service ist perfekt.Die Umgebung ist ziemlich schick 😍",
        source: "Google Reviews",
        date: "Vor 4 Wochen",
        segment: 'general'
    },
    {
        id: createId("t41"),
        name: "KSH Real",
        rating: 5,
        quote: "Es ist really chillig.",
        source: "Google Reviews",
        date: "Vor 4 Wochen",
        segment: 'general'
    },
    {
        id: createId("t42"),
        name: "tami reinemer",
        rating: 5,
        quote: "Super liebes Team. Haben mit 25 Personen spontan noch einen Tisch bekommen. Essen war total lecker! Gerne wieder :)",
        source: "Google Reviews",
        date: "Vor 4 Wochen",
        segment: 'general'
    },
    {
        id: createId("t43"),
        name: "Bodo Poser",
        rating: 5,
        quote: "Ich war nur dort um jemanden mit Rollator abzuholen. Aber was ich gesehen habe hat mich optisch total angesprochen....",
        source: "Google Reviews",
        date: "Vor 4 Wochen",
        segment: 'general'
    },
    {
        id: createId("t44"),
        name: "Tayfun Aslan",
        rating: 5,
        quote: "Ich hatte einen sehr schönen Besuch in diesem Restaurant und kann es nur weiterempfehlen....",
        source: "Google Reviews",
        date: "Vor 5 Wochen",
        segment: 'general'
    },
    {
        id: createId("t45"),
        name: "Jürgen Frey",
        rating: 5,
        quote: "Sehr aufmerksamer und netter Service bei schönem Ambiente. Gerade im Sommer im Biergarten kann man es hier wunderbar aushalten. Sehr gutes Essen.",
        source: "Google Reviews",
        date: "Vor 6 Wochen",
        segment: 'general'
    },
    {
        id: createId("t46"),
        name: "Ružica Ladof Rašić",
        rating: 5,
        quote: "Wenn es 10 Sterne gäbe, würde ich 10 vergeben! Sie haben sie in jeder Hinsicht...",
        source: "Google Reviews",
        date: "Vor 7 Wochen",
        segment: 'general'
    },
    {
        id: createId("t47"),
        name: "Reno Lehnhausen",
        rating: 5,
        quote: "Mittagessen",
        source: "Google Reviews",
        date: "Vor 7 Wochen",
        segment: 'general'
    },
    {
        id: createId("t48"),
        name: "Moin Army",
        rating: 5,
        quote: "Habe gestern eine Originale Cabonara zum Abholen bestellt. Als ich diese dann...",
        source: "Google Reviews",
        date: "Vor 7 Wochen",
        segment: 'general'
    },
    {
        id: createId("t49"),
        name: "Natalie Weighardt",
        rating: 5,
        quote: "Die Bedienung ist sehr nett und lustig es ist auch wirklich angenehm zu sitzen und einfach zu reden. Wirklich schön und das Essen ist super :)",
        source: "Google Reviews",
        date: "Vor 7 Wochen",
        segment: 'general'
    },
    {
        id: createId("t50"),
        name: "Mike Moor",
        rating: 5,
        quote: "Ein fantastisches Restaurant mit einer großartigen Auswahl. Man schmeckt die absolute Frische und die Liebe zum Detail...",
        source: "Google Reviews",
        date: "Vor 7 Wochen",
        segment: 'general'
    },
    {
        id: createId("t51"),
        name: "Gabriel Alves",
        rating: 5,
        quote: "Top Essen! Und Top Kellnerin 😘",
        source: "Google Reviews",
        date: "Vor 8 Wochen",
        segment: 'general'
    },
    {
        id: createId("t52"),
        name: "Iris Brückmann-weller",
        rating: 5,
        quote: "Gutes Essen, sehr nettes Personal .. wir sind schon einge Jahre dort Gäste.. Absolute empfehlenswert !",
        source: "Google Reviews",
        date: "Vor 8 Wochen",
        segment: 'general'
    },
    {
        id: createId("t53"),
        name: "Mark De Blick",
        rating: 5,
        quote: "Wie immer, super lecker-Dankeschön 🙏😉",
        source: "Google Reviews",
        date: "Vor 8 Wochen",
        segment: 'general'
    },
    {
        id: createId("t54"),
        name: "Michael Müller-Erichsen",
        rating: 5,
        quote: "Super lecker. 5 von 5 ehrlich verdient. Deswegen kommen wir immer wieder gerne.",
        source: "Google Reviews",
        date: "Vor 8 Wochen",
        segment: 'general'
    },
    {
        id: createId("t55"),
        name: "Benjamin Nlai",
        rating: 5,
        quote: "Mittagessen Das essen war sehr sehr lecker die Bedienung ist soo nett auch die Toiletten sind sehr sauber man kann drin und draußen...",
        source: "Google Reviews",
        date: "Vor 8 Wochen",
        segment: 'general'
    },
    {
        id: createId("t56"),
        name: "Oliver Stein",
        rating: 5,
        quote: "Mittagessen",
        source: "Google Reviews",
        date: "Vor 8 Wochen",
        segment: 'general'
    },
    {
        id: createId("t57"),
        name: "Sabrina Rösgen",
        rating: 5,
        quote: "Mittagessen Wunderschöne Lokation Super leckeres Essen... Super nette Bedienung",
        source: "Google Reviews",
        date: "Vor 8 Wochen",
        segment: 'general'
    },
    {
        id: createId("t58"),
        name: "Jacqueline Konir",
        rating: 5,
        quote: "Mittagessen Sehr schönes Ambiente und wunderbarer Service. Kann man nur weiterempfehlen Wirklich Top",
        source: "Google Reviews",
        date: "Vor 8 Wochen",
        segment: 'general'
    },
    {
        id: createId("t59"),
        name: "Ronja Rösgen",
        rating: 5,
        quote: "Sehr leckeres Essen und schöne Portionen",
        source: "Google Reviews",
        date: "Vor 8 Wochen",
        segment: 'general'
    },
    {
        id: createId("t60"),
        name: "Thomas Seibert",
        rating: 5,
        quote: "Das Essen war wie immer sehr lecker und der Service ausgesprochen freundlich",
        source: "Google Reviews",
        date: "Vor 8 Wochen",
        segment: 'general'
    },
    {
        id: createId("t61"),
        name: "Joachim Faber",
        rating: 5,
        quote: "Leckeres Essen. Super Service von Maria",
        source: "Google Reviews",
        date: "Vor 8 Wochen",
        segment: 'general'
    },
    {
        id: createId("t62"),
        name: "HAGUE ULMER",
        rating: 5,
        quote: "Heute waren wir mal wieder in den Ratsstuben in Linden. Eins der Highlights war Maria, die Für uns am Tisch zuständig...",
        source: "Google Reviews",
        date: "Vor 8 Wochen",
        segment: 'general'
    },
    {
        id: createId("t63"),
        name: "Phoenix",
        rating: 5,
        quote: "Wir waren rundum begeistert! ☺️ Das Essen war unglaublich gut, von sehr...",
        source: "Google Reviews",
        date: "Vor 10 Wochen",
        segment: 'general'
    },
    {
        id: createId("t64"),
        name: "Jörg Groos",
        rating: 5,
        quote: "Sehr schönes Lokal Essen und Service sehr gut 👍",
        source: "Google Reviews",
        date: "Vor 11 Wochen",
        segment: 'general'
    },
    {
        id: createId("t65"),
        name: "Alisa B.",
        rating: 5,
        quote: "Wir waren mit einer großen Gruppe da und wurden super gut bedient. Essen und Getränke waren sehr schnell da. Es hat uns allen sehr gut geschmeckt.",
        source: "Google Reviews",
        date: "Vor 12 Wochen",
        segment: 'general'
    },
    {
        id: createId("t66"),
        name: "Anne Peschka",
        rating: 5,
        quote: "schönes Ambiente",
        source: "Google Reviews",
        date: "Vor 12 Wochen",
        segment: 'general'
    },
    {
        id: createId("t67"),
        name: "D D",
        rating: 5,
        quote: "Wie immer lecker, schnell. Biergarten top. Mittagskarte immer gut.",
        source: "Google Reviews",
        date: "Vor 12 Wochen",
        segment: 'general'
    },
    {
        id: createId("t68"),
        name: "Gesina Dose",
        rating: 5,
        quote: "Super lecker, top Service :)",
        source: "Google Reviews",
        date: "Vor 12 Wochen",
        segment: 'general'
    },
    {
        id: createId("t69"),
        name: "Caro",
        rating: 5,
        quote: "Das Essen war sehr lecker und das personal ist sehr freundlich:)",
        source: "Google Reviews",
        date: "Vor 12 Wochen",
        segment: 'general'
    },
    {
        id: createId("t70"),
        name: "Madita Stuppy",
        rating: 5,
        quote: "war richtig leck",
        source: "Google Reviews",
        date: "Vor 12 Wochen",
        segment: 'general'
    },
    {
        id: createId("t71"),
        name: "Luna De Carvalho Becker",
        rating: 5,
        quote: "Richtig gutes Essen und super Service!",
        source: "Google Reviews",
        date: "Vor 12 Wochen",
        segment: 'general'
    },
    {
        id: createId("t72"),
        name: "Annika Jung",
        rating: 5,
        quote: "Es hat gut geschmeckt und die Bedienungen haben keinen Wunsch offen gelassen",
        source: "Google Reviews",
        date: "Vor 12 Wochen",
        segment: 'general'
    },
    {
        id: createId("t73"),
        name: "Alina McIntosh",
        rating: 5,
        quote: "Alles top",
        source: "Google Reviews",
        date: "Vor 12 Wochen",
        segment: 'general'
    },
    {
        id: createId("t74"),
        name: "Sabine Bruckmaier",
        rating: 5,
        quote: "Das Essen war sehr lecker und das Bier schmeckte auch",
        source: "Google Reviews",
        date: "Vor 12 Wochen",
        segment: 'general'
    },
    {
        id: createId("t75"),
        name: "Umutcan tezgel",
        rating: 5,
        quote: "Ein wunderbares Ambiente gepaart mit überaus freundlichem Personal. Der Besuch in dieser Ratsstube hat mir den Nachmittag wirklich versüßt.",
        source: "Google Reviews",
        date: "Vor 12 Wochen",
        segment: 'general'
    },
    {
        id: createId("t76"),
        name: "Rolf",
        rating: 5,
        quote: "Sehr leckere Pizza und Salate. Freundliche Bedienung.",
        source: "Google Reviews",
        date: "Vor 13 Wochen",
        segment: 'general'
    },
    {
        id: createId("t77"),
        name: "Serife Glc",
        rating: 5,
        quote: "Wir hatten einen wunderbaren Abend! Das Essen war nicht nur optisch ein Highlight, sondern auch geschmacklich auf...",
        source: "Google Reviews",
        date: "Vor 13 Wochen",
        segment: 'general'
    },
    {
        id: createId("t78"),
        name: "Christina Rivera",
        rating: 5,
        quote: "Tolles Essen, nettes Personal, sauberes Haus.Rumpsteak ist besonders lecker 🤗",
        source: "Google Reviews",
        date: "Vor 15 Wochen",
        segment: 'general'
    },
    {
        id: createId("t79"),
        name: "Carsten H",
        rating: 5,
        quote: "Sehr schöne Auswahl an Vorspeisen und Hauptgerichten. Das Fleisch von Lammhaxen und Hasenrücken war super zart zubereitet und auch die Soßen waren interessant gewürzt. Auf jeden Fall eine Empfehlung wert.",
        source: "Google Reviews",
        date: "Vor 15 Wochen",
        segment: 'general'
    },
    {
        id: createId("t80"),
        name: "TimCorbinian Schubert",
        rating: 5,
        quote: "Ich war mittlerweile schon oft dort Kunde und bin jedesmal sehr zufrieden sowohl mit dem Essen (hauptsächlich Pizza),...",
        source: "Google Reviews",
        date: "Vor 16 Wochen",
        segment: 'general'
    },
    {
        id: createId("t81"),
        name: "Manuel Rupp",
        rating: 5,
        quote: "Super tolles Restaurant",
        source: "Google Reviews",
        date: "Vor 17 Wochen",
        segment: 'general'
    },
    {
        id: createId("t82"),
        name: "Jennifer H",
        rating: 5,
        quote: "Schöner Biergarten, ruhig gelegen. Netter Service und gute Auswahl an Speisen. Gerne wieder.",
        source: "Google Reviews",
        date: "Vor 19 Wochen",
        segment: 'general'
    },
    {
        id: createId("t83"),
        name: "Britta Stauf",
        rating: 5,
        quote: "Die Vorspeise und die Pizza waren durchschnittlich gut. Der Service war freundlich und aufmerksam....",
        source: "Google Reviews",
        date: "Vor 19 Wochen",
        segment: 'general'
    },
    {
        id: createId("t84"),
        name: "Ste fan",
        rating: 5,
        quote: "Super",
        source: "Google Reviews",
        date: "Vor 20 Wochen",
        segment: 'general'
    },
    {
        id: createId("t85"),
        name: "Alina Parson",
        rating: 5,
        quote: "Das Essen ist prima. Jerome die servicekraft ist 1A. Haha:D",
        source: "Google Reviews",
        date: "Vor 21 Wochen",
        segment: 'general'
    },
    {
        id: createId("t86"),
        name: "Hesko BitJuggler",
        rating: 5,
        quote: "Wir waren hier zu einer Geburtstagsfeier, die Bedienung war außerordentlich professionell. Gut, alles brauchte seine Zeit, aber alles war perfekt. Einfach nur zu empfehlen...!👌",
        source: "Google Reviews",
        date: "Vor 21 Wochen",
        segment: 'general'
    },
    {
        id: createId("t87"),
        name: "Martin Demske",
        rating: 5,
        quote: "War gestern zum ersten Mal da, das Essen und der Service waren vom Allerfeinsten, nur zu Empfehlen, ich werde auf jeden Fall wiederkommen!",
        source: "Google Reviews",
        date: "Vor 21 Wochen",
        segment: 'general'
    },
    {
        id: createId("t88"),
        name: "Peter Naarmann",
        rating: 5,
        quote: "Super nette Bedienung Leckeres Essen",
        source: "Google Reviews",
        date: "Vor 22 Wochen",
        segment: 'general'
    },
    {
        id: createId("t89"),
        name: "Katja Schmidt",
        rating: 5,
        quote: "Das Essen ist immer hervorragend. Besonders hervorzuheben ist aber das Personal. So freundlich, aufmerksam und wertschätzend wird man sonst selten bedient. Wir kommen immer wieder gerne ☺️",
        source: "Google Reviews",
        date: "Vor 22 Wochen",
        segment: 'general'
    },
    {
        id: createId("t90"),
        name: "Jenz Kuschel",
        rating: 5,
        quote: "Sehr leckere Bandnudeln heute Mittag! Danke und liebe Grüße",
        source: "Google Reviews",
        date: "Vor 24 Wochen",
        segment: 'general'
    },
    {
        id: createId("t91"),
        name: "Andrea Harrison",
        rating: 5,
        quote: "Sehr leckeres Essen! Top Service!",
        source: "Google Reviews",
        date: "Vor 24 Wochen",
        segment: 'general'
    },
    {
        id: createId("t92"),
        name: "Nico S",
        rating: 5,
        quote: "sehr lecker",
        source: "Google Reviews",
        date: "Vor 24 Wochen",
        segment: 'general'
    },
    {
        id: createId("t93"),
        name: "Josephine Rodrigues Fonseca",
        rating: 5,
        quote: "Sehr gutes Essen. Der Service war perfekt! Absolute Empfehlung 👍🤗",
        source: "Google Reviews",
        date: "Vor 24 Wochen",
        segment: 'general'
    },
    {
        id: createId("t94"),
        name: "Bernd Daniel",
        rating: 5,
        quote: "Schön das wir nichts für die Kegelbahn bezahlen mussten. Das ist Kundenbindung. Sonst war alles super.",
        source: "Google Reviews",
        date: "Vor 25 Wochen",
        segment: 'general'
    },
    {
        id: createId("t95"),
        name: "Tamara Jost",
        rating: 5,
        quote: "Sehr freundliches Personal, leckeres Essen, gute Gesellschaft auf der Kegelbahn. Uns hat es sehr gut gefallen, wir kommen auf jeden Fall wieder!",
        source: "Google Reviews",
        date: "Vor 25 Wochen",
        segment: 'general'
    },
    {
        id: createId("t96"),
        name: "Michel Niklas Brand",
        rating: 5,
        quote: "Top urige Kneipe mit toller Kegel Bahn!",
        source: "Google Reviews",
        date: "Vor 26 Wochen",
        segment: 'general'
    },
    {
        id: createId("t97"),
        name: "Sandra Palesch",
        rating: 5,
        quote: "Wir waren am Weihnachtsfeiertag dort. Ich hatte Steak und es war sehr gut und köstlich.",
        source: "Google Reviews",
        date: "Vor 27 Wochen",
        segment: 'general'
    },
    {
        id: createId("t98"),
        name: "Daniel T",
        rating: 5,
        quote: "Wir waren mit einer kleinen Gruppe dort essen. Personal war freundlich und bemüht, trotz vollem Haus. Getränke und Essen kamen zügig und waren einwandfrei. Der \\\"Lindner Rucksack\\\" ist sehr zu empfehlen!",
        source: "Google Reviews",
        date: "Vor 27 Wochen",
        segment: 'general'
    },
    {
        id: createId("t99"),
        name: "Yannick Martin",
        rating: 5,
        quote: "Leckeres Essen, super Service und dazu noch preiswert....",
        source: "Google Reviews",
        date: "Vor 28 Wochen",
        segment: 'general'
    },
    {
        id: createId("t100"),
        name: "Chris R22",
        rating: 5,
        quote: "Wir waren mit der Familie zum Abendessen hier und haben davor auch die Kegelbahn genutzt. Das Essen war super lecker und...",
        source: "Google Reviews",
        date: "Vor 28 Wochen",
        segment: 'general'
    },
    {
        id: createId("t101"),
        name: "Andreas Schneider",
        rating: 5,
        quote: "Schnitzel TK nicht ok der rest sehr gut",
        source: "Google Reviews",
        date: "Vor 28 Wochen",
        segment: 'general'
    },
    {
        id: createId("t102"),
        name: "Luca Wiese",
        rating: 5,
        quote: "Gutes Essen, sehr freundliche Bedienungen und echt auf Zack....",
        source: "Google Reviews",
        date: "Vor 28 Wochen",
        segment: 'general'
    },
    {
        id: createId("t103"),
        name: "Anetkes",
        rating: 5,
        quote: "Sehr schnelles aber nicht hektischen freundliches Personal, leckere und nicht zu kleine Portionen.",
        source: "Google Reviews",
        date: "Vor 28 Wochen",
        segment: 'general'
    },
    {
        id: createId("t104"),
        name: "O W",
        rating: 5,
        quote: "Freundlicher Empfang, angenehme Atmosphäre. Das Lokal ist zwar älter, aber dennoch moderne Aktzente. Die Weinflaschen...",
        source: "Google Reviews",
        date: "Vor 28 Wochen",
        segment: 'general'
    },
    {
        id: createId("t105"),
        name: "Renate Cohaus",
        rating: 5,
        quote: "Vielen Dank für das super gute Abendessen. Wir hatten einen tollen Vorspeisen Teller und zwei mega leckere...",
        source: "Google Reviews",
        date: "Vor 28 Wochen",
        segment: 'general'
    },
    {
        id: createId("t106"),
        name: "Jörg Cohaus",
        rating: 5,
        quote: "Einfach Klasse",
        source: "Google Reviews",
        date: "Vor 28 Wochen",
        segment: 'general'
    },
    {
        id: createId("t107"),
        name: "B P",
        rating: 5,
        quote: "Immer wieder gerne.",
        source: "Google Reviews",
        date: "Vor 29 Wochen",
        segment: 'general'
    },
    {
        id: createId("t108"),
        name: "M. Deniz",
        rating: 5,
        quote: "Wir waren nun schon mehrfach in den Lindener Ratsstuben – sowohl privat als auch für Feierlichkeiten wie runde...",
        source: "Google Reviews",
        date: "Vor 29 Wochen",
        segment: 'general'
    },
    {
        id: createId("t109"),
        name: "Ingo Frerichs",
        rating: 5,
        quote: "Wir waren heute zufällig zum ersten Mal in den Lindner Ratsstuben – und ganz sicher nicht zum letzten Mal. Schon beim...",
        source: "Google Reviews",
        date: "Vor 29 Wochen",
        segment: 'general'
    },
    {
        id: createId("t110"),
        name: "Reinhardt Palesch",
        rating: 5,
        quote: "Essen hervorragend wie immer sehr nettes Personal",
        source: "Google Reviews",
        date: "Vor 29 Wochen",
        segment: 'general'
    },
    {
        id: createId("t111"),
        name: "Jan-Aage Abel",
        rating: 5,
        quote: "Sehr gutes Restaurant mit schönem Ambiente und sehr netter Bedienung. Kann jedem nur herzlichst empfehlen in der Lindener Ratsstuben essen zu gehen wenn man in Linden ist",
        source: "Google Reviews",
        date: "Vor 30 Wochen",
        segment: 'general'
    },
    {
        id: createId("t112"),
        name: "Kirill Schipizin",
        rating: 5,
        quote: "Hervorragendes Restaurant mit Wohlfühlfaktor...",
        source: "Google Reviews",
        date: "Vor 31 Wochen",
        segment: 'general'
    },
    {
        id: createId("t113"),
        name: "Manuela Schwald",
        rating: 5,
        quote: "Ich war mit meinem Mann und einer Freundin dort. Es war Zufall. Wir waren sehr positiv überrascht. Das Ambiente war sehr...",
        source: "Google Reviews",
        date: "Vor 31 Wochen",
        segment: 'general'
    },
    {
        id: createId("t114"),
        name: "Vanii83",
        rating: 5,
        quote: "Sehr leckeres Essen, sehr gute Atmosphäre und eine sehr nette Bedienung. Man hat sich rundum wohl gefühlt",
        source: "Google Reviews",
        date: "Vor 32 Wochen",
        segment: 'general'
    },
    {
        id: createId("t115"),
        name: "Sebastian Stricker",
        rating: 5,
        quote: "Sehr leckeres Essen. Vor allem die handgefertigte Nudelgerichte sind zu empfehlen. Preislich sehr gut! Service sehr zuvorkommend!",
        source: "Google Reviews",
        date: "Vor 33 Wochen",
        segment: 'general'
    },
    {
        id: createId("t116"),
        name: "Joel Baldauf",
        rating: 5,
        quote: "Sehr lecker, kommen gerne wieder",
        source: "Google Reviews",
        date: "Vor 33 Wochen",
        segment: 'general'
    },
    {
        id: createId("t117"),
        name: "AD Lenz",
        rating: 5,
        quote: "Top Service und sehr leckeres Essen! Wir haben uns sehr wohl gefühlt.",
        source: "Google Reviews",
        date: "Vor 33 Wochen",
        segment: 'general'
    },
    {
        id: createId("t118"),
        name: "Reinhard Engel",
        rating: 5,
        quote: "Super Essen, tolle Ambiente, sehr freundlicher Service. Und wer Lust hat zu Kegeln kann es dort auch genießen....",
        source: "Google Reviews",
        date: "Vor 34 Wochen",
        segment: 'general'
    },
    {
        id: createId("t119"),
        name: "Anton Reklies",
        rating: 5,
        quote: "Also das war so ein geile Abend gestern Jerome der Kellner war so herzlich und lustig und allgemein das Restaurant war...",
        source: "Google Reviews",
        date: "Vor 34 Wochen",
        segment: 'general'
    },
    {
        id: createId("t120"),
        name: "Artur Frank",
        rating: 5,
        quote: "Vielen Dank für das sehr leckere Essen (ein großes Lob an die Küche) und natürlich an die sehr freundliche Bedienung und...",
        source: "Google Reviews",
        date: "Vor 34 Wochen",
        segment: 'general'
    },
    {
        id: createId("t121"),
        name: "JoPa",
        rating: 5,
        quote: "Tolles italienisches Essen mit sehr gutem Service günstige Preise",
        source: "Google Reviews",
        date: "Vor 34 Wochen",
        segment: 'general'
    },
    {
        id: createId("t122"),
        name: "M M",
        rating: 5,
        quote: "Einfach super. Rundherum. Essen, Getränke und der Service top. Macht weiter so 👍🏼",
        source: "Google Reviews",
        date: "Vor 34 Wochen",
        segment: 'general'
    },
    {
        id: createId("t123"),
        name: "Nicole Appelt",
        rating: 5,
        quote: "Sehr netter Service, super Essen, Umut ist ein super Kellner",
        source: "Google Reviews",
        date: "Vor 34 Wochen",
        segment: 'general'
    },
    {
        id: createId("t124"),
        name: "Gi Mü",
        rating: 5,
        quote: "Umut bester Mann Geiles essen Gute Stimmung",
        source: "Google Reviews",
        date: "Vor 34 Wochen",
        segment: 'general'
    },
    {
        id: createId("t125"),
        name: "Susanne Wagner",
        rating: 5,
        quote: "Gehe hier gerne mit meiner Mutter hin. Der Chef und die Kellner sind sehr zuvorkommend und aufmerksam. Das Essen ist lecker.",
        source: "Google Reviews",
        date: "Vor 35 Wochen",
        segment: 'general'
    },
    {
        id: createId("t126"),
        name: "Lukas Schneider",
        rating: 5,
        quote: "Das Essen war sehr gut und schnell am Tisch nach der Bestellung.",
        source: "Google Reviews",
        date: "Vor 35 Wochen",
        segment: 'general'
    },
    {
        id: createId("t127"),
        name: "Pierre Maddins",
        rating: 5,
        quote: "Sehr leckeres Essen, sehr freundlich Personal, schönes Ambiente. Das Restaurant ist auf jedenfall einen Besuch wert!",
        source: "Google Reviews",
        date: "Vor 35 Wochen",
        segment: 'general'
    },
    {
        id: createId("t128"),
        name: "Angelika Harper",
        rating: 5,
        quote: "Kein Wunder, dass man hier besser reservieren sollte. Stressige Momente werden mit herzlichem Humor gelöst....",
        source: "Google Reviews",
        date: "Vor 35 Wochen",
        segment: 'general'
    },
    {
        id: createId("t129"),
        name: "Bálint Tóth",
        rating: 5,
        quote: "Very kind staff and great food!",
        source: "Google Reviews",
        date: "Vor 36 Wochen",
        segment: 'general'
    },
    {
        id: createId("t130"),
        name: "Dennis Wagner",
        rating: 5,
        quote: "Super Service und gutes Essen",
        source: "Google Reviews",
        date: "Vor 36 Wochen",
        segment: 'general'
    },
    {
        id: createId("t131"),
        name: "Feli J",
        rating: 5,
        quote: "Wir waren mit einer Gruppe von 8 Personen zum Abendessen. Jeder hat etwas sehr leckeres nach seinem Geschmeck zu essen...",
        source: "Google Reviews",
        date: "Vor 36 Wochen",
        segment: 'general'
    },
    {
        id: createId("t132"),
        name: "Christian",
        rating: 5,
        quote: "Personal sehr freundlich und zuvor kommend, Essen war gut und lecker",
        source: "Google Reviews",
        date: "Vor 38 Wochen",
        segment: 'general'
    },
    {
        id: createId("t133"),
        name: "Maya Ruckstuhl",
        rating: 5,
        quote: "Wir gehen sehr gerne hier essen. Es ist immer super lecker und ein toller Service! Wir können es wirklich nur empfehlen. Essen ist unschlagbar und die Preise top. Kommen immer gerne wieder.:)",
        source: "Google Reviews",
        date: "Vor 40 Wochen",
        segment: 'general'
    },
    {
        id: createId("t134"),
        name: "Mathias Schäfer",
        rating: 5,
        quote: "Beim anschneide des Lindener Rucksack [Cordon Blue] lief ein große Menge Öl auf den Teller. Das war nicht wirklich lecker. Die Kegelbahn im Hintergrund störte das schöne Ambiente etwas. Service war top.",
        source: "Google Reviews",
        date: "Vor 40 Wochen",
        segment: 'general'
    },
    {
        id: createId("t135"),
        name: "Daniela Faber",
        rating: 5,
        quote: "Essen und Service top.",
        source: "Google Reviews",
        date: "Vor 41 Wochen",
        segment: 'general'
    },
    {
        id: createId("t136"),
        name: "Dominic Graulich",
        rating: 5,
        quote: "Was für ein toller Abend! Die freundliche und angenehm zugewandte und humorvolle Bedienung hat uns besonders gut...",
        source: "Google Reviews",
        date: "Vor 41 Wochen",
        segment: 'general'
    },
    {
        id: createId("t137"),
        name: "Anne Weber",
        rating: 5,
        quote: "Es war wieder einmal super lecker. Und der Service war ebenfalls perfekt,sehr sehr nett,da fühlt man sich immer direkt gut aufgehoben",
        source: "Google Reviews",
        date: "Vor 41 Wochen",
        segment: 'general'
    },
    {
        id: createId("t138"),
        name: "Tim",
        rating: 5,
        quote: "Wir waren rundum begeistert! Der Service war ausgesprochen freundlich und aufmerksam – man hat sich sofort willkommen...",
        source: "Google Reviews",
        date: "Vor 41 Wochen",
        segment: 'general'
    },
    {
        id: createId("t139"),
        name: "Stefan Z.",
        rating: 5,
        quote: "Alles super Lecker. Sehr freundliches Personal.",
        source: "Google Reviews",
        date: "Vor 41 Wochen",
        segment: 'general'
    },
    {
        id: createId("t140"),
        name: "Jonas Meissner",
        rating: 5,
        quote: "Sehr leckeres Essen. Wir waren alle zufrieden.",
        source: "Google Reviews",
        date: "Vor 41 Wochen",
        segment: 'general'
    },
    {
        id: createId("t141"),
        name: "Cappycastle",
        rating: 5,
        quote: "Sehr leckeres Essen und super Service! Wir kommen gerne wieder und nächstes Mal nehmen wir auch ein Dessert 😉",
        source: "Google Reviews",
        date: "Vor 41 Wochen",
        segment: 'general'
    },
    {
        id: createId("t142"),
        name: "Christian Dannewitz",
        rating: 5,
        quote: "Waren kurzfristig am Mittwochabend dort und haben einen der letzten Tische bekommen. Essen war sehr lecker und...",
        source: "Google Reviews",
        date: "Vor 41 Wochen",
        segment: 'general'
    },
    {
        id: createId("t143"),
        name: "jerome apel",
        rating: 5,
        quote: "Der Besitzer führt dieses Restaurant seit etwa 7 Jahren. Das allein sagt schon viel über einen gesunden und...",
        source: "Google Reviews",
        date: "Vor 41 Wochen",
        segment: 'general'
    },
    {
        id: createId("t144"),
        name: "Jan Heinemann",
        rating: 5,
        quote: "Sehr nettes und kinderliebes Personal.",
        source: "Google Reviews",
        date: "Vor 41 Wochen",
        segment: 'general'
    },
    {
        id: createId("t145"),
        name: "Arne Voigt",
        rating: 5,
        quote: "War super!:)",
        source: "Google Reviews",
        date: "Vor 42 Wochen",
        segment: 'general'
    },
    {
        id: createId("t146"),
        name: "Jonas Kempf",
        rating: 5,
        quote: "Essen war perfekt. Die Bedienung super zuvorkommend....",
        source: "Google Reviews",
        date: "Vor 42 Wochen",
        segment: 'general'
    },
    {
        id: createId("t147"),
        name: "André Tessenow",
        rating: 5,
        quote: "Wir waren spontan dort und sind begeistert. Sehr gutes Essen, tolles Personal... Vielen Dank an das Team. Wir kommen wieder...",
        source: "Google Reviews",
        date: "Vor 42 Wochen",
        segment: 'general'
    },
    {
        id: createId("t148"),
        name: "Bernd Schombert",
        rating: 5,
        quote: "Sehr empfehlenswert haben wir heute durch Zufall entdeckt schönes Ambiente sehr gastfreundlich und vor allem das Essen sehr gut gerne wieder",
        source: "Google Reviews",
        date: "Vor 42 Wochen",
        segment: 'general'
    },
    {
        id: createId("t149"),
        name: "Manuel H.",
        rating: 5,
        quote: "Immer wieder gerne. Gutes Essen, schönes Ambiente. Die Nudelgerichte sind super, aber könnten für mich (erwachsener Mann) etwas großer sein.",
        source: "Google Reviews",
        date: "Vor 42 Wochen",
        segment: 'general'
    },
    {
        id: createId("t150"),
        name: "L. S.",
        rating: 5,
        quote: "Wir sind öfters mit Freunden oder einer Stammtisch-Runde im Restaurant. Der Service ist sehr freundlich und...",
        source: "Google Reviews",
        date: "Vor 42 Wochen",
        segment: 'general'
    },
    {
        id: createId("t151"),
        name: "Jana Keil",
        rating: 5,
        quote: "Ihr seid spitze, ich komme immer wieder gern zu euch! 🥰",
        source: "Google Reviews",
        date: "Vor 42 Wochen",
        segment: 'general'
    },
    {
        id: createId("t152"),
        name: "Alisa",
        rating: 5,
        quote: "Das Essen und der Service waren toll! Insbesondere das Bruschetta und die Gnocci con Gorgonzola sind sehr zu empfehlen. Das Ambiente ist sehr gemütlich :) Wir kommen gerne wieder!",
        source: "Google Reviews",
        date: "Vor 42 Wochen",
        segment: 'general'
    },
    {
        id: createId("t153"),
        name: "Ali Baba",
        rating: 5,
        quote: "Super Essen. Ich hatte Nr. 55 aus der Speisekarte. Sehr netter Service. Wir haben sogar kurzfristig noch einen Tisch für zwei bekommen.",
        source: "Google Reviews",
        date: "Vor 42 Wochen",
        segment: 'general'
    },
    {
        id: createId("t154"),
        name: "Nathalie Weiß",
        rating: 5,
        quote: "Immer wieder großartig!",
        source: "Google Reviews",
        date: "Vor 42 Wochen",
        segment: 'general'
    },
    {
        id: createId("t155"),
        name: "Julia Alexander",
        rating: 5,
        quote: "Super Mittagsangebot, immer sehr leckeres Essen und freundliche Bedienung. Hier bedient der Chef auch oft selbst. Immer wieder einen Besuch wert.",
        source: "Google Reviews",
        date: "Vor 43 Wochen",
        segment: 'general'
    },
    {
        id: createId("t156"),
        name: "JEANNETTE Kuttner",
        rating: 5,
        quote: "Meine 6j Enkelin und ich waren heute gg 12h zum Mittagessen dort. Da ich nach Umzug noch keine Küche habe, bot sich die...",
        source: "Google Reviews",
        date: "Vor 44 Wochen",
        segment: 'general'
    },
    {
        id: createId("t157"),
        name: "Mr T",
        rating: 5,
        quote: "Sehr tolles Restaurant. Super Service. Man hat die Motivation der Kellner spürbar gemerkt....",
        source: "Google Reviews",
        date: "Vor 45 Wochen",
        segment: 'general'
    },
    {
        id: createId("t158"),
        name: "Karola F.",
        rating: 5,
        quote: "Hatte das Steak und das war sehr lecker, von mir eine klare Empfehlung. Ich werde wieder dort essen gehen, auch das Personal was sehr freundlich.",
        source: "Google Reviews",
        date: "Vor 46 Wochen",
        segment: 'general'
    },
    {
        id: createId("t159"),
        name: "Klaus-dieter Reinicke",
        rating: 5,
        quote: "Sehr zu empfehlen 👍👍",
        source: "Google Reviews",
        date: "Vor 46 Wochen",
        segment: 'general'
    },
    {
        id: createId("t160"),
        name: "M Ls",
        rating: 5,
        quote: "Gehen seit Jahren hier zum Mittagstisch. Preis Leistung ist unschlagbar hier im Umkreis....",
        source: "Google Reviews",
        date: "Vor 46 Wochen",
        segment: 'general'
    },
    {
        id: createId("t161"),
        name: "Katja Stumpf",
        rating: 5,
        quote: "Wir waren seit längerem mal wieder da zum Essen. Es war wie immer sehr lecker und das Personal war total nett und freundlich. Bei herrlichstem Wetter im Biergarten zu sitzen……..total hervorragend, wie Urlaub!!!!",
        source: "Google Reviews",
        date: "Vor 49 Wochen",
        segment: 'general'
    },
    {
        id: createId("t162"),
        name: "Jörg Groos",
        rating: 5,
        quote: "Ambiente sehr schön 👍Bedienungen freundlich und Hilfsbereit Essen eine glatte 10 ein Besuch ist sehr zu empfehlen Ich bin regelmäßig dort macht weiter so LG Jörg",
        source: "Google Reviews",
        date: "Vor 49 Wochen",
        segment: 'general'
    },
    {
        id: createId("t163"),
        name: "K B (citanes2002)",
        rating: 5,
        quote: "Wir waren gestern in der Mittagspause dort und werden ganz bestimmt wiederkommen. Sehr, sehr freundlicher und...",
        source: "Google Reviews",
        date: "Vor 49 Wochen",
        segment: 'general'
    },
    {
        id: createId("t164"),
        name: "SD H",
        rating: 5,
        quote: "Wir waren als Familie schon 2x hier essen. Der Service ist sehr gut. Nette Bedienung, Extrawünsche werden ohne Probleme...",
        source: "Google Reviews",
        date: "Vor 50 Wochen",
        segment: 'general'
    },
    {
        id: createId("t165"),
        name: "Killian Gamsjäger",
        rating: 5,
        quote: "Köstlich gern wieder!",
        source: "Google Reviews",
        date: "Vor 50 Wochen",
        segment: 'general'
    },
    {
        id: createId("t166"),
        name: "Andrea W.",
        rating: 5,
        quote: "Sehr nettest Personal, leckeres Essen, gerne wieder",
        source: "Google Reviews",
        date: "Vor 50 Wochen",
        segment: 'general'
    },
    {
        id: createId("t167"),
        name: "Sonnen - Herz",
        rating: 5,
        quote: "Herzlichen Dank für den wunderbaren Abend bei euch! Das Essen war einfach hervorragend – mit...",
        source: "Google Reviews",
        date: "Vor 50 Wochen",
        segment: 'general'
    },
    {
        id: createId("t168"),
        name: "s",
        rating: 5,
        quote: "Nach 5 Jahren mal wieder besucht, Samstag Abend, Restaurant ist voll. Trotzdem top Service, das Essen kam...",
        source: "Google Reviews",
        date: "Vor 50 Wochen",
        segment: 'general'
    },
    {
        id: createId("t169"),
        name: "Marco Wiegandt",
        rating: 5,
        quote: "Sehr nettes Personal, und super Pizza.",
        source: "Google Reviews",
        date: "Vor 50 Wochen",
        segment: 'general'
    },
    {
        id: createId("t170"),
        name: "Antje Velten",
        rating: 5,
        quote: "Sehr lecker, mit frischen Zutaten, angerichtetes Essen 😋 Der Service ist gut 👍🏻 Gerne kommen wir wieder.",
        source: "Google Reviews",
        date: "Vor 51 Wochen",
        segment: 'general'
    },
    {
        id: createId("t171"),
        name: "Sandra Häuser",
        rating: 5,
        quote: "Leckeres Essen, schöner Biergarten, netter Service... 😊",
        source: "Google Reviews",
        date: "Vor 51 Wochen",
        segment: 'general'
    },
    {
        id: createId("t172"),
        name: "lena rühl",
        rating: 5,
        quote: "War mit Oma und Opa essen – super leckeres Essen und richtig nette Atmosphäre! Besonders der Kellner war total freundlich und aufmerksam",
        source: "Google Reviews",
        date: "Vor 51 Wochen",
        segment: 'general'
    },
    {
        id: createId("t173"),
        name: "Daniel Gorbacev",
        rating: 5,
        quote: "Sehr gutes Essen und Service 1**",
        source: "Google Reviews",
        date: "Vor 51 Wochen",
        segment: 'general'
    },
    {
        id: createId("t174"),
        name: "Wojtek Ropel",
        rating: 5,
        quote: "Ja, sehr gutes Essen und netter Service",
        source: "Google Reviews",
        date: "06.07.2025",
        segment: 'general'
    },
    {
        id: createId("t175"),
        name: "Nico",
        rating: 5,
        quote: "Essen war sehr lecker, Kellner war sehr Freundlich und ist auch wünsche eingegangen. Es wurde oft nachgefragt ob alles okay ist aber auch nicht zu oft. Preis Leistung Top. Kommen gerne wieder 👍",
        source: "Google Reviews",
        date: "05.07.2025",
        segment: 'general'
    },
    {
        id: createId("t176"),
        name: "Josiane Houselstein",
        rating: 5,
        quote: "La cuisine et le service étaient irréprochables .",
        source: "Google Reviews",
        date: "26.06.2025",
        segment: 'general'
    },
    {
        id: createId("t177"),
        name: "Jeannine Heidt",
        rating: 5,
        quote: "Wir waren heute spontan in der Ratsstuben essen. Das Essen war super lecker und das Personal war sehr freundlich und aufmerksam. Wir kommen gerne wieder!",
        source: "Google Reviews",
        date: "11.06.2025",
        segment: 'general'
    },
    {
        id: createId("t178"),
        name: "Angelika Graeser",
        rating: 5,
        quote: "Wir waren zu viert. Jeder hatte ein anderes Gericht und allen hat es geschmeckt. Am Service gibt es ebenfalls nichts auszusetzen.",
        source: "Google Reviews",
        date: "04.06.2025",
        segment: 'general'
    },
    {
        id: createId("t179"),
        name: "R S",
        rating: 5,
        quote: "Sehr gutes Essen nettes Personal und ein schönes Ambiente 👍👍👍",
        source: "Google Reviews",
        date: "29.05.2025",
        segment: 'general'
    },
    {
        id: createId("t180"),
        name: "Melanie Höfer",
        rating: 5,
        quote: "Sehr zu empfehlen, leckeres Essen, ob Pizza, schnitzel, Nudeln oder Salat, bisher hat alles wunderbar geschmeckt!...",
        source: "Google Reviews",
        date: "29.05.2025",
        segment: 'general'
    },
    {
        id: createId("t181"),
        name: "Thomas Groß",
        rating: 5,
        quote: "Sehr nettes Personal top. Essen sehr lecker. Gehen dort regelmäßig essen. Immer wieder gerne.",
        source: "Google Reviews",
        date: "29.05.2025",
        segment: 'general'
    },
    {
        id: createId("t182"),
        name: "Wolfgang Trechsler",
        rating: 5,
        quote: "Das Essen ist sehr gut 👍",
        source: "Google Reviews",
        date: "28.05.2025",
        segment: 'general'
    },
    {
        id: createId("t183"),
        name: "Life Is good",
        rating: 5,
        quote: "Die Lindener Ratsstuben in Linden sind ein wahres Juwel für Liebhaber der italienischen Küche. Schon beim Betreten des...",
        source: "Google Reviews",
        date: "26.05.2025",
        segment: 'general'
    },
    {
        id: createId("t184"),
        name: "Martina Wiese",
        rating: 5,
        quote: "Sehr leckeres Schnitzel mit Hollandaise und Kartoffeln gegessen. Schneller, freundlicher Service. Preis/Leistung passt! Komme gerne wieder :)",
        source: "Google Reviews",
        date: "22.05.2025",
        segment: 'general'
    },
    {
        id: createId("t185"),
        name: "Karin Ehrhardt",
        rating: 5,
        quote: "Hat sehr gut geschmeckt",
        source: "Google Reviews",
        date: "17.05.2025",
        segment: 'general'
    },
    {
        id: createId("t186"),
        name: "Kai Schober",
        rating: 5,
        quote: "Essen und Service immer top, absolute Empfehlung 👍🙂",
        source: "Google Reviews",
        date: "14.05.2025",
        segment: 'general'
    },
    {
        id: createId("t187"),
        name: "Janine Wischek",
        rating: 5,
        quote: "Sehr schön zum draußen sitzen! Essen war lecker und schnell da",
        source: "Google Reviews",
        date: "05.05.2025",
        segment: 'general'
    },
    {
        id: createId("t188"),
        name: "Andy & Anny Via Google",
        rating: 5,
        quote: "Hatte das Bologneseschnitzel. Dabei war ein Salat. Der Salat und das Schnitzel mit Pommes war sehr gut und sehr gut angerichtet. Klare Empfehlung!",
        source: "Google Reviews",
        date: "04.05.2025",
        segment: 'general'
    },
    {
        id: createId("t189"),
        name: "Barbara Weinreich",
        rating: 5,
        quote: "Essen hat immer gute Qualität und ist echt lecker. Besonders zu empfehlen das Seafood. Täglich wechselnde Produkte, was...",
        source: "Google Reviews",
        date: "01.05.2025",
        segment: 'general'
    },
    {
        id: createId("t190"),
        name: "Sophia H",
        rating: 5,
        quote: "Das Essen ist immer lecker, gleichgültig ob Pizza, Pasta, Fleisch- oder Fischgerichte. Die Bedienung ist super freundlich und aufmerksam. Wir kommen immer wieder gerne hierher!",
        source: "Google Reviews",
        date: "25.04.2025",
        segment: 'general'
    },
    {
        id: createId("t191"),
        name: "Reiner Arnold",
        rating: 5,
        quote: "Gerne wieder",
        source: "Google Reviews",
        date: "25.04.2025",
        segment: 'general'
    },
    {
        id: createId("t192"),
        name: "Jutta Seel",
        rating: 5,
        quote: "Kann dieses Lokal auf jeden Fall weiterempfehlen. Alles top und nichts zu bemängeln.",
        source: "Google Reviews",
        date: "23.04.2025",
        segment: 'general'
    },
    {
        id: createId("t193"),
        name: "Sybille Seel",
        rating: 5,
        quote: "Wir waren heute Mittag essen und es war sehr lecker.",
        source: "Google Reviews",
        date: "20.04.2025",
        segment: 'general'
    },
    {
        id: createId("t194"),
        name: "Daniel Görlich",
        rating: 5,
        quote: "Super lecker, wir kommen regelmässig!",
        source: "Google Reviews",
        date: "20.04.2025",
        segment: 'general'
    },
    {
        id: createId("t195"),
        name: "Martin Bender",
        rating: 5,
        quote: "Super lecker, total freundliches Personal. Alles top!",
        source: "Google Reviews",
        date: "20.04.2025",
        segment: 'general'
    },
    {
        id: createId("t196"),
        name: "Bärbel Krug",
        rating: 5,
        quote: "Sehr freundlicher und aufmerksamer Service. Das Essen war ausgesprochen lecker zu einem angemessenem Preis. Der Biergarten läd zum Verweilen ein. Wir kommen gerne wieder.",
        source: "Google Reviews",
        date: "20.04.2025",
        segment: 'general'
    },
    {
        id: createId("t197"),
        name: "Bernadette Völker",
        rating: 5,
        quote: "Wir waren mit einer großen Gruppe in den Ratsstuben in Linden und es war alles ganz wunderbar. Der Service war klasse,...",
        source: "Google Reviews",
        date: "20.04.2025",
        segment: 'general'
    },
    {
        id: createId("t198"),
        name: "Philip",
        rating: 5,
        quote: "Sehr aufmerksamer und super netter Service, Essen war gut. Für mich hätte der Beilagen Salat ein bisschen großer und...",
        source: "Google Reviews",
        date: "19.04.2025",
        segment: 'general'
    },
    {
        id: createId("t199"),
        name: "Leo Pauer",
        rating: 5,
        quote: "Alles was ich hier bisher gegessen habe, war superlecker und auch Preis-Leistungsmäsisch top. Und alle sind sehr nett.",
        source: "Google Reviews",
        date: "19.04.2025",
        segment: 'general'
    },
    {
        id: createId("t200"),
        name: "Nives Vogler",
        rating: 5,
        quote: "Sehr schönes Ambiente und super Essen! Immer wieder gerne",
        source: "Google Reviews",
        date: "19.04.2025",
        segment: 'general'
    },
    {
        id: createId("t201"),
        name: "Bello 64",
        rating: 5,
        quote: "Sehr schöne Einrichtung und es ist immer wieder lecker einfach nur super",
        source: "Google Reviews",
        date: "19.04.2025",
        segment: 'general'
    },
    {
        id: createId("t202"),
        name: "Markus Pörtner",
        rating: 5,
        quote: "Waren das erste Mal dort und ich kann das Restaurant nur empfehlen. Sehr gutes Essen,besonders das Bolognese Schnitzel...",
        source: "Google Reviews",
        date: "19.04.2025",
        segment: 'general'
    },
    {
        id: createId("t203"),
        name: "Tanja Jung",
        rating: 5,
        quote: "Sehr leckeres Essen und super tolles Personal. Gerne wieder.",
        source: "Google Reviews",
        date: "19.04.2025",
        segment: 'general'
    },
    {
        id: createId("t204"),
        name: "Andreas Jung",
        rating: 5,
        quote: "Wie immer, super lecker und top Service",
        source: "Google Reviews",
        date: "19.04.2025",
        segment: 'general'
    },
    {
        id: createId("t205"),
        name: "KaLi",
        rating: 5,
        quote: "Es ist ein tolles Restaurant mit sehr gutem Essen. Der Service ist leider nicht gleichbleibend gut, aber so lange das Essen stimmt, passt es für uns.",
        source: "Google Reviews",
        date: "18.04.2025",
        segment: 'general'
    },
    {
        id: createId("t206"),
        name: "Alexander Wieth",
        rating: 5,
        quote: "Sehr guter und netter Service, das Essen ist sehr lecker, Änderungswünsche werden gerne entgegengenommen. Kommen gerne wieder. Macht weiter so !",
        source: "Google Reviews",
        date: "05.04.2025",
        segment: 'general'
    },
    {
        id: createId("t207"),
        name: "Eva V.",
        rating: 5,
        quote: "Wir kommen immer wieder gerne - zu jeder Gelegenheit :-)",
        source: "Google Reviews",
        date: "05.04.2025",
        segment: 'general'
    },
    {
        id: createId("t208"),
        name: "Martina S.",
        rating: 5,
        quote: "Kegelbahn direkt nebenan passt nicht zur ansonsten perfekten Pizzeria. Wir waren mit zehn Personen dort, jeder war vom Essen begeistert. Preis- Leistung ist Top!",
        source: "Google Reviews",
        date: "02.04.2025",
        segment: 'general'
    },
    {
        id: createId("t209"),
        name: "Katha B.",
        rating: 5,
        quote: "Freundliches und zuvorkommendes Personal, sehr gutes Essen. Klare Empfehlung!",
        source: "Google Reviews",
        date: "30.03.2025",
        segment: 'general'
    },
    {
        id: createId("t210"),
        name: "Helga Gassner",
        rating: 5,
        quote: "Sehr freundlich, Essen richtig gut und schnell",
        source: "Google Reviews",
        date: "28.03.2025",
        segment: 'general'
    },
    {
        id: createId("t211"),
        name: "Lothar Mohr",
        rating: 5,
        quote: "Es ist ein super tolles Restaurant. Der Service ist Mega. Essen super lecker.",
        source: "Google Reviews",
        date: "26.03.2025",
        segment: 'general'
    },
    {
        id: createId("t212"),
        name: "Hans Martin Wagner",
        rating: 5,
        quote: "Essen und der Service ist sehr gut. Sehr empfehlenswert",
        source: "Google Reviews",
        date: "25.03.2025",
        segment: 'general'
    },
    {
        id: createId("t213"),
        name: "Matthis Müller",
        rating: 5,
        quote: "10/10. Die Mitarbeiter sind immer sehr nett und...",
        source: "Google Reviews",
        date: "23.03.2025",
        segment: 'general'
    },
    {
        id: createId("t214"),
        name: "Luke Goes Smart",
        rating: 5,
        quote: "Samstagabend um 20:00 Uhr spontan zu viert in den Ratsstuben aufgekreuzt. Die Bude war gut voll, aber direkt einen...",
        source: "Google Reviews",
        date: "22.03.2025",
        segment: 'general'
    },
    {
        id: createId("t215"),
        name: "Karin Bramer",
        rating: 5,
        quote: "Trotzdem wir nicht vorbestellt haben, wurde es uns ermöglicht ein vorzüglichen Mahl einzunehmen. Der Service war erstklassig, das Essen fantastisch, kann dieses Lokal gutem Gewissens weiterempfehlen ❤️",
        source: "Google Reviews",
        date: "22.03.2025",
        segment: 'general'
    },
    {
        id: createId("t216"),
        name: "Flummflumm123",
        rating: 5,
        quote: "Nettes zuvorkommendes Personal. Essen sehr lecker. Lammhaxe (Tageskarte) zu empfehlen.",
        source: "Google Reviews",
        date: "22.03.2025",
        segment: 'general'
    },
    {
        id: createId("t217"),
        name: "Alina Habermann",
        rating: 5,
        quote: "Trotz vollem Haus haben wir heute Abend noch spontan einen Tisch bekommen. Das Personal war aufmerksam und freundlich. Das Essen kam schnell und war super lecker. Klare Empfehlung!",
        source: "Google Reviews",
        date: "22.03.2025",
        segment: 'general'
    },
    {
        id: createId("t218"),
        name: "Jan Habermann",
        rating: 5,
        quote: "Sehr leckeres Essen. Portionen sind sehr reichlich und die Zutaten sind von hoher Qualität. Service ist einwandfrei. Kann man nur empfehlen.",
        source: "Google Reviews",
        date: "22.03.2025",
        segment: 'general'
    },
    {
        id: createId("t219"),
        name: "Jannik Micknass",
        rating: 5,
        quote: "Das Essen ist sehr gut, der Service sehr aufmerksam. Auch die Kegelbahn ist gut im Schuss. Werde auf jeden Fall wiederkommen",
        source: "Google Reviews",
        date: "22.03.2025",
        segment: 'general'
    },
    {
        id: createId("t220"),
        name: "Pascal",
        rating: 5,
        quote: "Essen und Service top, kann ich nur empfehlen 👍🏻",
        source: "Google Reviews",
        date: "22.03.2025",
        segment: 'general'
    },
    {
        id: createId("t221"),
        name: "Jan Heep",
        rating: 5,
        quote: "Super Restaurant für gehobenere, normale aber auch feierliche Anlässe. Guter und zuvorkommender Service mit leckeren Essen. Kegelbahn auch im sehr guten Zustand.",
        source: "Google Reviews",
        date: "22.03.2025",
        segment: 'general'
    },
    {
        id: createId("t222"),
        name: "Alexander Pelz",
        rating: 5,
        quote: "Gutes Essen, besseres Personal und eine tolle Kegelbahn. Komme immer gerne hierher:)",
        source: "Google Reviews",
        date: "22.03.2025",
        segment: 'general'
    },
    {
        id: createId("t223"),
        name: "hunter killua",
        rating: 5,
        quote: "Super nettes Personal, leckeres essen und die Kegelbahnen sind in einem super Zustand. :)",
        source: "Google Reviews",
        date: "22.03.2025",
        segment: 'general'
    },
    {
        id: createId("t224"),
        name: "Tobias Lehr",
        rating: 5,
        quote: "Das Essen schmeckt sehr sehr lecker, die Portionen sind auch sehr gut und die Preisleistung ist auch gut. Die Bedienungen sind super nett und sehr schnell!!! Das Restaurant ist wirklich empfehlenswert!!!!",
        source: "Google Reviews",
        date: "21.03.2025",
        segment: 'general'
    },
    {
        id: createId("t225"),
        name: "Corina Mander",
        rating: 5,
        quote: "Sehr schönes Lokal. Gutes Essen, Alle sehr freundlich, Chef ist immer da und sehr aufmerksam! Corina Mander",
        source: "Google Reviews",
        date: "19.03.2025",
        segment: 'general'
    },
    {
        id: createId("t226"),
        name: "Mona Rinker",
        rating: 5,
        quote: "Man fühlt sich sehr wohl und gut bedient, Essen ist toll, immer wieder gerne.",
        source: "Google Reviews",
        date: "18.03.2025",
        segment: 'general'
    },
    {
        id: createId("t227"),
        name: "Yvonne Jansen",
        rating: 5,
        quote: "Charmanter Sevice, leckeres Essen, tolles Ambiente",
        source: "Google Reviews",
        date: "18.03.2025",
        segment: 'general'
    },
    {
        id: createId("t228"),
        name: "17_mxthxs_ 09",
        rating: 5,
        quote: "Die Bedienung war sehr höflich und der Abend war sehr schön. Es war alles top.",
        source: "Google Reviews",
        date: "18.03.2025",
        segment: 'general'
    },
    {
        id: createId("t229"),
        name: "M01th01",
        rating: 5,
        quote: "Top wie immer 👍",
        source: "Google Reviews",
        date: "18.03.2025",
        segment: 'general'
    },
    {
        id: createId("t230"),
        name: "Bodo Junker",
        rating: 5,
        quote: "Super freundlich , lustig Super Essen",
        source: "Google Reviews",
        date: "18.03.2025",
        segment: 'general'
    },
    {
        id: createId("t231"),
        name: "Regina Schomber-Thurn",
        rating: 5,
        quote: "War jetzt schon zum zweiten Mal da , einfach super das Essen und das Personal ist richtig freundlich. Kann man echt nur empfehlen 😍👍🏾",
        source: "Google Reviews",
        date: "14.03.2025",
        segment: 'general'
    },
    {
        id: createId("t232"),
        name: "Jonna Jensen",
        rating: 5,
        quote: "Das beste Essen weit und breit und dann auch noch mit super sympathischer Bedienung! Sehr zu empfehlen!",
        source: "Google Reviews",
        date: "12.03.2025",
        segment: 'general'
    },
    {
        id: createId("t233"),
        name: "Johannes Zim",
        rating: 5,
        quote: "Alles gut, gerne wieder.",
        source: "Google Reviews",
        date: "11.03.2025",
        segment: 'general'
    },
    {
        id: createId("t234"),
        name: "Mercedes McCray",
        rating: 5,
        quote: "Waren heute zum ersten Mal in diesem Restaurant. Das Ambiente war sehr schön. Der Service war sehr freundlich und...",
        source: "Google Reviews",
        date: "09.03.2025",
        segment: 'general'
    },
    {
        id: createId("t235"),
        name: "K. W.",
        rating: 5,
        quote: "Man kann hier sehr gut essen, egal ob Pizza, Pasta, Salat oder Fleischgerichte und das Personal ist immer sehr freundlich und hilfsbereit. Die Location könnte etwas ansprechender gestaltet sein.",
        source: "Google Reviews",
        date: "08.03.2025",
        segment: 'general'
    },
    {
        id: createId("t236"),
        name: "Heike Brockmann",
        rating: 5,
        quote: "Immer wieder gerne!",
        source: "Google Reviews",
        date: "06.03.2025",
        segment: 'general'
    },
    {
        id: createId("t237"),
        name: "Andrea Tschernich",
        rating: 5,
        quote: "Immer freundliches Personal, sei es am Telefon oder persönlich. Essen immer gut....",
        source: "Google Reviews",
        date: "26.02.2025",
        segment: 'general'
    },
    {
        id: createId("t238"),
        name: "Jennifer Petry",
        rating: 5,
        quote: "Waren schon öfter dort essen und sind immer wieder begeistert, sehr nette und freundliche Bedienung. Essen ist super lecker.",
        source: "Google Reviews",
        date: "22.02.2025",
        segment: 'general'
    },
    {
        id: createId("t239"),
        name: "Fenerli Anil Ağa",
        rating: 5,
        quote: "Super leckeres Essen mit richtig freundlichem Personal. Stielvolles, modernes Ambiente. Wir kommen auf jeden Fall nochmal.",
        source: "Google Reviews",
        date: "22.02.2025",
        segment: 'general'
    },
    {
        id: createId("t240"),
        name: "Virginia Beck",
        rating: 5,
        quote: "Wir hatten heute zum ersten Mal das Vergnügen hier zu essen. Das Essen war Top, von Vorspeise bis...",
        source: "Google Reviews",
        date: "22.02.2025",
        segment: 'general'
    }
];

// ═══ GETTER FUNKTIONEN (STRICT TYPED ARCHITECTURE) ═══
export function getAllTestimonials(): Testimonial[] {
    return [...testimonials];
}

export function getTestimonialsBySegment(segment: PrimaryInterest | 'general'): Testimonial[] {
    // Return all testimonials for general so that SEO is maximized on the homepage
    if (segment === 'general') return getAllTestimonials();
    
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
