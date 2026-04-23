import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'allergen',
  title: 'Allergen / Additive',
  type: 'document',
  fields: [
    defineField({
      name: 'code',
      title: 'Code/Letter (z.B. A, B, 1, 2)',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
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
      name: 'name_ar',
      title: 'Name (Arabisch)',
      type: 'string',
    }),
    defineField({
      name: 'name_fr',
      title: 'Name (Französisch)',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'name_de',
      subtitle: 'code',
    },
    prepare({ title, subtitle }) {
      return {
        title: `(${subtitle}) ${title}`,
      }
    },
  },
})
