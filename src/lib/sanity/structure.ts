import type { StructureResolver } from 'sanity/structure'
import { Settings, UtensilsCrossed, CalendarDays, Tags, AlertCircle, MenuSquare, FolderOpen } from 'lucide-react'

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title('Inhalt')
    .items([
      // ═══ EINSTELLUNGEN ═══
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

      // ═══ SPEISEKARTE ═══
      S.listItem()
        .title('Speisekarte')
        .icon(MenuSquare)
        .child(
          S.list()
            .title('Speisekarten-Verwaltung')
            .items([
              // ── Alle Gerichte (nach Kategorie gruppiert) ──
              S.listItem()
                .title('Gerichte nach Kategorie')
                .icon(FolderOpen)
                .child(() =>
                  context.getClient({ apiVersion: '2024-04-16' })
                    .fetch<Array<{ _id: string; title_de: string; emoji?: string; sortOrder?: number }>>(
                      `*[_type == "category"] | order(sortOrder asc, title_de asc) { _id, title_de, emoji, sortOrder }`
                    )
                    .then(categories =>
                      S.list()
                        .title('Kategorie wählen')
                        .items(
                          categories.map(cat =>
                            S.listItem()
                              .title(`${cat.emoji || '📋'} ${cat.title_de || 'Unbenannt'}`)
                              .id(cat._id)
                              .child(
                                S.documentList()
                                  .title(`${cat.emoji || ''} ${cat.title_de || 'Unbenannt'}`)
                                  .filter('_type == "dish" && category._ref == $categoryId')
                                  .params({ categoryId: cat._id })
                                  .defaultOrdering([{ field: 'order', direction: 'asc' }])
                              )
                          )
                        )
                    )
                ),

              S.divider(),

              // ── Alle Gerichte (flache Liste, als Backup) ──
              S.documentTypeListItem('dish')
                .title('Alle Gerichte (Gesamtliste)')
                .icon(UtensilsCrossed),

              S.divider(),

              // ── Kategorien verwalten ──
              S.documentTypeListItem('category')
                .title('Kategorien verwalten')
                .icon(Tags),

              // ── Allergene verwalten ──
              S.documentTypeListItem('allergen')
                .title('Allergene & Zusatzstoffe')
                .icon(AlertCircle),
            ])
        ),

      S.divider(),

      // ═══ RESERVIERUNGEN ═══
      S.documentTypeListItem('reservation')
        .title('Reservierungen')
        .icon(CalendarDays),
    ])
