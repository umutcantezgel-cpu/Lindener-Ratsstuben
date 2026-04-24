import { createClient } from '@sanity/client';
import { menuItems, categories } from '../src/data/menu';
import dotenv from 'dotenv';
import path from 'path';

// Lade .env.local Umgebungsvariablen
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!token) {
  console.error('❌ ERROR: SANITY_API_WRITE_TOKEN fehlt in der .env.local Datei!');
  console.error('Bitte erstelle einen Token (Write-Berechtigung) im Sanity Dashboard unter API -> Add API Token');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-04-16',
  useCdn: false,
  token,
});

async function importData() {
  console.log(`Starte Import in Projekt: ${projectId}, Dataset: ${dataset}`);
  console.log('---');

  // 1. Kategorien importieren
  console.log(`Lade ${categories.length} Kategorien hoch...`);
  const categoryIdMap = new Map();

  for (const cat of categories) {
    // Generiere eindeutige Sanity ID aus der ID
    const sanityId = `cat-${cat.id}`;
    categoryIdMap.set(cat.id, sanityId);

    const doc = {
      _id: sanityId,
      _type: 'category',
      title_de: cat.name,
      slug: cat.id
    };

    try {
      await client.createOrReplace(doc);
      console.log(`✅ Kategorie erstellt: ${cat.name}`);
    } catch (err) {
      console.error(`❌ Fehler bei Kategorie ${cat.name}:`, err);
    }
  }

  console.log('---');
  // 2. Gerichte importieren
  console.log(`Lade ${menuItems.length} Gerichte hoch...`);

  for (let i = 0; i < menuItems.length; i++) {
    const item = menuItems[i];
    const sanityCatId = categoryIdMap.get(item.category);
    
    // Vermeide ungültige _id (nur a-z, 0-9, _, - erlaubt)
    const safeNr = (item.nr || `no-nr-${i}`).toString().toLowerCase().replace(/[^a-z0-9_-]/g, '-');
    const docId = `dish-${sanityCatId}-${safeNr}`;

    const doc = {
      _id: docId,
      _type: 'dish',
      nr: item.nr,
      title_de: item.name,
      description_de: item.description,
      price: item.price || 0,
      isAvailable: true,
      category: {
        _type: 'reference',
        _ref: sanityCatId
      },
      order: i
    };

    try {
      await client.createOrReplace(doc);
      console.log(`✅ Gericht erstellt: [${item.nr}] ${item.name}`);
    } catch (err) {
      console.error(`❌ Fehler bei Gericht [${item.nr}] ${item.name}:`, err);
    }
  }

  console.log('---');
  console.log('🎉 Import erfolgreich abgeschlossen!');
}

importData().catch(console.error);
