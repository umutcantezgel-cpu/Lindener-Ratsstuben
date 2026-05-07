import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'SEO & Globale Einstellungen',
  type: 'document',
  groups: [
    { name: 'seo', title: 'SEO Meta-Daten', default: true },
    { name: 'menu', title: 'Speisekarten (PDF)' },
    { name: 'social', title: 'Social Media' },
  ],
  fields: [
    // ═══ SEO ═══
    defineField({
      name: 'seoTitle',
      title: 'SEO Titel',
      type: 'string',
      group: 'seo',
      description: 'Der globale Titel der Webseite (z.B. "Lindener Ratsstuben | Italienisches Restaurant")',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Beschreibung',
      type: 'text',
      group: 'seo',
      rows: 3,
      description: 'Die Meta-Beschreibung, die bei Google angezeigt wird (150-160 Zeichen).',
    }),
    defineField({
      name: 'seoKeywords',
      title: 'SEO Keywords',
      type: 'string',
      group: 'seo',
      description: 'Kommagetrennte Liste von Keywords (z.B. "Restaurant, Italienisch, Pizza, Pasta")',
    }),
    defineField({
      name: 'ogImage',
      title: 'Social Media Vorschaubild',
      type: 'image',
      group: 'seo',
      description: 'Bild, das beim Teilen auf Facebook, WhatsApp, etc. angezeigt wird (1200x630px).',
    }),

    // ═══ PDF MENU ═══
    defineField({
      name: 'mainMenuPdf',
      title: 'Hauptspeisekarte (PDF)',
      type: 'file',
      group: 'menu',
      description: 'Lade hier die aktuelle Hauptspeisekarte als PDF hoch. Alle Download-Buttons auf der Webseite aktualisieren sich automatisch.',
      options: {
        accept: 'application/pdf',
      },
    }),
    defineField({
      name: 'dailySpecialsPdf',
      title: 'Tageskarte (PDF)',
      type: 'file',
      group: 'menu',
      description: 'Lade hier eine optionale Tageskarte als PDF hoch.',
      options: {
        accept: 'application/pdf',
      },
    }),

    // ═══ SOCIAL MEDIA ═══
    defineField({
      name: 'facebookUrl',
      title: 'Facebook URL',
      type: 'url',
      group: 'social',
    }),
    defineField({
      name: 'instagramUrl',
      title: 'Instagram URL',
      type: 'url',
      group: 'social',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'SEO & Globale Einstellungen',
        subtitle: 'Zentrale Konfiguration für SEO, PDFs und Social Media',
      }
    },
  },
})
