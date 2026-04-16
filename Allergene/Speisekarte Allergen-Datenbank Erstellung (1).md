# **Digitale Transformation und Strukturierung von Allergen-Daten in der Systemgastronomie: Architektur, Datenmodellierung und rechtssichere Implementierung**

Die digitale Transformation des Gastgewerbes hat in den vergangenen Jahren eine erhebliche Beschleunigung erfahren, wobei die Überführung unstrukturierter analoger Speisekarten in maschinenlesbare, hochgradig strukturierte Datenformate eine der zentralen Herausforderungen in der Entwicklung moderner Gastronomie-Software darstellt. In der Rolle von Data Engineers und Web-Developern stehen wir vor der komplexen Aufgabe, juristische Vorgaben, lebensmittelchemische Besonderheiten und informationstechnologische Architekturprinzipien in einem kohärenten System zu vereinen. Die Kernherausforderung liegt dabei in der korrekten Abbildung und Verarbeitung von Allergen-Informationen gemäß den strengen Vorgaben der europäischen Gesetzgebung.1

Die Lebensmittelinformationsverordnung (LMIV) – Verordnung (EU) Nr. 1169/2011 – bildet hierbei das absolute rechtliche Fundament.3 Sie schreibt zwingend vor, dass Verbraucher über das Vorhandensein von 14 spezifischen Hauptallergenen informiert werden müssen, unabhängig davon, ob es sich um vorverpackte oder lose abgegebene Lebensmittel handelt.5 Für die Datenarchitektur bedeutet dies, dass jedes Menüelement in einer relationalen oder dokumentenbasierten Datenbank zwingend mit den entsprechenden Allergen-Metadaten verknüpft sein muss. Fehlen diese Informationen, werden sie falsch zugeordnet oder durch fehlerhafte Backend-Prozesse überschrieben, drohen nicht nur empfindliche rechtliche Konsequenzen und Bußgelder für den Gastronomen, sondern auch schwerwiegende gesundheitliche Risiken für den Endverbraucher, die bis hin zum tödlichen anaphylaktischen Schock führen können.6

Eine semantisch korrekte Konvertierung von Allergen-Buchstaben, wie sie traditionell auf analogen Speisekarten verwendet werden, in vollständig strukturierte, API-fähige JSON-Objekte (JavaScript Object Notation) ist daher ein essenzieller und nicht verhandelbarer Schritt bei der Implementierung von E-Commerce-Lösungen, digitalen Bestellsystemen und Kassensystemen (POS) in der Gastronomie.7 Die vorliegende technische und architektonische Analyse beleuchtet die vollständige Systematik der 14 Hauptallergene, die Entwicklung eines standardisierten Mappings für den DACH-Raum, die tiefgreifenden technischen Spezifikationen für die Datenbank-Integration entlang der Supply Chain sowie die juristischen Anforderungen an die Kommunikation von Kreuzkontaminationen. Anhand der realen Speisekarte der „Ratsstuben“ wird ein konkretes, produktionsreifes JSON-Modell generiert, das als Referenzarchitektur für skalierbare Gastronomie-Software-Projekte dient.

## **Regulatorischer Rahmen und Compliance in der Softwareentwicklung**

Die Entwicklung von Software für den Gastronomiebereich erfordert ein tiefes Verständnis der zugrundeliegenden gesetzlichen Normen, da die Architektur der Datenbank und die Benutzeroberfläche direkt durch Verordnungen diktiert werden. Mit dem Inkrafttreten der Lebensmittelinformationsverordnung (LMIV) am 13\. Dezember 2014 wurde die Landschaft der Lebensmittelkennzeichnung in der Europäischen Union fundamental neu geordnet.1 Die Verordnung löste zahlreiche nationale Richtlinien ab und etablierte ein harmonisiertes System, das explizit auch die nicht vorverpackte Ware, sogenannte lose Ware, in Restaurants, Kantinen und bei Caterern einschließt.8

Ein zentrales Element dieser Verordnung ist die Pflicht zur Ausweisung der 14 wichtigsten Stoffe oder Erzeugnisse, die Allergien oder Unverträglichkeiten auslösen können.5 Für Entwickler von Kassensystemen und digitalen Speisekarten bedeutet dies, dass Informationspflichten nicht optional als Freitextfeld, sondern als zwingende, validierte Arrays oder relationale Verknüpfungen modelliert werden müssen. Die Gesetzgebung definiert zudem sehr spezifische Anforderungen an die Präsentation dieser Daten. Beispielsweise müssen Pflichtangaben auf gedruckten Derivaten der digitalen Speisekarte, die oftmals automatisiert über Print-CSS aus dem System generiert werden, in einer Mindestschriftgröße von 1,2 Millimetern, bezogen auf die x-Höhe der Kleinbuchstaben, gerendert werden.5 Solche typografischen Compliance-Vorgaben müssen in den Stylesheets der Web-Applikation hart codiert und bei der Generierung von PDF-Exporten validiert werden.

Das Gesetz unterscheidet zudem scharf zwischen der Kennzeichnung von Zutaten und sogenannten Verunreinigungen oder Kreuzkontaminationen. Die Informationspflicht nach LMIV greift ausschließlich für Zutaten und Verarbeitungshilfsstoffe, die absichtlich bei der Herstellung eines Lebensmittels verwendet werden und im Enderzeugnis vorhanden sind.10 Unbeabsichtigt eingetragene Spuren fallen rechtlich nicht unter die LMIV-Kennzeichnungspflicht, was bedeutet, dass ein Software-System klar zwischen einem "enthält"-Array und einem "kann Spuren enthalten von"-Array unterscheiden muss, um rechtlich präzise zu bleiben.12

Für international skalierende Software-as-a-Service (SaaS) Plattformen muss das Backend zudem geopolitische Veränderungen abbilden können. Ein prominentes Beispiel hierfür ist der Austritt des Vereinigten Königreichs aus der Europäischen Union. Während in Nordirland weiterhin die EU-Kennzeichnungsregeln gelten, unterliegt Großbritannien seit Oktober 2022 modifizierten nationalen Richtlinien, die im Routing und in der Lokalisierung (i18n) der Softwarearchitektur über regionsspezifische Feature-Flags abgebildet werden müssen.14

Die nationalen Durchführungsverordnungen, wie die Lebensmittelinformations-Durchführungsverordnung (LMIDV) in Deutschland, bieten zudem die Möglichkeit der mündlichen Auskunft.15 Diese ist jedoch an die zwingende Voraussetzung geknüpft, dass eine schriftliche Dokumentation – beispielsweise ein aus der Datenbank generiertes PDF oder ein Tablet-Interface – für den Gast und die Lebensmittelkontrollbehörden jederzeit leicht zugänglich ist.12 Die Software muss also in der Lage sein, auf Knopfdruck vollständige Allergen-Matrizen aller aktuell verfügbaren Gerichte zu exportieren.

## **Datenmodellierung und Semantisches Mapping der 14 Hauptallergene**

Um eine korrekte digitale Verarbeitung zu gewährleisten, muss zunächst das standardisierte Letter-Mapping verstanden und systemseitig in einer enumerierten Datenstruktur (Enum) oder einer Referenztabelle abgebildet werden. In Deutschland, Österreich und der Schweiz (DACH-Raum) hat sich für analoge und digitale Speisekarten ein quasi-standardisiertes Buchstabensystem von A bis N etabliert, das von Industrie- und Handelskammern (IHK) sowie dem Deutschen Hotel- und Gaststättenverband (DEHOGA) empfohlen wird.15

Bei der Entwicklung eines relationalen Datenmodells oder eines JSON-Schemas dient dieser alphabetische Code als primärer Schlüssel (key oder letter), um Front- und Back-End-Systeme nahtlos zu synchronisieren. Die nachfolgende, tiefgreifende Aufschlüsselung der 14 Allergene liefert den notwendigen fachlichen und lebensmittelchemischen Kontext, der bei der Schulung von NLP-Modellen (Natural Language Processing) für automatisierte Zutaten-Scanner oder bei der manuellen Datenkuration für Gastronomie-Software zwingend berücksichtigt werden muss.

### **A: Glutenhaltiges Getreide und daraus gewonnene Erzeugnisse**

Unter den Identifikator A fallen alle Getreidesorten, die das Klebereiweiß Gluten enthalten. Hierzu zählen namentlich Weizen (inklusive spezifischer Sorten wie Dinkel und Khorasan-Weizen), Roggen, Gerste, Hafer und Kamut sowie jegliche Hybridstämme aus diesen Sorten.17 In der gastronomischen Praxis und somit in der digitalen Datenpflege verbirgt sich Gluten keineswegs nur in offensichtlichen Backwaren. Auf der Speisekarte der Ratsstuben finden sich beispielsweise asiatische Dampfbrötchen (Bao Buns) oder knusprige Grissinis, die eindeutig Weizen enthalten.20 Darüber hinaus erfordern panierte Speisen wie das Schweineschnitzel oder die Chicken-Nuggets eine A-Kennzeichnung.22

Für die Datenmodellierung ist entscheidend, dass auch flüssige Erzeugnisse und Derivate abgebildet werden. Sojasaucen, die traditionell mit Weizen gebraut werden, Würzpasten, gebundene Saucen und insbesondere Bier (wie das angebotene Bitburger Pils oder Schneider Weissbier) enthalten Gluten und müssen entsprechend getaggt werden.23 Eine elaborierte Softwarearchitektur sollte hier Sub-Kategorien (z. B. A1 für Weizen, A2 für Roggen, A3 für Gerste, A4 für Hafer) unterstützen, da einige Allergiker selektiv auf bestimmte Getreidearten reagieren, auch wenn für klassische Zöliakie-Patienten der Überbegriff A oftmals als Filterkriterium ausreicht.17 Ausnahmen von der Deklarationspflicht, die im Backend als Exklusionsregeln definiert werden müssen, bilden vollständig raffinierte Glukosesirupe auf Weizenbasis, da diese durch den hochgradigen Verarbeitungsprozess ihr allergenes Potenzial verloren haben.13

### **B: Krebstiere und daraus gewonnene Erzeugnisse**

Die Kennzeichnung B umfasst marine und limnische Krebstiere wie Krabben, Garnelen, Scampi, Hummer und Langusten sowie sämtliche Erzeugnisse, die aus diesen Tieren gewonnen werden.4 In asiatischen oder mediterranen Gerichten verstecken sich Krebstier-Extrakte häufig in Würzpasten, Surimi oder als Bestandteil von asiatischen Krabbenchips.15 Bei der digitalen Speisekarten-Pflege muss das System bei der Anlage von Paella, Bouillabaisse oder asiatischen Currys automatisierte Warnhinweise an den Gastronomen generieren, um die Prüfung auf das Allergen B zu forcieren.

### **C: Eier und daraus gewonnene Erzeugnisse**

Dieser Buchstabe umfasst Eier von allen Nutzvogelarten (Huhn, Wachtel, Ente, Gans). Neben der offensichtlichen Präsenz in Frühstückseiern, Omeletts oder Spiegeleiern betrifft dies in der Systemgastronomie vor allem Mayonnaisen, Panaden, Eierteigwaren (Pasta) und feine Desserts wie Mousse au Chocolat oder Soufflés.15 Für eine Schnittstelle (API) zur Rezeptur-Verwaltung (Warenwirtschaft) bedeutet dies, dass eine rekursive Stücklistenauflösung (Bill of Materials) implementiert werden muss. Das System muss erkennen, dass das Allergen C von der Rohzutat „Mayonnaise“ automatisch auf die Zwischenkomponente „Burger-Sauce“ und schließlich auf das Endprodukt „Cheeseburger“ vererbt wird.

### **D: Fische und daraus gewonnene Erzeugnisse**

Alle Fischarten fallen ausnahmslos unter das Allergen D.4 Besondere Vorsicht ist bei verdeckten Zutaten in der Rezepturdatenbank geboten. Sardellenpasten, Anchovis, Kaviar, Worcestershiresauce oder asiatische Fischsaucen sind klassische Vektoren für versteckte Fischallergene.4 Auf der Speisekarte der Ratsstuben erfordert beispielsweise das Gericht „Sardinen in Olivenöl“ zwingend diesen Tag.21 Eine softwareseitige Ausnahme (Exception Handling) muss für Fischgelatine programmiert werden, wenn diese ausschließlich als Trägerstoff für Vitaminzubereitungen oder als Klärmittel in der Getränkeindustrie (z. B. bei Wein oder Bier) eingesetzt wird, da der Gesetzgeber diese spezifischen Anwendungen von der Deklarationspflicht befreit hat.26

### **E: Erdnüsse und daraus gewonnene Erzeugnisse**

Erdnüsse zählen zu den potentesten aller bekannten Lebensmittelallergene, die bereits in extrem geringen Mengen, oft im Mikrogrammbereich, schwere anaphylaktische Schocks auslösen können.6 Neben gerösteten Erdnüssen sind in der Datenbankpflege vor allem Erdnussöl, asiatische Saucen (wie Saté-Sauce), Brotaufstriche und Desserts als kritisch zu markieren.15

### **F: Sojabohnen und daraus gewonnene Erzeugnisse**

Soja ist ein omnipräsentes Allergen in der modernen Lebensmittelindustrie und findet sich in Form von Lecithin (oft in Schokolade), Sojaöl, Edamame, Tofu, Sojasauce und diversen Fleischersatzprodukten.15 Die klinische und biochemische Bedeutung der Sojaallergie in Zentraleuropa ist stark mit Kreuzreaktionen assoziiert. Etwa 10 Prozent der Birkenpollenallergiker entwickeln klinische Symptome nach dem Genuss unprozessierter oder geringgradig verarbeiteter Sojaprodukte.28

Auf molekularer Ebene basiert diese Kreuzreaktion auf der ausgeprägten Strukturähnlichkeit zwischen den sogenannten PR-Proteinen (Pathogenesis-Related Proteins) ![][image1] aus der Birke und ![][image2] aus der Sojabohne.28 Erhitzungsprozesse können das ![][image2]\-Protein zwar denaturieren und zerstören (beispielsweise durch 30-minütiges Kochen), in der Software-Logik zur Allergenkennzeichnung dürfen derartige chemisch-physikalische Prozesse jedoch unter keinen Umständen als Grundlage für eine automatische Allergen-Entfernung genutzt werden.28 Der Grund hierfür liegt in der Stabilität der Hauptspeicherproteine ![][image3] und ![][image4], die hitzestabil bleiben und ab Dosen von ca. ![][image5] Protein weiterhin lebensgefährliche allergische Reaktionen auslösen können.28 Ein vollumfänglich raffiniertes Sojabohnenöl oder \-fett bildet hingegen eine rechtliche Ausnahme und muss nicht deklariert werden, da die proteinhaltigen Bestandteile durch die Raffination restlos entfernt wurden.13

### **G: Milch und daraus gewonnene Erzeugnisse (einschließlich Laktose)**

Das Allergen G umfasst Milch von Säugetieren (Kuh, Schaf, Ziege, Büffel etc.) und sämtliche daraus gewonnene Produkte wie Käse, Joghurt, Quark, Sahne und Butter.15 Essenziell für die gastronomische Software-Entwicklung und das UI-Design ist die strikte Unterscheidung zwischen Laktoseintoleranz (einem rein metabolischen Enzymdefekt im Darm) und der echten Milcheiweißallergie (einer immunologischen Reaktion des Körpers).11

Softwareprodukte dürfen laktosefreie Milch niemals automatisiert als allergenfrei (G) klassifizieren. Zwar ist der Milchzucker (Laktose) in diesen Produkten enzymatisch gespalten, die allergenen Milcheiweiße (Casein, Molkenprotein) sind jedoch weiterhin in voller Konzentration enthalten und können lebensbedrohliche Reaktionen bei Milcheiweißallergikern auslösen.11 Ausnahmen von der Deklarationspflicht gelten lediglich für Molke, die zur Herstellung von landwirtschaftlichen Destillaten oder Ethylalkohol verwendet wird.26

### **H: Schalenfrüchte**

Die Gruppe der Schalenfrüchte, umgangssprachlich oft als Nüsse zusammengefasst, umfasst rechtlich explizit und abschließend Mandeln, Haselnüsse, Walnüsse, Kaschunüsse (Cashews), Pecannüsse, Paranüsse, Pistazien sowie Macadamia- bzw. Queenslandnüsse.16 Wichtig für das Data Engineering: Pinienkerne, Kokosnüsse oder Muskatnuss fallen botanisch und nach europäischem Recht nicht unter diese spezifische Kennzeichnungspflicht für Schalenfrüchte.

In einem digitalen Datenbankmodell muss der Code H oftmals als Array der spezifischen Untergruppen implementiert werden (H1 bis H8), da die Verordnung eine namentliche Nennung der spezifischen Schalenfrucht vorschreibt (z.B. "enthält Haselnüsse" anstatt nur "enthält Schalenfrüchte").13 Nüsse, die ausschließlich zur Herstellung von alkoholischen Destillaten (Spirituosen) verwendet werden, sind von dieser Pflicht ausgenommen.30

### **I: Sellerie und daraus gewonnene Erzeugnisse**

Sellerie in all seinen morphologischen Formen (Knolle, Staude, Blatt und Samen) ist eine von Laien oft unterschätzte Zutat, die in der professionellen Küche omnipräsent ist. Er dient als essenzieller Geschmacksträger und Bestandteil von Mirepoix (Röstgemüse) und findet sich gehäuft in Brühwürfeln, Fertigsaucen, Suppen, Gewürzmischungen und Feinkostsalaten.15 Ein Software-Filtermechanismus muss hier besonders tiefgreifend in importierte Lieferanten-Kataloge und Spezifikationen greifen, um dieses Allergen über alle Hierarchieebenen der Zutatenliste hinweg zu identifizieren.

### **J: Senf und daraus gewonnene Erzeugnisse**

Senf, Senfpulver, Senfsamen, Senfsprossen und daraus resultierende Produkte wie Senföle finden sich primär in Dressings, Marinaden, Wurstwaren und Ketchup.4 Für die digitale Analyse der Ratsstuben-Speisekarte bedeutet dies, dass bei Gerichten mit Vinaigrettes oder mariniertem Schweinebauch eine äußerst sorgfältige und detaillierte Prüfung der hinterlegten Rezeptur stattfinden muss, da Senf oft als Emulgator in Saucen eingesetzt wird, ohne primär geschmacksgebend zu sein.20

### **K: Sesamsamen und daraus gewonnene Erzeugnisse**

Sesam wird als ganzer Samen, als Mehl, als Paste (Tahini) oder als Öl verarbeitet. Besonders in der asiatischen und levantinischen Küche (Falafel, Hummus, Sushi) bergen Gerichte ein hohes Risiko für Sesam-Allergene.15 Auch auf der Speisekarte der Ratsstuben finden sich asiatisch inspirierte Gerichte wie der Bao Bun oder der Beef Yakitori Spieß, bei denen Sesamöl oder geröstete Sesamsamen als Topping oder Marinadenbestandteil mit an Sicherheit grenzender Wahrscheinlichkeit zum Einsatz kommen und somit zwingend die Kennzeichnung K erfordern.20

### **L: Schwefeldioxid und Sulfite**

Unter diesen Buchstaben fallen chemische Verbindungen (E220 bis E228), die in einer Konzentration von mehr als ![][image6] oder ![][image7], ausgedrückt als ![][image8], im verzehrfertigen Endprodukt vorhanden sind.9 Typische Vorkommen sind Trockenobst, Fruchtkonserven, industriell geschälte Kartoffelprodukte und vor allem Wein. Auf der Getränkekarte der Ratsstuben müssen sämtliche Weine (wie der Grauburgunder oder der Baron de Ley Reserva) und Traubenseccos zwingend mit dem Buchstaben L ausgezeichnet werden.23 Für das Backend bedeutet dies, dass bei Sulfiten eine quantitative Schwellenwert-Logik implementiert werden muss, im Gegensatz zu den anderen Allergenen, bei denen bereits der qualitative Nachweis für eine Deklarationspflicht ausreicht.

### **M: Lupinen und daraus gewonnene Erzeugnisse**

Lupinenmehl, Lupinenkleie und Lupinenproteine werden von der Lebensmittelindustrie zunehmend als hochwertige pflanzliche Proteinquelle, als Sojaersatz oder zur Strukturverbesserung in glutenfreien Backwaren eingesetzt.15 Da Lupinen starke allergische Reaktionen auslösen können und eine hohe Kreuzreaktivität zu Erdnüssen aufweisen, ist ihre Kennzeichnungspflicht besonders für vegetarische und vegane Restaurantspezialitäten von enormer Bedeutung.

### **N: Weichtiere und daraus gewonnene Erzeugnisse**

Zu den Weichtieren (Mollusken) zählen Schnecken, Muscheln (wie die Mejillones der Ratsstuben), Austern und Kopffüßer wie Tintenfische, Oktopus und Kalmare.15 Auch asiatische Austernsauce, Würzpasten und Sepia-Tinte in schwarzer Pasta erfordern zwingend die Kennzeichnung N.

| DACH-Code | Allergen-Spezifikation (gemäß EU-VO 1169/2011) | Typische Vorkommen in der Gastronomie | Relevante Ausnahmen & Schwellenwerte |
| :---- | :---- | :---- | :---- |
| **A** | Glutenhaltiges Getreide (Weizen, Roggen, Gerste, Hafer etc.) | Brot, Pasta, Panaden, Bier, Sojasauce, Würzpasten | Glukosesirup auf Weizenbasis, Maltodextrin |
| **B** | Krebstiere und daraus gewonnene Erzeugnisse | Shrimps, Hummer, Krabbenchips, Surimi | Keine relevanten Ausnahmen |
| **C** | Eier und daraus gewonnene Erzeugnisse | Mayonnaise, Panaden, Pasta, Soufflés | Keine relevanten Ausnahmen |
| **D** | Fische und daraus gewonnene Erzeugnisse | Sardellenpaste, Kaviar, Fischfond, Worcestershiresauce | Fischgelatine als Klärmittel (Bier/Wein) |
| **E** | Erdnüsse und daraus gewonnene Erzeugnisse | Erdnussöl, asiatische Saucen, Snacks, Desserts | Keine relevanten Ausnahmen |
| **F** | Sojabohnen und daraus gewonnene Erzeugnisse | Tofu, Edamame, Sojasauce, Lecithin | Vollständig raffiniertes Sojaöl/fett |
| **G** | Milch und daraus gewonnene Erzeugnisse (inkl. Laktose) | Käse, Joghurt, Sahne, Butter, Schokolade | Molke für landwirtschaftliche Destillate |
| **H** | Schalenfrüchte (H1-H8: Mandeln, Walnüsse, Pistazien etc.) | Marzipan, Pesto, Nougat, Brotaufstriche | Nüsse zur Herstellung von Destillaten |
| **I** | Sellerie und daraus gewonnene Erzeugnisse | Suppengrün, Brühwürfel, Gewürze, Feinkostsalate | Keine relevanten Ausnahmen |
| **J** | Senf und daraus gewonnene Erzeugnisse | Dressings, Marinaden, Ketchup, Wurstwaren | Keine relevanten Ausnahmen |
| **K** | Sesamsamen und daraus gewonnene Erzeugnisse | Tahini, Burger-Buns, Hummus, Sushi, Falafel | Keine relevanten Ausnahmen |
| **L** | Schwefeldioxid und Sulfite (E220-E228) | Wein, Trockenfrüchte, Essig, Kartoffelprodukte | Deklarationspflicht erst ![][image9] |
| **M** | Lupinen und daraus gewonnene Erzeugnisse | Vegane Ersatzprodukte, proteinreiches Mehl, Tofu | Keine relevanten Ausnahmen |
| **N** | Weichtiere und daraus gewonnene Erzeugnisse | Muscheln, Tintenfisch, Austern, Sepia-Tinte | Keine relevanten Ausnahmen |

## **Supply Chain Integration und Laboranalytik im Global Data Synchronization Network**

Bevor Allergen-Daten in das Frontend einer Speisekarte gelangen, durchlaufen sie einen komplexen industriellen Datenaustauschprozess. Um eine automatisierte Verarbeitung von Allergeninformationen über die gesamte Lieferkette (Supply Chain) hinweg zu ermöglichen, nutzen Großhändler und Lebensmittelproduzenten Standards wie das Global Data Synchronization Network (GDSN), das von GS1 spezifiziert wird.33

Für Data Engineers bedeutet dies, dass externe Produktkataloge über Attribute wie allergenTypeCode synchronisiert werden, welche die 14 EU-Allergenkategorien strukturiert abbilden.33 In der DACH-Region erwarten Datenempfänger zudem oftmals die Übertragung des provenanceStatement, um die Herkunft der Primärzutaten auszuweisen, was für die ganzheitliche Datenmodellierung in der Datenbankarchitektur berücksichtigt werden sollte.33

Die Validierung dieser Datenstrukturen auf industrieller Ebene erfolgt durch hochspezialisierte Laboranalysen. Um Kreuzkontaminationen zu quantifizieren oder Deklarationen zu verifizieren, kommen semiquantitative und quantitative Methoden wie ELISA (Enzyme-Linked Immunosorbent Assay), PCR (Polymerase Chain Reaction) und HPLC-MS (High-Performance Liquid Chromatography mit Massenspektrometrie) zum Einsatz.35 HPLC-MS gilt als hochspezifisch und ermöglicht eine präzise quantitative Dosierung, ist jedoch kostenintensiv.35 Für die Architektur von Laborinformations- und Gastronomiesystemen ist es von kritischer Bedeutung, dass PCR-Ergebnisse nicht zwingend 1:1 mit ELISA-Werten vergleichbar sind und Maßeinheiten bei Gegenanalysen zwingend identisch normalisiert werden müssen.35

## **Architektur des JSON-Schemas für die Speisekarte der "Ratsstuben"**

Die Speicherung von Menüdaten als unstrukturierter Text oder als PDF-Dokument (wie es bei den hochgeladenen analogen Menüs der "Ratsstuben" der Fall ist) ist für moderne digitale Anwendungen vollkommen unzureichend. Plattformen wie Lieferando, UberEats, moderne POS-Kassensysteme (wie SIDES oder Gastrosoft) und digitale Reservierungssysteme verlangen hochgradig strukturierte, validierbare Datensätze.7 Das Datenaustauschformat der Wahl ist in der modernen Webentwicklung dabei JSON. Die Transformation der unstrukturierten Text-Strings der Ratsstuben-PDFs in relationale JSON-Objekte ist ein klassischer ETL-Prozess (Extract, Transform, Load).

Bei der Konzeption des JSON-Modells für eine Speisekarte gelten folgende strenge Software-Designprinzipien:

1. **Eindeutige Identifikation:** Jedes Menüelement erhält eine eindeutige UUID oder Integer-ID (id). Dies ist zwingend erforderlich, um spätere Aktualisierungen der Allergen-Matrix über PUT- oder PATCH-Requests in der relationalen Datenbank zu ermöglichen, ohne Duplikate zu erzeugen oder Verknüpfungen zu brechen.  
2. **Strukturierte Kategorisierung:** Die Gruppierung von Speisen in einem category-Feld erleichtert die Frontend-Ausspielung erheblich. Sie ermöglicht es dem Client-Code, automatisch Sektionen wie "Stuzzichini", "Hauptgerichte" oder "Getränke" zu rendern.  
3. **Typsicherheit bei Preisen:** Monetäre Werte (price) müssen strikt als Float, Decimal oder idealerweise als Integer in der kleinsten Währungseinheit (Cents) gespeichert werden. Die Speicherung als String mit angehängtem Währungssymbol (z. B. "9,00 €") ist ein Anti-Pattern, das jegliche Berechnungen im Warenkorb oder Rabatt-Logiken im Backend erschwert.  
4. **Objektorientierte Allergen-Struktur:** Das Feld allergens darf nicht als einfacher, flacher String modelliert werden (z. B. "allergens": "A, C, G"). Es muss zwingend als ein Array von Objekten konstruiert sein. Diese Verschachtelung ermöglicht es dem Frontend-Entwickler, interaktive Tooltips zu rendern, spezifische Filter-Algorithmen performant anzuwenden (z.B. über Array-Methoden wie array.filter(item \=\> item.letter \=== 'A')) und leicht skalierbare, mehrsprachige (i18n) Interfaces aufzubauen. Jedes Allergen-Objekt besteht aus dem genormten Kürzel (letter) und dem ausgeschriebenen, rechtlich normierten Namen (name) gemäß der EU-Verordnung 1169/2011.16

Bei der tiefgehenden Analyse der "Ratsstuben"-Speisekarte 20 lassen sich spezifische Gerichte extrahieren, deren Allergenprofile durch kulinarische Heuristiken und die geltenden LMIV-Vorgaben abgeleitet und validiert werden müssen. Einige Allergene sind im vorliegenden Text explizit angegeben (wie das (A) bei den Chicken-Nuggets), andere müssen durch fachkundige Rezepturanalyse den DACH-Buchstaben zugeordnet werden. So enthalten das "Panierte Schweineschnitzel" Gluten (A) und Ei (C), die "Mejillones en Escabeche" (Miesmuscheln) zwingend Weichtiere (N) und das "Bitburger Pils" logischerweise Gluten (A). Das komplexere Gericht "Beef Yakitori Spieß" mit Hoisin-Sauce enthält eine Kombination aus Soja (F), Sesam (K) und Weizen (A).

Die nachfolgende JSON-Struktur ist streng nach diesen Vorgaben formatiert. Sie konvertiert die aus den unstrukturierten PDF-Quellen identifizierten Gerichte der Ratsstuben in einen maschinenlesbaren, validen Code-Block, der direkt in Dokumentendatenbanken (wie MongoDB oder CouchDB) importiert oder als Payload über eine RESTful-API ausgeliefert werden kann:

JSON

  },  
  {  
    "id": 2,  
    "name": "Cevapcici mit Pommes",  
    "description": "Herzhafte Cevapcici-Röllchen vom Grill (3 Stück), gereicht mit einer Portion frischer Pommes frites.",  
    "price": 8.00,  
    "category": "Hauptgerichte",  
    "allergens":  
  },  
  {  
    "id": 3,  
    "name": "Chicken-Nuggets mit Pommes",  
    "description": "Vier zarte Hähnchenbruststücke in einer krossen Panade, dazu knusprige Pommes frites.",  
    "price": 8.00,  
    "category": "Snacks & Kinder",  
    "allergens": \[  
      {  
        "letter": "A",  
        "name": "Glutenhaltiges Getreide und daraus gewonnene Erzeugnisse"  
      }  
    \]  
  },  
  {  
    "id": 4,  
    "name": "Pimentos de Padron",  
    "description": "Kleine grüne Bratpaprika, scharf in Olivenöl angebraten und mit grobem Meersalz verfeinert.",  
    "price": 8.00,  
    "category": "Stuzzichini",  
    "allergens":  
  },  
  {  
    "id": 5,  
    "name": "Mejillones en Escabeche",  
    "description": "Spanische Miesmuscheln von Ramon Pena, eingelegt in würziger Escabeche-Marinade, dazu feine Oliven.",  
    "price": 12.00,  
    "category": "Stuzzichini",  
    "allergens":  
  },  
  {  
    "id": 6,  
    "name": "Beef Yakitori Spieß",  
    "description": "Saftiges Rinderfilet am Spieß, glasiert mit aromatischer Hoisin-Sauce und bestreut mit frischem Koriander.",  
    "price": 10.00,  
    "category": "Stuzzichini",  
    "allergens":  
  },  
  {  
    "id": 7,  
    "name": "Sardinen in Olivenöl",  
    "description": "Hochwertige Sardinen von Ramon Pena, serviert in der Originaldose mit knusprigen Grissinis.",  
    "price": 12.00,  
    "category": "Stuzzichini",  
    "allergens":  
  },  
  {  
    "id": 8,  
    "name": "Bao Bun mit geschmortem Ochsenschwanz",  
    "description": "Fluffiges asiatisches Dampfbrötchen, gefüllt mit langsam geschmortem Ochsenschwanz, Hoisin-Sauce und Koriander.",  
    "price": 14.00,  
    "category": "Stuzzichini",  
    "allergens":  
  },  
  {  
    "id": 9,  
    "name": "Jamon Iberico de Bellota",  
    "description": "Feinster luftgetrockneter Schinken von Blazques, 100% Iberico Schwein, handgeschnitten (80g).",  
    "price": 36.00,  
    "category": "Stuzzichini",  
    "allergens":  
  },  
  {  
    "id": 10,  
    "name": "Beef Tacco",  
    "description": "Pikanter Tacco gefüllt mit Rindfleisch, Bohnencreme und frischem Koriander.",  
    "price": 7.00,  
    "category": "Stuzzichini",  
    "allergens": \[  
      {  
        "letter": "A",  
        "name": "Glutenhaltiges Getreide und daraus gewonnene Erzeugnisse"  
      },  
      {  
        "letter": "G",  
        "name": "Milch und daraus gewonnene Erzeugnisse (einschließlich Laktose)"  
      }  
    \]  
  },  
  {  
    "id": 11,  
    "name": "Grauburgunder 2023",  
    "description": "Weingut Kleiner Fritz, Pfalz (0,25L). Frisch und fruchtig mit elegantem Schmelz.",  
    "price": 10.00,  
    "category": "Getränke",  
    "allergens":  
  },  
  {  
    "id": 12,  
    "name": "Baron de Ley Reserva 2019",  
    "description": "Kräftiger spanischer Rotwein aus der Rioja (0,25L).",  
    "price": 14.90,  
    "category": "Getränke",  
    "allergens":  
  },  
  {  
    "id": 13,  
    "name": "Bitburger Pils",  
    "description": "Ein frisch gezapftes, feinherbes Pilsener nach deutscher Brautradition (0,3L).",  
    "price": 4.90,  
    "category": "Getränke",  
    "allergens": \[  
      {  
        "letter": "A",  
        "name": "Glutenhaltiges Getreide und daraus gewonnene Erzeugnisse"  
      }  
    \]  
  },  
  {  
    "id": 14,  
    "name": "Schneider Weissbier",  
    "description": "Klassisches bayerisches Weißbier, wahlweise Original, Alkoholfrei oder Aventinus (0,5L).",  
    "price": 6.40,  
    "category": "Getränke",  
    "allergens": \[  
      {  
        "letter": "A",  
        "name": "Glutenhaltiges Getreide und daraus gewonnene Erzeugnisse"  
      }  
    \]  
  },  
  {  
    "id": 15,  
    "name": "Aperol Spritz",  
    "description": "Erfrischender Aperitif mit Aperol, Prosecco und einem Schuss Soda (0,3L).",  
    "price": 8.50,  
    "category": "Getränke",  
    "allergens":  
  }  
\]

## **API-Design, Frontend-Implementierung und Zugänglichkeit**

Die Verfügbarkeit dieses validen JSON-Payloads bildet die Grundlage für die Entwicklung moderner Gastronomie-Frontends. Ein Web-Developer konzipiert basierend auf diesem Schema RESTful-Endpoints (z. B. GET /api/v1/menus/ratsstuben), die diese Daten an Client-Applikationen ausliefern.

In der Frontend-Implementierung (beispielsweise mit React oder Vue.js) wird das verschachtelte allergens-Array genutzt, um für den Gast eine intuitive und sichere Benutzeroberfläche zu schaffen. Eine Best-Practice in der UI/UX-Gestaltung für Allergiker ist die Implementierung eines globalen Toggles oder Filters am Seitenanfang der digitalen Speisekarte. Der JavaScript-Code iteriert durch die empfangenen JSON-Objekte und wendet Array-Methoden an, um Gerichte auszublenden oder visuell auszugrauen, die nicht mit dem definierten Allergen-Profil des Nutzers übereinstimmen. In der Praxis hat sich gezeigt, dass die schriftliche Kennzeichnung in digitalen und analogen Speisekarten der sicherste Weg ist, da mündliche Auskünfte allein, insbesondere bei hohem Stressaufkommen im Service oder bei häufig wechselndem Personal, eine signifikante Fehlerquelle bergen.38

Zusätzlich erfordert die barrierefreie Webentwicklung (Web Accessibility, WCAG-Standards) besondere Aufmerksamkeit bei der Darstellung von Allergenen. Werden im Frontend anstelle der Buchstaben A-N grafische Icons (z. B. eine durchgestrichene Ähre für Gluten) gerendert, müssen diese zwingend mit entsprechenden ARIA-Labels (aria-label="Enthält Glutenhaltiges Getreide") versehen werden, damit Screenreader für sehbehinderte Allergiker die lebenswichtigen Warnungen korrekt vorlesen können.39

Werden aus den Web-Applikationen heraus über Print-CSS physische Speisekarten als PDF generiert, um den Druckprozess im Restaurant zu automatisieren, muss der Entwickler sicherstellen, dass die im JSON hinterlegten Bezeichnungen in Form einer Legende abgedruckt werden. Dabei muss die zuvor diskutierte gesetzliche Mindestschriftgröße von 1,2 mm (bezogen auf das kleine "x") rigoros eingehalten werden, andernfalls verliert die ausgedruckte Karte ihre rechtliche Konformität.5

## **Rechtssicherheit und Systemintegration von Kreuzkontaminationen**

Neben der strukturierten und präzisen Auszeichnung der in den Rezepturen absichtlich verwendeten Allergene, stellt der Umgang mit Spuren und unbeabsichtigten Kreuzkontaminationen (Cross-Contact) die wohl komplexeste juristische und operative Herausforderung in der Gastronomie dar. Auf gesetzlicher Ebene regelt die LMIV ausschließlich Zutaten und Verarbeitungshilfsstoffe, die absichtlich im Endprodukt vorhanden sind.10 Für sogenannte „Spuren“ – also Rückstände, die durch unbeabsichtigte Kontamination im Produktions-, Liefer- oder Zubereitungsprozess in das Lebensmittel gelangen – besteht laut aktueller EU-Verordnung keine zwingende Kennzeichnungspflicht.12 Der Passus „kann Spuren von... enthalten“ gilt rechtlich nicht als Zutat.

Dennoch birgt die physikalische Realität in gastronomischen Betrieben immense Risiken für Gäste und Betreiber. In einer professionellen Restaurantküche werden Arbeitsflächen, Friteusen, Schneidebretter, Zangen und Grills oftmals im Minutentakt für verschiedene Speisen genutzt. Trotz strikter HACCP-Konzepte (Hazard Analysis and Critical Control Points), validierter Reinigungsschritte und höchsten Hygienestandards lässt sich eine mikroskopische Kreuzkontamination niemals zu 100 Prozent ausschließen.36 Die klinische Relevanz ist hierbei enorm: Wie von den Untersuchungsämtern für Lebensmittelüberwachung festgestellt wurde, können Proteine, die lebensbedrohliche Anaphylaxien auslösen, bereits in minimalen Dosen (sogenannten Minimal Eliciting Doses oder ED01-Schwellenwerten) bei hochsensiblen Personen schwere Reaktionen hervorrufen.6 Insbesondere beim Außer-Haus-Verzehr kommt es häufig zu nicht deklarierten Allergen-Einträgen.6

Diese haftungsrechtliche Diskrepanz zwischen der fehlenden Deklarationspflicht für Spuren und der zivilrechtlichen Haftung bei Personenschäden zwingt Gastronomen oft zu Übersprungshandlungen, die aus Marketing- und Rechtssicht problematisch sind. Viele Restaurants versuchen, sich durch weitreichende Disclaimersätze wie "Wir übernehmen keine Haftung für Kreuzkontaminationen oder allergische Reaktionen" abzusichern. Aus streng juristischer Sicht sind derartige pauschale Haftungsausschlüsse für Personenschäden in Allgemeinen Geschäftsbedingungen jedoch nicht zulässig und rechtlich vollkommen unwirksam.43 Der Gastronom unterliegt im Rahmen des Bewirtungsvertrages einer produkthaftungsrechtlichen und vertraglichen Sorgfalts- und Verkehrssicherungspflicht. Ein vollumfänglicher Haftungsausschluss würde den Kern dieses Vertrages aushöhlen. Gleichzeitig ist auch die proaktive Werbung mit Begriffen wie "Allergenfrei" extrem risikobehaftet; lassen sich bei Gegenanalysen Spuren nachweisen, drohen Abmahnungen sowie Schadensersatz- und Schmerzensgeldforderungen.45

Um diese juristische Gratwanderung erfolgreich zu bewältigen und gleichzeitig den Gast nicht durch übermäßig lange, rein juristisch formulierte oder aggressive Warnhinweise abzuschrecken (ein Phänomen, das im UI/UX-Design als "Disclaimer-Fatigue" bezeichnet wird), bedarf es einer sehr sorgfältig austarierten Kommunikationstechnik.42 Die sogenannte "Goldene Mitte" in der Allergenkommunikation ist ein ehrliches, transparentes System, das die Realität der Küchenabläufe exakt abbildet, Empathie für den Allergiker zeigt, eine offene Einladung zum Dialog ausspricht und gleichzeitig unmissverständlich auf die physikalischen Grenzen einer Mischküche verweist, ohne perfekten Schutz zu versprechen.42

Darüber hinaus sehen die nationalen Implementierungen der Lebensmittelinformationsverordnung (wie die LMIDV in Deutschland oder entsprechende Gesetze in Österreich) die Möglichkeit einer mündlichen Auskunftserteilung durch das Servicepersonal vor.15 Diese ist jedoch an harte, in der Softwarelandschaft abzubildende Voraussetzungen geknüpft: Das Personal muss fachkundig geschult sein, die Information muss unverzüglich vor Kaufabschluss erfolgen, eine schriftliche Dokumentation (beispielsweise ein Tablet mit der generierten JSON-Auswertung) muss zur Einsichtnahme bereitliegen, und es muss durch einen deutlichen Hinweis am Ort des Verkaufs (also in der Speisekarte, im Footer der Website oder am Buffet) auf diese Möglichkeit der Informationsbeschaffung aufmerksam gemacht werden.12

Aus all diesen juristischen Parametern, gepaart mit den Best Practices der gastronomischen Kommunikation und des Web-Designs, ergibt sich die absolute Notwendigkeit eines hybriden Disclaimers. Dieser muss den gesetzlich vorgeschriebenen Hinweis auf die mündliche Auskunft und die schriftliche Dokumentation beinhalten und transparent über Kreuzkontaminationen aufklären, ohne dabei eine juristisch unhaltbare Haftungsfreistellung zu fingieren.

## **Konzeption des rechtssicheren und kundenfreundlichen Disclaimers**

Der folgende Textbaustein wurde speziell für den Einsatz als wiederverwendbares Modul in der Frontend-Entwicklung konzipiert. Er kann als Komponente (z. B. \<AllergyDisclaimer /\> in React) im Footerbereich einer Web-Applikation, am Ende des Checkout-Prozesses in einem digitalen Bestellsystem oder im Footer einer über CSS generierten, gedruckten Speisekarte implementiert werden. Er verknüpft die obligatorische Gastinformation zur LMIV 15 elegant mit einem transparenten Hinweis zum Cross-Contact-Risiko.42

---

**Hinweis für unsere Gäste mit Lebensmittelallergien und Unverträglichkeiten**

Liebe Gäste,

wir bereiten all unsere Gerichte in den Ratsstuben mit größter Sorgfalt, Liebe zum Detail und frischen Zutaten für Sie zu. In unserer Restaurantküche verarbeiten wir täglich eine große Vielfalt an Lebensmitteln, darunter naturgemäß auch die 14 gesetzlich kennzeichnungspflichtigen Hauptallergene.

Trotz unserer strengen Hygienemaßnahmen, der sorgfältigen Trennung von Arbeitsbereichen und eines fundierten Qualitätsmanagements, können wir aufgrund der handwerklichen und offenen Struktur unserer Küchenabläufe unbeabsichtigte Kreuzkontaminationen (minimalste Spuren von Allergenen, die über die Luft oder Arbeitsgeräte übertragen werden) leider niemals zu 100 % ausschließen.

Ihre Gesundheit und Ihr Wohlbefinden liegen uns sehr am Herzen. Wenn Sie an einer schweren Lebensmittelallergie oder einer Unverträglichkeit leiden, wenden Sie sich bitte unbedingt vor Ihrer Bestellung vertrauensvoll an unser Servicepersonal. Gerne geben wir Ihnen detailliert mündliche Auskunft über die in unseren Speisen verwendeten allergenen Zutaten. Zusätzlich halten wir jederzeit eine detaillierte schriftliche Dokumentation unserer Rezepturen zur Einsicht für Sie bereit, damit Sie eine sichere Entscheidung treffen können.

---

**Architektonische und juristische Analyse der Formulierung:**

1. **Positive Tonalität und UX:** Die Einleitung („mit größter Sorgfalt...“) baut Vertrauen auf, wirkt gastfreundlich und verhindert eine abschreckende Wirkung, die juristische Standardklauseln oft auslösen.42  
2. **Transparenz der Arbeitsabläufe:** Der Hinweis auf die „handwerkliche und offene Struktur unserer Küchenabläufe“ legitimiert das physikalische Restrisiko von Kreuzkontaminationen rational und nachvollziehbar. Er vermittelt dem Gast, dass geteilte Friteusen oder Schwebstoffe in der Luft in einer echten Küche existieren, ohne dem Betreiber eine Sorgfaltspflichtverletzung zu unterstellen.42  
3. **Erfüllung der gesetzlichen Anforderungen (LMIV/LMIDV):** Der Absatz „wenden Sie sich bitte... an unser Servicepersonal“ in direkter Kombination mit dem Hinweis auf die „mündliche Auskunft“ und die zwingend erforderliche „schriftliche Dokumentation“ erfüllt exakt und wortgetreu die rechtlichen Anforderungen an den schriftlichen Aushang zur mündlichen Informationserteilung nach nationalem Lebensmittelrecht.12  
4. **Haftungsmindernde Ehrlichkeit durch Informed Consent:** Durch den bewussten Verzicht auf unwirksame Klauseln wie „Wir übernehmen keine Haftung“ wird die rechtliche Gültigkeit des gesamten Textes gewahrt.43 Die transparente Risikoaufklärung bewirkt juristisch vielmehr, dass der Gast (insbesondere der schwere Anaphylaxie-Patient) eine eigenverantwortliche, informierte Entscheidung („informed consent“) treffen kann.42 Dies bietet im Schadensfall einen wesentlich solideren Argumentationsspielraum bezüglich des Mitverschuldens des Gastes, als es ein nichtiger Haftungsausschluss jemals könnte.

Durch die systematische Integration der 14 LMIV-Allergene in ein sauberes, maschinenlesbares JSON-Format und die flankierende Einbindung dieses rechtssicheren Disclaimers im Frontend, verfügen Data Engineers und Web-Developer über eine robuste, skalierbare und vollumfänglich compliance-gerechte Architektur für moderne Gastronomie-Software.

#### **Referenzen**

1. EU 1169/2011 Guide: Allergen Labelling requirements \- Menutech, Zugriff am April 12, 2026, [https://menutech.com/en/blog/legal-requirements/eu-11692011-guide-allergen-labelling-requirements](https://menutech.com/en/blog/legal-requirements/eu-11692011-guide-allergen-labelling-requirements)  
2. B VERORDNUNG (EU) Nr. 1169/2011 DES EUROPÄISCHEN PARLAMENTS UND DES RATES vom 25\. Oktober 2011 betreffend die Information de, Zugriff am April 12, 2026, [https://eur-lex.europa.eu/legal-content/DE/TXT/PDF/?uri=CELEX:02011R1169-20140219](https://eur-lex.europa.eu/legal-content/DE/TXT/PDF/?uri=CELEX:02011R1169-20140219)  
3. Die 14 Allergene \- WKO, Zugriff am April 12, 2026, [https://www.wko.at/oe/tourismus-freizeitwirtschaft/gastronomie/wko-allergene-plakat-a3-stm.pdf](https://www.wko.at/oe/tourismus-freizeitwirtschaft/gastronomie/wko-allergene-plakat-a3-stm.pdf)  
4. Allergenliste: Die 14 Hauptallergengruppen im Überblick \- Nestlé Professional, Zugriff am April 12, 2026, [https://www.nestleprofessional.de/news/allergenliste-nach-lmiv-die-14-hauptallergene-im-ueberblick-mit-beispielen](https://www.nestleprofessional.de/news/allergenliste-nach-lmiv-die-14-hauptallergene-im-ueberblick-mit-beispielen)  
5. Neue Regelungen \- Lebensmittelhygiene \- Dehoga Hygiene, Zugriff am April 12, 2026, [https://www.dehoga-hygiene.de/kennzeichnung/neue-regelungen/](https://www.dehoga-hygiene.de/kennzeichnung/neue-regelungen/)  
6. Nicht deklarierte Allergene in Lebensmitteln \- Bundesamt für Lebensmittelsicherheit und Veterinärwesen, Zugriff am April 12, 2026, [https://www.blv.admin.ch/dam/blv/de/dokumente/lebensmittel-und-ernaehrung/publikationen-forschung/breifing-letter-nicht-deklarierte-lebensmittelallergene.pdf.download.pdf/Briefing%20Letter%20Nicht%20deklarierte%20Lebensmittelallergene%20DE.pdf](https://www.blv.admin.ch/dam/blv/de/dokumente/lebensmittel-und-ernaehrung/publikationen-forschung/breifing-letter-nicht-deklarierte-lebensmittelallergene.pdf.download.pdf/Briefing%20Letter%20Nicht%20deklarierte%20Lebensmittelallergene%20DE.pdf)  
7. Allergene auf der Speisekarte: Gerichte richtig kennzeichnen | 2026 \- sides, Zugriff am April 12, 2026, [https://www.get-sides.de/blog/allergene-speisekarte/](https://www.get-sides.de/blog/allergene-speisekarte/)  
8. Allergeninformation \- DEHOGA Niedersachsen, Zugriff am April 12, 2026, [https://dehoga-niedersachsen.de/uploads/media/Allergenkennzeichung\_Merkblatt\_Bundesverband.pdf](https://dehoga-niedersachsen.de/uploads/media/Allergenkennzeichung_Merkblatt_Bundesverband.pdf)  
9. Informationen zur Lebensmittelkennzeichnung \- IHK Arnsberg, Zugriff am April 12, 2026, [https://www.ihk-arnsberg.de/Informationen\_zur\_Lebensmittelkennzeichnung.HTM](https://www.ihk-arnsberg.de/Informationen_zur_Lebensmittelkennzeichnung.HTM)  
10. Guidance on Food Allergen Management for Food Manufacturers Version 2 \- FoodDrinkEurope, Zugriff am April 12, 2026, [https://www.fooddrinkeurope.eu/wp-content/uploads/2022/04/FoodDrinkEuropes-Guidance-on-Food-Allergen-Management-for-Food-Manufacturers-2022.pdf](https://www.fooddrinkeurope.eu/wp-content/uploads/2022/04/FoodDrinkEuropes-Guidance-on-Food-Allergen-Management-for-Food-Manufacturers-2022.pdf)  
11. Allergene \- Wien \- WKO, Zugriff am April 12, 2026, [https://www.wko.at/wien/tourismus-freizeitwirtschaft/gastronomie/allergenfolder-gastro.pdf](https://www.wko.at/wien/tourismus-freizeitwirtschaft/gastronomie/allergenfolder-gastro.pdf)  
12. Lebensmittelkennzeichnung im Gastgewerbe | Merkblatt 2024 \- DIHK, Zugriff am April 12, 2026, [https://www.dihk.de/resource/blob/3808/e96f9a3058bd78bcc8c8ce03dda08240/merkblatt-lebensmittelkennzeichnung-data.pdf](https://www.dihk.de/resource/blob/3808/e96f9a3058bd78bcc8c8ce03dda08240/merkblatt-lebensmittelkennzeichnung-data.pdf)  
13. Allergenkennzeichnung | Nds. Landesamt für Verbraucherschutz und Lebensmittelsicherheit, Zugriff am April 12, 2026, [https://www.laves.niedersachsen.de/startseite/lebensmittel/kennzeichnung/allergenkennzeichnung-129841.html](https://www.laves.niedersachsen.de/startseite/lebensmittel/kennzeichnung/allergenkennzeichnung-129841.html)  
14. Food Allergy Labeling Laws: International Guidelines for Residents and Travelers \- PMC, Zugriff am April 12, 2026, [https://pmc.ncbi.nlm.nih.gov/articles/PMC10169132/](https://pmc.ncbi.nlm.nih.gov/articles/PMC10169132/)  
15. Kennzeichnung von allergenen Stoffen in der Gastronomie \- IHK ..., Zugriff am April 12, 2026, [https://www.ihk.de/schwerin/standort-westmecklenburg/tourismus-und-gastgewerbe/rechtsfragen/kennzeichnung-von-allergenen-stoffen-in-der-gastronomie-6200314](https://www.ihk.de/schwerin/standort-westmecklenburg/tourismus-und-gastgewerbe/rechtsfragen/kennzeichnung-von-allergenen-stoffen-in-der-gastronomie-6200314)  
16. Informationen \- zur Kennzeichnung von Allergenen und Zusatzstoffen in der Speisekarte Landeshauptstadt München Kreisverwaltungsreferat, Zugriff am April 12, 2026, [https://stadt.muenchen.de/dam/jcr:29a70a61-fe27-43cd-bb0e-7a328b3b9360/Musterspeisekarte.pdf](https://stadt.muenchen.de/dam/jcr:29a70a61-fe27-43cd-bb0e-7a328b3b9360/Musterspeisekarte.pdf)  
17. Legende für allergene Zutaten und Zusatzstoffe in der Speisekarte, Zugriff am April 12, 2026, [https://www.ua-bw.de/uploaddoc/cvuas/Vorlage\_Legende.pdf](https://www.ua-bw.de/uploaddoc/cvuas/Vorlage_Legende.pdf)  
18. Allergiker-Informationen in der Gastronomie \- Oesterreich GV, Zugriff am April 12, 2026, [https://www.oesterreich.gv.at/de/themen/gesetze\_und\_recht/verbraucherschutz/lebensmittel\_\_\_informationen\_fuer\_verbraucher/Seite.3220000](https://www.oesterreich.gv.at/de/themen/gesetze_und_recht/verbraucherschutz/lebensmittel___informationen_fuer_verbraucher/Seite.3220000)  
19. Wissen, was drin ist: Die 14 Allergene im Überblick\! \- Arbeiter-Samariter-Bund, Zugriff am April 12, 2026, [https://www.samariterbund.net/fileadmin/\_migrated/content\_uploads/Allergieliste\_EaR\_2015\_01.pdf](https://www.samariterbund.net/fileadmin/_migrated/content_uploads/Allergieliste_EaR_2015_01.pdf)  
20. Vorspeisen & Suppen | kalt | warm | gerne auch zum teilen, Zugriff am April 12, 2026, [https://die-ratsstuben.de/wp-content/uploads/2025/08/Speisekarte\_21.08.25.pdf](https://die-ratsstuben.de/wp-content/uploads/2025/08/Speisekarte_21.08.25.pdf)  
21. Vorspeisen & Suppen | kalt | warm | gerne auch zum teilen, Zugriff am April 12, 2026, [https://die-ratsstuben.de/wp-content/uploads/2025/07/Speisekarte\_20.07.255.pdf](https://die-ratsstuben.de/wp-content/uploads/2025/07/Speisekarte_20.07.255.pdf)  
22. Die Speisekarte \- Ratsstube-Wevelinghoven, Zugriff am April 12, 2026, [https://ratsstube-wevelinghoven.de/unsere-speisekarte/](https://ratsstube-wevelinghoven.de/unsere-speisekarte/)  
23. SCHWEINS- BRATEN \- Die Ratsstuben Ettlingen, Zugriff am April 12, 2026, [https://die-ratsstuben.de/wp-content/uploads/2024/12/LBK\_Speisekarte-2024.pdf](https://die-ratsstuben.de/wp-content/uploads/2024/12/LBK_Speisekarte-2024.pdf)  
24. Merkblatt \- Kenntlichmachung von Allergenen \- Berlin.de, Zugriff am April 12, 2026, [https://www.berlin.de/ba-mitte/politik-und-verwaltung/aemter/ordnungsamt/veterinaer-und-lebensmittelaufsicht/merkblatt-kenntlichmachung-von-allergenen.pdf](https://www.berlin.de/ba-mitte/politik-und-verwaltung/aemter/ordnungsamt/veterinaer-und-lebensmittelaufsicht/merkblatt-kenntlichmachung-von-allergenen.pdf)  
25. Die neue Lebensmittelinformationsverordnung (LMIV), Zugriff am April 12, 2026, [https://rlp.tourismusnetzwerk.info/wp-content/uploads/2015/03/IHK\_Broschuere\_LMIV.pdf](https://rlp.tourismusnetzwerk.info/wp-content/uploads/2015/03/IHK_Broschuere_LMIV.pdf)  
26. Allergenliste \- METRO, Zugriff am April 12, 2026, [https://www.metro.de/blog/allergenliste](https://www.metro.de/blog/allergenliste)  
27. Allergene in Gastronomie kennzeichnen \- LuxQM, Zugriff am April 12, 2026, [https://luxqm.net/onewebmedia/Allergene\_Gastrokennzeichnung\_v1.pdf](https://luxqm.net/onewebmedia/Allergene_Gastrokennzeichnung_v1.pdf)  
28. Schwellenwerte zur Allergenkennzeichnung von Lebensmitteln \- Tagungsband zum Expertengespräch im Rahmen der BMELV-Konferenz 200 \- Bundesinstitut für Risikobewertung, Zugriff am April 12, 2026, [https://www.bfr.bund.de/cm/350/schwellenwerte\_zur\_allergenkennzeichnung\_von\_lebensmitteln\_tagungsband.pdf](https://www.bfr.bund.de/cm/350/schwellenwerte_zur_allergenkennzeichnung_von_lebensmitteln_tagungsband.pdf)  
29. Lebensmittel-Kennzeichnung-Allergieauslöser \- Lebensmittelhygiene \- Dehoga Hygiene, Zugriff am April 12, 2026, [https://www.dehoga-hygiene.de/informationen/archiv/lebensmittel-kennzeichnung-allergieausloeser/](https://www.dehoga-hygiene.de/informationen/archiv/lebensmittel-kennzeichnung-allergieausloeser/)  
30. Neue Deklarationspflicht für Nahrungs mittelallergene in Lebensmitteln \- DGAKI, Zugriff am April 12, 2026, [https://archiv.dgaki.de/wp-content/uploads/2010/05/DeklarationNMA-Viets-AJ2006.pdf](https://archiv.dgaki.de/wp-content/uploads/2010/05/DeklarationNMA-Viets-AJ2006.pdf)  
31. Liste der 14 Allergene, Zugriff am April 12, 2026, [https://www.pflege-sonnenberg.ch/fileadmin/user\_upload/Liste\_der\_14\_Allergene\_Sonnenberg-2.pdf](https://www.pflege-sonnenberg.ch/fileadmin/user_upload/Liste_der_14_Allergene_Sonnenberg-2.pdf)  
32. Allergene: Informationspflicht für die Gastro » Lexikon » \- Gastro-Marktplatz, Zugriff am April 12, 2026, [https://gastro-marktplatz.de/lexikon/allergene/](https://gastro-marktplatz.de/lexikon/allergene/)  
33. GDSN Implementation Guidelines for EU Regulation 1169/2011 \- GS1 in Europe, Zugriff am April 12, 2026, [https://gs1.eu/wp-content/uploads/2024/01/GS1iEU\_1169\_Guideline\_2.7.pdf](https://gs1.eu/wp-content/uploads/2024/01/GS1iEU_1169_Guideline_2.7.pdf)  
34. GDSN-Umsetzungsleitfaden zur technischen Anwendung im Rahmen der LMIV \- GS1 Germany, Zugriff am April 12, 2026, [https://www.gs1-germany.de/fileadmin/gs1/fachpublikationen/gs1-germany-gdsn-umsetzungsleitfaden-zur-technischen-anwendung-lmiv-anwendungsempfehlung.pdf](https://www.gs1-germany.de/fileadmin/gs1/fachpublikationen/gs1-germany-gdsn-umsetzungsleitfaden-zur-technischen-anwendung-lmiv-anwendungsempfehlung.pdf)  
35. FAQ Allergene und Kreuzkontaminationen \- favv-afsca.be, Zugriff am April 12, 2026, [https://favv-afsca.be/sites/default/files/Allergenes/2025%20FAQ%20Allergene%20und%20Kreuzkontaminationen%20v3.pdf](https://favv-afsca.be/sites/default/files/Allergenes/2025%20FAQ%20Allergene%20und%20Kreuzkontaminationen%20v3.pdf)  
36. Sichere Lebensmittel dank Allergenmanagement: Was Betriebe wissen müssen, Zugriff am April 12, 2026, [https://www.tentamus.de/news/sichere-lebensmittel-dank-allergenmanagement-was-betriebe-wissen-muessen/](https://www.tentamus.de/news/sichere-lebensmittel-dank-allergenmanagement-was-betriebe-wissen-muessen/)  
37. Allergenkennzeichnung Gastronomie ⇒ einfach erklärt\! \- GastroSoft, Zugriff am April 12, 2026, [https://gastrosoft.de/allergenkennzeichnung-gastronomie/](https://gastrosoft.de/allergenkennzeichnung-gastronomie/)  
38. Allergenkennzeichnung Speisekarte: Pflicht & 14 Allergene | shoperate Wissen & Tipps, Zugriff am April 12, 2026, [https://shoperate.com/de/wissen/allergenkennzeichnung-speisekarte](https://shoperate.com/de/wissen/allergenkennzeichnung-speisekarte)  
39. Allergen guidance for food businesses | Food Standards Agency, Zugriff am April 12, 2026, [https://www.food.gov.uk/business-guidance/allergen-guidance-for-food-businesses](https://www.food.gov.uk/business-guidance/allergen-guidance-for-food-businesses)  
40. Allergenliste: So kennzeichnest du deine Speisekarte richtig \- Dish.co, Zugriff am April 12, 2026, [https://www.dish.co/DE/de/blog/allergene-auf-der-speisekarte/](https://www.dish.co/DE/de/blog/allergene-auf-der-speisekarte/)  
41. Infoblatt zur Allergenkennzeichnung \- IHK, Zugriff am April 12, 2026, [https://www.ihk.de/blueprint/servlet/resource/blob/1608106/75b7dd05640c352f3af1cd478bc88b04/infoblatt-zur-allergenkennzeichnung-data.pdf](https://www.ihk.de/blueprint/servlet/resource/blob/1608106/75b7dd05640c352f3af1cd478bc88b04/infoblatt-zur-allergenkennzeichnung-data.pdf)  
42. Kreuzkontaminationen auf Speisekarten – klar kommunizieren \- easy menus, Zugriff am April 12, 2026, [https://easymenus.eu/blog/de/how-to-handle-cross-contamination-communication-on-menus](https://easymenus.eu/blog/de/how-to-handle-cross-contamination-communication-on-menus)  
43. Allergenkennzeichnung – Haftungsausschluss nicht zulässig: | Hygiene Netzwerk, Zugriff am April 12, 2026, [https://www.hygiene-netzwerk.de/Allergenkennzeichnung-und-Haftungsausschluss](https://www.hygiene-netzwerk.de/Allergenkennzeichnung-und-Haftungsausschluss)  
44. Kostenlose Disclaimer-Vorlage für Ihre Webseite: Rechtssicher? \- eRecht24, Zugriff am April 12, 2026, [https://www.e-recht24.de/muster-disclaimer.html](https://www.e-recht24.de/muster-disclaimer.html)  
45. Werbung mit "Allergenfrei": Haftung bei Spuren und Kreuzkontamination \- Anwalt.de, Zugriff am April 12, 2026, [https://www.anwalt.de/rechtstipps/werbung-mit-allergenfrei-haftung-bei-spuren-und-kreuzkontamination-264759.html](https://www.anwalt.de/rechtstipps/werbung-mit-allergenfrei-haftung-bei-spuren-und-kreuzkontamination-264759.html)  
46. Infoblatt zur Kennzeichnung von Lebensmitteln im Gastgewerbe \- IHK, Zugriff am April 12, 2026, [https://www.ihk.de/blueprint/servlet/resource/blob/5567202/5608813a6fb6d0649b7c17d353c5e9d2/kennzeichnung-von-lebensmitteln-im-gastgewerbe-data.pdf](https://www.ihk.de/blueprint/servlet/resource/blob/5567202/5608813a6fb6d0649b7c17d353c5e9d2/kennzeichnung-von-lebensmitteln-im-gastgewerbe-data.pdf)

[image1]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADsAAAAXCAYAAAC1Szf+AAAB2UlEQVR4Xu2WzysFURTHD/mRv8CWSHZkQWElUoqs7KxslBWRhbXCzkLZkj+BhT9BFiTyoqT8LOVnfiTiHOfeN2eueXfuvPHqqfupb91zvufM3POmd2cAPB7Pf+ME9Yb6UqL1HeoW9apy29nq4qcM9W4mTfSwJlWQ23Mh376kZCDYZ+w9bUVHwN6QaTiQ65qF4hEc7mkbdgfYGzWNGAYg9zULRephbd4k6hK1ZOQ7IOjrU6oNVYSh+maldpGndRuqU+RsJBq2TqkR1a9ye6JOUwnsDauYNkVxuYonUNcqR2tSi/KimEI9A9cvivyxyq2LnI1Ew3Yp9QA/jX3UB6omW8m8AG9OQnU3Ij4AhxsLqoHr5VNsQM2KOI5Ew0axAewNihzFK8Ab1NpUeU3SYQmqfxLxuVi7kHpYQvr1ar2G6o6QJp9h5yHcQ+/7JPz5sDqmYW3QX0D2HIq1DepZQI2hmgwvjtTDjgB79GWlofhTxJpTsd6F3z+QC3rDrvWSVMPqQU1PHyZzIteLmhHxNAR9pahl4dloBe5bNQ0H6OA095rlAYJhtOhUpW9kOijOgAeOogL421r3jYftH7aAvXvTiIF6SsykBdrrFfB+SRfA/3d6jXo8Ho+naPgGsxOn3kGjmD4AAAAASUVORK5CYII=>

[image2]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEIAAAAXCAYAAAC/F5msAAACjUlEQVR4Xu2XS6hOURTHl2dSShIlBq5X5JFEksfgGjAkkW64QyIDJSN5DZQiRgqDm3TvUDEwYIIBA8qMAQNdryhdA48i/P/ttZ31rbO/fbjp1uk7v/p37/6vdXb7rP06n0hDQ8M/MAY6Bl2GNhp/HDTVtAlzFziv9oyHfqkuQeugrdqeBf2EFv/JFhnSGFUnsuNdKiHhkQ8oXyTEbSHIbvXrwnOpGG/VzHILpAqxXf06sBZ6KZnx3pIQ3OUDjlQh4tapAz+gA5IZb9VqiPRLuRBbpPVZHq7LoWXQSmiG+t3QamgNNFs9Tw90AhrQNs+ls9I6QTysz6k/1vhVPIUmyH8qRApfiEPQQ/V43ixU/5p6L6AV6nmOSjGW21CX+u+h79BpaK96LATzRmk7ByfmvP4/YoWIxEJYPrp2iliwRcbji9C7ajxC76DzUvC2iwy7EJskLGcu81XQBmi9ibcrxD1p9Q9LeVul6JNyf1xV9KY5n95x53keQJNMO1sILjsGZ/oA2A8dkSLnDrTNxNsVgvuRfq+2Uzkprkg5d656E51P76TzLHMkFNaSLcRmCcEnPmC4KyGHh6ClXSEIfWqKhK/Uv4F5vj++0HAKwav9vhPPGz4X2yXeSkiY7AMK9zvjS5y/Q/0UeyTEnvlAhj4p95dbEaecVwVvPt9/iVcSkjjLFv7GiLPr9/k+9fnBlYKxr97McFPKA+UZRc9fu/QuOq8K3kZ8brQPeHZKcR5EfZDwovOheUWqfIZeQ4PQO+i6iUW4kuzhmoO/XTgZsT/O9jfojXr8y099bh/G6TH/Ex+ugJPL94j9sy+Of8Tws9sx3JDi5adDF0yso3gsYTnzYLMfMh3JGSk+aRsaashvomu89g6qbysAAAAASUVORK5CYII=>

[image3]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEIAAAAXCAYAAAC/F5msAAACqklEQVR4Xu2XS6hOURTHlzwSE+lGicH1jDySSOoyYMCQRJLHkBSlZOLmYiBCJCmUm4SZIhkwYWTgNWQgA88ooTzihv+/vfY966yzz7kf3fTdvvOrf7f9X+uce87ae6+zP5Gampq/YDC0FzoLLTP+UKjNjAlzpzlvwDMM+q06A3VAq3Q8AfoFzezNFvmoMaqZeSThXfh+46E9Ep49yWwJL3TfB5SvEuK2EGSj+s3KEMkmK+pHLsPR18xyC6QKsUb9ZuYpdAo6BI1zsRw3JbzMBh9wpAoRt04zc8cbZfS1GiKXpFiIlZK/ls11LjQHmi/ZDCyFFkKLoHb1POuhfdBlHbMvHZX8BLFZH1Ofy74R+r0QKXwhdkL31GO/ma7+RfWeQfPU83RK9iy3oInqv4N+QgehLeqxEMwbpOMqHkI90A0J93qeD2f0ZyEisRCWD26cIhZshvG4wuhdMB6ht915Kb67Ma9LfjWqCrFcwnLmMl8ALYEWm3hZIe5K3t8lxW2VoluK9+OqojfG+fS6nNcIVyRcO9IHuOwY4DfWsw3aLVnObWi1iZcVYrgEf7OOUzkpzkkxd7J6I5xPb7/zGqFLwrVrnS8rNPDYBwxsOMxhE7SUFYLQp0ZLOKU2AvP8/Sap9y+FiM9gOaKePTX38kZCcJQPKNzvjM9yPqvq/1Fkk4TYEx+ooFuK96taEQec52EOT5aW2MxLeSkhgbNs4W+MWFm/z7eqzwNXCsa+ebOC61J8SPYoev6zS++08zwnJXzJIvGked54SdZJ1g+i3kt40anQlCxVvkCvoBfQW+iqiUW4kmxzrYKdnJMR78fZZsd/rR7/8qjP7cM4PeZ/4sUVxAPjZ/27Ix/+P/jZbRmuSfbyY6ETJtZSPJCwnNnY+LO9pTkMHfdmTc3A4Q/hP786MzNHIgAAAABJRU5ErkJggg==>

[image4]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEIAAAAXCAYAAAC/F5msAAACrUlEQVR4Xu2XS8hNURTH//JIRl5RHuUt8gh5RBgwYCIkkjxmSBmQjOQ1UIoYKQwuCTNFMmDCyIAyNGDkGRIDj5LH+ttr37POOvuc+6kv3ds9v/r3tf9rfbu9195n3XOAmpqaf6Cv6LDogmil8fuLhpsxYe5U53U8A0S/VedFS0XrdTxW9Es0o5kNfNIY1QncQVjrZ9EQF2syCyHpkQ8oXxHithBkm/rtzDCENS7UcdxrklYny0cgVYiN6rczXN9+M/6pXoF4Zbb6gCNViPjotCuXkF7fYG+QVrchchXFQqxD/n/ZXOeIZovmi0apv0K0SLRYNF49zxbRUdE1HbMvnUL+gNisT6vfz/hl2L2NRovG3tNCpPCF2Cd6qB77zTT1r6j3XDRPPc8hZGu5K5qg/jvRD9EJ0S71WAjm9dFxGXG+DwiFXaPjuK4cvVmISCyE5aMbp4gFm2483jB6l41H6O11nifujQ0z0lCvQFUhViFcZ17zBaLlomUmXlaIB8j7B1B8rFI0UJyPp0dvhPPpHXGeJ7U3rp/eTuf/vXYMjPEBYY/oILKce6INJl5WiIEI/g4dp3JSXEQxd5J6g5xP75jzPKlCzFXvtvOxWgNPfMBwHyGHTdBSVggSFzEU4S21JzDPzzdRvd4qBG83PTb/Am8QgsmfFYTnnfGZzt+kfortCLGnPlBBA8X5qm7Eced5rqM431r1xjm/yUuEBJ6yhd8YsbL+Od+tPl+4UjD2zZsV3EJx4exR9PzPLr1zzkvBvCVmzKb91oyTbEbWD6LeI2x0imhyloovoleiFwgT3zCxCG+Sba5V8NuFhxHn42l/F71Wj3/5qs/Hh3F6zOe3QxW8UXybjN9Gz/Lh/4M/3a7hJrLNjxSdNbGu4jHCdWZj42d7V3NSdMabNTWdwx9r5cVm164O6QAAAABJRU5ErkJggg==>

[image5]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAAXCAYAAABaiVzAAAACiElEQVR4Xu2XS6jNURTG15X3K9RFmUiKUigDA8oNIzEgISN5FBNlJuWVx8RIHgOPDEQGBjKgMOGmPFJIKAanvJLHwDsJ67trbfc7a+//7Rqd7un86uvs71v77Pvf5/z/a58r0qJFi77CXNV71R/VLVW/+vI/tqs+qb6p1oVaYrLqttha10KtoRxSHSWPTeAiJ1EGHquukn+kukkezBN7b2Jm8A0FFzK7kPEFjgw+gWxU8JvIg59id0lDGSb5pkDM7gefQHbCx2Pd45W54nnD2aOaE7K40egTnO+gMXNKyjlYo9qvOu9+muq4akmaoExRHVPtoyyyXHVOtdA9vpi33eVqcGG/gy9dLOcXaMwckXIO9kr3GjXVCFWb+xeq62LPPcA4rpMeqUXu77kHeK1qql08FJs0lLLebPQGjZmDYvmEWHBeitUHU7bFs7WUAWTTyf/wjIFfHLIMNCVMbA95bzZ6lsbMYbG8fyw4Ncnfh4YWM4CsI/g4D35byOoYLTZpUCxIeUHAedUzelLKeeK55PX1hQwgm09+q2eJpcFn4F6OE07T+LPkdYDsiY/R0OD/t+s+k7yOHyMxA3Gj41Sdnqfzn4+7DG48Cc5WSPUfnhX8MvLgi+pjyJia5Gv39I0uIH9GNZ58j+BAxwIlMfAbyR/wjMG394t86qATKYu8k3wdPGPIBlA23LOVlG3w7K5YV76o2qkaSHO6QCeMm0v6TvPAEM/vqB6IdTxsJILaV7GzEfPT2Vbig1jXxVGCcw9z8Zi88uyN2If3VPXaM9Rwm4IZkl930mqf0xRgQ6UPe7dYrSkYI9WbwX9QVbU+ySWxW30qZZvFNslNq2nYpbos9nt3VX2pRfPxFx/m2wroDmSUAAAAAElFTkSuQmCC>

[image6]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE4AAAAXCAYAAAClK3kiAAADWUlEQVR4Xu2Y2atPURTHFyJkLMqQkhcZQhnKgwh540F4kEJShoiQJ7wIZX4kJIoHf4CMeUGGzCEZMiVj5kxhfe9a+3fXWXfv33VvR/fQ+dTqd9Z3rd/eZ+/fPvus/SMqKSnJj45eKKmfRWz9jN+WbYjxc2c523wvGlaxvWf7zDbHxYrEL3P9TX2r5cJByja+IBuucJPtmPFvsJ02flFoznbcabfpL0ycJTVxHSjeMbROXmxi9rG1d9oVit9/bqQmLtUxtF1ebGJi93mR4npupCYutUek9FFsy9h2kKxIPD7YE7eRrN4A+jrANsZolp5sW9g2qD+L7Tvb7JDg6MG23YvMBcre50i2wSQvjHFGB/1JFsNq9dE3vju8khEhr4mbwXaJJDaWbafqk1TrxvZAta6qbVY/cJRk723B1ockZy7berYnJs9yzQuKn7hw37iHlUaHf0evMbnI6ct2luQHToLEhV6k9ASl9ABiDyOa/85Xp7VTf5jRXqpWjZ9eUOzE4YfAdavacA3jVbfA/+G0KEhEDeSJDRak9ABiMyMa3tCWd6oHBqiPxyZwT7UUEyhdIoWJQ1GcagMLxsfqG18FJC32IqUbSOkBxKZFtPNOe6W6Bb59fOFjAlJ89IIhTBxy8Lk1G66hGUlsotHgbzR+EiQu8SLzgeoODEC75UUD4pMj2jmnvVDdgkGi2A6P8clsuA5oI4V9VDFpuLYvqQB0PJroF9d4Mf0RSF7qRZJV4wcGoA31ogHxKRHNr7jY/uX9auDEU+2td5Wy7WFyYu2jUG4wXUga2+QDCmLzjI8lHOs80Jok7o9w0O467ZPqFviP2M6wHWHbyzbaJhj8dz33KZvTS32cfizQsP/iRHSYpJwalMkwHCL5xfGKf6yfz0lKAUsbql0t+AW/kOwLMZDzjKS9pyQTM5Wk3dDHG83F/hb6xuMWVs51kv5iZkGNeMpplteUbb87yVkb9wUNYw+EvdbbW5NTaLBvpvY0DGS68fdQfL9qKFgoa7zItCTpE8V44cHpYK0XFQzCFul+BTYWtINaLgZitjQqLOFPBVs2QENVb9+enSleWjSGgSR9rjBab5It5bLR/glGsO0m2cMwQThRWE44Pw9Qx+0n+QttHclJ47/D14glReY3TI0Qtuin9zQAAAAASUVORK5CYII=>

[image7]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD8AAAAXCAYAAAC8oJeEAAAChUlEQVR4Xu2Xy4uPYRTHD0qUa1ETOzssXXYiC0uLyVhIISmXiNjaKcp1LGYiI1mQ/AWu2VAouUWJ5JZcknsuhfPtOc/8zvt1nvEu1Pxm5vepbzPn8zzv5cx7e0akRYvByHgWQ4WNmumuHqmZ6eqQbZp1LB3bNR81XzWraayZ+O1+/2K1d72c1PyQxoT11eFe7mnOufqu5rKrm4XhmvPkjkqheU+p+XESbww3gWU/c1wzllyXxOdfodT8TYk3hjvCsp+JzvOgxL5CqfnSM1Py8zRbNYck3Rm4FfGOOCDpLsrgWCc0C5zzTNXs0+yyeqXmp2ZVnkBM0XSylOSi86zwv5pfrrkhaWyh5rD5xebaNI/NTTa31+rMWUnvohGaaZLmrNHs1Dx38zy3WRi1m9/AUspNlnwGY08Cx9t8JzfG6tnOvTHXF79YGLWbxzeSiU4YlHwGYysChy+H54P5DL7JqGc498hciUVS/vzWbn4TSyk3WfIZjC0N3DVyb817UPtHAfV1VzOfWThqN7+ZpfJJ4o3h7rN0YLw9cFfJvTbvQTNYUOVH4mJ1+C+wjxK1m9/CUtLVizaGm8XSgfElgeMrHz3PXPcFVqZzWDq65R/7myRpwh4eMDC21tW7zZUYJWmcl8twD8nlJagH9VPNFc0ZzTHNfD/Bwdsyp6Qw57Skvzw+H8/s5ytJnxnPaGlctVuab5phlRkNMOelpP29kNRch6T95mO8s7l43vOxcevmK3hH0vGieLCGuETO817S/nNf0WPdVOA9UnrG0fwyV2Pd7hdOAx6s4nawNNC8X4jxnTDgyf9I7Sf3QKpv9YlSnTOomKvpkfRMo0ms/DwXqB5S8BqiRR3+AHaJ0IuGwqQAAAAAAElFTkSuQmCC>

[image8]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAXCAYAAABu8J3cAAABpklEQVR4Xu2VMShGURTH/6JMjAxiFCYZTMokKRlEyaCEQTIYlYXFKNkkxWBXFkkZjBZRJIPJhqKEhHO6577vvHOf917fJ1Hfr/69d//nf9+797373gXK/BPaSaukYeUtqPMkBklbcH2qTK0oPkmLpGrSuLTXSRc6pNiDy4xJu5f0TLqOEkXwCvckLHyjpIHwDT+sKVzC9auwhTxwxxZrEkMIB7IGl681vobr99bMA3fcsaZgB8JZVhrncJlmW8jCX3zFFgz9cLljWzBMweV2bSGLHhQG48XvulKHiE2p8SJOowv5nlwijaQ3hAOqV5kr8baVl8QAShiIhhfiIcKL8aPmdtarWUbYt4H0It6E8mP0WUM4Q/xiTdLOmukRXGZDefy1ebg2rdoRN9YQOhHeNM9AfMb/S/wEPPumHZFoEpMIa23ifbdgR5FeZ55IJ9ZkuOMdwq+E/XnjMXNwtRHjt4qftoZ4C7GTizgl1aCwmB7luKRDhjrSLVyOZ/cu5906lABnivr9/yQP6rykzbEUeKvgXZ01QzqIl3+HDrhXojUbS5T5q3wB77V5H7qR1ugAAAAASUVORK5CYII=>

[image9]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGIAAAAXCAYAAADwSpp8AAAD1ElEQVR4Xu2YWaiNURTHFxkzC5kTSsZEIWSWJBJFHpTwgjx49aAIJSVkCOlmTCgelDlzUSQPypgjUwiZM1t/a+9z1l1n73PPOffe7sk5v/p3vv3f+9vfPt+e1v6ISpQoUSJfBlmjRM3w3KQ7sZoZr2Cpw/puTUV31jXWH9YZk1dILGQNdNdHSNoLjUuWKFDuUKqxUIiRVD6vv0kXEqF2VXlHVOfa94HCfwLAX2A8zJ6rxqtparEuWZOqoSPqsRKsyyQPrUpiHdGGxMev5pTzC4mdrBbWpGroCE9t1i3WI1ZDk5cvsY5YRmG/jMI+mMNazTrs0r1ZO1iTfQGmB2s7a5XyNBho81i7WD1Z9VkPWbd1IUOsPfDHu2usKgNY/ViDkyUEDPQlrG2s1qz2rFeU5Z54nOQltrUZORLriKMU9jdT2AcrSfKgBKsJyYtF+gnrAsm+A3Bt6+nlvD4k931i/XZ5tqwHM3arNR24Z4K7Xu7S0IFkCaLpzmtH0um+7S3dddaUsX6y+tqMLIl1xEUK+xtI/A42w/GUJL+B8jDa4M1VHoCHEarTePkezCh4mULQ69ZQ4N6J7hrvabfK86DMMZVe5Ly8wVRHBSNsRgXEOmI/hf1NJD7C3hAJSr8PG771ALxRJo0lwYNzALyhyrOE6vUgbxLrPGtd+awkKHNQpWc7D9tAXvienGUzKiDWEbE9AhtjyPc8oPT8+QEPwBuj0lhudTk/+2KMpvSoToN7EeW9cNchnrG+qfRNipfNiF+X9R/KhVhHDCPxc42a7lN6PjZf6wHbbozek87/RbI/ZBqZ761hQD1D1HUilZVkLaUOrNCX8tkVg5H5gySyqAyxjgDwpxkPa/hb42kSlF5fphkxVqUxOnMhUzsA6keUBhA1IT01lf2PULuy4gTrHUmYVRVgBMQag9GPQMDjI6AuyrO8pvT6ljqvrvIaO2+m8vY5DyP0HMmnCmz0obPTYpJZGwPPQl3DlYc01FV5fmnCIfUs6xBJGB4EDUF0gHhaRyOV4SPJ2omwEkKDMMK66UIk55bPJGcD/IlMB6Q3JFET6ntJUhbPQd3w8Dx0Lj6v4AOdf65fDmZQ6mVZ2ZlvO1tzmlL/DfV/JTlDIBCAh2ffcGVXUPqzvBq5MkkwrUKj4n+iI8VfLl6sP094rph0PmA2xp6JzrpnzWJgCsVfit1jtlD4k0auIKTFjA2xl8qH0kXFXdZjVivlrSHphM7Ki3VYPiDywv6AU7VnD8kz9J5WdODP4+Vj48RJ2Ibl+Ma20XiVpTlrPclnF3wby/crRVHR1Bolioi/Yvoba0QNgvQAAAAASUVORK5CYII=>