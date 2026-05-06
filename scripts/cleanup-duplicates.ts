#!/usr/bin/env tsx
// ═══════════════════════════════════════════════════════════════
// Sanity Cleanup: Remove duplicate documents from old migrations
// Removes all docs with old ID prefixes (cat-*, dish-cat-*)
// while keeping the new ones (category-*, dish-*)
// ═══════════════════════════════════════════════════════════════

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'sqgqbi4y',
  dataset: 'production',
  token: process.env.SANITY_WRITE_TOKEN,
  apiVersion: '2024-04-16',
  useCdn: false,
})

if (!process.env.SANITY_WRITE_TOKEN) {
  console.error('❌ SANITY_WRITE_TOKEN is required.')
  process.exit(1)
}

async function cleanup() {
  console.log('═══════════════════════════════════════════════')
  console.log('  Sanity Cleanup — Duplikat-Bereinigung')
  console.log('═══════════════════════════════════════════════')

  // ─── Step 1: Count current state ─────────────────────────────
  const totalDishes = await client.fetch<number>("count(*[_type == 'dish'])")
  const totalCategories = await client.fetch<number>("count(*[_type == 'category'])")
  const totalAllergens = await client.fetch<number>("count(*[_type == 'allergen'])")

  console.log(`\n📊 Aktueller Stand:`)
  console.log(`   Gerichte:    ${totalDishes}`)
  console.log(`   Kategorien:  ${totalCategories}`)
  console.log(`   Allergene:   ${totalAllergens}`)

  // ─── Step 2: Find old documents ──────────────────────────────
  // Old categories: IDs starting with "cat-" (not "category-")
  const oldCategoryIds = await client.fetch<string[]>(
    "*[_type == 'category' && _id match 'cat-*' && !(_id match 'category-*')]._id"
  )

  // Old dishes: IDs starting with "dish-cat-"
  const oldDishIds = await client.fetch<string[]>(
    "*[_type == 'dish' && _id match 'dish-cat-*']._id"
  )

  // Old allergens: IDs with uppercase or non-standard format
  const allAllergenIds = await client.fetch<string[]>(
    "*[_type == 'allergen']._id"
  )
  // Keep only allergen-* format, delete anything else
  const oldAllergenIds = allAllergenIds.filter(id => !id.startsWith('allergen-'))

  console.log(`\n🔍 Gefundene Duplikate:`)
  console.log(`   Alte Kategorien (cat-*):    ${oldCategoryIds.length}`)
  console.log(`   Alte Gerichte (dish-cat-*):  ${oldDishIds.length}`)
  console.log(`   Alte Allergene:              ${oldAllergenIds.length}`)

  const totalToDelete = oldCategoryIds.length + oldDishIds.length + oldAllergenIds.length

  if (totalToDelete === 0) {
    console.log('\n✅ Keine Duplikate gefunden! Datenbank ist sauber.')
    return
  }

  console.log(`\n🗑️  Lösche ${totalToDelete} veraltete Dokumente...`)

  // ─── Step 3: Delete old documents in batches ─────────────────
  const BATCH_SIZE = 50
  const allOldIds = [...oldDishIds, ...oldCategoryIds, ...oldAllergenIds]

  for (let i = 0; i < allOldIds.length; i += BATCH_SIZE) {
    const batch = allOldIds.slice(i, i + BATCH_SIZE)
    const transaction = client.transaction()

    for (const id of batch) {
      transaction.delete(id)
    }

    await transaction.commit()
    console.log(`   📦 Batch ${Math.ceil((i + 1) / BATCH_SIZE)}: ${batch.length} Dokumente gelöscht`)
  }

  // ─── Step 4: Verify final state ──────────────────────────────
  const finalDishes = await client.fetch<number>("count(*[_type == 'dish'])")
  const finalCategories = await client.fetch<number>("count(*[_type == 'category'])")
  const finalAllergens = await client.fetch<number>("count(*[_type == 'allergen'])")

  console.log(`\n✅ Bereinigung abgeschlossen!`)
  console.log(`   Gerichte:    ${totalDishes} → ${finalDishes}`)
  console.log(`   Kategorien:  ${totalCategories} → ${finalCategories}`)
  console.log(`   Allergene:   ${totalAllergens} → ${finalAllergens}`)
  console.log(`   Gelöscht:    ${totalToDelete} Dokumente`)
}

cleanup().catch(err => {
  console.error('❌ Cleanup fehlgeschlagen:', err)
  process.exit(1)
})
