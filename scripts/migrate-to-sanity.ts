#!/usr/bin/env tsx
// ═══════════════════════════════════════════════════════════════
// Sanity CMS Migration: SSOT → Sanity Studio
// Migriert alle Allergene, Kategorien, Speisen & Getränke
// ═══════════════════════════════════════════════════════════════

import { createClient } from '@sanity/client'
import { foodItems } from '../src/data/menu-ssot-food'
import { drinkItems } from '../src/data/menu-ssot-drinks'
import { categories, allergenLegend, zusatzstoffLegend } from '../src/data/menu'
import { NUSS_SUBKLASSEN, GETREIDE_SUBKLASSEN } from '../src/data/allergens'

// ─── Client Setup ─────────────────────────────────────────────
const client = createClient({
  projectId: 'sqgqbi4y',
  dataset: 'production',
  token: process.env.SANITY_WRITE_TOKEN,
  apiVersion: '2024-04-16',
  useCdn: false,
})

if (!process.env.SANITY_WRITE_TOKEN) {
  console.error('❌ SANITY_WRITE_TOKEN is required. Set it via environment variable.')
  process.exit(1)
}

// ─── Deterministic ID helpers ─────────────────────────────────
// Normalize code: keep case but make ID lowercase
const allergenId = (code: string) => `allergen-${code.toLowerCase()}`

// ─── Complete allergen map (base + subclasses) ────────────────
const allAllergenCodes: Record<string, string> = {
  ...allergenLegend,
  // Nuss-Subklassen
  ...Object.fromEntries(Object.entries(NUSS_SUBKLASSEN).map(([k, v]) => [k, `Nüsse: ${v}`])),
  // Getreide-Subklassen
  ...Object.fromEntries(Object.entries(GETREIDE_SUBKLASSEN).map(([k, v]) => [k, `Glutenh. Getreide: ${v}`])),
}
const categoryId = (slug: string) => `category-${slug}`

// ─── Category Icons & Order ───────────────────────────────────
const categoryMeta: Record<string, { icon: string; order: number }> = {
  'aperitif':              { icon: '🥂', order: 1 },
  'suppen':                { icon: '🥣', order: 2 },
  'vorspeisen':            { icon: '🍽️', order: 3 },
  'salate':                { icon: '🥗', order: 4 },
  'pasta':                 { icon: '🍝', order: 5 },
  'pasta-al-forno':        { icon: '🫕', order: 6 },
  'hausgemachte-pasta':    { icon: '🤌', order: 7 },
  'schnitzel':             { icon: '🥩', order: 8 },
  'fleisch-fisch':         { icon: '🐟', order: 9 },
  'pizza':                 { icon: '🍕', order: 10 },
  'familienpizza':         { icon: '🍕', order: 11 },
  'saisonal-burger':       { icon: '🍔', order: 12 },
  'saisonal-limonaden':    { icon: '🍋', order: 13 },
  'kindergerichte':        { icon: '👶', order: 14 },
  'dessert':               { icon: '🍰', order: 15 },
  'warme-getraenke':       { icon: '☕', order: 16 },
  'alkoholfreie-getraenke':{ icon: '🥤', order: 17 },
  'saefte':                { icon: '🧃', order: 18 },
  'biere':                 { icon: '🍺', order: 19 },
  'rotweine':              { icon: '🍷', order: 20 },
  'weissweine':            { icon: '🥂', order: 21 },
  'spirituosen':           { icon: '🥃', order: 22 },
  'likoere':               { icon: '🍸', order: 23 },
}

// ═══════════════════════════════════════════════════════════════
// STEP 1: Migrate Allergens
// ═══════════════════════════════════════════════════════════════
async function migrateAllergens() {
  console.log('\n🧪 Migriere Allergene...')
  const transaction = client.transaction()

  // Base allergens + subclasses (C1-C4, E1-E5)
  for (const [code, name] of Object.entries(allAllergenCodes)) {
    transaction.createOrReplace({
      _id: allergenId(code),
      _type: 'allergen',
      code,
      name_de: name,
      name_en: name,
    })
  }

  // Zusatzstoffe (1-11) — stored as allergen docs too
  for (const [code, name] of Object.entries(zusatzstoffLegend)) {
    transaction.createOrReplace({
      _id: allergenId(code),
      _type: 'allergen',
      code,
      name_de: name,
      name_en: name,
    })
  }

  const result = await transaction.commit()
  const totalAllergens = Object.keys(allAllergenCodes).length + Object.keys(zusatzstoffLegend).length
  console.log(`  ✅ ${totalAllergens} Allergene/Zusatzstoffe migriert (Transaction: ${result.transactionId})`)
}

// ═══════════════════════════════════════════════════════════════
// STEP 2: Migrate Categories
// ═══════════════════════════════════════════════════════════════
async function migrateCategories() {
  console.log('\n📂 Migriere Kategorien...')
  const transaction = client.transaction()

  for (const cat of categories) {
    const meta = categoryMeta[cat.id] || { icon: '📋', order: 99 }
    transaction.createOrReplace({
      _id: categoryId(cat.id),
      _type: 'category',
      title_de: cat.name,
      title_en: cat.label,
      slug: { _type: 'slug', current: cat.id },
      icon: meta.icon,
      order: meta.order,
    })
  }

  const result = await transaction.commit()
  console.log(`  ✅ ${categories.length} Kategorien migriert (Transaction: ${result.transactionId})`)
}

// ═══════════════════════════════════════════════════════════════
// STEP 3: Migrate Dishes (Food + Drinks)
// ═══════════════════════════════════════════════════════════════
async function migrateDishes() {
  const allItems = [...foodItems, ...drinkItems]
  console.log(`\n🍽️  Migriere ${allItems.length} Gerichte/Getränke...`)

  // Sanity has a transaction limit, so we batch in groups of 50
  const BATCH_SIZE = 50
  let migrated = 0

  for (let i = 0; i < allItems.length; i += BATCH_SIZE) {
    const batch = allItems.slice(i, i + BATCH_SIZE)
    const transaction = client.transaction()

    for (const item of batch) {
      // Build allergen references
      const allergenRefs = (item.allergens || []).map(code => ({
        _type: 'reference',
        _ref: allergenId(code),
        _key: `al-${code.toLowerCase()}`,
      }))

      // Build additives references (zusatzstoffe are also in allergen docs)
      const additiveRefs = (item.zusatzstoffe || []).map(code => ({
        _type: 'reference',
        _ref: allergenId(code),
        _key: `zs-${code}`,
      }))

      const allRefs = [...allergenRefs, ...additiveRefs]

      // Deterministic ID: category-nr (e.g., "dish-pizza-90")
      const dishId = `dish-${item.category}-${item.nr}`

      transaction.createOrReplace({
        _id: dishId,
        _type: 'dish',
        nr: item.nr,
        title_de: item.name,
        description_de: item.description || undefined,
        price: item.price,
        category: {
          _type: 'reference',
          _ref: categoryId(item.category),
        },
        allergens: allRefs.length > 0 ? allRefs : undefined,
        isAvailable: true,
        isBestseller: false,
        spiceLevel: 0,
        order: parseInt(item.nr) || 999,
      })
    }

    const result = await transaction.commit()
    migrated += batch.length
    console.log(`  📦 Batch ${Math.ceil((i + 1) / BATCH_SIZE)}: ${batch.length} Einträge migriert (${migrated}/${allItems.length})`)
  }

  console.log(`  ✅ Alle ${migrated} Gerichte/Getränke erfolgreich migriert!`)
}

// ═══════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════
async function main() {
  console.log('═══════════════════════════════════════════════')
  console.log('  Lindener Ratsstuben — Sanity CMS Migration')
  console.log('═══════════════════════════════════════════════')
  console.log(`  Projekt: sqgqbi4y | Dataset: production`)
  console.log(`  Speisen: ${foodItems.length} | Getränke: ${drinkItems.length}`)
  console.log(`  Kategorien: ${categories.length}`)
  console.log('═══════════════════════════════════════════════')

  try {
    await migrateAllergens()
    await migrateCategories()
    await migrateDishes()

    console.log('\n✅ ✅ ✅  MIGRATION ERFOLGREICH ABGESCHLOSSEN! ✅ ✅ ✅')
    console.log('  → Öffne https://www.lindener-ratsstuben.de/sanity um die Daten zu prüfen')
  } catch (error) {
    console.error('\n❌ MIGRATION FEHLGESCHLAGEN:', error)
    process.exit(1)
  }
}

main()
