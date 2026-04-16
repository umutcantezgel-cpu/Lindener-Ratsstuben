import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'dish',
  title: 'Gericht',
  type: 'document',
  groups: [
    { name: 'content', title: 'Inhalte', default: true },
    { name: 'pricing', title: 'Preis & Nummer' },
    { name: 'meta', title: 'Eigenschaften & Tags' },
    { name: 'media', title: 'Bild' },
  ],
  fields: [
    // ═══ CONTENT GROUP ═══
    defineField({
      name: 'title_de',
      title: 'Titel (Deutsch)',
      type: 'string',
      group: 'content',
      validation: (rule) => rule.required().max(80).error('Titel darf maximal 80 Zeichen lang sein.'),
    }),
    defineField({
      name: 'title_en',
      title: 'Title (English)',
      type: 'string',
      group: 'content',
      validation: (rule) => rule.max(80),
    }),
    defineField({
      name: 'title_ar',
      title: 'Title (Arabic)',
      type: 'string',
      group: 'content',
      validation: (rule) => rule.max(80),
    }),
    defineField({
      name: 'title_fr',
      title: 'Title (French)',
      type: 'string',
      group: 'content',
      validation: (rule) => rule.max(80),
    }),
    defineField({
      name: 'description_de',
      title: 'Beschreibung (Deutsch)',
      type: 'text',
      group: 'content',
      rows: 3,
      validation: (rule) => rule.max(300).warning('Beschreibungen über 300 Zeichen werden auf mobilen Geräten abgeschnitten.'),
    }),
    defineField({
      name: 'description_en',
      title: 'Description (English)',
      type: 'text',
      group: 'content',
      rows: 3,
      validation: (rule) => rule.max(300),
    }),
    defineField({
      name: 'description_ar',
      title: 'Description (Arabic)',
      type: 'text',
      group: 'content',
      rows: 3,
      validation: (rule) => rule.max(300),
    }),
    defineField({
      name: 'description_fr',
      title: 'Description (French)',
      type: 'text',
      group: 'content',
      rows: 3,
      validation: (rule) => rule.max(300),
    }),

    // ═══ PRICING GROUP ═══
    defineField({
      name: 'nr',
      title: 'Gericht-Nr.',
      type: 'string',
      group: 'pricing',
      description: 'Die Nummer des Gerichts auf der Speisekarte (z.B. "101", "A3")',
      validation: (rule) => rule.max(10),
    }),
    defineField({
      name: 'price',
      title: 'Basis-Preis (€)',
      type: 'number',
      group: 'pricing',
      description: 'Der Standardpreis. Wird ignoriert oder als "Ab"-Preis genutzt, wenn Preis-Varianten definiert sind.',
      validation: (rule) => rule.positive().precision(2),
    }),
    defineField({
      name: 'priceVariants',
      title: 'Preis-Varianten (Optional)',
      type: 'array',
      group: 'pricing',
      description: 'Verwenden Sie dies für verschiedene Größen (z.B. Klein/Groß, 26cm/32cm).',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name_de', title: 'Name (Deutsch) z.B. "Klein"', type: 'string', validation: rule => rule.required() },
            { name: 'name_en', title: 'Name (English)', type: 'string' },
            { name: 'name_ar', title: 'Name (Arabic)', type: 'string' },
            { name: 'name_fr', title: 'Name (French)', type: 'string' },
            { name: 'price', title: 'Preis (€)', type: 'number', validation: rule => rule.required().positive().precision(2) }
          ],
          preview: {
            select: { title: 'name_de', subtitle: 'price' },
            prepare({ title, subtitle }) { return { title, subtitle: `€${subtitle.toFixed(2)}` } }
          }
        }
      ]
    }),

    // ═══ META GROUP ═══
    defineField({
      name: 'category',
      title: 'Kategorie',
      type: 'reference',
      to: [{ type: 'category' }],
      group: 'meta',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'isAvailable',
      title: 'Verfügbar?',
      type: 'boolean',
      group: 'meta',
      initialValue: true,
      description: 'Wenn deaktiviert, wird das Gericht auf der Karte als "Ausverkauft" markiert oder ausgeblendet.',
    }),
    defineField({
      name: 'allergens',
      title: 'Allergene',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'allergen' }] }],
      group: 'meta',
    }),
    defineField({
      name: 'additives',
      title: 'Zusatzstoffe (z.B. "mit Farbstoff", "koffeinhaltig")',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'meta',
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'specialDiet',
      title: 'Diätetische Eigenschaften',
      type: 'array',
      group: 'meta',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Vegetarisch', value: 'vegetarian' },
          { title: 'Vegan', value: 'vegan' },
          { title: 'Glutenfrei', value: 'gluten_free' },
          { title: 'Laktosefrei', value: 'lactose_free' },
          { title: 'Halal', value: 'halal' }
        ],
        layout: 'grid'
      }
    }),
    defineField({
      name: 'badges',
      title: 'Hervorhebungs-Badges',
      type: 'array',
      group: 'meta',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Neu', value: 'new' },
          { title: 'Saisonal', value: 'seasonal' },
          { title: 'Chef Empfehlung', value: 'chef_recommendation' },
          { title: 'Lokal/Regional', value: 'local' }
        ],
        layout: 'grid'
      }
    }),
    defineField({
      name: 'isBestseller',
      title: 'Stern-Favorit?',
      type: 'boolean',
      group: 'meta',
      initialValue: false,
      description: 'Markiert das Gericht als besonderen Favorit (z.B. mit Stern).',
    }),
    defineField({
      name: 'spiceLevel',
      title: 'Schärfegrad (0-3)',
      type: 'number',
      group: 'meta',
      initialValue: 0,
      validation: (rule) => rule.min(0).max(3).integer(),
      description: '0 = nicht scharf, 1 = mild, 2 = mittel, 3 = scharf',
    }),

    // ═══ MEDIA GROUP ═══
    defineField({
      name: 'image',
      title: 'Bild',
      type: 'image',
      group: 'media',
      options: {
        hotspot: true,
      },
    }),

    // ═══ SORTING ═══
    defineField({
      name: 'order',
      title: 'Sortierung',
      type: 'number',
      description: 'Niedrigere Zahlen werden zuerst angezeigt (innerhalb der Kategorie)',
    }),
  ],
  orderings: [
    {
      title: 'Kategorie, dann Sortierung',
      name: 'categoryOrder',
      by: [
        { field: 'category._ref', direction: 'asc' },
        { field: 'order', direction: 'asc' },
      ],
    },
    {
      title: 'Gericht-Nr.',
      name: 'nrAsc',
      by: [{ field: 'nr', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title_de',
      nr: 'nr',
      subtitle: 'price',
      media: 'image',
      isBestseller: 'isBestseller',
    },
    prepare({ title, nr, subtitle, media, isBestseller }) {
      const prefix = nr ? `#${nr} ` : ''
      const star = isBestseller ? ' ⭐' : ''
      return {
        title: `${prefix}${title || 'Unbenannt'}${star}`,
        subtitle: subtitle ? `€${subtitle.toFixed(2)}` : 'Kein Preis',
        media,
      }
    },
  },
})
