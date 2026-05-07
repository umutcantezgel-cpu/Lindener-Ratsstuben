import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'seasonalMenu',
  title: 'Saisonkarte',
  type: 'document',
  fields: [
    defineField({
      name: 'isActive',
      title: 'Saisonkarte Aktivieren',
      type: 'boolean',
      description: 'Wenn aktiviert, wird die Saisonkarte auf der Webseite angezeigt.',
      initialValue: true,
    }),
    defineField({
      name: 'title_de',
      title: 'Titel (Deutsch)',
      type: 'string',
      validation: (rule) => rule.required(),
      initialValue: 'Saisonale Specials',
    }),
    defineField({
      name: 'title_en',
      title: 'Titel (Englisch)',
      type: 'string',
    }),
    defineField({
      name: 'description_de',
      title: 'Beschreibung (Deutsch, Optional)',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'description_en',
      title: 'Beschreibung (Englisch, Optional)',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'categories',
      title: 'Kategorien',
      type: 'array',
      description: 'Z.B. "Hausgemachte Burger", "Saisonale Limonaden"',
      of: [
        {
          type: 'object',
          title: 'Kategorie',
          fields: [
            defineField({
              name: 'categoryTitle_de',
              title: 'Kategorie Titel (Deutsch)',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'categoryTitle_en',
              title: 'Kategorie Titel (Englisch)',
              type: 'string',
            }),
            defineField({
              name: 'items',
              title: 'Artikel',
              type: 'array',
              of: [
                {
                  type: 'object',
                  title: 'Artikel',
                  fields: [
                    defineField({
                      name: 'name_de',
                      title: 'Name (Deutsch)',
                      type: 'string',
                      validation: (rule) => rule.required(),
                    }),
                    defineField({
                      name: 'name_en',
                      title: 'Name (Englisch)',
                      type: 'string',
                    }),
                    defineField({
                      name: 'description_de',
                      title: 'Beschreibung (Deutsch)',
                      type: 'text',
                      rows: 2,
                    }),
                    defineField({
                      name: 'description_en',
                      title: 'Beschreibung (Englisch)',
                      type: 'text',
                      rows: 2,
                    }),
                    defineField({
                      name: 'price',
                      title: 'Preis (€)',
                      type: 'number',
                      validation: (rule) => rule.required().positive(),
                    }),
                    defineField({
                      name: 'allergens',
                      title: 'Allergene',
                      type: 'array',
                      of: [{ type: 'reference', to: [{ type: 'allergen' }] }],
                    }),
                    defineField({
                      name: 'additives',
                      title: 'Zusatzstoffe (z.B. "mit Farbstoff")',
                      type: 'array',
                      of: [{ type: 'string' }],
                      options: { layout: 'tags' },
                    }),
                  ],
                  preview: {
                    select: {
                      title: 'name_de',
                      subtitle: 'price',
                    },
                    prepare({ title, subtitle }) {
                      return {
                        title,
                        subtitle: subtitle ? `€${subtitle.toFixed(2)}` : '',
                      }
                    }
                  }
                }
              ]
            })
          ],
          preview: {
            select: {
              title: 'categoryTitle_de',
            }
          }
        }
      ]
    }),
  ],
  preview: {
    select: {
      title: 'title_de',
      isActive: 'isActive',
    },
    prepare({ title, isActive }) {
      return {
        title: title || 'Saisonkarte',
        subtitle: isActive ? 'Aktiv' : 'Inaktiv',
      }
    }
  }
})
