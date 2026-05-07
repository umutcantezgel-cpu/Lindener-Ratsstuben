import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'pageHome',
  title: 'Startseite',
  type: 'document',
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero Bereich',
      type: 'object',
      fields: [
        { name: 'headline', title: 'Überschrift', type: 'string' },
        { name: 'subheadline', title: 'Unterüberschrift', type: 'text', rows: 2 },
        { name: 'ctaText', title: 'Button Text', type: 'string' },
        { name: 'backgroundImage', title: 'Hintergrundbild', type: 'image', options: { hotspot: true } },
      ]
    }),
    defineField({
      name: 'philosophy',
      title: 'Philosophie Bereich',
      type: 'object',
      fields: [
        { name: 'label', title: 'Label (z.B. UNSERE PHILOSOPHIE)', type: 'string' },
        { name: 'title', title: 'Titel', type: 'string' },
        { name: 'description', title: 'Beschreibung', type: 'text', rows: 4 },
        { name: 'quote', title: 'Zitat', type: 'string' },
        { name: 'quoteAuthor', title: 'Zitat Autor', type: 'string' },
        { name: 'image', title: 'Bild', type: 'image', options: { hotspot: true } }
      ]
    }),
    defineField({
      name: 'ctaBand',
      title: 'CTA Banner',
      type: 'object',
      fields: [
        { name: 'headline', title: 'Überschrift', type: 'string' },
        { name: 'subheadline', title: 'Unterüberschrift', type: 'string' },
      ]
    })
  ]
})
