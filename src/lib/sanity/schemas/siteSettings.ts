import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Website-Einstellungen',
  type: 'document',
  groups: [
    { name: 'general', title: 'Allgemein', default: true },
    { name: 'contact', title: 'Kontakt & Adresse' },
    { name: 'hours', title: 'Öffnungszeiten' },
    { name: 'hero', title: 'Startseite Hero-Texte' },
    { name: 'menu', title: 'Speisekarte (PDF)' },
    { name: 'social', title: 'Social Media' },
  ],
  fields: [
    // ═══ GENERAL ═══
    defineField({
      name: 'title',
      title: 'Website-Titel',
      type: 'string',
      group: 'general',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Slogan / Untertitel',
      type: 'string',
      group: 'general',
      description: 'z.B. "Deutsch-Italienische Küche"',
    }),

    // ═══ CONTACT ═══
    defineField({
      name: 'contactEmail',
      title: 'Kontakt E-Mail',
      type: 'string',
      group: 'contact',
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: 'contactPhone',
      title: 'Telefonnummer',
      type: 'string',
      group: 'contact',
      description: 'Im internationalen Format, z.B. +49640364556',
    }),
    defineField({
      name: 'displayPhone',
      title: 'Angezeigte Telefonnummer',
      type: 'string',
      group: 'contact',
      description: 'So wie sie auf der Webseite angezeigt wird, z.B. "06403 - 64556"',
    }),
    defineField({
      name: 'address',
      title: 'Adresse',
      type: 'object',
      group: 'contact',
      fields: [
        defineField({ name: 'street', title: 'Straße', type: 'string' }),
        defineField({ name: 'zip', title: 'PLZ', type: 'string' }),
        defineField({ name: 'city', title: 'Stadt', type: 'string' }),
        defineField({ name: 'country', title: 'Land', type: 'string', initialValue: 'Deutschland' }),
      ],
    }),

    // ═══ OPENING HOURS ═══
    defineField({
      name: 'openingHours',
      title: 'Öffnungszeiten',
      type: 'object',
      group: 'hours',
      fields: [
        defineField({
          name: 'monday',
          title: 'Montag',
          type: 'string',
          initialValue: 'Geschlossen (außer an Feiertagen)',
        }),
        defineField({
          name: 'tuesdayToSaturday',
          title: 'Dienstag - Samstag',
          type: 'string',
          initialValue: '12:00 - 14:30 & 17:30 - 22:30',
        }),
        defineField({
          name: 'sunday',
          title: 'Sonntag',
          type: 'string',
          initialValue: '12:00 - 14:30 & 17:30 - 21:00',
        }),
        defineField({
          name: 'lunchStart',
          title: 'Mittags-Beginn (für Reservierungs-Validierung)',
          type: 'string',
          initialValue: '12:00',
          description: 'Format HH:MM — wird benutzt um Reservierungszeiten zu prüfen',
        }),
        defineField({
          name: 'lunchEnd',
          title: 'Mittags-Ende',
          type: 'string',
          initialValue: '14:30',
        }),
        defineField({
          name: 'dinnerStart',
          title: 'Abend-Beginn',
          type: 'string',
          initialValue: '17:30',
        }),
        defineField({
          name: 'dinnerEnd',
          title: 'Abend-Ende',
          type: 'string',
          initialValue: '22:30',
        }),
      ],
    }),

    // ═══ HERO TEXTS (per language) ═══
    defineField({
      name: 'heroTitle_de',
      title: 'Hero Titel (Deutsch)',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'heroTitle_en',
      title: 'Hero Titel (Englisch)',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'heroTitle_ar',
      title: 'Hero Titel (Arabisch)',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'heroTitle_fr',
      title: 'Hero Titel (Französisch)',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'heroSubtitle_de',
      title: 'Hero Untertitel (Deutsch)',
      type: 'text',
      group: 'hero',
      rows: 2,
    }),
    defineField({
      name: 'heroSubtitle_en',
      title: 'Hero Untertitel (Englisch)',
      type: 'text',
      group: 'hero',
      rows: 2,
    }),
    defineField({
      name: 'heroSubtitle_ar',
      title: 'Hero Untertitel (Arabisch)',
      type: 'text',
      group: 'hero',
      rows: 2,
    }),
    defineField({
      name: 'heroSubtitle_fr',
      title: 'Hero Untertitel (Französisch)',
      type: 'text',
      group: 'hero',
      rows: 2,
    }),
    defineField({
      name: 'welcomeText_de',
      title: 'Willkommen Text (Deutsch)',
      type: 'text',
      group: 'hero',
      rows: 4,
    }),
    defineField({
      name: 'welcomeText_en',
      title: 'Willkommen Text (Englisch)',
      type: 'text',
      group: 'hero',
      rows: 4,
    }),
    defineField({
      name: 'welcomeText_ar',
      title: 'Willkommen Text (Arabisch)',
      type: 'text',
      group: 'hero',
      rows: 4,
    }),
    defineField({
      name: 'welcomeText_fr',
      title: 'Willkommen Text (Französisch)',
      type: 'text',
      group: 'hero',
      rows: 4,
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
        title: 'Website-Einstellungen',
        subtitle: 'Globale Konfiguration',
      }
    },
  },
})
