const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, 'locales');

// Phase 2 languages
const phase2 = ['en', 'fr', 'es', 'it', 'nl', 'pt', 'da', 'sv', 'no', 'fi'];

const translations = {
  faq: {
    en: {
      "title": "Frequently Asked Questions",
      "items": {
        "q1": {
          "question": "What are the Lindener Ratsstuben?",
          "shortAnswer": "The Lindener Ratsstuben is a traditional restaurant in Linden, Hesse, specializing in authentic German-Italian and Mediterranean cuisine. In addition to regular daily operations with lunch and dinner, the restaurant also offers catering services."
        },
        "q2": {
          "question": "Does the Lindener Ratsstuben offer catering?",
          "shortAnswer": "Yes, we offer professional event and catering services in Linden and the surrounding areas. This includes individually planned weddings, corporate anniversaries, and celebrations for up to 120 people."
        },
        "q3": {
          "question": "What are the opening hours?",
          "shortAnswer": "We are open from Tuesday to Sunday. Lunch is served from 11:30 AM to 2:30 PM, and dinner from 5:30 PM to 10:30 PM. We are closed on Mondays, except on public holidays."
        },
        "q4": {
          "question": "Do you have vegetarian dishes?",
          "shortAnswer": "Yes, we offer a wide selection of vegetarian dishes. Our menu features special Mediterranean and Italian meals prepared entirely without meat."
        },
        "q5": {
          "question": "Where can I find the menu?",
          "shortAnswer": "You can find our menu directly on our website. It features German-Italian dishes, salads, vegetarian specialties, and a daily changing 2-course menu."
        }
      }
    },
    fr: {
      "title": "Questions Fréquentes",
      "items": {
        "q1": { "question": "Que sont les Lindener Ratsstuben ?", "shortAnswer": "Les Lindener Ratsstuben sont un restaurant traditionnel situé à Linden, spécialisé dans la cuisine authentique germano-italienne et méditerranéenne. Nous proposons également un service traiteur." },
        "q2": { "question": "Proposez-vous un service traiteur ?", "shortAnswer": "Oui, nous proposons un service traiteur professionnel pour vos événements à Linden et ses environs, pouvant accueillir jusqu'à 120 personnes pour des mariages ou des anniversaires d'entreprise." },
        "q3": { "question": "Quelles sont les heures d'ouverture ?", "shortAnswer": "Nous sommes ouverts du mardi au dimanche. Le déjeuner est servi de 11h30 à 14h30 et le dîner de 17h30 à 22h30. Fermé le lundi, sauf jours fériés." },
        "q4": { "question": "Avez-vous des plats végétariens ?", "shortAnswer": "Oui, nous offrons un grand choix de plats végétariens frais d'inspiration méditerranéenne et italienne." },
        "q5": { "question": "Où puis-je trouver le menu ?", "shortAnswer": "Notre menu est disponible sur notre site web. Vous y trouverez nos plats germano-italiens, des spécialités végétariennes et notre menu du jour." }
      }
    },
    es: {
      "title": "Preguntas Frecuentes",
      "items": {
        "q1": { "question": "¿Qué son los Lindener Ratsstuben?", "shortAnswer": "Es un restaurante tradicional en Linden especializado en auténtica cocina germano-italiana y mediterránea, que además ofrece servicios de catering." },
        "q2": { "question": "¿Ofrecen servicio de catering?", "shortAnswer": "Sí, ofrecemos un servicio profesional de catering y eventos para bodas y celebraciones corporativas de hasta 120 personas." },
        "q3": { "question": "¿Cuál es el horario de atención?", "shortAnswer": "Abrimos de martes a domingo. El almuerzo se sirve de 11:30 a 14:30 y la cena de 17:30 a 22:30. Cerramos los lunes, excepto festivos." },
        "q4": { "question": "¿Tienen opciones vegetarianas?", "shortAnswer": "Sí, disponemos de una amplia selección de platos vegetarianos frescos de inspiración italiana y mediterránea." },
        "q5": { "question": "¿Dónde puedo ver el menú?", "shortAnswer": "El menú está disponible en nuestro sitio web, donde encontrará nuestras especialidades, ensaladas y nuestro menú diario de 2 platos." }
      }
    },
    it: {
      "title": "Domande Frequenti",
      "items": {
        "q1": { "question": "Cosa sono le Lindener Ratsstuben?", "shortAnswer": "È un ristorante tradizionale a Linden specializzato in autentica cucina italo-tedesca e mediterranea, che offre anche servizi di catering." },
        "q2": { "question": "Offrite servizio di catering?", "shortAnswer": "Sì, offriamo un servizio di catering professionale per eventi, matrimoni e feste aziendali fino a 120 persone." },
        "q3": { "question": "Quali sono gli orari di apertura?", "shortAnswer": "Siamo aperti dal martedì alla domenica. Il pranzo viene servito dalle 11:30 alle 14:30, la cena dalle 17:30 alle 22:30. Chiuso il lunedì, eccetto i giorni festivi." },
        "q4": { "question": "Avete piatti vegetariani?", "shortAnswer": "Sì, offriamo un'ampia scelta di piatti vegetariani freschi d'ispirazione mediterranea." },
        "q5": { "question": "Dove posso trovare il menu?", "shortAnswer": "Il nostro menu è disponibile direttamente sul sito web. Include specialità italo-tedesche, piatti vegetariani e un menu del giorno." }
      }
    },
    nl: {
      "title": "Veelgestelde Vragen",
      "items": {
        "q1": { "question": "Wat is Lindener Ratsstuben?", "shortAnswer": "Lindener Ratsstuben is een traditioneel restaurant in Linden, gespecialiseerd in de authentieke Duits-Italiaanse en mediterrane keuken. We bieden ook cateringservices." },
        "q2": { "question": "Bieden jullie catering aan?", "shortAnswer": "Ja, wij bieden een professionele catering- en evenementenservice voor bruiloften en bedrijfsfeesten tot 120 personen." },
        "q3": { "question": "Wat zijn de openingstijden?", "shortAnswer": "Wij zijn geopend van dinsdag tot en met zondag. De lunch wordt geserveerd van 11:30 tot 14:30 uur en het diner van 17:30 tot 22:30 uur. Op maandag gesloten, behalve op feestdagen." },
        "q4": { "question": "Hebben jullie vegetarische gerechten?", "shortAnswer": "Ja, we bieden een ruime keuze aan vegetarische, mediterrane gerechten die dagelijks vers worden bereid." },
        "q5": { "question": "Waar vind ik de menukaart?", "shortAnswer": "De menukaart vindt u direct op onze website, inclusief onze specialiteiten en het dagelijks wisselende tweegangenmenu." }
      }
    },
    pt: {
      "title": "Perguntas Frequentes",
      "items": {
        "q1": { "question": "O que são as Lindener Ratsstuben?", "shortAnswer": "É um restaurante tradicional em Linden especializado em autêntica cozinha germano-italiana e mediterrânea, que também oferece serviços de catering." },
        "q2": { "question": "Oferecem serviço de catering?", "shortAnswer": "Sim, oferecemos um serviço profissional de catering para eventos, casamentos e festas de empresas para até 120 pessoas." },
        "q3": { "question": "Quais são os horários de funcionamento?", "shortAnswer": "Estamos abertos de terça a domingo. O almoço é servido das 11h30 às 14h30 e o jantar das 17h30 às 22h30. Fechado às segundas-feiras, exceto feriados." },
        "q4": { "question": "Têm pratos vegetarianos?", "shortAnswer": "Sim, oferecemos uma ampla seleção de pratos vegetarianos de inspiração mediterrânea e italiana." },
        "q5": { "question": "Onde posso encontrar o menu?", "shortAnswer": "O menu está disponível no nosso site, onde encontrará especialidades germano-italianas, opções vegetarianas e um menu diário." }
      }
    },
    da: {
      "title": "Ofte Stillede Spørgsmål",
      "items": {
        "q1": { "question": "Hvad er Lindener Ratsstuben?", "shortAnswer": "Lindener Ratsstuben er en traditionel restaurant i Linden med speciale i autentisk tysk-italiensk og middelhavsmad, der også tilbyder catering." },
        "q2": { "question": "Tilbyder I catering?", "shortAnswer": "Ja, vi tilbyder professionel catering og eventservice til bryllupper og firmafester for op til 120 personer." },
        "q3": { "question": "Hvad er åbningstiderne?", "shortAnswer": "Vi har åbent fra tirsdag til søndag. Frokost serveres fra 11:30 til 14:30 og middag fra 17:30 til 22:30. Lukket om mandagen, undtagen helligdage." },
        "q4": { "question": "Har I vegetariske retter?", "shortAnswer": "Ja, vi tilbyder et stort udvalg af vegetariske retter, frisk tilberedt med middelhavsinspiration." },
        "q5": { "question": "Hvor finder jeg menukortet?", "shortAnswer": "Du kan finde vores menukort direkte på vores hjemmeside med vores tysk-italienske specialiteter og dagens menu." }
      }
    },
    sv: {
      "title": "Vanliga Frågor",
      "items": {
        "q1": { "question": "Vad är Lindener Ratsstuben?", "shortAnswer": "Det är en traditionell restaurang i Linden som specialiserar sig på äkta tysk-italiensk och medelhavsmat, och som även erbjuder catering." },
        "q2": { "question": "Erbjuder ni catering?", "shortAnswer": "Ja, vi erbjuder professionell catering för evenemang, bröllop och företagsfester för upp till 120 personer." },
        "q3": { "question": "Vilka är era öppettider?", "shortAnswer": "Vi har öppet tisdag till söndag. Lunch serveras 11:30 till 14:30 och middag 17:30 till 22:30. Stängt på måndagar, utom helgdagar." },
        "q4": { "question": "Har ni vegetariska alternativ?", "shortAnswer": "Ja, vi erbjuder ett brett utbud av fräscha vegetariska rätter med medelhavskänsla." },
        "q5": { "question": "Var hittar jag menyn?", "shortAnswer": "Menyn finns på vår hemsida, inklusive tysk-italienska specialiteter och vår dagliga tvårättersmeny." }
      }
    },
    no: {
      "title": "Ofte Stilte Spørsmål",
      "items": {
        "q1": { "question": "Hva er Lindener Ratsstuben?", "shortAnswer": "Det er en tradisjonsrik restaurant i Linden som spesialiserer seg på tysk-italiensk og middelhavsmat, og som også tilbyr catering." },
        "q2": { "question": "Tilbyr dere catering?", "shortAnswer": "Ja, vi tilbyr profesjonell catering og eventtjenester for opptil 120 personer til bryllup og firmafester." },
        "q3": { "question": "Hva er åpningstidene?", "shortAnswer": "Vi har åpent fra tirsdag til søndag. Lunsj serveres fra 11:30 til 14:30 og middag fra 17:30 til 22:30. Stengt mandager, unntatt helligdager." },
        "q4": { "question": "Har dere vegetarretter?", "shortAnswer": "Ja, vi tilbyr et bredt utvalg av vegetariske retter med inspirasjon fra middelhavet." },
        "q5": { "question": "Hvor finner jeg menyen?", "shortAnswer": "Menyen vår ligger på nettsiden og inkluderer tysk-italienske spesialiteter og en daglig to-retters meny." }
      }
    },
    fi: {
      "title": "Usein Kysytyt Kysymykset",
      "items": {
        "q1": { "question": "Mikä on Lindener Ratsstuben?", "shortAnswer": "Lindener Ratsstuben on perinteinen ravintola Lindenissä, joka on erikoistunut saksalais-italialaiseen ja välimerelliseen keittiöön. Tarjoamme myös pitopalvelua." },
        "q2": { "question": "Tarjoatteko pitopalvelua (catering)?", "shortAnswer": "Kyllä, tarjoamme ammattitaitoista pitopalvelua jopa 120 hengen häihin ja yritysjuhliin." },
        "q3": { "question": "Mitkä ovat aukioloaikanne?", "shortAnswer": "Olemme avoinna tiistaista sunnuntaihin. Lounas tarjoillaan klo 11.30-14.30 ja illallinen klo 17.30-22.30. Maanantaisin suljettu, paitsi pyhäpäivinä." },
        "q4": { "question": "Onko teillä kasvisruokia?", "shortAnswer": "Kyllä, meillä on laaja valikoima tuoreita välimerellisiä kasvisruokia." },
        "q5": { "question": "Mistä löydän ruokalistan?", "shortAnswer": "Ruokalistamme löytyy suoraan verkkosivuiltamme, mukaan lukien saksalais-italialaiset erikoisuudet ja päivittäinen lounasmenu." }
      }
    }
  },
  pages_kegelbahn: {
    fr: {
      "kegelbahn.hero.title": "Piste de Quilles Exclusive",
      "kegelbahn.hero.subtitle": "Plaisir sportif et délices culinaires dans une atmosphère privée.",
      "kegelbahn.features.lanes.title": "3 Pistes",
      "kegelbahn.features.lanes.desc": "Pistes de quilles modernes pour les groupes et les fêtes.",
      "kegelbahn.features.dining.title": "3 Espaces de Restauration",
      "kegelbahn.features.dining.desc": "Espaces intégrés directement sur les pistes pour un plaisir ininterrompu.",
      "kegelbahn.cta.book": "Réserver une Piste",
      "kegelbahn.pricing.title": "Tarifs & Prix",
      "kegelbahn.pricing.hourly": "Tarif Horaire",
      "kegelbahn.pricing.hourly_desc": "Par piste et par heure. Idéal pour les petits groupes.",
      "kegelbahn.pricing.hourly_price": "15,00 €",
      "kegelbahn.pricing.shoes": "Location de Chaussures",
      "kegelbahn.pricing.shoes_desc": "Frais de location par personne pour les chaussures professionnelles.",
      "kegelbahn.pricing.shoes_price": "2,50 €",
      "kegelbahn.pricing.package": "Forfait Événement Classic",
      "kegelbahn.pricing.package_desc": "3 heures de location incluant un verre de bienvenue pour jusqu'à 10 personnes.",
      "kegelbahn.pricing.package_price": "89,00 €",
      "kegelbahn.catering.title": "Restauration sur Piste",
      "kegelbahn.catering.snacks": "Compositions de Snacks",
      "kegelbahn.catering.snacks_desc": "Amuse-bouches et entrées méditerranéennes servis directement à votre piste.",
      "kegelbahn.catering.drinks": "Forfaits Boissons",
      "kegelbahn.catering.drinks_desc": "Rafraîchissements, bière pression et forfaits vin exclusifs.",
      "kegelbahn.rules.title": "Étiquette & Règles",
      "kegelbahn.rules.r1_title": "Chaussures de Sport",
      "kegelbahn.rules.r1_desc": "L'accès à l'installation n'est autorisé qu'avec des chaussures de sport d'intérieur propres.",
      "kegelbahn.rules.r2_title": "Ponctualité",
      "kegelbahn.rules.r2_desc": "Les réservations seront annulées après 15 minutes de retard.",
      "kegelbahn.rules.r3_title": "Utilisation des Pistes",
      "kegelbahn.rules.r3_desc": "Il est strictement interdit de marcher sur les pistes pour des raisons de sécurité.",
      "kegelbahn.faq.title": "Questions Fréquentes",
      "kegelbahn.faq.q1": "Combien de personnes par piste ?",
      "kegelbahn.faq.a1": "Nous recommandons un maximum de 8 à 10 personnes par piste.",
      "kegelbahn.faq.q2": "Peut-on apporter ses propres boissons ?",
      "kegelbahn.faq.a2": "Non, il est interdit de consommer ses propres boissons ou aliments. Notre service vous servira directement à la piste.",
      "kegelbahn.faq.q3": "La piste est-elle adaptée aux anniversaires d'enfants ?",
      "kegelbahn.faq.a3": "Absolument ! Nous proposons des menus spéciaux pour les jeunes invités sur demande préalable."
    },
    es: {
      "kegelbahn.hero.title": "Pista de Bolos Exclusiva",
      "kegelbahn.hero.subtitle": "Diversión deportiva y delicias culinarias en un ambiente privado.",
      "kegelbahn.features.lanes.title": "3 Pistas",
      "kegelbahn.features.lanes.desc": "Pistas modernas para grupos y celebraciones.",
      "kegelbahn.features.dining.title": "3 Áreas de Comedor",
      "kegelbahn.features.dining.desc": "Comedores integrados directamente en las pistas.",
      "kegelbahn.cta.book": "Reservar una pista",
      "kegelbahn.pricing.title": "Tarifas y Precios",
      "kegelbahn.pricing.hourly": "Tarifa por hora",
      "kegelbahn.pricing.hourly_desc": "Por pista y hora. Ideal para grupos pequeños.",
      "kegelbahn.pricing.hourly_price": "15,00 €",
      "kegelbahn.pricing.shoes": "Alquiler de zapatos",
      "kegelbahn.pricing.shoes_desc": "Por persona para zapatos profesionales.",
      "kegelbahn.pricing.shoes_price": "2,50 €",
      "kegelbahn.pricing.package": "Paquete de Evento Classic",
      "kegelbahn.pricing.package_desc": "3 horas de alquiler con bebida de bienvenida para hasta 10 personas.",
      "kegelbahn.pricing.package_price": "89,00 €",
      "kegelbahn.catering.title": "Catering en la pista",
      "kegelbahn.catering.snacks": "Snacks",
      "kegelbahn.catering.snacks_desc": "Fingerfood y entrantes mediterráneos servidos en su pista.",
      "kegelbahn.catering.drinks": "Bebidas",
      "kegelbahn.catering.drinks_desc": "Refrescos, cerveza de barril y paquetes de vino exclusivos.",
      "kegelbahn.rules.title": "Reglas de etiqueta",
      "kegelbahn.rules.r1_title": "Zapatos de deporte",
      "kegelbahn.rules.r1_desc": "Solo se permite el acceso con zapatos de interior limpios.",
      "kegelbahn.rules.r2_title": "Puntualidad",
      "kegelbahn.rules.r2_desc": "Las reservas se liberarán después de 15 minutos de retraso.",
      "kegelbahn.rules.r3_title": "Uso de las pistas",
      "kegelbahn.rules.r3_desc": "Queda terminantemente prohibido pisar las superficies de juego por seguridad.",
      "kegelbahn.faq.title": "Preguntas frecuentes",
      "kegelbahn.faq.q1": "¿Cuántas personas caben en una pista?",
      "kegelbahn.faq.a1": "Recomendamos un máximo de 8 a 10 personas por pista.",
      "kegelbahn.faq.q2": "¿Se pueden traer bebidas propias?",
      "kegelbahn.faq.a2": "No está permitido consumir alimentos o bebidas propios. Nuestro servicio le atenderá en la pista.",
      "kegelbahn.faq.q3": "¿Es adecuado para cumpleaños infantiles?",
      "kegelbahn.faq.a3": "¡Totalmente! Ofrecemos opciones especiales para niños bajo petición."
    },
    it: {
      "kegelbahn.hero.title": "Pista da Bowling Esclusiva",
      "kegelbahn.hero.subtitle": "Divertimento sportivo e delizie culinarie in un'atmosfera privata.",
      "kegelbahn.features.lanes.title": "3 Piste",
      "kegelbahn.features.lanes.desc": "Piste moderne per gruppi e feste.",
      "kegelbahn.features.dining.title": "3 Aree Ristoro",
      "kegelbahn.features.dining.desc": "Aree pranzo integrate direttamente alle piste.",
      "kegelbahn.cta.book": "Prenota una pista",
      "kegelbahn.pricing.title": "Tariffe & Prezzi",
      "kegelbahn.pricing.hourly": "Tariffa oraria",
      "kegelbahn.pricing.hourly_desc": "Per pista all'ora. Ideale per piccoli gruppi.",
      "kegelbahn.pricing.hourly_price": "15,00 €",
      "kegelbahn.pricing.shoes": "Noleggio scarpe",
      "kegelbahn.pricing.shoes_desc": "Quota a persona per scarpe professionali.",
      "kegelbahn.pricing.shoes_price": "2,50 €",
      "kegelbahn.pricing.package": "Pacchetto Evento Classic",
      "kegelbahn.pricing.package_desc": "3 ore di pista con drink di benvenuto per un massimo di 10 persone.",
      "kegelbahn.pricing.package_price": "89,00 €",
      "kegelbahn.catering.title": "Catering sulla Pista",
      "kegelbahn.catering.snacks": "Snack",
      "kegelbahn.catering.snacks_desc": "Stuzzichini e antipasti mediterranei serviti direttamente alla pista.",
      "kegelbahn.catering.drinks": "Bevande",
      "kegelbahn.catering.drinks_desc": "Rinfreschi, birra alla spina e pacchetti vino esclusivi.",
      "kegelbahn.rules.title": "Regole",
      "kegelbahn.rules.r1_title": "Scarpe da ginnastica",
      "kegelbahn.rules.r1_desc": "L'ingresso è consentito solo con scarpe da interno pulite.",
      "kegelbahn.rules.r2_title": "Puntualità",
      "kegelbahn.rules.r2_desc": "Le prenotazioni vengono cancellate dopo 15 minuti di ritardo.",
      "kegelbahn.rules.r3_title": "Uso delle Piste",
      "kegelbahn.rules.r3_desc": "È severamente vietato camminare sulle piste per motivi di sicurezza.",
      "kegelbahn.faq.title": "Domande Frequenti",
      "kegelbahn.faq.q1": "Quante persone per pista?",
      "kegelbahn.faq.a1": "Consigliamo un massimo di 8-10 persone per pista.",
      "kegelbahn.faq.q2": "Si possono portare bevande proprie?",
      "kegelbahn.faq.a2": "Il consumo di cibi e bevande propri non è consentito. Vi serviremo direttamente alla pista.",
      "kegelbahn.faq.q3": "È adatto per compleanni per bambini?",
      "kegelbahn.faq.a3": "Assolutamente! Offriamo opzioni speciali per i più piccoli su richiesta."
    },
    nl: {
      "kegelbahn.hero.title": "Exclusieve Kegelbaan",
      "kegelbahn.hero.subtitle": "Sportief plezier en culinair genieten in een privésfeer.",
      "kegelbahn.features.lanes.title": "3 Banen",
      "kegelbahn.features.lanes.desc": "Moderne kegelbanen voor groepen en feesten.",
      "kegelbahn.features.dining.title": "3 Eetruimtes",
      "kegelbahn.features.dining.desc": "Eetruimtes direct aan de banen voor ongestoord genot.",
      "kegelbahn.cta.book": "Reserveer een baan",
      "kegelbahn.pricing.title": "Tarieven & Prijzen",
      "kegelbahn.pricing.hourly": "Uurtarief",
      "kegelbahn.pricing.hourly_desc": "Per baan en per uur. Ideaal voor kleine groepen.",
      "kegelbahn.pricing.hourly_price": "15,00 €",
      "kegelbahn.pricing.shoes": "Schoenverhuur",
      "kegelbahn.pricing.shoes_desc": "Per persoon voor professionele kegelschoenen.",
      "kegelbahn.pricing.shoes_price": "2,50 €",
      "kegelbahn.pricing.package": "Evenementenpakket Classic",
      "kegelbahn.pricing.package_desc": "3 uur baanhuur inclusief welkomstdrankje voor maximaal 10 personen.",
      "kegelbahn.pricing.package_price": "89,00 €",
      "kegelbahn.catering.title": "Catering op de Baan",
      "kegelbahn.catering.snacks": "Snacks",
      "kegelbahn.catering.snacks_desc": "Fingerfood en mediterrane voorgerechten direct aan uw baan geserveerd.",
      "kegelbahn.catering.drinks": "Dranken",
      "kegelbahn.catering.drinks_desc": "Verfrissingen, tapbier en exclusieve wijnpakketten.",
      "kegelbahn.rules.title": "Etiquette & Regels",
      "kegelbahn.rules.r1_title": "Sportschoenen",
      "kegelbahn.rules.r1_desc": "Toegang tot de faciliteit is uitsluitend toegestaan in schone binnensportschoenen.",
      "kegelbahn.rules.r2_title": "Piptualiteit",
      "kegelbahn.rules.r2_desc": "Reserveringen worden na 15 minuten vertraging geannuleerd.",
      "kegelbahn.rules.r3_title": "Baangebruik",
      "kegelbahn.rules.r3_desc": "Het betreden van de speelvlakken is om veiligheidsredenen ten strengste verboden.",
      "kegelbahn.faq.title": "Veelgestelde Vragen",
      "kegelbahn.faq.q1": "Hoeveel personen passen er op een baan?",
      "kegelbahn.faq.a1": "Wij raden maximaal 8-10 personen per baan aan.",
      "kegelbahn.faq.q2": "Mogen we eigen dranken meenemen?",
      "kegelbahn.faq.a2": "Nee, de consumptie van meegebrachte etenswaren of dranken is niet toegestaan. Wij bedienen u graag aan de baan.",
      "kegelbahn.faq.q3": "Is het geschikt voor kinderfeestjes?",
      "kegelbahn.faq.a3": "Absoluut! We bieden speciale menu's voor jongere gasten op aanvraag."
    },
    pt: {
      "kegelbahn.hero.title": "Pista de Boliche Exclusiva",
      "kegelbahn.hero.subtitle": "Diversão esportiva e delícias culinárias em um ambiente privado.",
      "kegelbahn.features.lanes.title": "3 Pistas",
      "kegelbahn.features.lanes.desc": "Pistas modernas para grupos e celebrações.",
      "kegelbahn.features.dining.title": "3 Áreas de Refeição",
      "kegelbahn.features.dining.desc": "Áreas integradas nas pistas para um prazer sem interrupções.",
      "kegelbahn.cta.book": "Reservar uma pista",
      "kegelbahn.pricing.title": "Tarifas e Preços",
      "kegelbahn.pricing.hourly": "Tarifa por hora",
      "kegelbahn.pricing.hourly_desc": "Por pista e por hora. Ideal para grupos pequenos.",
      "kegelbahn.pricing.hourly_price": "15,00 €",
      "kegelbahn.pricing.shoes": "Aluguel de sapatos",
      "kegelbahn.pricing.shoes_desc": "Taxa por pessoa para sapatos profissionais.",
      "kegelbahn.pricing.shoes_price": "2,50 €",
      "kegelbahn.pricing.package": "Pacote de Evento Classic",
      "kegelbahn.pricing.package_desc": "3 horas de pista com bebida de boas-vindas para até 10 pessoas.",
      "kegelbahn.pricing.package_price": "89,00 €",
      "kegelbahn.catering.title": "Catering na Pista",
      "kegelbahn.catering.snacks": "Snacks",
      "kegelbahn.catering.snacks_desc": "Petiscos e entradas mediterrânicas servidas diretamente na pista.",
      "kegelbahn.catering.drinks": "Bebidas",
      "kegelbahn.catering.drinks_desc": "Refrescos, cerveja à pressão e pacotes de vinho exclusivos.",
      "kegelbahn.rules.title": "Etiqueta e Regras",
      "kegelbahn.rules.r1_title": "Sapatos Desportivos",
      "kegelbahn.rules.r1_desc": "O acesso só é permitido com sapatos de desporto limpos para interior.",
      "kegelbahn.rules.r2_title": "Pontualidade",
      "kegelbahn.rules.r2_desc": "As reservas são canceladas após 15 minutos de atraso.",
      "kegelbahn.rules.r3_title": "Uso da Pista",
      "kegelbahn.rules.r3_desc": "É estritamente proibido pisar nas superfícies de jogo por razões de segurança.",
      "kegelbahn.faq.title": "Perguntas Frequentes",
      "kegelbahn.faq.q1": "Quantas pessoas por pista?",
      "kegelbahn.faq.a1": "Recomendamos um máximo de 8 a 10 pessoas por pista.",
      "kegelbahn.faq.q2": "Podemos trazer bebidas próprias?",
      "kegelbahn.faq.a2": "Não é permitido o consumo de bebidas ou alimentos próprios. Nós servimos diretamente na pista.",
      "kegelbahn.faq.q3": "É adequado para aniversários de crianças?",
      "kegelbahn.faq.a3": "Com certeza! Oferecemos opções especiais para os mais pequenos sob pedido prévio."
    },
    da: {
      "kegelbahn.hero.title": "Eksklusiv Keglebane",
      "kegelbahn.hero.subtitle": "Sportslig sjov og kulinarisk nydelse i en privat atmosfære.",
      "kegelbahn.features.lanes.title": "3 Baner",
      "kegelbahn.features.lanes.desc": "Moderne keglebaner til grupper og fester.",
      "kegelbahn.features.dining.title": "3 Spiseområder",
      "kegelbahn.features.dining.desc": "Spiseområder integreret direkte ved banerne.",
      "kegelbahn.cta.book": "Reserver en bane",
      "kegelbahn.pricing.title": "Priser & Takster",
      "kegelbahn.pricing.hourly": "Timepris",
      "kegelbahn.pricing.hourly_desc": "Pr. bane pr. time. Ideel til små grupper.",
      "kegelbahn.pricing.hourly_price": "15,00 €",
      "kegelbahn.pricing.shoes": "Skoleje",
      "kegelbahn.pricing.shoes_desc": "Pris pr. person for professionelle keglesko.",
      "kegelbahn.pricing.shoes_price": "2,50 €",
      "kegelbahn.pricing.package": "Event-Pakke Classic",
      "kegelbahn.pricing.package_desc": "3 timers baneleje inklusiv velkomstdrink for op til 10 personer.",
      "kegelbahn.pricing.package_price": "89,00 €",
      "kegelbahn.catering.title": "Forplejning på banen",
      "kegelbahn.catering.snacks": "Snacks",
      "kegelbahn.catering.snacks_desc": "Fingermad og forretter serveret direkte på din bane.",
      "kegelbahn.catering.drinks": "Drikkevarer",
      "kegelbahn.catering.drinks_desc": "Forfriskninger, fadøl og eksklusive vinpakker.",
      "kegelbahn.rules.title": "Regler & Etikette",
      "kegelbahn.rules.r1_title": "Sportssko",
      "kegelbahn.rules.r1_desc": "Det er kun tilladt at bruge rene indendørs sportssko.",
      "kegelbahn.rules.r2_title": "Punktlighed",
      "kegelbahn.rules.r2_desc": "Reservationer frigives ved 15 minutters forsinkelse.",
      "kegelbahn.rules.r3_title": "Banebrug",
      "kegelbahn.rules.r3_desc": "Det er strengt forbudt at betræde selve spillefladen af sikkerhedsmæssige årsager.",
      "kegelbahn.faq.title": "Ofte Stillede Spørgsmål",
      "kegelbahn.faq.q1": "Hvor mange personer pr. bane?",
      "kegelbahn.faq.a1": "Vi anbefaler maksimalt 8-10 personer pr. bane.",
      "kegelbahn.faq.q2": "Må man medbringe egne drikkevarer?",
      "kegelbahn.faq.a2": "Nej, egne mad- og drikkevarer er ikke tilladt. Vi serverer gerne for jer ved banen.",
      "kegelbahn.faq.q3": "Er det egnet til børnefødselsdage?",
      "kegelbahn.faq.a3": "Absolut! Vi tilbyder specielle menuer til børn efter aftale."
    },
    sv: {
      "kegelbahn.hero.title": "Exklusiv Kägelbana",
      "kegelbahn.hero.subtitle": "Sportsligt nöje och kulinariska upplevelser i en privat atmosfär.",
      "kegelbahn.features.lanes.title": "3 Banor",
      "kegelbahn.features.lanes.desc": "Moderna kägelbanor för grupper och fester.",
      "kegelbahn.features.dining.title": "3 Matplatser",
      "kegelbahn.features.dining.desc": "Matplatser integrerade direkt vid banorna.",
      "kegelbahn.cta.book": "Boka en bana",
      "kegelbahn.pricing.title": "Priser",
      "kegelbahn.pricing.hourly": "Timpris",
      "kegelbahn.pricing.hourly_desc": "Per bana och timme. Perfekt för små grupper.",
      "kegelbahn.pricing.hourly_price": "15,00 €",
      "kegelbahn.pricing.shoes": "Skohyra",
      "kegelbahn.pricing.shoes_desc": "Pris per person för professionella skor.",
      "kegelbahn.pricing.shoes_price": "2,50 €",
      "kegelbahn.pricing.package": "Event-Paket Classic",
      "kegelbahn.pricing.package_desc": "3 timmars banhyra inklusive välkomstdrink för upp till 10 personer.",
      "kegelbahn.pricing.package_price": "89,00 €",
      "kegelbahn.catering.title": "Servering vid banan",
      "kegelbahn.catering.snacks": "Snacks",
      "kegelbahn.catering.snacks_desc": "Plockmat och förrätter serveras direkt vid er bana.",
      "kegelbahn.catering.drinks": "Drycker",
      "kegelbahn.catering.drinks_desc": "Förfriskningar, fatöl och exklusiva vinpaket.",
      "kegelbahn.rules.title": "Regler & Etikett",
      "kegelbahn.rules.r1_title": "Sportskor",
      "kegelbahn.rules.r1_desc": "Endast rena inomhusskor är tillåtna.",
      "kegelbahn.rules.r2_title": "Punktlighet",
      "kegelbahn.rules.r2_desc": "Reservationer släpps efter 15 minuters försening.",
      "kegelbahn.rules.r3_title": "Banansvändning",
      "kegelbahn.rules.r3_desc": "Av säkerhetsskäl är det strängt förbjudet att beträda själva spelytan.",
      "kegelbahn.faq.title": "Vanliga Frågor",
      "kegelbahn.faq.q1": "Hur många personer per bana?",
      "kegelbahn.faq.a1": "Vi rekommenderar max 8-10 personer per bana.",
      "kegelbahn.faq.q2": "Får man ta med egen dryck?",
      "kegelbahn.faq.a2": "Nej, medhavd mat och dryck är inte tillåten. Vi serverar er gärna vid banan.",
      "kegelbahn.faq.q3": "Passar det för barnkalas?",
      "kegelbahn.faq.a3": "Absolut! Vi erbjuder speciella barnmenyer enligt överenskommelse."
    },
    no: {
      "kegelbahn.hero.title": "Eksklusiv Keglebane",
      "kegelbahn.hero.subtitle": "Sportslig moro og kulinarisk nytelse i en privat atmosfære.",
      "kegelbahn.features.lanes.title": "3 Baner",
      "kegelbahn.features.lanes.desc": "Moderne baner for grupper og selskaper.",
      "kegelbahn.features.dining.title": "3 Spiseområder",
      "kegelbahn.features.dining.desc": "Spiseområder integrert direkte ved banene.",
      "kegelbahn.cta.book": "Reserver en bane",
      "kegelbahn.pricing.title": "Priser",
      "kegelbahn.pricing.hourly": "Timepris",
      "kegelbahn.pricing.hourly_desc": "Per bane og time. Ideelt for små grupper.",
      "kegelbahn.pricing.hourly_price": "15,00 €",
      "kegelbahn.pricing.shoes": "Skoleie",
      "kegelbahn.pricing.shoes_desc": "Pris per person for profesjonelle sko.",
      "kegelbahn.pricing.shoes_price": "2,50 €",
      "kegelbahn.pricing.package": "Event-Pakke Classic",
      "kegelbahn.pricing.package_desc": "3 timers baneleie inkludert velkomstdrink for inntil 10 personer.",
      "kegelbahn.pricing.package_price": "89,00 €",
      "kegelbahn.catering.title": "Servering ved banen",
      "kegelbahn.catering.snacks": "Snacks",
      "kegelbahn.catering.snacks_desc": "Fingermat og forretter serveres direkte ved banen.",
      "kegelbahn.catering.drinks": "Drikke",
      "kegelbahn.catering.drinks_desc": "Forfriskninger, fatøl og eksklusive vinpakker.",
      "kegelbahn.rules.title": "Regler & Etikette",
      "kegelbahn.rules.r1_title": "Sportssko",
      "kegelbahn.rules.r1_desc": "Kun rene innendørs sportssko er tillatt.",
      "kegelbahn.rules.r2_title": "Punktlighet",
      "kegelbahn.rules.r2_desc": "Reservasjoner frigis ved 15 minutters forsinkelse.",
      "kegelbahn.rules.r3_title": "Banebruk",
      "kegelbahn.rules.r3_desc": "Av sikkerhetsgrunner er det strengt forbudt å tråkke på selve spilleflaten.",
      "kegelbahn.faq.title": "Ofte Stilte Spørsmål",
      "kegelbahn.faq.q1": "Hvor mange personer per bane?",
      "kegelbahn.faq.a1": "Vi anbefaler maks 8-10 personer per bane.",
      "kegelbahn.faq.q2": "Kan man ta med egen drikke?",
      "kegelbahn.faq.a2": "Nei, medbrakt mat og drikke er ikke tillatt. Vi serverer dere gjerne ved banen.",
      "kegelbahn.faq.q3": "Passer det for barnebursdager?",
      "kegelbahn.faq.a3": "Absolutt! Vi tilbyr spesielle menyer for barn etter avtale."
    },
    fi: {
      "kegelbahn.hero.title": "Eksklusiivinen Keilarata",
      "kegelbahn.hero.subtitle": "Urheilullista hauskaa ja kulinaarisia nautintoja yksityisessä ympäristössä.",
      "kegelbahn.features.lanes.title": "3 Rataa",
      "kegelbahn.features.lanes.desc": "Modernit radat ryhmille ja juhliin.",
      "kegelbahn.features.dining.title": "3 Ruokailualuetta",
      "kegelbahn.features.dining.desc": "Ruokailualueet integroitu suoraan ratojen yhteyteen.",
      "kegelbahn.cta.book": "Varaa rata",
      "kegelbahn.pricing.title": "Hinnasto",
      "kegelbahn.pricing.hourly": "Tuntihinta",
      "kegelbahn.pricing.hourly_desc": "Rataa ja tuntia kohden. Ihanteellinen pienille ryhmille.",
      "kegelbahn.pricing.hourly_price": "15,00 €",
      "kegelbahn.pricing.shoes": "Kenkävuokra",
      "kegelbahn.pricing.shoes_desc": "Hinta per henkilö ammattilaiskengistä.",
      "kegelbahn.pricing.shoes_price": "2,50 €",
      "kegelbahn.pricing.package": "Tapahtumapaketti Classic",
      "kegelbahn.pricing.package_desc": "3 tunnin ratavuokra sisältäen alkumaljan enintään 10 hengelle.",
      "kegelbahn.pricing.package_price": "89,00 €",
      "kegelbahn.catering.title": "Tarjoilu radalla",
      "kegelbahn.catering.snacks": "Snacks",
      "kegelbahn.catering.snacks_desc": "Sormisyötävää ja alkupaloja tarjoiltuna suoraan radalle.",
      "kegelbahn.catering.drinks": "Juomat",
      "kegelbahn.catering.drinks_desc": "Virkokkeita, hanaolutta ja eksklusiivisia viinipaketteja.",
      "kegelbahn.rules.title": "Säännöt & Etiketti",
      "kegelbahn.rules.r1_title": "Urheilukengät",
      "kegelbahn.rules.r1_desc": "Vain puhtaat sisäpelikengät ovat sallittuja.",
      "kegelbahn.rules.r2_title": "Täsmällisyys",
      "kegelbahn.rules.r2_desc": "Varaukset raukeavat 15 minuutin myöhästymisen jälkeen.",
      "kegelbahn.rules.r3_title": "Radan käyttö",
      "kegelbahn.rules.r3_desc": "Turvallisuussyistä itse pelipinnalle astuminen on ehdottomasti kielletty.",
      "kegelbahn.faq.title": "Usein Kysytyt Kysymykset",
      "kegelbahn.faq.q1": "Kuinka monta henkilöä per rata?",
      "kegelbahn.faq.a1": "Suosittelemme enintään 8-10 henkilöä rataa kohden.",
      "kegelbahn.faq.q2": "Saako omia juomia tuoda?",
      "kegelbahn.faq.a2": "Ei, omien ruokien ja juomien nauttiminen ei ole sallittua. Tarjoilemme teille mielellämme radalla.",
      "kegelbahn.faq.q3": "Sopiiko paikka lasten syntymäpäiville?",
      "kegelbahn.faq.a3": "Ehdottomasti! Tarjoamme erikoismenuja lapsille sopimuksen mukaan."
    }
  }
};

for (const lang of phase2) {
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
