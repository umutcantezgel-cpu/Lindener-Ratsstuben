import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'category',
  title: 'Kategorie',
  type: 'document',
  fields: [
    defineField({
      name: 'title_de',
      title: 'Titel (Deutsch)',
      type: 'string',
      validation: (rule) => rule.required().max(60),
    }),
    defineField({
      name: 'title_en',
      title: 'Titel (Englisch)',
      type: 'string',
      validation: (rule) => rule.max(60),
    }),
    defineField({
      name: 'title_ar',
      title: 'Titel (Arabisch)',
      type: 'string',
      validation: (rule) => rule.max(60),
    }),
    defineField({
      name: 'title_fr',
      title: 'Titel (Französisch)',
      type: 'string',
      validation: (rule) => rule.max(60),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL-Kennung)',
      type: 'slug',
      options: {
        source: 'title_de',
        maxLength: 60,
      },
      description: 'Wird für die URL-Struktur und Filter-Logik verwendet.',
      validation: (rule) => rule.required(),
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
      name: 'description_ar',
      title: 'Beschreibung (Arabisch, Optional)',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'description_fr',
      title: 'Beschreibung (Französisch, Optional)',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'icon',
      title: 'Icon (Emoji oder Text)',
      type: 'string',
      description: 'Optional: Ein Emoji wie 🥗 oder 🍝 das neben der Kategorie angezeigt wird.',
      validation: (rule) => rule.max(5),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover-Bild (Optional)',
      type: 'image',
      description: 'Für visuelle Header auf der Menü-Seite',
      options: { hotspot: true }
    }),
    defineField({
      name: 'order',
      title: 'Sortierung',
      type: 'number',
      description: 'Niedrigere Zahlen werden zuerst angezeigt. Per Drag & Drop im Studio verschiebbar.',
    }),
  ],
  orderings: [
    {
      title: 'Sortierung aufsteigend',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title_de',
      subtitle: 'title_en',
      icon: 'icon',
    },
    prepare({ title, subtitle, icon }) {
      return {
        title: icon ? `${icon} ${title}` : title,
        subtitle: subtitle || '',
      }
    },
  },
})
