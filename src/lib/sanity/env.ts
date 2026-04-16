export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-04-16'

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
) || 'production'

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
) || 'your_project_id'

// Helper function to handle undefined values
function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    console.warn(errorMessage)
    // Fallback instead of throwing to prevent build crash during early setup
    return '' as unknown as T
  }
  return v
}
