# **Datenmodellierung und Compliance-Architektur: Transformation der Speisekarte 'Ratsstuben' in ein strukturiertes, rechtskonformes JSON-Gastronomiesystem**

## **Einleitung: Die digitale Transformation unstrukturierter Gastronomiedaten**

Die fortschreitende Digitalisierung im gastronomischen Sektor erfordert eine grundlegende Neuausrichtung im Umgang mit Produktdaten. Historisch gewachsene, textbasierte Formate wie Microsoft Word-Dokumente (DOCX) oder PDF-Dateien, die primär für den physischen Druck konzipiert wurden, genügen den Anforderungen moderner IT-Infrastrukturen nicht mehr. Für die nahtlose Integration in zeitgemäße Kassensysteme (Point of Sale, POS), digitale Menüboards, Online-Bestellplattformen und mobile Applikationen müssen diese unstrukturierten Informationen in standardisierte, maschinenlesbare Formate überführt werden. In der modernen Web- und Softwareentwicklung hat sich hierbei die JavaScript Object Notation (JSON) als universeller Industriestandard etabliert. JSON ermöglicht einen performanten, sprachunabhängigen Datenaustausch über RESTful APIs (Representational State Transfer) oder GraphQL-Schnittstellen und bildet das fundamentale Rückgrat skalierbarer Gastronomie-Plattformen.

Die vorliegende architektonische und datentechnische Analyse demonstriert diesen komplexen Transformationsprozess am konkreten Anwendungsfall der Speisekarte des Restaurants 'Ratsstuben'.1 Die Aufgabe eines Data Engineers in diesem Kontext beschränkt sich nicht auf das reine Parsen von Texten. Vielmehr erfordert sie die semantische Strukturierung der Daten in diskrete Attribute (wie Identifikationsnummern, Bezeichnungen, Beschreibungen, Preise und Kategorien) sowie die Anreicherung des Datensatzes um essenzielle Metadaten. Die kritischste Komponente dieser Metadaten-Anreicherung ist die systematische und rechtssichere Implementierung der Allergenkennzeichnung. Da das Ausgangsdokument der 'Ratsstuben' keinerlei explizite Allergen-Codierungen aufwies 1, musste im Rahmen dieses Projekts eine algorithmische Heuristik entwickelt werden, um die enthaltenen Allergene aus den natürlichsprachlichen Beschreibungen der Gerichte zu extrahieren und gemäß den strengen europäischen Richtlinien zu normieren.

Darüber hinaus beleuchtet dieser Bericht die weitreichenden juristischen Implikationen der Allergenkommunikation. Ein strukturiertes Datenmodell allein bewahrt den Gastronomen nicht vor Haftungsrisiken, die durch unvermeidbare produktionsbedingte Kreuzkontaminationen in gewerblichen Küchen entstehen.2 Daher wird im Rahmen der Systemarchitektur ein fundiertes Konzept für einen rechtssicheren, kundenfreundlichen Disclaimer entwickelt, der die Lücke zwischen präziser Zutatendeklaration und der operativen Küchenrealität schließt.

## **Regulatorischer Rahmen: Die EU-Lebensmittelinformationsverordnung 1169/2011**

Die rechtliche Basis für die Bereitstellung von Allergeninformationen innerhalb der Europäischen Union bildet die Verordnung (EU) Nr. 1169/2011 betreffend die Information der Verbraucher über Lebensmittel (LMIV).3 Diese Verordnung stellt einen Paradigmenwechsel im europäischen Verbraucherschutz dar. Seit ihrem Inkrafttreten sind Gastronomiebetriebe, Gemeinschaftsverpflegungen und Catering-Unternehmen gesetzlich verpflichtet, Endverbraucher klar, eindeutig und vor dem Abschluss des Kaufvertrags über das Vorhandensein spezifischer allergener Stoffe zu informieren.3 Dies gilt explizit auch für unverpackte Lebensmittel (lose Ware), die in Restaurants direkt an den Tisch serviert oder über digitale Plattformen zur Lieferung bestellt werden.

Der Anhang II der EU-Verordnung 1169/2011 definiert exakt 14 Hauptallergene (Stoffe oder Erzeugnisse, die Allergien oder Unverträglichkeiten auslösen), die einer zwingenden Deklarationspflicht unterliegen.3 Um diese komplexen Informationen auf Speisekarten und in digitalen Systemen kompakt und für den Konsumenten schnell erfassbar darzustellen, hat sich in der Branche (insbesondere im DACH-Raum, angeführt durch Empfehlungen von Wirtschaftskammern und Fachverbänden) ein standardisierter Buchstabencode etabliert.7

Die Anforderung dieses Projekts sieht explizit das Mapping auf die Buchstaben A bis N vor. Da die LMIV jedoch 14 Allergene vorschreibt, wird der Standard-Code in der Gastronomie-Softwareentwicklung typischerweise durch die Buchstaben O, P und R ergänzt, um alle gesetzlichen Anforderungen lückenlos abzudecken.7 Die folgende Tabelle visualisiert das essenzielle Mapping-Schema, welches als Grundlage für das Enumeration-Design (Enum) im JSON-Datenmodell dient:

| Buchstabencode | Allergen / Unverträglichkeitsauslöser | Definition & Beispiele gemäß EU-Verordnung 1169/2011 |
| :---- | :---- | :---- |
| **A** | Glutenhaltiges Getreide | Namentlich Weizen (einschließlich Dinkel und Khorasan-Weizen), Roggen, Gerste, Hafer oder deren Hybridstämme sowie daraus hergestellte Erzeugnisse (z. B. Nudeln, Pizzateig, Panaden, Brot).3 |
| **B** | Krebstiere | Krebstiere und daraus gewonnene Erzeugnisse (z. B. Garnelen, Scampi, Hummer, Krabben).3 |
| **C** | Eier | Eier von Geflügel und daraus gewonnene Erzeugnisse (z. B. in Mayonnaise, Panaden, Nudelteigen, Desserts wie Tiramisu).3 |
| **D** | Fische | Alle Fischarten und daraus gewonnene Erzeugnisse, sofern nicht spezifische Ausnahmen (wie Fischgelatine für Vitamine) greifen (z. B. Lachs, Dorade, Thunfisch, Sardellen).3 |
| **E** | Erdnüsse | Erdnüsse und daraus gewonnene Erzeugnisse (z. B. Erdnussöl, geröstete Erdnüsse).3 |
| **F** | Sojabohnen | Sojabohnen und daraus gewonnene Erzeugnisse (z. B. Sojasauce, Edamame, Tofu).3 |
| **G** | Milch (einschließlich Laktose) | Milch von Säugetieren und alle daraus hergestellten Produkte (z. B. Butter, Käse wie Mozzarella oder Parmigiano, Sahne, Joghurt).3 |
| **H** | Schalenfrüchte (Nüsse) | Namentlich Mandeln, Haselnüsse, Walnüsse, Cashewnüsse, Pecannüsse, Paranüsse, Pistazien, Macadamia- oder Queenslandnüsse und daraus gewonnene Erzeugnisse.3 |
| **L** | Sellerie | Stauden-, Knollen- und Bleichsellerie sowie daraus gewonnene Erzeugnisse (oft versteckt in Brühen und Suppengrundlagen).3 |
| **M** | Senf | Senfkörner, Senfpulver und daraus hergestellte Erzeugnisse (z. B. Senfsaucen, Dressings).3 |
| **N** | Sesamsamen | Sesamsamen und daraus gewonnene Erzeugnisse (z. B. Sesamöl, Tahin).3 |
| **O** | Schwefeldioxid und Sulfite | In Konzentrationen von mehr als 10 mg/kg oder 10 mg/l (häufig in Wein, Trockenfrüchten, Essig).3 |
| **P** | Lupinen | Lupinen und daraus gewonnene Erzeugnisse (z. B. Lupinenmehl als pflanzliche Proteinquelle).3 |
| **R** | Weichtiere | Weichtiere und daraus gewonnene Erzeugnisse (z. B. Schnecken, Muscheln, Austern, Tintenfisch/Seppia, Calamares).3 |

Dieses Mapping stellt sicher, dass das System vollumfänglich mit der EU-Verordnung 1169/2011 konform geht. Die Integration dieser Codes in das allergens-Array des JSON-Objekts ist der kritische Pfad für die spätere Darstellung und Filterung in digitalen Applikationen. Die Verordnung besagt klar, dass es sich um deklarationspflichtige *Zutaten* handeln muss.4 Unbeabsichtigte Spuren fallen nicht unter diese primäre Kennzeichnungspflicht im Zutaten-Array, sondern müssen durch ein übergreifendes Risikomanagement – sprich den Kreuzkontaminations-Disclaimer – adressiert werden.2

## **Methodik der Datenextraktion und heuristische Textanalyse (NLP-Parsing)**

Die Ausgangslage für die Datenmodellierung der 'Ratsstuben' war durch eine erhebliche Datenanomalie gekennzeichnet. Eine tiefgehende strukturelle Analyse des bereitgestellten Microsoft Word-Dokuments ('Speisekarte zusammen.docx') ergab, dass die Datei keinerlei explizite Allergenkennzeichnungen enthielt.1 Weder fanden sich die gesetzlich geforderten Buchstaben (A-N/P/R) hinter den Gerichtsnamen oder Preisen, noch existierte am Ende des Dokuments eine Legende, die auf Allergene hätte schließen lassen.1

Für einen Data Engineer bedeutet dieser Mangel an expliziten, strukturierten Daten, dass deterministische Parsing-Methoden (wie das Extrahieren von eingeklammerten Buchstaben am Ende eines Strings mittels Regular Expressions, z. B. /\\(+\\)$/) nicht anwendbar sind. Stattdessen musste ein heuristisches Textanalyse-Verfahren (Natural Language Processing, NLP) auf Basis von Schlüsselwort-Matching (Keyword-Matching) implementiert werden, um die Allergene aus den natürlichsprachlichen Beschreibungen der Speisen abzuleiten.1

Dieses Verfahren simuliert die kognitive Deduktion eines Lebensmittelchemikers oder Ernährungsexperten und mappt erkannte Zutatennamen (Substrings in der description oder im name) auf die entsprechenden EU-Allergencodes.

### **Algorithmisches Mapping-Regelwerk für die 'Ratsstuben'**

Das implementierte NLP-Modell basiert auf folgenden deduktiven Zuordnungsregeln, die spezifisch auf die italienisch-deutsche Speisekarte der 'Ratsstuben' kalibriert wurden:

1. **Glutenhaltiges Getreide (A):**  
   * *Trigger-Wörter:* "Brot", "Weißbrot", "Pizzabrot", "Spaghetti", "Rigatoni", "Tagliatelle", "Linguine", "Pasta", "Tortellini", "Tortelacci", "Gnocchi", "Pizza", "Schnitzel", "Panade", "Chicken Nuggets".  
   * *Logik:* Alle Nudelgerichte, Pizzen und brotbasierten Vorspeisen (wie Bruschetta) basieren fundamental auf Weizenmehl. Ebenso erfordern panierte Gerichte (Schnitzel nach Wiener Art, Nuggets) eine Mehl- und Semmelbröselpanade.  
2. **Krebstiere (B) und Weichtiere (R):**  
   * *Trigger-Wörter für B:* "Garnelen", "Gamberoni".  
   * *Trigger-Wörter für R:* "Tintenfisch", "Seppia", "Meeresfrüchte", "Frutti di Mare".  
   * *Logik:* Meeresfrüchte-Mischungen ("Frutti di Mare") enthalten in der Regel sowohl Muscheln/Tintenfisch (R) als auch kleine Krebstiere (B).  
3. **Eier (C):**  
   * *Trigger-Wörter:* "Ei", "Carbonara", "Tiramisu".  
   * *Logik:* Die klassische Spaghetti Carbonara wird mit Ei gebunden. Vitello Tonnato enthält Mayonnaise (aus Ei). Tiramisu basiert auf einer Ei-Mascarpone-Creme und Löffelbiskuits (die ebenfalls Ei und Gluten enthalten).  
4. **Fisch (D):**  
   * *Trigger-Wörter:* "Thunfisch", "Lachs", "Lachsfilet", "Salmone", "Sardellen", "Edelfisch", "Doraden", "Orata".  
5. **Milch und Laktose (G):**  
   * *Trigger-Wörter:* "Mozzarella", "Burrata", "Grana Padano", "Parmigiano", "Sahne", "Rahm", "Butter", "Joghurt", "Ricotta", "Käse".  
   * *Logik:* Ein Großteil der italienischen Küche basiert auf Käse oder Milchprodukten. Saucen, die als "cremig" beschrieben werden, basieren häufig auf Sahne (Panna). Joghurtdressings und Eiscreme (Vanilleeis, Tartufo) triggern ebenfalls das Milch-Allergen.  
6. **Schalenfrüchte / Nüsse (H):**  
   * *Trigger-Wörter:* "Pesto", "Genovese", "Tartufo".  
   * *Logik:* Echtes Pesto alla Genovese wird zwingend mit Pinienkernen oder anderen Nüssen hergestellt. Tartufo-Eis kann Nussbestandteile enthalten.  
7. **Senf (M):**  
   * *Trigger-Wörter:* "Senf", "Orangensenf".  
8. **Schwefeldioxid und Sulfite (O):**  
   * *Trigger-Wörter:* "Wein", "Weißwein", "Balsamico".  
   * *Logik:* Weißweinsaucen (wie beim "Filetto di Maiale al Vino Bianco") und Balsamico-Vinaigrettes enthalten typischerweise Sulfite zur Konservierung, die die Deklarationsschwelle von 10 mg/l überschreiten können.

*Sicherheitshinweis für das Data Engineering:* Da heuristische Verfahren inhärent fehleranfällig sind (z. B. durch "Hidden Allergens", wie Sellerie (L) im Brühwürfel der Tagessuppe, der in der Textbeschreibung nicht erwähnt wird), muss das resultierende Datenmodell in der Praxis zwingend von der gastronomischen Leitung in einem Content Management System (CMS) verifiziert und freigegeben werden. Der Data Engineer liefert die strukturelle Architektur und den bestmöglichen Initialdaten-Load, übernimmt jedoch nicht die lebensmittelrechtliche Haftung für versteckte Rezepturbestandteile.

## **Kategorienanalyse und Datentransformation**

Um die Konvertierung in das JSON-Format nachzuvollziehen, wird im Folgenden die analytische Transformation der unstrukturierten Textdaten der 'Ratsstuben' in strukturierte Entitäten pro Speisenkategorie detailliert erläutert. Jede Position auf der Speisekarte wurde auf ID, Name, Beschreibung (Description), Preis (Price) und Allergene (Allergens) zerlegt.1

### **1\. Suppen & Vorspeisen (Kategorie-ID: Soups / Appetizers)**

Die Vorspeisenkategorie zeichnet sich durch klassische italienische Antipasti aus.

* **Bruschetta Classico (ID: 20):** Besteht primär aus geröstetem Weißbrot. Dies erfordert zwingend das Allergen **A** (Gluten). Die Option auf "überbackenen Mozzarella" fügt dynamisch **G** (Milch) hinzu.1  
* **Vitello Tonnato (ID: 23):** Enthält Thunfischsauce (Fisch: **D**), Kapern, Sardellen (Fisch: **D**) und Ei (**C**). Die Cremigkeit impliziert zudem Milchprodukte (**G**).1  
* **La Buratta (ID: 22):** Burrata ist ein Frischkäse (Milch: **G**). Das begleitende Genovese-Basilikum Pesto enthält typischerweise Nüsse (Schalenfrüchte: **H**) sowie Hartkäse (**G**).  
* **Pizzabrot (ID: null):** Ein interessanter Fall im Data Parsing. Im Ursprungsdokument wird das Pizzabrot unterhalb der Vorspeisen als Zusatz angeboten ("auf Wunsch Pizzabrot... 6,50€"), jedoch ohne eigene ID.1 In relationalen Datenbanken erfordert dies entweder die Generierung einer UUID (Universally Unique Identifier) oder die Vergabe einer null-ID, falls das Frontend es als reines Add-on behandelt. Aus Gründen der Datenkonsistenz wurde es im JSON als eigenständiges Item mit id: null modelliert. Allergen: **A** (Gluten).

### **2\. Salate (Salads)**

Die Salate der 'Ratsstuben' sind mit verschiedenen Toppings und Dressings versehen.

* **Insalata Italia (ID: 31/32):** Enthält Thunfisch (**D**), Mozzarella (**G**) und Ei (**C**). Das hausgemachte Joghurtdressing steuert weiteres Milcheiweiß (**G**) bei.1  
* **Insalata Frutti di Mare (ID: 33):** Marinierten Meeresfrüchte erfordern die Kombination aus Krebstieren (**B**) und Weichtieren (**R**). Die Balsamico-Kräuter-Vinaigrette triggert Sulfite (**O**).  
* **Insalata Salmone e Gamberoni (ID: 35):** Die explizite Nennung von frischem Lachsfilet (Fisch: **D**) und Garnelen (Krebstiere: **B**) macht das Mapping hier eindeutig.1

### **3\. Pasta & Pasta al Forno**

Bei der Pasta-Kategorie ist die Basis stets glutenhaltiges Getreide (**A**).

* **Spaghetti Carbonara (ID: 41):** Die Zutaten Ei (**C**) und Parmigiano (**G**) sind neben der Pasta (**A**) die Hauptallergene.1  
* **Linguine Pesce Misto della Casa (ID: 47):** Ausgewählter Edelfisch (**D**) in einer Weißwein-Kräutersauce (Sulfite: **O**).  
* **Tortellini alla Panna (ID: 50):** Eine Kombination aus Weizenteig (**A**), Ei (**C**) in der Füllung/Teig sowie einer massiven Menge an Milchprodukten (Sahnesauce, Parmigiano) (**G**).1

### **4\. Fleischgerichte (Schnitzel & Grillgerichte)**

Die Fleischgerichte weisen je nach Zubereitungsart gravierende Unterschiede in den Allergenprofilen auf.

* **Alle Schnitzelvariationen (IDs: 70-76):** Der Begriff "Schnitzel" (Wiener Art) impliziert eine Panierung. Diese besteht aus Mehl, Ei und Semmelbröseln. Somit müssen alle Schnitzel zwingend mit Gluten (**A**) und Ei (**C**) gekennzeichnet werden.1 Rahm-, Jäger-, Pfeffer- und Schlemmer-Schnitzel werden zudem in Saucen serviert, die auf Rahm oder Sahne basieren (**G**).  
* **Grillgerichte (IDs: 80-85):** Das Fleisch selbst ist allergenfrei. Jedoch werden Gerichte wie *Petto di Pollo alla Griglia* mit hausgemachter Kräuter-Butter (**G**) serviert. Die Pfeffersaucen (Pepe Verde) basieren ebenfalls auf Rahm (**G**).  
* **Filetto di Maiale al Vino Bianco e Limone (ID: 82):** Die Weißweinsauce erfordert die Ausweisung von Sulfiten (**O**).

### **5\. Pizza aus dem Steinofen**

Pizzen sind in ihrer Grundlage homogene Allergenträger: Der Teig enthält Gluten (**A**), der Belag fast immer Käse/Mozzarella (**G**).1

* **Pizza Ratsstuben (ID: 94):** Neben den Basisallergenen (**A, G**) kommt hier ein Spiegelei/gekochtes Ei (**C**) als Belag hinzu.  
* **Pizza Tonno (ID: 99):** Die Zugabe von Thunfisch fügt das Allergen **D** hinzu.  
* **Pizza Frutti di Mare (ID: 101):** Meeresfrüchte aktivieren Krebstiere (**B**) und Weichtiere (**R**).

### **6\. Desserts**

* **Tiramisu (ID: 130):** Ein komplexes Allergenprofil. Löffelbiskuits (Gluten: **A**, Ei: **C**) und Mascarpone/Sahne (Milch: **G**) machen dieses Gericht aus.1  
* **Tartufo Nero (ID: 132):** Schokoladen-Trüffeleis mit Sahne (**G**). Da Tartufo traditionell Nusssplitter enthalten kann, wird präventiv Schalenfrüchte (**H**) ergänzt.

## **Definition des JSON-Datenmodells für die Systemarchitektur**

Nach der Extraktion und der heuristischen Allergenbestimmung muss die Datenstruktur in ein formales JSON-Schema übersetzt werden. Das Schema folgt den Prinzipien des Domain-Driven Designs (DDD) und wurde so flach wie möglich gehalten, um schnelle Parsing-Zeiten im Frontend zu garantieren.

**Struktur des Schemas:**

1. **Metadaten:** Das Root-Objekt enthält globale Parameter wie restaurant\_name, currency (Währung, z. B. "EUR") und version.  
2. **Kategorien (Categories):** Ein Array von Objekten, welches die Kategorien repräsentiert (z. B. "Suppen", "Pizza 28cm"). Dies ermöglicht dem Frontend den Aufbau einer hierarchischen Navigation (Tab-Bar oder Scroll-Spy).  
3. **Gerichte (Items):** Innerhalb jeder Kategorie befindet sich das items-Array. Ein Item-Objekt besitzt streng typisierte Attribute:  
   * id: Integer | null. Der Primärschlüssel aus dem Menü.  
   * name: String. Der Titel des Gerichts.  
   * description: String. Die detaillierte Zutatenliste und Zubereitungsbeschreibung.  
   * price: Float. Der Preis. In hochkomplexen E-Commerce-Systemen werden Preise oft als Integer in Cent gespeichert (z. B. 690 für 6,90 €), um Rundungsfehler bei Gleitkommaoperationen (Floating-Point-Arithmetic) zu vermeiden. Für die direkte Darstellung und einfache Berechnungen in kleinen bis mittleren POS-Systemen ist ein Float (z. B. 6.90) jedoch ausreichend und in diesem Fall implementiert.  
   * allergens: Array. Ein Array, das ausschließlich die gültigen EU-Buchstabencodes als Strings enthält (z. B. \["A", "C", "G"\]). Ein leeres Array \`\` signalisiert, dass keine der 14 Hauptallergene detektiert wurden.

## **Der strukturierte JSON-Datensatz der 'Ratsstuben'**

Das nachfolgende Code-Snippet repräsentiert die vollständige, algorithmisch konvertierte Speisekarte der 'Ratsstuben'.1 Dieser Datensatz ist ready-to-deploy und kann direkt in eine dokumentenbasierte NoSQL-Datenbank (wie MongoDB oder CouchDB) importiert oder über eine REST-API an eine Frontend-Applikation (React, Vue, Angular) ausgeliefert werden.

JSON

{  
  "restaurant\_name": "Ratsstuben",  
  "currency": "EUR",  
  "menu":  
        },  
        {  
          "id": 11,  
          "name": "Tomatencremesuppe",  
          "description": "Fein abgestimmte, cremig verfeinerte Tomatensuppe.",  
          "price": 7.90,  
          "allergens": \["G"\]  
        }  
      \]  
    },  
    {  
      "category": "Vorspeisen",  
      "items":  
        },  
        {  
          "id": 21,  
          "name": "Prosciutto di Parma e Melone",  
          "description": "Edler luftgetrockneter Parmaschinken, serviert mit sonnengereifter Melone.",  
          "price": 12.90,  
          "allergens":  
        },  
        {  
          "id": 22,  
          "name": "La Buratta",  
          "description": "Cremige Burrata auf feinem Tomaten-Carpaccio, verfeinert mit einer Balsamico-Kräutervinaigrette und Genovese-Basilikum Pesto.",  
          "price": 13.90,  
          "allergens": \["G", "H", "O"\]  
        },  
        {  
          "id": 23,  
          "name": "Vitello Tonnato",  
          "description": "Zart rosa gegartes Kalbfleisch, fein aufgeschnitten, begleitet von einer cremigen Thunfischsauce mit Kapern, Sardellen & Ei.",  
          "price": 14.90,  
          "allergens":  
        },  
        {  
          "id": 24,  
          "name": "Carpaccio di Manzo",  
          "description": "Hauchdünn geschnittenes argentinisches Rinderfilet auf mariniertem Rucola, mit frischen Champignons und gehobeltem Grana Padano, verfeinert mit extra nativem Olivenöl.",  
          "price": 15.90,  
          "allergens": \["G"\]  
        },  
        {  
          "id": 25,  
          "name": "Antipasti Misti della Casa",  
          "description": "Eine erlesene Auswahl italienischer Vorspeisenspezialitäten nach Art des Hauses – warm und kalt serviert. Auch als Platten für mehrere Personen erhältlich (Pro Person 13,90 €).",  
          "price": 16.90,  
          "allergens": \["A", "G"\]  
        },  
        {  
          "id": null,  
          "name": "Pizzabrot",  
          "description": "Pizzabrot mit Tomatensoße & Knoblauch (Wird zu Suppen & Vorspeisen auf Wunsch gereicht).",  
          "price": 6.50,  
          "allergens": \["A"\]  
        }  
      \]  
    },  
    {  
      "category": "Salate",  
      "items":  
        },  
        {  
          "id": 31,  
          "name": "Insalata Italia",  
          "description": "Bunter Salatteller mit Vorderschinken, saftigem Thunfisch, Mozzarella und Ei, serviert mit hausgemachtem Joghurtdressing.",  
          "price": 14.90,  
          "allergens":  
        },  
        {  
          "id": 32,  
          "name": "Insalata Italia (klein)",  
          "description": "Bunter Salatteller mit Vorderschinken, saftigem Thunfisch, Mozzarella und Ei, serviert mit hausgemachtem Joghurtdressing. Wahlweise als Vorspeise oder Beilage.",  
          "price": 10.90,  
          "allergens":  
        },  
        {  
          "id": 33,  
          "name": "Insalata Frutti di Mare",  
          "description": "Rucolasalat mit köstlich marinierten Meeresfrüchten, Cocktailtomaten und roten Zwiebeln in Balsamico-Kräuter-Vinaigrette.",  
          "price": 15.90,  
          "allergens":  
        },  
        {  
          "id": 34,  
          "name": "Insalata di Pollo",  
          "description": "Bunter Salatteller mit Hähnchenbrustfilet und frischen Champignons, serviert mit hausgemachtem Joghurtdressing.",  
          "price": 16.90,  
          "allergens": \["G"\]  
        },  
        {  
          "id": 35,  
          "name": "Insalata Salmone e Gamberoni",  
          "description": "Bunter Salatteller mit frischem Lachsfilet und Garnelen in Balsamico-Kräuter-Vinaigrette.",  
          "price": 17.90,  
          "allergens":  
        },  
        {  
          "id": 36,  
          "name": "Insalata Don Capo",  
          "description": "Bunter Salatteller mit argentinischem Rinderfleisch und gehobeltem Grana Padano, serviert mit hausgemachtem Joghurtdressing.",  
          "price": 18.90,  
          "allergens": \["G"\]  
        }  
      \]  
    },  
    {  
      "category": "Pasta",  
      "items":  
        },  
        {  
          "id": 41,  
          "name": "Original Spaghetti Carbonara",  
          "description": "Mit knusprigem Guanciale (Schweinebacke), Ei, grob geschrotetem Pfeffer und frisch geriebenem Parmigiano.",  
          "price": 14.90,  
          "allergens": \["A", "C", "G"\]  
        },  
        {  
          "id": 42,  
          "name": "Rigatoni alla Puglia",  
          "description": "Mit knusprigem Guanciale (Schweinebacke), Brokkoli, Zwiebeln und einem Hauch Knoblauch in aromatischer Tomatensauce, verfeinert mit geriebenem Parmigiano.",  
          "price": 16.90,  
          "allergens": \["A", "G"\]  
        },  
        {  
          "id": 43,  
          "name": "Rigatoni „Ratsstube“",  
          "description": "Mit gebratener Hähnchenbrust und frischen Champignons in cremiger Tomaten-Sahnesauce, serviert mit Parmigiano.",  
          "price": 16.90,  
          "allergens": \["A", "G"\]  
        },  
        {  
          "id": 44,  
          "name": "Tagliatelle al Ragù di Verdure",  
          "description": "Feine Bandnudeln mit frischem Marktgemüse-Ragout in aromatischer Tomatensauce, dazu geriebener Parmigiano.",  
          "price": 14.90,  
          "allergens": \["A", "G"\]  
        },  
        {  
          "id": 45,  
          "name": "Tagliatelle Salmone e Gamberoni",  
          "description": "Feine Bandnudeln mit gebratenem Lachsfilet und Garnelen, verfeinert mit einem Hauch Knoblauch in cremiger Sauce nach Art des Hauses.",  
          "price": 17.90,  
          "allergens":  
        },  
        {  
          "id": 46,  
          "name": "Linguine ai Frutti di Mare",  
          "description": "Flache Pasta mit erlesenen Meeresfrüchten in aromatischer Tomatensauce mit feiner Knoblauchnote.",  
          "price": 18.90,  
          "allergens":  
        },  
        {  
          "id": 47,  
          "name": "Linguine Pesce Misto della Casa",  
          "description": "Flache Pasta mit ausgewähltem Edelfisch in feiner Weißwein-Kräutersauce (Empfehlung des Küchenchefs).",  
          "price": 22.90,  
          "allergens":  
        }  
      \]  
    },  
    {  
      "category": "Pasta al Forno",  
      "items":  
        },  
        {  
          "id": 49,  
          "name": "Rigatoni al Ragu e Verdure",  
          "description": "Mit frischem Marktgemüse-Ragout in cremiger Sahnesoße, überbacken mit Mozzarella.",  
          "price": 13.90,  
          "allergens": \["A", "G"\]  
        },  
        {  
          "id": 62,  
          "name": "Tortellini Prosciutto e Panna",  
          "description": "Tortellini gefüllt mit Fleisch in Vorderschinken-Sahnesoße, überbacken mit Mozzarella.",  
          "price": 16.90,  
          "allergens": \["A", "C", "G"\]  
        }  
      \]  
    },  
    {  
      "category": "Hausgemachte Pasta",  
      "items":  
        },  
        {  
          "id": 51,  
          "name": "Tortelacci Burro e Salvia",  
          "description": "Hausgemachte Riesen-Tortellacci gefüllt mit Ricotta und Spinat, in Butter-Salbei geschwenkt, Kirschtomaten auf Rucolasalat-Bukett und Grana Padano.",  
          "price": 17.90,  
          "allergens": \["A", "C", "G"\]  
        },  
        {  
          "id": 52,  
          "name": "Tortellacci con Salmone e Gamberoni",  
          "description": "Hausgemachte Riesen-Tortellacci gefüllt mit Ricotta und Spinat, in cremiger Soße nach Art des Hauses.",  
          "price": 19.90,  
          "allergens":  
        },  
        {  
          "id": 53,  
          "name": "Gnocchi con Gamberoni",  
          "description": "Gefüllte Kartoffelgnocchi mit Tomaten und Mozzarella, mit gebratenen Garnelen in cremiger Tomaten-Sahnesauce.",  
          "price": 17.90,  
          "allergens":  
        },  
        {  
          "id": 54,  
          "name": "Gnocchi e Basilikum Pesto Genovese con La Buratta",  
          "description": "Gefüllte Kartoffelgnocchi mit cremiger Buratta und Basilikumpesto aus Genua (Genovese).",  
          "price": 15.90,  
          "allergens": \["A", "G", "H"\]  
        }  
      \]  
    },  
    {  
      "category": "Schnitzelvariation",  
      "items":  
        },  
        {  
          "id": 71,  
          "name": "Rahm-Schnitzel",  
          "description": "In cremiger Rahmsoße, mit Pommes frites und Salat der Saison.",  
          "price": 17.90,  
          "allergens": \["A", "C", "G"\]  
        },  
        {  
          "id": 72,  
          "name": "Jäger-Schnitzel",  
          "description": "Mit frischen Champignons in brauner Soße, mit Pommes frites und Salat der Saison.",  
          "price": 18.90,  
          "allergens": \["A", "C"\]  
        },  
        {  
          "id": 73,  
          "name": "Pfeffer-Schnitzel",  
          "description": "Mit grünen Madagaskar-Pfefferkörnern in cremiger Rahmsoße, mit Pommes frites und Salat der Saison.",  
          "price": 18.90,  
          "allergens": \["A", "C", "G"\]  
        },  
        {  
          "id": 74,  
          "name": "Bauern-Schnitzel",  
          "description": "Mit knusprig gebratenem Speck & Zwiebeln, mit Pommes frites und Salat der Saison.",  
          "price": 19.90,  
          "allergens": \["A", "C"\]  
        },  
        {  
          "id": 75,  
          "name": "Schlemmer-Schnitzel",  
          "description": "Mit frischen Champignons in cremiger Bernaise-Soße, mit Pommes frites und Salat der Saison.",  
          "price": 19.90,  
          "allergens": \["A", "C", "G"\]  
        },  
        {  
          "id": 76,  
          "name": "Lindener Rucksack",  
          "description": "Gefüllt mit Vorderschinken & Mozzarella in frischer Champignon-Sahnesoße.",  
          "price": 21.90,  
          "allergens": \["A", "C", "G"\]  
        }  
      \]  
    },  
    {  
      "category": "Fleischgerichte & Fischgerichte",  
      "items": \[  
        {  
          "id": 80,  
          "name": "Petto di Pollo alla Griglia",  
          "description": "Hähnchenbrustfilet vom Grill mit hausgemachter Kräuterbutter & Zitronenscheibe, dazu Marktgemüse und Gourmetkartoffeln.",  
          "price": 19.90,  
          "allergens": \["G"\]  
        },  
        {  
          "id": 81,  
          "name": "Petto di Pollo al Pepe Verde",  
          "description": "Hähnchenbrustfilet vom Grill mit grünen Madagaskar-Pfefferkörnern in cremiger Rahmsoße, dazu Marktgemüse und Gourmetkartoffeln.",  
          "price": 20.90,  
          "allergens": \["G"\]  
        },  
        {  
          "id": 82,  
          "name": "Filetto di Maiale al Vino Bianco e Limone",  
          "description": "Schweinefilet-Medaillons vom Grill in Weißwein-, Zitronen-, Kräuter- und Knoblauchsauce, dazu Marktgemüse und Gourmetkartoffeln.",  
          "price": 23.90,  
          "allergens": \["O"\]  
        },  
        {  
          "id": 83,  
          "name": "Filetto di Maiale al Pepe Verde",  
          "description": "Schweinefilet vom Grill mit grünen Madagaskar-Pfefferkörnern in cremiger Rahmsoße, dazu Marktgemüse und Gourmetkartoffeln.",  
          "price": 24.90,  
          "allergens": \["G"\]  
        },  
        {  
          "id": 84,  
          "name": "Bistecca alla Griglia",  
          "description": "Argentinisches Rumpsteak vom Lavagrill mit hausgemachter Kräuterbutter & Zitronenscheibe, dazu Marktgemüse und Gourmetkartoffeln.",  
          "price": 29.90,  
          "allergens": \["G"\]  
        },  
        {  
          "id": 85,  
          "name": "Bistecca al Pepe Verde",  
          "description": "Argentinisches Rumpsteak vom Lavagrill mit grünen Madagaskar-Pfefferkörnern in cremiger Rahmsoße, dazu Marktgemüse und Gourmetkartoffeln.",  
          "price": 32.90,  
          "allergens": \["G"\]  
        },  
        {  
          "id": 86,  
          "name": "Orata con Burro al Limone e Aglio",  
          "description": "Frisches Doradenfilet in Zitronen-Kräuter-Knoblauch-Buttersauce, dazu Marktgemüse und goldbraune Gourmetkartoffeln.",  
          "price": 26.90,  
          "allergens":  
        },  
        {  
          "id": 87,  
          "name": "Salmone alla Griglia salsa all \`Arancia e Senape",  
          "description": "Saftiges Lachsfilet aus Norwegen vom Grill in cremiger Orangen-Senf-Sauce, dazu Marktgemüse und Gourmetkartoffeln.",  
          "price": 27.90,  
          "allergens":  
        },  
        {  
          "id": 88,  
          "name": "Seppia alla Griglia",  
          "description": "Marinierter Tintenfisch nach Art des Hauses, dazu Marktgemüse und Gourmetkartoffeln.",  
          "price": 25.90,  
          "allergens":  
        }  
      \]  
    },  
    {  
      "category": "Pizza aus dem Steinofen",  
      "items": \[  
        {  
          "id": 90,  
          "name": "Pizza Margarita",  
          "description": "Mit Mozzarella und Oregano.",  
          "price": 9.50,  
          "allergens": \["A", "G"\]  
        },  
        {  
          "id": 91,  
          "name": "Pizza Salame e funghi",  
          "description": "Mit Salami und frischen Champignons.",  
          "price": 11.50,  
          "allergens": \["A", "G"\]  
        },  
        {  
          "id": 92,  
          "name": "Pizza Regina",  
          "description": "Mit Salami, Vorderschinken und frischen Champignons.",  
          "price": 12.50,  
          "allergens": \["A", "G"\]  
        },  
        {  
          "id": 93,  
          "name": "Pizza Toscana",  
          "description": "Mit Salami, Vorderschinken, Peperoniwurst, Zwiebeln und frischen Champignons.",  
          "price": 13.50,  
          "allergens": \["A", "G"\]  
        },  
        {  
          "id": 94,  
          "name": "Pizza Ratsstuben",  
          "description": "Mit Salami, Vorderschinken, Peperoniwurst, Zwiebeln, frischen Champignons und Ei.",  
          "price": 14.50,  
          "allergens": \["A", "C", "G"\]  
        },  
        {  
          "id": 95,  
          "name": "Pizza Hawaii",  
          "description": "Mit Vorderschinken und Ananasstücken.",  
          "price": 11.50,  
          "allergens": \["A", "G"\]  
        },  
        {  
          "id": 96,  
          "name": "Pizza Diavolo",  
          "description": "Mit Peperoniwurst, scharfen Peperoni und frischen Champignons.",  
          "price": 12.50,  
          "allergens": \["A", "G"\]  
        },  
        {  
          "id": 97,  
          "name": "Pizza Parma e Rucola",  
          "description": "Mit luftgetrocknetem Parmaschinken, mariniertem Rucola und gehobeltem Grana Padano.",  
          "price": 15.50,  
          "allergens": \["A", "G"\]  
        },  
        {  
          "id": 98,  
          "name": "Pizza Amore Mio Talia",  
          "description": "Mit Mozzarella, frischen Champignons, Kirschtomaten und Basilikum.",  
          "price": 14.50,  
          "allergens": \["A", "G"\]  
        },  
        {  
          "id": 99,  
          "name": "Pizza Tonno",  
          "description": "Mit saftigem Thunfisch, frischen Champignons und roten Zwiebeln.",  
          "price": 14.50,  
          "allergens":  
        },  
        {  
          "id": 100,  
          "name": "Pizza Burrata e Rucola",  
          "description": "Mit cremiger Burrata, mariniertem Rucola und Basilikumpesto.",  
          "price": 16.50,  
          "allergens": \["A", "G", "H"\]  
        },  
        {  
          "id": 101,  
          "name": "Pizza Frutti di Mare",  
          "description": "Mit Meeresfrüchten, Kirschtomaten und Knoblauch.",  
          "price": 16.50,  
          "allergens":  
        },  
        {  
          "id": 102,  
          "name": "Pizza Salmone e Gamberoni",  
          "description": "Mit norwegischem Lachsfilet, Garnelen, Kirschtomaten und Knoblauch.",  
          "price": 17.50,  
          "allergens":  
        },  
        {  
          "id": 103,  
          "name": "Pizza Deluxe",  
          "description": "Mit hauchdünnem Kalbfleisch, cremiger Thunfischsauce, mariniertem Rucola und Grana Padano.",  
          "price": 15.50,  
          "allergens":  
        },  
        {  
          "id": 105,  
          "name": "Pizza Vegetale",  
          "description": "Mit gegrilltem frischem Marktgemüse.",  
          "price": 14.50,  
          "allergens": \["A", "G"\]  
        },  
        {  
          "id": 106,  
          "name": "Pizzapane",  
          "description": "Pizzabrot mit Tomatensauce, Knoblauch und Oregano (ohne Käse).",  
          "price": 6.50,  
          "allergens": \["A"\]  
        }  
      \]  
    },  
    {  
      "category": "Familienpizza",  
      "items": \[  
        {  
          "id": 110,  
          "name": "Pizza Margherita",  
          "description": "Mit Mozzarella und Oregano (40 x 60 cm).",  
          "price": 25.00,  
          "allergens": \["A", "G"\]  
        },  
        {  
          "id": 111,  
          "name": "Pizza Regina",  
          "description": "Mit Salami, Vorderschinken und frische Champignons (40 x 60 cm).",  
          "price": 37.00,  
          "allergens": \["A", "G"\]  
        },  
        {  
          "id": 112,  
          "name": "Pizza Toskana",  
          "description": "Mit Salami, Vorderschinken, Peperoniwurst, Zwiebeln und frische Champignons (40 x 60 cm).",  
          "price": 45.00,  
          "allergens": \["A", "G"\]  
        },  
        {  
          "id": 113,  
          "name": "Pizza Tonno",  
          "description": "Mit saftigem Thunfisch, roten Zwiebeln und frische Champignons (40 x 60 cm).",  
          "price": 43.00,  
          "allergens":  
        },  
        {  
          "id": 114,  
          "name": "Pizza Parma e Rucola",  
          "description": "Mit luftgetrocknetem Parmaschinken, mariniertem Rucola und gehobeltem Grana Padano (40 x 60 cm).",  
          "price": 43.00,  
          "allergens": \["A", "G"\]  
        },  
        {  
          "id": 115,  
          "name": "Pizza Vegetaria",  
          "description": "Mit gegrilltem frischem Marktgemüse und Oregano (40 x 60 cm).",  
          "price": 43.50,  
          "allergens": \["A", "G"\]  
        }  
      \]  
    },  
    {  
      "category": "Kindergerichte",  
      "items":  
        },  
        {  
          "id": 121,  
          "name": "Rigatoni burro",  
          "description": "Nudeln in Butter geschwenkt.",  
          "price": 6.50,  
          "allergens": \["A", "G"\]  
        },  
        {  
          "id": 122,  
          "name": "Spaghetti alla Bolognese",  
          "description": "Rinderhackfleisch in Tomatensauce.",  
          "price": 8.90,  
          "allergens": \["A", "G"\]  
        },  
        {  
          "id": 123,  
          "name": "Kleine Schnitzel Wiener Art",  
          "description": "Mit Pommes frites.",  
          "price": 9.90,  
          "allergens": \["A", "C"\]  
        }  
      \]  
    },  
    {  
      "category": "Dessert",  
      "items":  
        },  
        {  
          "id": 131,  
          "name": "Panna Cotta",  
          "description": "Cremig mit fruchtiger Erdbeersauce.",  
          "price": 7.90,  
          "allergens": \["G"\]  
        },  
        {  
          "id": 132,  
          "name": "Tartufo Nero",  
          "description": "Schokolade-Trüffeleis mit cremigem Kern und Sahne.",  
          "price": 8.90,  
          "allergens": \["C", "G", "H"\]  
        },  
        {  
          "id": 133,  
          "name": "Cassata Siciliana",  
          "description": "Eisspezialität mit kandierten Früchten, Erdbeersauce und Sahne.",  
          "price": 9.90,  
          "allergens": \["C", "G", "H"\]  
        },  
        {  
          "id": 134,  
          "name": "Bourbon-Vanilleeis",  
          "description": "Pro Kugel, mit intensivem Vanillearoma.",  
          "price": 3.00,  
          "allergens": \["G"\]  
        }  
      \]  
    }  
  \]  
}

## **Rechtssicherheit und Kundenkommunikation: Das Kreuzkontaminations-Paradigma**

Das Datenmodell löst die technische Herausforderung der Zutatendeklaration nach LMIV 1169/2011.3 In der gastronomischen Praxis existiert jedoch ein operatives Risiko, das sich nicht in binären Datenfeldern abbilden lässt: die Kreuzkontamination. In einer aktiven, hochfrequentierten gewerblichen Küche wie der der 'Ratsstuben' werden unterschiedlichste Lebensmittel zeitgleich und auf begrenztem Raum verarbeitet.2 So können beispielsweise Nudelwasser-Spritzer, die durch die Luft fliegen, winzige Mengen Gluten auf einen an sich glutenfreien Salat übertragen. Ebenso können Friteusen, in denen panierte Schnitzel gebacken werden, Spuren von Weizenmehl und Ei auf eigentlich allergenfreie Beilagen wie Pommes frites übertragen.2

Die LMIV fordert explizit die Kennzeichnung von allergenen *Zutaten*, die dem Produkt absichtlich hinzugefügt werden.4 Für unbeabsichtigt in das Lebensmittel gelangte Spuren (Kreuzkontaminationen) existiert derzeit keine gesetzliche Kennzeichnungspflicht auf Speisekarten in der Form "Kann Spuren von... enthalten", wie man es aus der industriellen Lebensmittelproduktion (FMCG-Sektor) kennt. Dies führt in der Gastronomie oft zu einer rechtlichen und kommunikativen Grauzone.

Viele Gastronomen neigen in Ermangelung rechtlicher Klarheit zu extremen, pauschalen Haftungsausschlüssen, um sich vor Schmerzensgeldforderungen von Allergikern zu schützen.2 Formulierungen wie "Wir übernehmen keinerlei Haftung für allergische Reaktionen" oder "Alle Speisen enthalten alle Allergene" sind jedoch hochgradig problematisch. Juristisch betrachtet sind solche General-Disclaimer (sogenannte "Catch-All"-Klauseln) oft nichtig, da sie den Kernzweck der EU-Informationspflicht untergraben und bei grober Fahrlässigkeit des Küchenpersonals ohnehin keine schützende Wirkung entfalten.2 Psychologisch betrachtet schädigen sie das Vertrauensverhältnis zum Gast immens, da sie Inkompetenz oder Desinteresse am Wohl des Kunden signalisieren.2

Der architektonisch und juristisch sauberste Ansatz für eine Web-Plattform oder Speisekarte ist ein Disclaimer, der prozessuale Transparenz schafft, ohne den rechtlichen Schutzschirm aufzugeben.2 Ein solcher Text muss drei Kernelemente enthalten:

1. Die Bestätigung, dass die Deklarationspflicht ernst genommen wird.  
2. Die Aufklärung über die Unvermeidbarkeit von Spuren in einer handwerklichen Küche.  
3. Die Aufforderung zur aktiven Kommunikation durch den betroffenen Gast.

Basierend auf diesen Anforderungen und der Analyse aktueller Rechtsprechungen zur Werbung mit "allergenfreien" Produkten und Kreuzkontaminationen 9, wurde der folgende kundenfreundliche und abmahnsichere Textbaustein für die Speisekarte und die Web-Applikation der 'Ratsstuben' formuliert:

*"Liebe Gäste, in den Ratsstuben legen wir größten Wert auf handwerkliche Frische und Ihr kulinarisches Wohlbefinden. Auf unserer Speisekarte informieren wir Sie transparent über die deklarationspflichtigen Hauptallergene, die als feste Zutaten in unseren Rezepturen verwendet werden. Bitte beachten Sie jedoch: In unserer Küche wird täglich eine Vielzahl an frischen Lebensmitteln handwerklich verarbeitet. Trotz strengster Hygienestandards, geschultem Personal und größter Sorgfalt bei der Trennung unserer Arbeitsabläufe können wir unbeabsichtigte Kreuzkontaminationen nicht zu 100 % ausschließen. Daher können all unsere Speisen produktionsbedingt mikroskopische Spuren von Allergenen enthalten, die nicht explizit in der Zutatenliste ausgewiesen sind. Ihre Sicherheit ist uns wichtig. Sollten Sie an einer schweren Lebensmittelallergie, Zöliakie oder einer Unverträglichkeit leiden, bitten wir Sie, unser Servicepersonal noch vor Ihrer Bestellung aktiv darauf hinzuweisen. Wir klären die individuelle Zubereitung Ihrer Speisen dann gerne persönlich mit unserem Küchenchef ab, um Ihnen ein sicheres und unbeschwertes Genusserlebnis zu ermöglichen."*

Dieser Disclaimer transferiert das physikalische Problem der Kreuzkontamination von einer juristischen Abwehrhaltung in eine Serviceleistung.2 Er eliminiert die gefährliche Illusion einer klinisch sterilen, allergenfreien Umgebung und etabliert stattdessen einen konstruktiven, sicherheitsstiftenden Dialog. In der Datenbankarchitektur wird dieser Text als eigenständiges globales Text-Asset (z.B. im Objekt legal\_disclaimers auf Root-Ebene) gespeichert, sodass er bei künftigen rechtlichen Änderungen zentral über ein CMS aktualisiert werden kann, ohne in den Code der Frontend-Applikation eingreifen zu müssen.

## **Integration in die Softwarearchitektur und UI/UX-Design**

Das erstellte JSON-Datenmodell bildet die Basis für vielfältige Software-Anwendungen im Gastronomiebereich. Die technische Implementierung dieses Datensatzes bringt jedoch spezifische Anforderungen an die Softwarearchitektur sowie das Design von Benutzeroberflächen (User Interface, UI) und die Nutzererfahrung (User Experience, UX) mit sich.

### **Datenhaltung und API-Design**

Die strukturierte Natur des JSON-Objekts prädestiniert es für die Speicherung in einer dokumentenorientierten NoSQL-Datenbank, wie beispielsweise MongoDB oder CouchDB. Im Gegensatz zu relationalen Datenbanken (SQL), die für die Abbildung dieser Struktur komplexe Join-Operationen über mehrere Tabellen (Categories, Items, Item\_Allergens) erfordern würden, erlaubt eine NoSQL-Datenbank die Speicherung der gesamten Speisekarte als ein zusammenhängendes Dokument. Dies führt zu extrem schnellen Lesezugriffen (Read-Performance), was besonders bei hochfrequentierten Online-Bestellplattformen oder digitalen Speisekarten, auf die Kunden via QR-Code am Tisch zugreifen, von entscheidender Bedeutung ist.

Die Auslieferung der Daten an das Frontend erfolgt idealerweise über eine RESTful API oder einen GraphQL-Endpoint. GraphQL bietet in diesem Kontext den signifikanten Vorteil, dass das Frontend exakt definieren kann, welche Felder benötigt werden. Beispielsweise könnte eine kompakte Mobile-Ansicht nur die Felder id, name und price anfordern, um Bandbreite zu sparen, während die Detailansicht eines Gerichts die Felder description und das komplette allergens-Array nachlädt.

### **Frontend-Entwicklung: Das interaktive Allergen-Management**

Die größte Stärke der JSON-Transformation liegt in der Möglichkeit, dem Endbenutzer interaktive Filterfunktionen anzubieten. Eine statische Speisekarte zwingt den Allergiker, jede einzelne Position auf das Vorhandensein des spezifischen Buchstabens zu scannen – ein fehleranfälliger und frustrierender Prozess. In einer modernen Web-Applikation (entwickelt in Frameworks wie React, Vue.js oder Angular) wird das allergens-Array genutzt, um die Ansicht dynamisch und in Echtzeit anzupassen.

**Use Case: Der dynamische Ausschlussfilter**

Ein Gast leidet an einer Erdnuss- (**E**) und Sojaallergie (**F**). Im Frontend wählt er über ein gut sichtbares Menü ("Allergiefilter") diese beiden Kategorien aus. Die State-Management-Logik der Applikation iteriert in Millisekunden über das geladene JSON-Objekt und wendet eine Filterfunktion an: menuItems.filter(item \=\>\!item.allergens.includes('E') &&\!item.allergens.includes('F')). Alle Gerichte, deren Arrays diese Strings enthalten, werden sofort aus dem Document Object Model (DOM) entfernt (oder visuell ausgegraut, je nach UX-Strategie). Dem Gast wird somit eine maßgeschneiderte, sichere Version der Speisekarte präsentiert.

**Visuelle Repräsentation und Accessibility (Barrierefreiheit)**

Die Darstellung der Buchstaben "A", "C" oder "G" am Ende eines Textstrings ist zwar gesetzlich zulässig, aber kognitiv schwer fassbar. Ein durchdachtes UI wandelt diese Arrays beim Rendern in aussagekräftige visuelle Badges (Icons) um. Das Array \["A", "C", "G"\] bei der "Spaghetti Carbonara" wird im Frontend durch das Component-Rendering in kleine Icons für eine Weizenähre (Gluten), ein Ei und ein Stück Käse (Milch) übersetzt. Um den Richtlinien für Barrierefreiheit im Internet (WCAG) zu entsprechen, müssen diese Icons zwingend mit aria-labels oder HTML-Tooltips versehen werden, die beim Hovern oder Vorlesen durch Screenreader den vollen Text ("Enthält Eier") ausgeben.

## **Fazit und technologischer Ausblick**

Die Konvertierung der unstrukturierten Text-Speisekarte der 'Ratsstuben' in ein maschinenlesbares JSON-Format markiert einen grundlegenden und zwingend notwendigen Schritt in der digitalen Transformation des Gastronomiebetriebs. Das hier entwickelte Datenmodell ermöglicht nicht nur eine nahtlose Integration in moderne Point-of-Sale-Systeme und E-Commerce-Schnittstellen, sondern löst auch die komplexe Anforderung der gesetzlich vorgeschriebenen Allergenkennzeichnung nach EU-Richtlinie 1169/2011 auf elegante, programmatische Weise.

Die größte ingenieurstechnische Herausforderung lag in der initialen Datenaufbereitung, da das Ursprungsdokument keinerlei explizite Allergenkennzeichnungen aufwies.1 Die Anwendung einer heuristischen Textanalyse zum Keyword-Matching ermöglichte es, aus natürlichsprachlichen Beschreibungen wie "hausgemachtes Joghurtdressing" oder "gebratene Garnelen" präzise, standardisierte Arrays aus EU-Allergencodes zu generieren.1 Dies zeigt das Potenzial von NLP (Natural Language Processing) bei der Verarbeitung gastronomischer Altdaten. Dennoch unterstreicht der Prozess auch die Notwendigkeit menschlicher Verifizierung, da Algorithmen nicht-deklarierte Basisbestandteile (sogenannte "Hidden Allergens") in Rezepturen nicht deduzieren können.

Durch die Kombination des strukturierten JSON-Datenmodells mit einem rechtssicher und psychologisch fundiert formulierten Disclaimer zur Kreuzkontamination 2 wurde für die 'Ratsstuben' eine Compliance-Architektur geschaffen, die sowohl den Gastronom vor rechtlichen Risiken schützt als auch das Vertrauen des Konsumenten stärkt.

Für künftige Entwicklungsiterationen bietet das JSON-Format eine exzellente Grundlage zur weiteren Skalierung. So könnten die Daten beispielsweise um Nährwertangaben (Kalorien, Makronährstoffe), CO2-Emissionswerte pro Gericht oder mehrsprachige Lokalisierungen (i18n) erweitert werden, ohne die Grundstruktur der Architektur verändern zu müssen. Die digitale Speisekarte ist somit nicht länger ein statisches Artefakt, sondern ein dynamisches, datengetriebenes Tool, das die betriebliche Effizienz der 'Ratsstuben' maximiert und dem Endkunden ein modernes, informationsgeleitetes, sicheres Gastronomie-Erlebnis bietet.

#### **Referenzen**

1. Speisekarte zusammen.docx  
2. Kreuzkontaminationen auf Speisekarten – klar kommunizieren \- easy menus, Zugriff am April 12, 2026, [https://easymenus.eu/blog/de/how-to-handle-cross-contamination-communication-on-menus](https://easymenus.eu/blog/de/how-to-handle-cross-contamination-communication-on-menus)  
3. Food labelling requirement \- ECARF, Zugriff am April 12, 2026, [https://www.ecarf.org/en/information-portal/general-allergy-info/allergene-deklarationspflicht/](https://www.ecarf.org/en/information-portal/general-allergy-info/allergene-deklarationspflicht/)  
4. Regulation (EU) No 1169/2011 of the European Parliament and of the Council of 25 October 2011 on the provision of food informati, Zugriff am April 12, 2026, [https://eur-lex.europa.eu/LexUriServ/LexUriServ.do?uri=OJ:L:2011:304:0018:0063:en:PDF](https://eur-lex.europa.eu/LexUriServ/LexUriServ.do?uri=OJ:L:2011:304:0018:0063:en:PDF)  
5. EU 1169/2011 Guide: Allergen Labelling requirements \- Menutech, Zugriff am April 12, 2026, [https://menutech.com/en/blog/legal-requirements/eu-11692011-guide-allergen-labelling-requirements](https://menutech.com/en/blog/legal-requirements/eu-11692011-guide-allergen-labelling-requirements)  
6. European Union \- Food Allergens | Food Allergy Research & Resource Program | Nebraska \- farrp, Zugriff am April 12, 2026, [https://farrp.unl.edu/farrp-resources/regulatory/european-union/](https://farrp.unl.edu/farrp-resources/regulatory/european-union/)  
7. Merkblatt zur Allergeninformation gemäß Lebensmittelinformations-VO (EU) Nr. 1169/2011 \- LK Österreich, Zugriff am April 12, 2026, [https://www.lko.at/media.php?filename=download%3D%2F2014.12.17%2F1418821577663386.pdf\&rn=Merkblatt%20Kennzeichnung%20Allergene%20110914.pdf](https://www.lko.at/media.php?filename=download%3D/2014.12.17/1418821577663386.pdf&rn=Merkblatt+Kennzeichnung+Allergene+110914.pdf)  
8. Allergiker-Informationen in der Gastronomie \- Oesterreich GV, Zugriff am April 12, 2026, [https://www.oesterreich.gv.at/de/themen/gesetze\_und\_recht/verbraucherschutz/lebensmittel\_\_\_informationen\_fuer\_verbraucher/Seite.3220000](https://www.oesterreich.gv.at/de/themen/gesetze_und_recht/verbraucherschutz/lebensmittel___informationen_fuer_verbraucher/Seite.3220000)  
9. Werbung mit "Allergenfrei": Haftung bei Spuren und Kreuzkontamination \- Anwalt.de, Zugriff am April 12, 2026, [https://www.anwalt.de/rechtstipps/werbung-mit-allergenfrei-haftung-bei-spuren-und-kreuzkontamination-264759.html](https://www.anwalt.de/rechtstipps/werbung-mit-allergenfrei-haftung-bei-spuren-und-kreuzkontamination-264759.html)