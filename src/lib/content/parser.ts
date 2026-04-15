import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import slugify from 'slugify';
import { ContentDocument, ContentFrontmatterSchema, ContentCollectionType } from './schema';

export function parseContentFile(filePath: string, collectionType: ContentCollectionType): ContentDocument | null {
  try {
    const rawContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content: body } = matter(rawContent);

    const parsedFrontmatter = ContentFrontmatterSchema.safeParse({
      ...data,
      category: collectionType
    });

    if (!parsedFrontmatter.success) {
      console.warn(`[CW-01] WARN: Invalid frontmatter in ${filePath}`, parsedFrontmatter.error.format());
      return null;
    }

    const frontmatter = parsedFrontmatter.data;

    const baseName = path.basename(filePath, path.extname(filePath));
    const slug = slugify(baseName, { lower: true, strict: true, locale: 'de' });

    let excerpt = frontmatter.description;
    if (!excerpt || excerpt.length < 30) {
      const cleanBody = body.replace(/[#_*>`\[\]]/g, '').trim();
      excerpt = cleanBody.slice(0, 160) + (cleanBody.length > 160 ? '...' : '');
    }

    const wordCount = body.split(/\s+/).filter(w => w.length > 0).length;
    const readingTime = Math.ceil(wordCount / 200);

    return {
      ...frontmatter,
      slug,
      body,
      excerpt,
      wordCount,
      readingTime,
      collectionType
    };
  } catch (error) {
    console.error(`[CW-01] ERROR: Failed to parse ${filePath}`, error);
    return null;
  }
}
