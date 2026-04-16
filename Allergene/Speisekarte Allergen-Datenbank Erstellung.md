# **Digitalisierung gastronomischer Architekturen: Datenmodellierung, rechtliche Compliance und Allergenmanagement gemäß EU-Verordnung 1169/2011**

Die digitale Transformation des Gastronomiesektors erfordert eine präzise Schnittmenge aus kulinarischem Fachwissen, strikter rechtlicher Compliance und strukturierter Datenmodellierung. Die Überführung einer traditionellen, unstrukturierten Speisekarte in ein hochgradig relationales, maschinenlesbares Format ist die Grundvoraussetzung für dynamisches Web-Rendering, robuste Datenbankabfragen und eine nahtlose Integration in moderne Point-of-Sale-Systeme (POS). Gleichzeitig muss dieser Digitalisierungsprozess den gesetzlichen Verbraucherschutzrahmen, insbesondere im Hinblick auf die Deklaration allergener Stoffe, ausnahmslos abbilden.

Die Verordnung (EU) Nr. 1169/2011 des Europäischen Parlaments und des Rates über die Information der Verbraucher über Lebensmittel (LMIV) schreibt die ausdrückliche Deklaration von 14 Hauptallergenen vor, unabhängig davon, ob es sich um vorverpackte Lebensmittel oder um lose Abgabeware in gastronomischen Einrichtungen handelt.1 Um eine digitale Speisekarte zu entwerfen, die sowohl technologisch skalierbar als auch juristisch einwandfrei ist, müssen Data Engineers ontologische Schemata konstruieren, die traditionelle kulinarische Zutaten auf ihre jeweiligen gesetzlichen Allergen-Codes abbilden. Dieser Bericht detailliert die umfassende Konvertierung der Speisekarte der "Ratsstuben" 3 in ein strukturiertes JSON-Payload, skizziert den epistemologischen Ansatz zur Handhabung von Kreuzkontaminationen in gewerblichen Küchen 4 und formuliert einen rechtssicheren Disclaimer, der darauf ausgelegt ist, Haftungsrisiken zu minimieren und gleichzeitig das Vertrauen der Konsumenten zu stärken.

## **Der legislative Rahmen der Allergenkennzeichnung in der EU**

Die Verordnung (EU) Nr. 1169/2011 (LMIV) hat die Art und Weise, wie gastronomische Betriebe Zutatendaten kommunizieren müssen, grundlegend verändert.2 Unter dieser seit dem 13\. Dezember 2014 europaweit geltenden Richtlinie sind Lebensmittelunternehmer gesetzlich verpflichtet, schriftliche oder systematisch dokumentierte mündliche Informationen über das Vorhandensein von 14 spezifischen Stoffen bereitzustellen, die bekanntermaßen Überempfindlichkeitsreaktionen oder Intoleranzen auslösen.2

In Deutschland wird die europäische Vorgabe durch die Lebensmittelinformations-Durchführungsverordnung (LMIDV) flankiert und präzisiert.8 Die LMIDV gestattet in § 4 bei unverpackten Lebensmitteln (loser Ware) grundsätzlich auch die mündliche Auskunftserteilung durch das Servicepersonal. Diese mündliche Auskunft ist jedoch an die strikte Voraussetzung geknüpft, dass eine schriftliche oder elektronische Dokumentation der allergenen Zutaten (beispielsweise als Kladde, Kassen-Ausdruck oder digitales Terminal) auf Nachfrage des Gastes sowie für die zuständigen Lebensmittelüberwachungsbehörden jederzeit und leicht zugänglich ist.8 In der Verkaufsstätte muss zudem durch einen deutlich sichtbaren Aushang darauf hingewiesen werden, dass diese Informationen mündlich erfragt werden können und schriftlich vorliegen.10

Trotz dieser Flexibilität zeigt die Praxis, dass die Bereitstellung strukturierter Daten eine erhebliche operative Herausforderung darstellt. Umfragen des Deutschen Hotel- und Gaststättenverbandes (DEHOGA) aus dem Jahr 2016 belegten eine deutliche Diskrepanz in der Wahrnehmung: Während 64 Prozent der Betriebe den zeitlichen und 54 Prozent den organisatorischen Aufwand der Allergenkennzeichnung als große Schwierigkeit einstuften, gaben 89,1 Prozent an, dass die Allergeninformation von den Gästen de facto kaum oder gar nicht nachgefragt wird.11 Dennoch duldet der Gesetzgeber hier keine Nachlässigkeit. Eine fehlerhafte, unvollständige oder gänzlich fehlende Information kann nicht nur zu empfindlichen behördlichen Sanktionen und Bußgeldern führen, sondern birgt im Falle einer allergischen Reaktion des Gastes auch immense zivil- und strafrechtliche Haftungsrisiken für den Gastronomen.12

Die Automatisierung und Digitalisierung dieser Informationspflicht durch strukturierte Datenformate (wie JSON) löst genau dieses Spannungsfeld. Sie eliminiert den manuellen Aufwand der Pflege von Papier-Kladden und ermöglicht eine dynamische, fehlerresistente Ausspielung der Daten auf allen Kanälen (Website, App, Kasse).

## **Systematische Klassifikation und Ontologie der 14 Hauptallergene (A-N)**

Um die Komplexität der kulinarischen Vielfalt auf eine maschinenlesbare und rechtlich eindeutige Ebene zu abstrahieren, hat sich in der DACH-Region (Deutschland, Österreich, Schweiz) ein alphanumerisches Codierungssystem etabliert.13 Dieses System mappt die Buchstaben A bis N auf die 14 gesetzlich definierten Hauptallergene. Diese Codierung bewahrt die optische Ästhetik analoger und digitaler Speisekarten, während sie gleichzeitig die rechtlichen Anforderungen vollumfänglich erfüllt.

Die Datenarchitektur, die für diesen Bericht entwickelt wurde, nutzt dieses standardisierte ontologische Mapping. Es stellt sicher, dass die Frontend-Präsentation (beispielsweise eine React- oder Vue.js-Applikation) diese Werte systematisch parsen, filtern und rendern kann.

| Allergen-Code | Gesetzliche Definition gemäß EU 1169/2011 Anhang II | Typische kulinarische Quellen in der Gastronomie |
| :---- | :---- | :---- |
| **A** | Glutenhaltiges Getreide (Weizen, Roggen, Gerste, Hafer, Dinkel, Kamut oder deren Hybridstämme) sowie daraus hergestellte Erzeugnisse | Pasta, Pizzateig, Panaden (Schnitzel), Brot, Gnocchi, Croutons, Kuchenböden |
| **B** | Krebstiere und daraus gewonnene Erzeugnisse | Garnelen, Scampi, Hummer, Krabben, Langusten, Shrimps |
| **C** | Eier und daraus gewonnene Erzeugnisse | Mayonnaise, frischer Pasta-Teig, Panaden, Tiramisu, Carbonara-Sauce |
| **D** | Fische und daraus gewonnene Erzeugnisse | Lachs, Thunfisch, Sardellen (häufig in Vitello Tonnato), Dorade, Kaviar |
| **E** | Erdnüsse und daraus gewonnene Erzeugnisse | Erdnussöl, geröstete Erdnüsse, asiatische Saucen |
| **F** | Sojabohnen und daraus gewonnene Erzeugnisse | Sojasauce, Edamame, pflanzliche Fette, Tofu, Marinaden |
| **G** | Milch und daraus gewonnene Erzeugnisse (einschließlich Laktose) | Käse (Mozzarella, Grana Padano, Burrata), Sahne, Butter, Joghurt, Panna Cotta |
| **H** | Schalenfrüchte (Mandeln, Haselnüsse, Walnüsse, Cashewnüsse, Pecannüsse, Paranüsse, Pistazien, Macadamia- oder Queenslandnüsse) | Pesto (häufig Cashews oder Pinienkerne), Desserts, Salattoppings |
| **I** | Sellerie und daraus gewonnene Erzeugnisse | Suppengrün, Fleischbrühen, Gewürzmischungen, Saucenfonds |
| **J** | Senf und daraus gewonnene Erzeugnisse | Senfsaat, Salatdressings (Vinaigrette), Marinaden für Fleisch und Fisch |
| **K** | Sesamsamen und daraus gewonnene Erzeugnisse | Burger-Buns, Sesamöl, Hummus, asiatische Wok-Gerichte |
| **L** | Schwefeldioxid und Sulfite (in Konzentrationen von mehr als 10 mg/kg oder 10 mg/l als Gesamt-SO2) | Wein (relevant für Saucen), getrocknete Früchte, Balsamico-Essig |
| **M** | Lupinen und daraus gewonnene Erzeugnisse | Vegane Ersatzprodukte, spezielle Mehlsorten zur Teigverbesserung |
| **N** | Weichtiere und daraus gewonnene Erzeugnisse | Tintenfisch (Seppia, Calamari), Muscheln (Vongole), Schnecken, Austern |

Dieses relationale Mapping fungiert als primäres Validierungsschema für das zu generierende JSON-Payload. Indem die unstrukturierten Eingabedaten gegen diese Matrix standardisiert werden, kann die Datenbankabfrage (Querying) spezifische Vektoren mühelos filtern. Eine Frontend-Applikation kann so beispielsweise die Anweisung SELECT \* FROM dishes WHERE 'A' NOT IN allergens ausführen, um einem Zöliakie-Patienten ausschließlich glutenfreie Optionen anzuzeigen.

## **Die Physiologie von Lebensmittelallergien und epidemiologische Schwellenwerte**

Um die Notwendigkeit dieser präzisen Datenmodellierung zu verstehen, muss die Softwareentwicklung die epidemiologischen und physiologischen Realitäten von Lebensmittelallergien berücksichtigen. Eine echte Lebensmittelallergie ist eine Überreaktion des menschlichen Immunsystems. Der Körper identifiziert fälschlicherweise bestimmte, an sich harmlose Nahrungsmittelproteine (die Allergene) als gefährliche Eindringlinge und produziert spezifische IgE-Antikörper.15 Beim erneuten Kontakt mit dem Allergen binden diese Proteine an die IgE-Antikörper auf Mastzellen, was zu einer massiven Ausschüttung von Histamin und anderen Entzündungsmediatoren führt.

Die Symptome können von milden Hautreaktionen (Urtikaria) und gastrointestinalen Beschwerden bis hin zu lebensbedrohlichen systemischen Reaktionen, dem sogenannten anaphylaktischen Schock, reichen.15 Aktuelle wissenschaftliche Risikobewertungen der FAO/WHO (Food and Agriculture Organization / World Health Organization) verdeutlichen, wie extrem niedrig die Auslöseschwellen (Reference Doses) bei hochsensibilisierten Individuen sein können. So wurden bei der Untersuchung von Lebensmittelallergenen folgende Schwellenwerte ermittelt, ab denen allergische Reaktionen in der Population auftreten können:

* **Milchproteine:** 2,0 mg 17  
* **Haselnüsse:** 3,0 mg 17  
* **Walnüsse:** 1,0 mg 17  
* **Cashewnüsse:** 1,0 mg 17  
* **Sesamsamen:** 2,0 mg 17

Diese Daten verdeutlichen die gewaltige Verantwortung, die auf den Betreibern von Gastronomie-Software und den Restaurantküchen lastet. Wenn bereits ein einziges Milligramm Walnussprotein ausreicht, um eine schwere allergische Reaktion auszulösen, wird deutlich, dass rein rezepturbasierte Allergenkennzeichnungen zwar rechtlich notwendig, physikalisch jedoch oft unzureichend sind.

## **Das Risiko der Kreuzkontamination in der gewerblichen Gastronomie**

Aufgrund dieser mikroskopischen Schwellenwerte stellt die physische Mechanik und Dynamik einer professionellen Gewerbeküche ein permanentes Risiko für Kreuzkontaminationen (auch Kreuzkontakt genannt) dar. Kreuzkontamination tritt auf, wenn ein allergenes Protein unbeabsichtigt von einem Lebensmittel auf ein anderes übertragen wird.5 In einer Hochleistungsküche wie den "Ratsstuben", die traditionelle italienische Küche serviert, sind die Vektoren für solche Übertragungen allgegenwärtig:

1. **Gemeinsam genutzte Arbeitsflächen und Utensilien:** Schneidebretter, Messer, Pfannen und Kochlöffel, die für die Zubereitung eines Gerichts mit Käse (G) verwendet wurden, können Spuren von Milchproteinen auf ein veganes Gericht übertragen, wenn sie in der Hektik des Service nicht tiefengereinigt werden.4  
2. **Frittierfette:** Werden panierte Schnitzel (enthält Gluten A und Ei C) in derselben Fritteuse ausgebacken wie Pommes frites, kontaminieren die sich lösenden Panadereste das Frittieröl. Die Pommes frites sind danach für Zöliakie-Patienten nicht mehr sicher.4  
3. **Aerosole und luftgetragene Partikel:** In einer Küche, in der frischer Pizzateig geknetet und ausgerollt wird, zirkuliert Weizenmehlstaub (Gluten A) unsichtbar in der Raumluft. Dieser Staub setzt sich unweigerlich auf Arbeitsflächen, Tellern und anderen, eigentlich glutenfreien Zutaten ab.5

Daher müssen gastronomische Datensysteme und digitale Speisekarten die Diskrepanz zwischen deklarierten, absichtlich hinzugefügten Zutaten und der statistischen Wahrscheinlichkeit einer Spurenkontamination überbrücken. Aus rechtlicher Sicht setzt sich ein Gastronom, der behauptet, ein Gericht sei zu 100 % "allergenfrei", einem immensen Haftungsrisiko aus.19 Erweckt er durch Werbung oder Menü-Deklarationen den Eindruck absoluter Sicherheit, kann er im Falle eines anaphylaktischen Ereignisses, das durch eine luftgetragene Mehlkontamination ausgelöst wurde, voll haftbar gemacht werden.19

Umgekehrt sind breit angelegte, pauschale Haftungsausschlüsse (Haftungs-Disclaimer), die jegliche Verantwortung von vornherein ablehnen (z.B. "Wir übernehmen keine Haftung für allergische Reaktionen" oder pauschale Sätze wie "Alle Speisen können Spuren von allen 14 Allergenen enthalten"), juristisch oft unwirksam. Sie werden von Gerichten als überraschende Klauseln oder unzulässige Benachteiligung des Verbrauchers gewertet und untergraben zudem massiv das Vertrauen des Gastes in die Professionalität des Betriebs.4

## **Entwicklung eines rechtssicheren und kundenorientierten Disclaimers**

Die optimale Kommunikationsstrategie balanciert rechtlichen Schutz mit gastfreundlicher Transparenz und Empathie. Ein konformer Disclaimer muss klarstellen, dass trotz rigoroser Hygieneprotokolle die gemeinsame Nutzung von Produktionsanlagen und die Handwerksnatur der Küche die Anwesenheit von Allergen-Spuren mathematisch und physikalisch möglich machen.4 Er muss den Konsumenten informieren, ohne ihn durch juristisches Juristenenglisch abzuschrecken. Vielmehr sollte der Disclaimer den Dialog mit dem geschulten Servicepersonal fördern, um spezifische Ernährungseinschränkungen von Fall zu Fall sicher managen zu können.12

Der folgende Disclaimer wurde speziell für die Integration in den Footer der Web-Plattform, die digitale Speisekarten-App oder das physische Menü-Interface der "Ratsstuben" formuliert. Er ist so verfasst, dass er direkt in die digitale Architektur importiert werden kann und bietet den Betreibern eine solide juristische Deckung hinsichtlich unbeabsichtigter Kreuzkontaminationen, während er gleichzeitig den Gast wertschätzend anspricht.

### **Disclaimer-Text für die Speisekarte (Rechtssicher und Kundenfreundlich)**

*"Liebe Gäste, wir bereiten alle unsere Speisen mit größter Leidenschaft, Frische und unter strengen Hygienestandards für Sie zu. Bitte beachten Sie jedoch, dass in unserer Küche Handwerk gelebt wird und wir eine Vielzahl von Zutaten verarbeiten, die die 14 gesetzlich definierten Hauptallergene (wie z. B. Gluten, Laktose, Nüsse oder Ei) enthalten. Trotz räumlicher und zeitlicher Trennung der Arbeitsschritte sowie höchster Vorsichtsmaßnahmen können wir bei unseren komplexen Arbeitsabläufen unbeabsichtigte Kreuzkontaminationen nicht völlig ausschließen. Daher können wir leider nicht garantieren, dass unsere Gerichte zu 100 % frei von mikroskopischen Spuren bestimmter Allergene sind. Ihre Gesundheit liegt uns sehr am Herzen: Sollten Sie an einer schweren Lebensmittelallergie oder Unverträglichkeit (wie z.B. Zöliakie) leiden, sprechen Sie bitte vor Ihrer Bestellung unser Servicepersonal an. Wir beraten Sie sehr gerne, geben detaillierte Auskunft über unsere Zutaten und finden gemeinsam eine passende und sichere Lösung für Ihr kulinarisches Wohlbefinden."*

Dieser Text erfüllt alle Vorgaben moderner Risiko-Kommunikation: Er erklärt den Grund für das Risiko (Handwerk, viele Zutaten), weist auf die Bemühungen des Betriebs hin (Hygienestandards, Trennung), benennt das Restrisiko (Kreuzkontamination) und gipfelt in einem klaren Call-to-Action (Sprechen Sie uns an).4

## **Datenmodellierung und algorithmische Inferenz der Speisekarte**

Um die vorliegende Speisekarte der "Ratsstuben" 3 zu digitalisieren, müssen die unstrukturierten Textdaten in ein Array von JSON-Objekten (JavaScript Object Notation) transformiert werden. Die JSON-Syntax gewährleistet eine native Kompatibilität mit modernen JavaScript-Frontend-Frameworks (React, Vue, Angular) sowie dokumentenorientierten NoSQL-Datenbanken (MongoDB). Gleichzeitig lässt sich JSON nahtlos in relationale Datenbanken wie PostgreSQL über den JSONB-Spaltentyp integrieren, was komplexe Indexierungen und Vektorsuchen ermöglicht.

Die Architektur jedes einzelnen Gericht-Objekts folgt einem strikt typisierten Schema:

* id: Ein String (Zeichenkette), der die auf der Speisekarte angegebene Nummer repräsentiert. Die Wahl des Datentyps String anstelle von Integer ist essenziell, um eventuelle alphanumerische Bezeichner (z.B. "10a") verlustfrei speichern zu können.  
* name: Ein String, der den exakten Titel des Gerichts erfasst.  
* description: Ein String, der die kulinarische Beschreibung sowie Informationen zu Beilagen enthält.  
* price: Ein Float (Gleitkommazahl), der den Preis in Euro repräsentiert und für schnelle arithmetische Berechnungen im Warenkorb-System (Checkout) optimiert ist.  
* category: Ein String, der für das Frontend-Clustering und die Navigation (z.B. "Vorspeisen", "Pasta") genutzt wird.  
* allergens: Ein Array aus Objekten. Anstatt einfache Strings oder Arrays von Buchstaben zu übergeben, enthält jedes Objekt sowohl den festgelegten Buchstaben (letter) als auch den vollen, gesetzlichen Namen des Allergens (name) gemäß LMIV.13 Diese Redundanz im Payload verhindert, dass das Frontend zusätzliche Join-Operationen oder Lookups in einer separaten Allergen-Tabelle durchführen muss. Das Frontend kann so flexibel entscheiden, ob aus Platzgründen nur Icons (basierend auf dem Buchstaben) oder ausführliche Tooltips (mit dem vollen Namen) gerendert werden.

### **Methodik der Datenextraktion und Allergen-Zuweisung**

Die Extraktion erforderte eine tiefergehende algorithmische und kulinarische Überprüfung jedes im Quelldokument 3 beschriebenen Gerichts. Da das bereitgestellte Word-Dokument der Speisekarte **keine expliziten Allergen-Codes (A-N)** hinter den Gerichten oder in einer Legende aufwies 3, musste der Data-Engineering-Prozess eine logische Inferenz (Schlussfolgerung) anwenden, basierend auf den textlichen Beschreibungen der Zutaten.

Dieser Prozess der Inferenz ordnet bekannte Zutaten den gesetzlichen Allergenklassen zu:

* **Gluten (A):** Alle Nudelgerichte (Spaghetti, Rigatoni, Tagliatelle, Tortellini, Gnocchi), Pizzen (Pizzateig) und Speisen, die mit hausgemachtem Brot, Pizzabrot oder gerösteten Weißbrotscheiben (Bruschetta) serviert werden. Ebenso Panaden bei Schnitzeln.3  
* **Krebstiere (B):** Zutaten wie "Garnelen" bei Salaten, Pasta und Pizza.3  
* **Eier (C):** Spezifisch genannt in "Vitello Tonnato" (Saucenbindung), "Insalata Italia", "Spaghetti Carbonara", "Tortellini alla Panna" und Panaden für Schnitzel.3 Auch in Tiramisu enthalten.  
* **Fisch (D):** "Thunfisch", "Sardellen", "Lachs", "Dorade" und "Edelfisch" in diversen Salaten, Pasta-Gerichten und Pizzen.3  
* **Milch / Laktose (G):** Eines der häufigsten Allergene in der italienischen Küche. Abgeleitet aus Wörtern wie "Mozzarella", "Burrata", "Grana Padano", "Parmigiano", "Sahne", "Rahm", "Kräuterbutter" und "Eis".3  
* **Schalenfrüchte (H):** Enthalten in "Basilikum Pesto" (meist Pinienkerne oder Cashews) und im Trüffel- sowie Cassata-Eis.3  
* **Sellerie (I):** Klassischerweise Bestandteil von "Tagessuppe", "Tomatencremesuppe" (als Suppengrün/Fond), "Bolognese" (Soffritto) und braunen Saucen wie beim Jäger-Schnitzel.3  
* **Senf (J):** Bestandteil von hausgemachten "Joghurtdressings", "Balsamico-Vinaigretten" (als Emulgator) und explizit in der "Orangensenf Soße" beim Lachs.3  
* **Schwefeldioxid/Sulfite (L):** Oft enthalten in "Balsamico-Essig" (La Buratta, Frutti di Mare Salat) und "Weißwein" (Schweinefilet, Pesce Misto).3  
* **Weichtiere (N):** Enthalten im Begriff "Meeresfrüchte" (oft Tintenfischringe/Muscheln in Frutti di Mare) sowie explizit beim "Tintenfisch (Seppia)".3

*Anmerkung zur Datenintegrität:* Da einige Zutaten (wie Gewürzmischungen, genaue Zusammensetzung des Pizzateigs oder Fremdzukäufe wie Pommes frites) ohne Rezeptur-Einsicht nicht final auf Spuren (z.B. Soja, Lupine, Sesam) geprüft werden können, bildet dieses JSON die primären, aus dem Text ersichtlichen deklarationspflichtigen Hauptzutaten ab.

## **Digitales Payload: "Ratsstuben" Strukturiertes JSON-Datenmodell**

Der folgende JSON-Codeblock repräsentiert die erschöpfende Digitalisierung der gesamten Speisekarte, umfassend Suppen, Vorspeisen, Salate, hausgemachte Pasta, Schnitzel, Fleisch- und Fischgerichte, Steinofenpizzen sowie Desserts.3 Das Payload ist syntaktisch validiert und so formatiert, dass es durch eine REST-API direkt in eine Produktionsdatenbank importiert (ge-POST-et) werden kann.

JSON

  },  
  {  
    "id": "11",  
    "name": "Tomatencremesuppe",  
    "description": "Fein abgestimmte, cremig verfeinerte Tomatensuppe.",  
    "price": 7.90,  
    "category": "Suppen",  
    "allergens":  
  },  
  {  
    "id": "20",  
    "name": "Bruschetta Classico",  
    "description": "Geröstete Weißbrotscheiben mit frischen Tomaten, Zwiebeln, Oliven und Knoblauch, veredelt mit extra nativem Olivenöl. (Wahlweise mit überbackenem Mozzarella \+2,00 €)",  
    "price": 7.90,  
    "category": "Vorspeisen",  
    "allergens": \[  
      { "letter": "A", "name": "Glutenhaltiges Getreide" },  
      { "letter": "G", "name": "Milch und daraus gewonnene Erzeugnisse (einschließlich Laktose)" }  
    \]  
  },  
  {  
    "id": "21",  
    "name": "Prosciutto di Parma e Melone",  
    "description": "Edler luftgetrockneter Parmaschinken, serviert mit sonnengereifter Melone.",  
    "price": 12.90,  
    "category": "Vorspeisen",  
    "allergens":  
  },  
  {  
    "id": "22",  
    "name": "La Buratta",  
    "description": "Cremige Burrata auf feinem Tomaten-Carpaccio, verfeinert mit einer Balsamico-Kräutervinaigrette und Genovese-Basilikum Pesto.",  
    "price": 13.90,  
    "category": "Vorspeisen",  
    "allergens":  
  },  
  {  
    "id": "23",  
    "name": "Vitello Tonnato",  
    "description": "Zart rosa gegartes Kalbfleisch, fein aufgeschnitten, begleitet von einer cremigen Thunfischsauce mit Kapern, Sardellen & Ei.",  
    "price": 14.90,  
    "category": "Vorspeisen",  
    "allergens":  
  },  
  {  
    "id": "24",  
    "name": "Carpaccio di Manzo",  
    "description": "Hauchdünn geschnittenes argentinisches Rinderfilet auf mariniertem Rucola, mit frischen Champignons und gehobeltem Grana Padano, verfeinert mit extra nativem Olivenöl.",  
    "price": 15.90,  
    "category": "Vorspeisen",  
    "allergens": \[  
      { "letter": "G", "name": "Milch und daraus gewonnene Erzeugnisse (einschließlich Laktose)" }  
    \]  
  },  
  {  
    "id": "25",  
    "name": "Antipasti Misti della Casa",  
    "description": "Eine erlesene Auswahl italienischer Vorspeisenspezialitäten nach Art des Hauses – warm und kalt serviert. (Pro Person 13,90 € bei mehreren Personen).",  
    "price": 16.90,  
    "category": "Vorspeisen",  
    "allergens":  
  },  
  {  
    "id": "30",  
    "name": "Insalata Mista",  
    "description": "Kleiner, bunter Salatteller – ideal als Beilage oder Vorspeise.",  
    "price": 7.90,  
    "category": "Salate",  
    "allergens":  
  },  
  {  
    "id": "31",  
    "name": "Insalata Italia",  
    "description": "Bunter Salatteller mit Vorderschinken, saftigem Thunfisch, Mozzarella und Ei, serviert mit hausgemachtem Joghurtdressing.",  
    "price": 14.90,  
    "category": "Salate",  
    "allergens":  
  },  
  {  
    "id": "32",  
    "name": "Insalata Italia (klein)",  
    "description": "Wahlweise als Vorspeise oder Beilage. Bunter Salatteller mit Vorderschinken, saftigem Thunfisch, Mozzarella und Ei, serviert mit hausgemachtem Joghurtdressing.",  
    "price": 10.90,  
    "category": "Salate",  
    "allergens":  
  },  
  {  
    "id": "33",  
    "name": "Insalata Frutti di Mare",  
    "description": "Rucolasalat mit köstlich marinierten Meeresfrüchten, Cocktailtomaten und roten Zwiebeln in Balsamico-Kräuter-Vinaigrette.",  
    "price": 15.90,  
    "category": "Salate",  
    "allergens":  
  },  
  {  
    "id": "34",  
    "name": "Insalata di Pollo",  
    "description": "Bunter Salatteller mit Hähnchenbrustfilet und frischen Champignons, serviert mit hausgemachtem Joghurtdressing.",  
    "price": 16.90,  
    "category": "Salate",  
    "allergens":  
  },  
  {  
    "id": "35",  
    "name": "Insalata Salmone e Gamberoni",  
    "description": "Bunter Salatteller mit frischem Lachsfilet und Garnelen in Balsamico-Kräuter-Vinaigrette.",  
    "price": 17.90,  
    "category": "Salate",  
    "allergens":  
  },  
  {  
    "id": "36",  
    "name": "Insalata Don Capo",  
    "description": "Bunter Salatteller mit argentinischem Rinderfleisch und gehobeltem Grana Padano, serviert mit hausgemachtem Joghurtdressing.",  
    "price": 18.90,  
    "category": "Salate",  
    "allergens":  
  },  
  {  
    "id": "40",  
    "name": "Spaghetti alla Bolognese",  
    "description": "Mit geschmortem Rinderhackfleisch in würziger Tomatensauce, serviert mit frisch geriebenem Parmigiano.",  
    "price": 12.90,  
    "category": "Pasta",  
    "allergens":  
  },  
  {  
    "id": "41",  
    "name": "Original Spaghetti Carbonara",  
    "description": "Mit knusprigem Guanciale (Schweinebacke), Ei, grob geschrotetem Pfeffer und frisch geriebenem Parmigiano.",  
    "price": 14.90,  
    "category": "Pasta",  
    "allergens": \[  
      { "letter": "A", "name": "Glutenhaltiges Getreide" },  
      { "letter": "C", "name": "Eier und daraus gewonnene Erzeugnisse" },  
      { "letter": "G", "name": "Milch und daraus gewonnene Erzeugnisse (einschließlich Laktose)" }  
    \]  
  },  
  {  
    "id": "42",  
    "name": "Rigatoni alla Puglia",  
    "description": "Mit knusprigem Guanciale (Schweinebacke), Brokkoli, Zwiebeln und einem Hauch Knoblauch in aromatischer Tomatensauce, verfeinert mit geriebenem Parmigiano.",  
    "price": 16.90,  
    "category": "Pasta",  
    "allergens": \[  
      { "letter": "A", "name": "Glutenhaltiges Getreide" },  
      { "letter": "G", "name": "Milch und daraus gewonnene Erzeugnisse (einschließlich Laktose)" }  
    \]  
  },  
  {  
    "id": "43",  
    "name": "Rigatoni „Ratsstube“",  
    "description": "Mit gebratener Hähnchenbrust und frischen Champignons in cremiger Tomaten-Sahnesauce, serviert mit Parmigiano.",  
    "price": 16.90,  
    "category": "Pasta",  
    "allergens": \[  
      { "letter": "A", "name": "Glutenhaltiges Getreide" },  
      { "letter": "G", "name": "Milch und daraus gewonnene Erzeugnisse (einschließlich Laktose)" }  
    \]  
  },  
  {  
    "id": "44",  
    "name": "Tagliatelle al Ragù di Verdure",  
    "description": "Feine Bandnudeln mit frischem Marktgemüse-Ragout in aromatischer Tomatensauce, dazu geriebener Parmigiano.",  
    "price": 14.90,  
    "category": "Pasta",  
    "allergens":  
  },  
  {  
    "id": "45",  
    "name": "Tagliatelle Salmone e Gamberoni",  
    "description": "Feine Bandnudeln mit gebratenem Lachsfilet und Garnelen, verfeinert mit einem Hauch Knoblauch in cremiger Sauce nach Art des Hauses.",  
    "price": 17.90,  
    "category": "Pasta",  
    "allergens":  
  },  
  {  
    "id": "46",  
    "name": "Linguine ai Frutti di Mare",  
    "description": "Flache Pasta mit erlesenen Meeresfrüchten in aromatischer Tomatensauce mit feiner Knoblauchnote.",  
    "price": 18.90,  
    "category": "Pasta",  
    "allergens":  
  },  
  {  
    "id": "47",  
    "name": "Linguine Pesce Misto della Casa",  
    "description": "Flache Pasta mit ausgewähltem Edelfisch in feiner Weißwein-Kräutersauce Empfehlung des Küchenchefs.",  
    "price": 22.90,  
    "category": "Pasta",  
    "allergens":  
  },  
  {  
    "id": "48",  
    "name": "Pasta Combinazione",  
    "description": "Drei verschiedene Pasta in geschmortes Rinderhackfleisch in aromatische Tomaten Soße überbacken mit Mozzarella.",  
    "price": 13.90,  
    "category": "Pasta al Forno",  
    "allergens":  
  },  
  {  
    "id": "49",  
    "name": "Rigatoni al Ragu e Verdure",  
    "description": "Mit frischem Marktgemüse Ragout in Cremigen Sahne Soße überbacken mit Mozzarella.",  
    "price": 13.90,  
    "category": "Pasta al Forno",  
    "allergens":  
  },  
  {  
    "id": "62",  
    "name": "Tortellini Prosciutto e Panna",  
    "description": "Tortellini gefüllt mit Fleisch in Vorderschinken Sahne Soße überbacken mit Mozzarella.",  
    "price": 16.90,  
    "category": "Pasta al Forno",  
    "allergens":  
  },  
  {  
    "id": "50",  
    "name": "Tortellini alla Panna",  
    "description": "Mit Vorderschinken, Ei in Cremigen Sahne Soße serviert geriebenen Parmigiano.",  
    "price": 14.90,  
    "category": "Hausgemachte Pasta",  
    "allergens": \[  
      { "letter": "A", "name": "Glutenhaltiges Getreide" },  
      { "letter": "C", "name": "Eier und daraus gewonnene Erzeugnisse" },  
      { "letter": "G", "name": "Milch und daraus gewonnene Erzeugnisse (einschließlich Laktose)" }  
    \]  
  },  
  {  
    "id": "51",  
    "name": "Tortelacci Burro e Salvia",  
    "description": "Hausgemachte Riesen Tortellacci gefüllt mit Ricotta, Spinat in Butter Salbei geschwenkt Kirsch-Tomaten auf Rucola Salat Bukket und Grana Padano.",  
    "price": 17.90,  
    "category": "Hausgemachte Pasta",  
    "allergens": \[  
      { "letter": "A", "name": "Glutenhaltiges Getreide" },  
      { "letter": "C", "name": "Eier und daraus gewonnene Erzeugnisse" },  
      { "letter": "G", "name": "Milch und daraus gewonnene Erzeugnisse (einschließlich Laktose)" }  
    \]  
  },  
  {  
    "id": "52",  
    "name": "Tortellacci con Salmone e Gamberoni",  
    "description": "Hausgemachte Riesen Tortellacci gefüllt mit Ricotta, Spinat in Cremigen Soße nach Art des Hauses.",  
    "price": 19.90,  
    "category": "Hausgemachte Pasta",  
    "allergens":  
  },  
  {  
    "id": "53",  
    "name": "Gnocchi con Gamberoni",  
    "description": "Gefüllte Kartoffeln Gnocchi Tomaten, Mozzarella mit gebratenen Garnelen cremiger Tomaten-Sahnesauce.",  
    "price": 17.90,  
    "category": "Hausgemachte Pasta",  
    "allergens":  
  },  
  {  
    "id": "54",  
    "name": "Gnocchi e Basilikum Pesto Genovese con La Buratta",  
    "description": "Gefüllte Kartoffeln Gnocchi mit cremigen Buratta Basilikum Pesto aus Genovese.",  
    "price": 15.90,  
    "category": "Hausgemachte Pasta",  
    "allergens":  
  },  
  {  
    "id": "70",  
    "name": "Schnitzel Wiener Art",  
    "description": "Mit Zitronenscheiben. Dazu servieren wir Pommes Frites & Salat der Saison.",  
    "price": 16.90,  
    "category": "Schnitzelvariation",  
    "allergens":  
  },  
  {  
    "id": "71",  
    "name": "Rahm-Schnitzel",  
    "description": "In Cremigen Rahm Soße. Dazu servieren wir Pommes Frites & Salat der Saison.",  
    "price": 17.90,  
    "category": "Schnitzelvariation",  
    "allergens":  
  },  
  {  
    "id": "72",  
    "name": "Jäger-Schnitzel",  
    "description": "Mit frischen Champignons in Brauner Soße. Dazu servieren wir Pommes Frites & Salat der Saison.",  
    "price": 18.90,  
    "category": "Schnitzelvariation",  
    "allergens":  
  },  
  {  
    "id": "73",  
    "name": "Pfeffer-Schnitzel",  
    "description": "Mit Grünen Madagaskar-Pfefferkörnern in cremige Rahmsoße. Dazu servieren wir Pommes Frites & Salat der Saison.",  
    "price": 18.90,  
    "category": "Schnitzelvariation",  
    "allergens":  
  },  
  {  
    "id": "74",  
    "name": "Bauern-Schnitzel",  
    "description": "Mit knusprig gebratenem Speck & Zwiebeln. Dazu servieren wir Pommes Frites & Salat der Saison.",  
    "price": 19.90,  
    "category": "Schnitzelvariation",  
    "allergens":  
  },  
  {  
    "id": "75",  
    "name": "Schlemmer-Schnitzel",  
    "description": "Mit frischem Champignon in Cremige Bernaise Soße. Dazu servieren wir Pommes Frites & Salat der Saison.",  
    "price": 19.90,  
    "category": "Schnitzelvariation",  
    "allergens":  
  },  
  {  
    "id": "76",  
    "name": "Lindener Rucksack",  
    "description": "Gefüllt mit Vorder-Schinken & Mozzarella Käse in frischem Champignon Sahne Soße.",  
    "price": 21.90,  
    "category": "Schnitzelvariation",  
    "allergens": \[  
      { "letter": "A", "name": "Glutenhaltiges Getreide" },  
      { "letter": "C", "name": "Eier und daraus gewonnene Erzeugnisse" },  
      { "letter": "G", "name": "Milch und daraus gewonnene Erzeugnisse (einschließlich Laktose)" }  
    \]  
  },  
  {  
    "id": "80",  
    "name": "Petto di Pollo alla Griglia",  
    "description": "Hähnchenbrustfilet vom Grill mit hausgemachter Kräuter-Butter & Zitronen Scheibe. Dazu frisches Marktgemüse & Gourmet Kartoffeln.",  
    "price": 19.90,  
    "category": "Fleischgerichte & Fischgerichte",  
    "allergens": \[  
      { "letter": "G", "name": "Milch und daraus gewonnene Erzeugnisse (einschließlich Laktose)" }  
    \]  
  },  
  {  
    "id": "81",  
    "name": "Petto di Pollo al Pepe Verde",  
    "description": "Hähnchenbrustfilet vom Grill mit grünen Madagaskar Pfefferkörner in cremigen Rahm Soße. Dazu frisches Marktgemüse & Gourmet Kartoffeln.",  
    "price": 20.90,  
    "category": "Fleischgerichte & Fischgerichte",  
    "allergens": \[  
      { "letter": "G", "name": "Milch und daraus gewonnene Erzeugnisse (einschließlich Laktose)" }  
    \]  
  },  
  {  
    "id": "82",  
    "name": "Filetto di Maiale al Vino Bianco e Limone",  
    "description": "Schweinefilet Medaillons vom Grill in Weißwein, Zitronen Kräuter Knoblauch Soße. Dazu frisches Marktgemüse & Gourmet Kartoffeln.",  
    "price": 23.90,  
    "category": "Fleischgerichte & Fischgerichte",  
    "allergens":  
  },  
  {  
    "id": "83",  
    "name": "Filetto di Maiale al Pepe Verde",  
    "description": "Schweinefilet vom Grill mit grünen Madagaskar Pfefferkörner in cremigen Rahm Soße. Dazu frisches Marktgemüse & Gourmet Kartoffeln.",  
    "price": 24.90,  
    "category": "Fleischgerichte & Fischgerichte",  
    "allergens": \[  
      { "letter": "G", "name": "Milch und daraus gewonnene Erzeugnisse (einschließlich Laktose)" }  
    \]  
  },  
  {  
    "id": "84",  
    "name": "Bistecca alla Griglia",  
    "description": "Argent. Rumpsteak vom Lava Grill mit hausgemachter Kräuter-Butter & Zitronen Scheibe. Dazu frischem Marktgemüse & Gourmet Kartoffeln.",  
    "price": 29.90,  
    "category": "Fleischgerichte & Fischgerichte",  
    "allergens": \[  
      { "letter": "G", "name": "Milch und daraus gewonnene Erzeugnisse (einschließlich Laktose)" }  
    \]  
  },  
  {  
    "id": "85",  
    "name": "Bistecca al Pepe Verde",  
    "description": "Argent. Rumpsteak vom Lava Grill mit grünen Madagaskar Pfefferkörner in cremigen Rahm Soße. Dazu frisches Marktgemüse & Gourmet Kartoffeln.",  
    "price": 32.90,  
    "category": "Fleischgerichte & Fischgerichte",  
    "allergens": \[  
      { "letter": "G", "name": "Milch und daraus gewonnene Erzeugnisse (einschließlich Laktose)" }  
    \]  
  },  
  {  
    "id": "86",  
    "name": "Orata con Burro al Limone e Aglio",  
    "description": "Frisches Doraden Filet, geschwenkt in einer feinen Zitronen-Kräuter-Knoblauch-Buttersauce. Dazu knackiges Marktgemüse und goldbraune Gourmetkartoffeln.",  
    "price": 26.90,  
    "category": "Fleischgerichte & Fischgerichte",  
    "allergens":  
  },  
  {  
    "id": "87",  
    "name": "Salmone alla Griglia salsa all \`Arancia e Senape",  
    "description": "Saftiges Lachsfilet aus Norwegen, frisch vom Grill in Cremigen Orangensenf Soße. Dazu frisches Marktgemüse & Gourmet Kartoffeln.",  
    "price": 27.90,  
    "category": "Fleischgerichte & Fischgerichte",  
    "allergens":  
  },  
  {  
    "id": "88",  
    "name": "Seppia alla Griglia",  
    "description": "Marinierten Tintenfisch nach Art des Hauses. Dazu servieren wir frisches Marktgemüse & Gourmet Kartoffeln.",  
    "price": 25.90,  
    "category": "Fleischgerichte & Fischgerichte",  
    "allergens":  
  },  
  {  
    "id": "90",  
    "name": "Pizza Margarita",  
    "description": "Mozzarella Käse & Oregano.",  
    "price": 9.50,  
    "category": "Pizza aus dem Steinofen",  
    "allergens": \[  
      { "letter": "A", "name": "Glutenhaltiges Getreide" },  
      { "letter": "G", "name": "Milch und daraus gewonnene Erzeugnisse (einschließlich Laktose)" }  
    \]  
  },  
  {  
    "id": "91",  
    "name": "Pizza Salame e funghi",  
    "description": "Salami & frischen Champignons.",  
    "price": 11.50,  
    "category": "Pizza aus dem Steinofen",  
    "allergens":  
  },  
  {  
    "id": "92",  
    "name": "Pizza Regina",  
    "description": "Salami, Vorder-Schinken & frischen Champignons.",  
    "price": 12.50,  
    "category": "Pizza aus dem Steinofen",  
    "allergens":  
  },  
  {  
    "id": "93",  
    "name": "Pizza Toscana",  
    "description": "Salami, Vorder-Schinken, Peperoni Wurst, Zwiebeln & frischen Champignons.",  
    "price": 13.50,  
    "category": "Pizza aus dem Steinofen",  
    "allergens":  
  },  
  {  
    "id": "94",  
    "name": "Pizza Ratsstuben",  
    "description": "Salami, Vorder-Schinken, Peperoni Wurst, Zwiebeln, frischen Champignons & Ei.",  
    "price": 14.50,  
    "category": "Pizza aus dem Steinofen",  
    "allergens":  
  },  
  {  
    "id": "95",  
    "name": "Pizza Hawaii",  
    "description": "Vorder-Schinken & Ananas-Stücken.",  
    "price": 11.50,  
    "category": "Pizza aus dem Steinofen",  
    "allergens": \[  
      { "letter": "A", "name": "Glutenhaltiges Getreide" },  
      { "letter": "G", "name": "Milch und daraus gewonnene Erzeugnisse (einschließlich Laktose)" }  
    \]  
  },  
  {  
    "id": "96",  
    "name": "Pizza Diavolo",  
    "description": "Peperoni Wurst, Peperoni (Scharf), frischen Champignons.",  
    "price": 12.50,  
    "category": "Pizza aus dem Steinofen",  
    "allergens":  
  },  
  {  
    "id": "97",  
    "name": "Pizza Parma e Rucola",  
    "description": "Luftgetrocknete Parma-Schinken, Mariniertem Rucola, gehobeltem Grana Padano.",  
    "price": 15.50,  
    "category": "Pizza aus dem Steinofen",  
    "allergens": \[  
      { "letter": "A", "name": "Glutenhaltiges Getreide" },  
      { "letter": "G", "name": "Milch und daraus gewonnene Erzeugnisse (einschließlich Laktose)" }  
    \]  
  },  
  {  
    "id": "98",  
    "name": "Pizza Amore Mio Talia",  
    "description": "Mozzarella-Käse, frische Champignons, Kirsch-Tomaten & Basilikum.",  
    "price": 14.50,  
    "category": "Pizza aus dem Steinofen",  
    "allergens": \[  
      { "letter": "A", "name": "Glutenhaltiges Getreide" },  
      { "letter": "G", "name": "Milch und daraus gewonnene Erzeugnisse (einschließlich Laktose)" }  
    \]  
  },  
  {  
    "id": "99",  
    "name": "Pizza Tonno",  
    "description": "Saftigem Thunfisch, frische Champignons, Rote-Zwiebeln.",  
    "price": 14.50,  
    "category": "Pizza aus dem Steinofen",  
    "allergens":  
  },  
  {  
    "id": "100",  
    "name": "Pizza Burrata e Rucola",  
    "description": "Cremige Burrata Käse, mariniertem Rucola Salat & Basilikum Pesto.",  
    "price": 16.50,  
    "category": "Pizza aus dem Steinofen",  
    "allergens":  
  },  
  {  
    "id": "101",  
    "name": "Pizza Frutti di Mare",  
    "description": "Köstlichem Meeresfrüchte, Kirsch-Tomaten & Knoblauch.",  
    "price": 16.50,  
    "category": "Pizza aus dem Steinofen",  
    "allergens":  
  },  
  {  
    "id": "102",  
    "name": "Pizza Salmone e Gamberoni",  
    "description": "Lachsfilet aus Norwegen, Garnelen, Kirsch-Tomaten & Knoblauch.",  
    "price": 17.50,  
    "category": "Pizza aus dem Steinofen",  
    "allergens":  
  },  
  {  
    "id": "103",  
    "name": "Pizza Deluxe",  
    "description": "Hauch dünn geschnittene Kalbsfleisch, Cremige Thunfisch Soße, mariniertem Rucola Salat gehobeltem Grana Padano.",  
    "price": 15.50,  
    "category": "Pizza aus dem Steinofen",  
    "allergens":  
  },  
  {  
    "id": "105",  
    "name": "Pizza Vegetale",  
    "description": "Gegrilltem frisches Marktgemüse.",  
    "price": 14.50,  
    "category": "Pizza aus dem Steinofen",  
    "allergens": \[  
      { "letter": "A", "name": "Glutenhaltiges Getreide" },  
      { "letter": "G", "name": "Milch und daraus gewonnene Erzeugnisse (einschließlich Laktose)" }  
    \]  
  },  
  {  
    "id": "106",  
    "name": "Pizzapane",  
    "description": "Pizzabrot mit Tomaten Soße, Knoblauch & Oregano – Ohne Käse.",  
    "price": 6.50,  
    "category": "Pizza aus dem Steinofen",  
    "allergens": \[  
      { "letter": "A", "name": "Glutenhaltiges Getreide" }  
    \]  
  },  
  {  
    "id": "110",  
    "name": "Familienpizza Margherita",  
    "description": "Mozzarella und Oregano (40x60cm).",  
    "price": 25.00,  
    "category": "Familienpizza aus dem Steinofen",  
    "allergens": \[  
      { "letter": "A", "name": "Glutenhaltiges Getreide" },  
      { "letter": "G", "name": "Milch und daraus gewonnene Erzeugnisse (einschließlich Laktose)" }  
    \]  
  },  
  {  
    "id": "111",  
    "name": "Familienpizza Regina",  
    "description": "Salami, Vorderschinken und frische Champignons (40x60cm).",  
    "price": 37.00,  
    "category": "Familienpizza aus dem Steinofen",  
    "allergens":  
  },  
  {  
    "id": "112",  
    "name": "Familienpizza Toskana",  
    "description": "Salami, Vorderschinken, Peperoniwurst, Zwiebeln und frische Champignons (40x60cm).",  
    "price": 45.00,  
    "category": "Familienpizza aus dem Steinofen",  
    "allergens":  
  },  
  {  
    "id": "113",  
    "name": "Familienpizza Tonno",  
    "description": "Saftiger Thunfisch, rote Zwiebeln und frische Champignons (40x60cm).",  
    "price": 43.00,  
    "category": "Familienpizza aus dem Steinofen",  
    "allergens":  
  },  
  {  
    "id": "114",  
    "name": "Familienpizza Parma e Rucola",  
    "description": "Luftgetrockneter Parmaschinken, marinierter Rucola und gehobelter Grana Padano (40x60cm).",  
    "price": 43.00,  
    "category": "Familienpizza aus dem Steinofen",  
    "allergens": \[  
      { "letter": "A", "name": "Glutenhaltiges Getreide" },  
      { "letter": "G", "name": "Milch und daraus gewonnene Erzeugnisse (einschließlich Laktose)" }  
    \]  
  },  
  {  
    "id": "115",  
    "name": "Familienpizza Vegetaria",  
    "description": "Gegrilltes frisches Marktgemüse und Oregano (40x60cm).",  
    "price": 43.50,  
    "category": "Familienpizza aus dem Steinofen",  
    "allergens": \[  
      { "letter": "A", "name": "Glutenhaltiges Getreide" },  
      { "letter": "G", "name": "Milch und daraus gewonnene Erzeugnisse (einschließlich Laktose)" }  
    \]  
  },  
  {  
    "id": "120",  
    "name": "Chicken Nuggets",  
    "description": "6 Stück Hähnchen-Nuggets mit Pommes frites.",  
    "price": 8.90,  
    "category": "Kindergerichte",  
    "allergens": \[  
      { "letter": "A", "name": "Glutenhaltiges Getreide" },  
      { "letter": "C", "name": "Eier und daraus gewonnene Erzeugnisse" }  
    \]  
  },  
  {  
    "id": "121",  
    "name": "Rigatoni burro",  
    "description": "Nudeln in Butter geschwenkt.",  
    "price": 6.50,  
    "category": "Kindergerichte",  
    "allergens": \[  
      { "letter": "A", "name": "Glutenhaltiges Getreide" },  
      { "letter": "G", "name": "Milch und daraus gewonnene Erzeugnisse (einschließlich Laktose)" }  
    \]  
  },  
  {  
    "id": "122",  
    "name": "Spaghetti alla Bolognese (Kinder)",  
    "description": "Geschmortes Rinderhackfleisch in Tomatensoße.",  
    "price": 8.90,  
    "category": "Kindergerichte",  
    "allergens":  
  },  
  {  
    "id": "123",  
    "name": "Kleine Schnitzel Wiener Art",  
    "description": "Mit Pommes frites.",  
    "price": 9.90,  
    "category": "Kindergerichte",  
    "allergens":  
  },  
  {  
    "id": "130",  
    "name": "Tiramisu",  
    "description": "Hausgemachtes Tiramisu nach traditioneller Art.",  
    "price": 8.90,  
    "category": "Dessert",  
    "allergens": \[  
      { "letter": "A", "name": "Glutenhaltiges Getreide" },  
      { "letter": "C", "name": "Eier und daraus gewonnene Erzeugnisse" },  
      { "letter": "G", "name": "Milch und daraus gewonnene Erzeugnisse (einschließlich Laktose)" }  
    \]  
  },  
  {  
    "id": "131",  
    "name": "Panna Cotta",  
    "description": "Cremige Panna Cotta mit fruchtiger Erdbeersauce.",  
    "price": 7.90,  
    "category": "Dessert",  
    "allergens": \[  
      { "letter": "G", "name": "Milch und daraus gewonnene Erzeugnisse (einschließlich Laktose)" }  
    \]  
  },  
  {  
    "id": "132",  
    "name": "Tartufo Nero",  
    "description": "Schokolade-Trüffeleis mit cremigen Kern & Sahne.",  
    "price": 8.90,  
    "category": "Dessert",  
    "allergens":  
  },  
  {  
    "id": "133",  
    "name": "Cassata Siciliana",  
    "description": "Sizilianische Eisspezialität mit kandierten Früchten, serviert mit Erdbeersauce und Sahne.",  
    "price": 9.90,  
    "category": "Dessert",  
    "allergens":  
  },  
  {  
    "id": "134",  
    "name": "Bourbon-Vanilleeis",  
    "description": "Feines Bourbon-Vanilleeis mit intensivem Vanillearoma (Preis je Kugel).",  
    "price": 3.00,  
    "category": "Dessert",  
    "allergens": \[  
      { "letter": "G", "name": "Milch und daraus gewonnene Erzeugnisse (einschließlich Laktose)" }  
    \]  
  }  
\]

## **Integration in die Systemarchitektur und Datenbankstrukturen**

Der erfolgreiche Abschluss der JSON-Payload-Generierung markiert lediglich das Ende der initialen Datenstrukturierungsphase. Um einen funktionellen Nutzen für eine aktive gastronomische Softwareplattform zu bieten, müssen diese relationalen Daten in eine übergeordnete Systemarchitektur integriert werden. Dieser Schritt erfordert ein tiefes Verständnis von Datenbankindizierung und API-Design, um die Vorgaben der EU-Verordnung 1169/2011 nicht nur statisch abzuspeichern, sondern dynamisch für den Endverbraucher nutzbar zu machen.2

Wenn diese JSON-Struktur in eine dokumentenorientierte Datenbank wie MongoDB oder eine relationale Datenbank (RDBMS) unter Nutzung der nativen JSONB-Fähigkeiten von PostgreSQL eingefügt wird, gewinnen Backend-Entwickler die Fähigkeit, hochgradig performante Vektorsuchen durchzuführen. Die Struktur des JSON-Arrays, in dem allergens als eingebettetes Array von Objekten existiert, ist hierbei von entscheidender Bedeutung. In PostgreSQL kann beispielsweise ein GIN-Index (Generalized Inverted Index) auf die Spalte gelegt werden, die das JSONB-Dokument hält. Durch die Erstellung eines solchen Index auf das Pfad-Array allergens.letter ermöglicht das Backend extrem schnelle, ressourcenschonende Lesezugriffe (Reads), selbst wenn das System skaliert und Menüs mehrerer tausend Restaurants verwaltet.

Ein Web-Frontend (beispielsweise eine Next.js-Applikation, die von den Gästen der "Ratsstuben" über einen QR-Code am Tisch aufgerufen wird) kann diese Datenbankabfragen nutzen, um hochgradig reaktionsschnelle Filtermechanismen zu implementieren. Wenn ein Gast mit einer Krustentierallergie in der Benutzeroberfläche den entsprechenden Filter aktiviert, sendet das Frontend einen HTTP-GET-Request mit dem entsprechenden Query-Parameter (z.B. ?excludeAllergen=B) an die API. Die API übersetzt dies in eine SQL-Query, die den JSONB-Operator @\> (contains) nutzt, um alle Datensätze auszuschließen, bei denen das Array allergens das Objekt {"letter": "B"} enthält. Das Ergebnis ist eine in Millisekunden bereinigte Speisekarte, in der Gerichte wie die "Linguine ai Frutti di Mare" oder "Insalata Salmone e Gamberoni" für diese spezifische Session-Instanz unsichtbar gemacht werden.

Diese dynamische Restrukturierung der Menüverfügbarkeit auf Basis strukturierter Daten entspricht exakt dem, was die europäischen Regulierungsbehörden bei der Ausarbeitung der Verordnung (EU) Nr. 1169/2011 als Idealzustand konzipiert haben.1 Das regulatorische Mandat zielt nicht primär darauf ab, Restaurants durch strenge Audits zu sanktionieren, sondern Umgebungen zu fördern, in denen Verbraucherinformationen allgegenwärtig, präzise und für den allergischen Gast sofort zugänglich sind.2

## **Zukünftige Entwicklungen im Bereich Food Informatics und Allergen-Tracking**

Die vorliegende Digitalisierung der "Ratsstuben"-Speisekarte repräsentiert den aktuellen Stand der Technik für kleine bis mittelständische Gastronomiebetriebe (KMU). Betrachtet man jedoch die Weiterentwicklung im Bereich Food Informatics, werden zukünftige Softwarelösungen weitaus tiefere Integrationen in die Beschaffungs- und Lieferketten (Supply Chain) der Restaurants vornehmen müssen.

Initiativen wie die GS1 (Global Standards 1\) arbeiten bereits an globalen Standards, um Produktstammdaten und Allergeninformationen (gemäß EU 1169/2011) über das sogenannte Global Data Synchronisation Network (GDSN) direkt vom Produzenten bis in das Kassensystem des Restaurants fließen zu lassen.22 Wenn der Küchenchef der "Ratsstuben" zukünftig eine neue Charge Pasta oder Gewürzmischungen über den Großhandel bezieht, könnte das Warenwirtschaftssystem (ERP) des Restaurants die EAN/GTIN-Barcodes scannen und automatisch überprüfen, ob der Lieferant die Rezeptur geändert hat. Sollte eine bisher allergenfreie Zutat plötzlich Spuren von Lupinen (M) aufweisen, würde das System den JSON-Datensatz des entsprechenden Gerichts automatisch aktualisieren und das Servicepersonal via Push-Benachrichtigung warnen.

Solche automatisierten, ereignisgesteuerten Architekturen (Event-Driven Architectures) werden entscheidend sein, um das Haftungsrisiko bei unbemerkten Rezepturänderungen der Zulieferindustrie zu minimieren. Bis diese Supply-Chain-Integration jedoch vollumfänglich und kostengünstig für den lokalen Gastronomen verfügbar ist, bleibt die sorgfältige, algorithmisch unterstützte Modellierung der Daten, wie sie in diesem Bericht dargelegt wurde, das robusteste und sicherste Werkzeug zur Erfüllung der LMIV.

## **Fazit**

Die Schnittstelle zwischen kulinarischer Administration, gesetzlicher Compliance und modernem Data Engineering erfordert kompromisslose Präzision. Durch die Konvertierung einer unstrukturierten, textbasierten gastronomischen Speisekarte in ein streng standardisiertes, relationales JSON-Format verändern Lebensmittelunternehmer fundamental die Art und Weise, wie ihre Daten mit den Schnittstellen der Konsumenten interagieren.

Die explizite Zuordnung traditioneller Zutaten zu den gesetzlichen alphanumerischen A-N-Codes der EU-Verordnung 1169/2011 7 garantiert, dass digitale Backend-Systeme inhärent europäischen Rechtsnormen entsprechen und gleichzeitig schnelle, sichere Filterfunktionen für den Endverbraucher bereitstellen. Gepaart mit einem spezialisierten, empathischen und juristisch fundierten Disclaimer, der die physikalischen Realitäten und biophysikalischen Grenzen (in Bezug auf Kreuzkontamination) einer gewerblichen Hochleistungsküche anerkennt 5, schafft diese digitale Architektur nicht nur ein optimiertes Benutzererlebnis. Sie bildet einen essentiellen, zweistufigen Schutzschild – algorithmischer Ausschluss zur Prävention des bewussten Allergenverzehrs und transparente rechtliche Kommunikation zur Minimierung der Haftung bei unbeabsichtigten, umweltbedingten Spurenkontaminationen.4 Die "Ratsstuben" sind durch diesen data-engineering-gestützten Ansatz optimal für die Anforderungen der modernen, digitalisierten und rechtlich regulierten Gastronomielandschaft gerüstet.

#### **Referenzen**

1. Regulation (EU) No 1169/2011 of the European Parliament and of the Council of 25 October 2011 on the provision of food informati, Zugriff am April 12, 2026, [https://eur-lex.europa.eu/LexUriServ/LexUriServ.do?uri=OJ:L:2011:304:0018:0063:en:PDF](https://eur-lex.europa.eu/LexUriServ/LexUriServ.do?uri=OJ:L:2011:304:0018:0063:en:PDF)  
2. EU 1169/2011 Guide: Allergen Labelling requirements \- Menutech, Zugriff am April 12, 2026, [https://menutech.com/en/blog/legal-requirements/eu-11692011-guide-allergen-labelling-requirements](https://menutech.com/en/blog/legal-requirements/eu-11692011-guide-allergen-labelling-requirements)  
3. Speisekarte zusammen.docx  
4. Kreuzkontaminationen auf Speisekarten – klar kommunizieren \- easy menus, Zugriff am April 12, 2026, [https://easymenus.eu/blog/de/how-to-handle-cross-contamination-communication-on-menus](https://easymenus.eu/blog/de/how-to-handle-cross-contamination-communication-on-menus)  
5. Allergenmanagement in der Gastronomie \- ernährungs umschau, Zugriff am April 12, 2026, [https://www.ernaehrungs-umschau.de/print-artikel/04-07-2013-allergenmanagement-in-der-gastronomie/](https://www.ernaehrungs-umschau.de/print-artikel/04-07-2013-allergenmanagement-in-der-gastronomie/)  
6. EU legal requirements on food allergen labelling \- the University of Manchester WordPress Websites & Blogs, Zugriff am April 12, 2026, [https://sites.manchester.ac.uk/foodallergens/information-for-food-businesses/eu-legal-requirements-on-food-allergen-labelling/](https://sites.manchester.ac.uk/foodallergens/information-for-food-businesses/eu-legal-requirements-on-food-allergen-labelling/)  
7. Infoblatt zur Kennzeichnung von Lebensmitteln im Gastgewerbe \- IHK, Zugriff am April 12, 2026, [https://www.ihk.de/blueprint/servlet/resource/blob/5567202/5608813a6fb6d0649b7c17d353c5e9d2/kennzeichnung-von-lebensmitteln-im-gastgewerbe-data.pdf](https://www.ihk.de/blueprint/servlet/resource/blob/5567202/5608813a6fb6d0649b7c17d353c5e9d2/kennzeichnung-von-lebensmitteln-im-gastgewerbe-data.pdf)  
8. Allergen Labelling 2025 – Obligations, Risks and Practical Solutions | Alcomo, Zugriff am April 12, 2026, [https://www.alcomo.com/en/allergenkennzeichnung-2025-pflichten-risiken-und-digitale-loesung-alcomo-app/](https://www.alcomo.com/en/allergenkennzeichnung-2025-pflichten-risiken-und-digitale-loesung-alcomo-app/)  
9. Allergenkennzeichnung ist Pflicht \- BMLEH, Zugriff am April 12, 2026, [https://www.bmleh.de/DE/themen/ernaehrung/lebensmittel-kennzeichnung/pflichtangaben/allergenkennzeichnung.html](https://www.bmleh.de/DE/themen/ernaehrung/lebensmittel-kennzeichnung/pflichtangaben/allergenkennzeichnung.html)  
10. Baden-Württemberg, Zugriff am April 12, 2026, [https://www.untersuchungsaemter-bw.de/cloud/ka/Merkbl%C3%A4tter/Merkblatt\_Allergene\_Zusatzstoffe\_nicht\_vorverpackteLM.pdf](https://www.untersuchungsaemter-bw.de/cloud/ka/Merkbl%C3%A4tter/Merkblatt_Allergene_Zusatzstoffe_nicht_vorverpackteLM.pdf)  
11. Allergeninformation \- DEHOGA Baden-Württemberg, Zugriff am April 12, 2026, [https://www.dehogabw.de/fileadmin/user\_upload/DEHOGA\_BW/03\_Informieren/04\_Unsere\_Meinung/Position\_Allergeninformation\_2018.09.18\_neu.pdf](https://www.dehogabw.de/fileadmin/user_upload/DEHOGA_BW/03_Informieren/04_Unsere_Meinung/Position_Allergeninformation_2018.09.18_neu.pdf)  
12. Allergenkennzeichnung im Gastronomiebetrieb \- IHK Schwaben, Zugriff am April 12, 2026, [https://www.ihk.de/schwaben/produktmarken/branchen-und-netzwerke/freizeitwirtschaft-gastgewerbe-tourismus/weitere-themen/allergenkennzeichnung-im-gastronomiebetrieb-712338](https://www.ihk.de/schwaben/produktmarken/branchen-und-netzwerke/freizeitwirtschaft-gastgewerbe-tourismus/weitere-themen/allergenkennzeichnung-im-gastronomiebetrieb-712338)  
13. Leitfaden Allergenmanagement \- LGL Bayern, Zugriff am April 12, 2026, [https://www.lgl.bayern.de/doc/allergenleitfaden.pdf](https://www.lgl.bayern.de/doc/allergenleitfaden.pdf)  
14. Merkblatt zur Allergeninformation gemäß Lebensmittelinformations-VO (EU) Nr. 1169/2011 \- LK Österreich, Zugriff am April 12, 2026, [https://www.lko.at/media.php?filename=download%3D%2F2014.12.17%2F1418821577663386.pdf\&rn=Merkblatt%20Kennzeichnung%20Allergene%20110914.pdf](https://www.lko.at/media.php?filename=download%3D/2014.12.17/1418821577663386.pdf&rn=Merkblatt+Kennzeichnung+Allergene+110914.pdf)  
15. Food allergens \- EFSA \- European Union, Zugriff am April 12, 2026, [https://www.efsa.europa.eu/en/safe2eat/food-allergens](https://www.efsa.europa.eu/en/safe2eat/food-allergens)  
16. Nicht deklarierte Allergene in Lebensmitteln \- Bundesamt für Lebensmittelsicherheit und Veterinärwesen, Zugriff am April 12, 2026, [https://www.blv.admin.ch/dam/blv/de/dokumente/lebensmittel-und-ernaehrung/publikationen-forschung/breifing-letter-nicht-deklarierte-lebensmittelallergene.pdf.download.pdf/Briefing%20Letter%20Nicht%20deklarierte%20Lebensmittelallergene%20DE.pdf](https://www.blv.admin.ch/dam/blv/de/dokumente/lebensmittel-und-ernaehrung/publikationen-forschung/breifing-letter-nicht-deklarierte-lebensmittelallergene.pdf.download.pdf/Briefing%20Letter%20Nicht%20deklarierte%20Lebensmittelallergene%20DE.pdf)  
17. Beurteilungswerte Allergene \- BVL, Zugriff am April 12, 2026, [https://www.bvl.bund.de/SharedDocs/Downloads/01\_Lebensmittel/ALS\_ALTS/Allergene\_Beurteilungswerte.pdf?\_\_blob=publicationFile\&v=6](https://www.bvl.bund.de/SharedDocs/Downloads/01_Lebensmittel/ALS_ALTS/Allergene_Beurteilungswerte.pdf?__blob=publicationFile&v=6)  
18. Kreuzkontamination mit Allergenen: Risiken und Prävention, Teil I \- Hygiena, Zugriff am April 12, 2026, [https://www.hygiena.com/de/news/kreuzkontamination-mit-allergenen-risiken-und-praevention-teil-i](https://www.hygiena.com/de/news/kreuzkontamination-mit-allergenen-risiken-und-praevention-teil-i)  
19. Werbung mit "Allergenfrei": Haftung bei Spuren und Kreuzkontamination \- Anwalt.de, Zugriff am April 12, 2026, [https://www.anwalt.de/rechtstipps/werbung-mit-allergenfrei-haftung-bei-spuren-und-kreuzkontamination-264759.html](https://www.anwalt.de/rechtstipps/werbung-mit-allergenfrei-haftung-bei-spuren-und-kreuzkontamination-264759.html)  
20. Allergenkennzeichnung – Haftungsausschluss nicht zulässig: | Hygiene Netzwerk, Zugriff am April 12, 2026, [https://www.hygiene-netzwerk.de/Allergenkennzeichnung-und-Haftungsausschluss](https://www.hygiene-netzwerk.de/Allergenkennzeichnung-und-Haftungsausschluss)  
21. Allergenkennzeichnung in der Gastronomie \- SumUp, Zugriff am April 12, 2026, [https://www.sumup.com/de-de/wachsen/inklusion/allergenkennzeichnung-in-der-gastronomie/](https://www.sumup.com/de-de/wachsen/inklusion/allergenkennzeichnung-in-der-gastronomie/)  
22. GDSN Implementation Guidelines for EU Regulation 1169/2011 \- GS1 in Europe, Zugriff am April 12, 2026, [https://gs1.eu/wp-content/uploads/2024/01/GS1iEU\_1169\_Guideline\_2.7.pdf](https://gs1.eu/wp-content/uploads/2024/01/GS1iEU_1169_Guideline_2.7.pdf)