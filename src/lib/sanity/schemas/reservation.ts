import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'reservation',
  title: 'Reservierungen',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'E-Mail',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Telefon',
      type: 'string',
    }),
    defineField({
      name: 'date',
      title: 'Datum',
      type: 'string',
    }),
    defineField({
      name: 'time',
      title: 'Uhrzeit',
      type: 'string',
    }),
    defineField({
      name: 'guests',
      title: 'Gäste',
      type: 'string',
    }),
    defineField({
      name: 'message',
      title: 'Nachricht/Anmerkungen',
      type: 'text',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Neu (Unbestätigt)', value: 'new' },
          { title: 'Bestätigt', value: 'confirmed' },
          { title: 'Abgelehnt/Storniert', value: 'cancelled' },
        ],
        layout: 'radio',
      },
      initialValue: 'new',
    })
  ],
  preview: {
    select: {
      title: 'name',
      date: 'date',
      time: 'time',
      guests: 'guests',
    },
    prepare(selection) {
      const { title, date, time, guests } = selection
      return {
        title: title,
        subtitle: `${date} ${time} | ${guests} Personen`
      }
    }
  }
})
