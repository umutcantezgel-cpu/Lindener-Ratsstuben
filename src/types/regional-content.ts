export type RegionalCategory = 
  | 'freizeit'
  | 'ausflug'
  | 'aktivitaeten'
  | 'saison'
  | 'anlass'
  | 'kulinarik'
  | 'ratgeber'
  | 'region'
  | 'business';

export interface RegionalArticleFrontmatter {
  title: string;
  metaTitle: string;
  metaDescription: string;
  heroSubtitle: string;
  category: RegionalCategory;
  location?: string;
  distanceFromRestaurant?: string;
  driveTime?: string;
  publishDate: string;
  lastUpdated: string;
  relatedSlugs: string[];
  tags: string[];
  season?: string[];
}

export interface RegionalArticle extends RegionalArticleFrontmatter {
  slug: string;
  content: string;
}
