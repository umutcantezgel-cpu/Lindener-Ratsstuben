import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from './env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // If true, data is fetched dynamically. If false, data can be cached.
  useCdn: false, // Set to false to ensure we can use Next.js ISR tags cleanly without Sanity CDN interference
})

// Helper to fetch data with ISR tags
export async function sanityFetch<QueryResponse>({
  query,
  params = {},
  tags,
}: {
  query: string
  params?: Record<string, unknown>
  tags?: string[]
}): Promise<QueryResponse> {
  return client.fetch<QueryResponse>(query, params, {
    next: {
      revalidate: 3600, // Revalidate every hour as a fallback
      tags, // We can trigger revalidation via webhook using these tags
    },
  })
}
