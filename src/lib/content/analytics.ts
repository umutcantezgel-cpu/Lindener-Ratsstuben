import fs from 'fs';
import path from 'path';
import { ContentIndexEntry } from './schema';
import { writeJsonCache, initCacheDirectory } from './cache';

const CACHE_DIR = path.join(process.cwd(), '.content-cache');
const CONTENT_INDEX = path.join(CACHE_DIR, 'content-index.json');

export interface ContentPerformanceEntry {
  slug: string;
  title: string;
  category: string;
  author: string;
  publishedAt: string;
  daysSincePublish: number;
  decayRisk: 'LOW' | 'MEDIUM' | 'HIGH';
  trackingEvents: string[];
}

export interface AnalyticsConfig {
  provider: 'ga4' | 'umami' | 'plausible';
  measurementId: string;
  trackScrollDepth: boolean;
  trackTimeOnPage: boolean;
  trackShareEvents: boolean;
  contentDecayThresholdDays: number;
}

const DEFAULT_CONFIG: AnalyticsConfig = {
  provider: 'ga4',
  measurementId: process.env.GA_MEASUREMENT_ID || 'G-XXXXXXXXXX',
  trackScrollDepth: true,
  trackTimeOnPage: true,
  trackShareEvents: true,
  contentDecayThresholdDays: 180,
};

export function buildAnalyticsBaseline(config: AnalyticsConfig = DEFAULT_CONFIG) {
  console.log('[CW-08] Building Analytics Baseline...');
  initCacheDirectory();

  if (!fs.existsSync(CONTENT_INDEX)) {
    console.warn('[CW-08] No content-index.json found.');
    return;
  }

  const docs: ContentIndexEntry[] = JSON.parse(fs.readFileSync(CONTENT_INDEX, 'utf-8'));
  const now = new Date();
  const performanceIndex: Record<string, ContentPerformanceEntry> = {};

  for (const doc of docs) {
    const publishDate = new Date(doc.publishedAt);
    const daysSincePublish = Math.floor((now.getTime() - publishDate.getTime()) / (1000 * 60 * 60 * 24));

    let decayRisk: 'LOW' | 'MEDIUM' | 'HIGH' = 'LOW';
    if (daysSincePublish > config.contentDecayThresholdDays * 2) decayRisk = 'HIGH';
    else if (daysSincePublish > config.contentDecayThresholdDays) decayRisk = 'MEDIUM';

    const events: string[] = [];
    events.push('view_article');
    if (config.trackScrollDepth) events.push('scroll_depth_50', 'scroll_depth_75', 'scroll_depth_90');
    if (config.trackTimeOnPage) events.push('time_on_page_30s', 'time_on_page_60s');
    if (config.trackShareEvents) events.push('share_article');

    performanceIndex[doc.slug] = {
      slug: doc.slug,
      title: doc.title,
      category: doc.category,
      author: doc.author,
      publishedAt: doc.publishedAt.toString(),
      daysSincePublish,
      decayRisk,
      trackingEvents: events,
    };
  }

  writeJsonCache('analytics-baseline.json', performanceIndex);
  writeJsonCache('analytics-config.json', config);

  console.log(`[CW-08] Analytics baseline built for ${Object.keys(performanceIndex).length} documents.`);
  
  // Content decay alerts
  const decayAlerts = Object.values(performanceIndex).filter((p) => p.decayRisk !== 'LOW');
  if (decayAlerts.length > 0) {
    console.log(`[CW-08] WARNING: ${decayAlerts.length} documents at risk of content decay:`);
    for (const alert of decayAlerts) {
      console.log(`  - ${alert.slug} (${alert.decayRisk}, ${alert.daysSincePublish} days old)`);
    }
  }

  writeJsonCache('content-decay-alerts.json', decayAlerts);
}
