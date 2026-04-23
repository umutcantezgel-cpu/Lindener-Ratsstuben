import type { StructureResolver } from 'sanity/structure'
import { Settings, UtensilsCrossed, CalendarDays, Tags, AlertCircle, MenuSquare } from 'lucide-react'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Inhalt')
    .items([
      S.listItem()
        .title('Einstellungen')
        .icon(Settings)
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Globale Einstellungen')
        ),
      S.divider(),
      S.listItem()
        .title('Speisekarte')
        .icon(MenuSquare)
        .child(
          S.list()
            .title('Speisekarten-Verwaltung')
            .items([
              S.documentTypeListItem('category')
                .title('Kategorien')
                .icon(Tags),
              S.documentTypeListItem('dish')
                .title('Gerichte')
                .icon(UtensilsCrossed),
              S.documentTypeListItem('allergen')
                .title('Allergene')
                .icon(AlertCircle),
            ])
        ),
      S.divider(),
      S.documentTypeListItem('reservation')
        .title('Reservierungen')
        .icon(CalendarDays),
    ])
