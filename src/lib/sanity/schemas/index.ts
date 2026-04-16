import { type SchemaTypeDefinition } from 'sanity'
import allergen from './allergen'
import category from './category'
import dish from './dish'
import siteSettings from './siteSettings'
import reservation from './reservation'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [siteSettings, allergen, category, dish, reservation],
}
