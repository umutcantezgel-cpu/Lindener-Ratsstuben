import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'company',
  title: 'Unternehmensdaten',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Unternehmensname',
      type: 'string',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'E-Mail Adresse',
      type: 'string',
      validation: rule => rule.email(),
    }),
    defineField({
      name: 'phone',
      title: 'Telefonnummer',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Adresse',
      type: 'object',
      fields: [
        { name: 'street', title: 'Straße & Hausnummer', type: 'string' },
        { name: 'zip', title: 'Postleitzahl', type: 'string' },
        { name: 'city', title: 'Stadt', type: 'string' },
      ],
    }),
    defineField({
      name: 'openingHours',
      title: 'Öffnungszeiten',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'days', title: 'Tage (z.B. Montag - Freitag)', type: 'string' },
            { name: 'hours', title: 'Zeiten (z.B. 17:00 - 22:00 Uhr)', type: 'string' },
          ],
          preview: {
            select: { title: 'days', subtitle: 'hours' },
          }
        }
      ]
    }),
    defineField({
      name: 'vacationMode',
      title: 'Urlaubsmodus / Geschlossen',
      type: 'object',
      fields: [
        { name: 'isActive', title: 'Ist aktiv?', type: 'boolean', initialValue: false },
        { name: 'message_de', title: 'Nachricht (Deutsch)', type: 'text', rows: 2 },
        { name: 'message_en', title: 'Nachricht (Englisch)', type: 'text', rows: 2 },
      ]
    })
  ]
})
