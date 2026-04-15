export type RelationData = {
  related: string[];
  relatedScore: Record<string, number>;
};

export const contentRelations: Record<string, RelationData> = {
  'web-development': {
    related: ['seo-optimization', 'ui-ux-design'],
    relatedScore: { 'seo-optimization': 0.85, 'ui-ux-design': 0.75 }
  },
  'seo-optimization': {
    related: ['web-development', 'content-strategy'],
    relatedScore: { 'web-development': 0.90, 'content-strategy': 0.80 }
  },
  'ui-ux-design': {
    related: ['web-development', 'branding'],
    relatedScore: { 'web-development': 0.85, 'branding': 0.70 }
  }
};
