import { z } from 'zod';

export const ContentCollectionTypeSchema = z.enum(['blog', 'case-study', 'docs', 'changelog', 'ausflug', 'freizeit', 'region', 'business']);
export type ContentCollectionType = z.infer<typeof ContentCollectionTypeSchema>;

export const ContentFrontmatterSchema = z.object({
  title: z.string().min(10).max(200),
  description: z.string().min(30).max(160),
  author: z.string().min(2).max(100),
  publishedAt: z.union([z.string().datetime(), z.date(), z.string()]).transform((str) => new Date(str)),
  updatedAt: z.union([z.string().datetime(), z.date(), z.string()]).optional().transform((str) => (str ? new Date(str) : undefined)),
  tags: z.array(z.string().min(2).max(50)).min(1).max(10),
  category: ContentCollectionTypeSchema,
  series: z.string().min(2).max(100).optional(),
  draft: z.boolean().default(false),
  seo: z.object({
    keywords: z.array(z.string()).min(2).max(8).optional(),
    ogImage: z.string().url().optional(),
  }).optional(),
});

export type ContentFrontmatter = z.infer<typeof ContentFrontmatterSchema>;

export interface ContentDocument extends ContentFrontmatter {
  slug: string;
  body: string;
  excerpt: string;
  wordCount: number;
  readingTime: number;
  collectionType: ContentCollectionType;
}

export type ContentIndexEntry = Omit<ContentDocument, 'body'>;
