import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schema } from './src/lib/sanity/schemas'
import { apiVersion, dataset, projectId } from './src/lib/sanity/env'

export default defineConfig({
  basePath: '/sanity',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schema' folder
  schema,
  plugins: [
    structureTool(),
  ],
})
