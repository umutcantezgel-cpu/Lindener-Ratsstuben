import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { RegionalArticle, RegionalCategory } from '@/types/regional-content';

const REGIONAL_CONTENT_DIR = path.join(process.cwd(), 'content', 'regional');

/**
 * Ensures the content directories exist.
 */
function ensureDirectory() {
  if (!fs.existsSync(REGIONAL_CONTENT_DIR)) {
    fs.mkdirSync(REGIONAL_CONTENT_DIR, { recursive: true });
  }
}

/**
 * Gets all available slugs for a specific category
 */
export function getRegionalSlugsByCategory(category: RegionalCategory): string[] {
  ensureDirectory();
  const categoryPath = path.join(REGIONAL_CONTENT_DIR, category);
  
  if (!fs.existsSync(categoryPath)) {
    return [];
  }

  const files = fs.readdirSync(categoryPath);
  const slugs = files
    .filter((file) => file.endsWith('.md') || file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx?$/, ''));
  // Deduplicate: if both .md and .mdx exist for the same slug, only include once
  return [...new Set(slugs)];
}

/**
 * Retrieves the parsed markdown content for a specific article.
 */
export function getRegionalArticle(category: RegionalCategory, slug: string): RegionalArticle | null {
  try {
    const fullPath = path.join(REGIONAL_CONTENT_DIR, category, `${slug}.md`);
    
    // Fallback to .mdx
    const extPath = fs.existsSync(fullPath) ? fullPath : path.join(REGIONAL_CONTENT_DIR, category, `${slug}.mdx`);
    
    if (!fs.existsSync(extPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(extPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      content,
      title: data.title,
      metaTitle: data.metaTitle,
      metaDescription: data.metaDescription,
      heroSubtitle: data.heroSubtitle,
      category: data.category || category,
      location: data.location,
      distanceFromRestaurant: data.distanceFromRestaurant,
      driveTime: data.driveTime,
      publishDate: data.publishDate,
      lastUpdated: data.lastUpdated,
      relatedSlugs: data.relatedSlugs || [],
      tags: data.tags || [],
      season: data.season,
    } as RegionalArticle;
  } catch (error) {
    console.error(`Error reading article ${category}/${slug}:`, error);
    return null;
  }
}

/**
 * Retrieves all articles for the sitemap or listing pages.
 */
export function getAllRegionalArticles(): RegionalArticle[] {
  ensureDirectory();
  const categories = fs.readdirSync(REGIONAL_CONTENT_DIR).filter(item => {
    return fs.statSync(path.join(REGIONAL_CONTENT_DIR, item)).isDirectory();
  }) as RegionalCategory[];

  const allArticles: RegionalArticle[] = [];

  for (const category of categories) {
    const slugs = getRegionalSlugsByCategory(category);
    for (const slug of slugs) {
      const article = getRegionalArticle(category, slug);
      if (article) {
        allArticles.push(article);
      }
    }
  }

  return allArticles;
}
