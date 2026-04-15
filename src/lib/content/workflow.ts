import { readFileSync, existsSync } from 'fs';
import path from 'path';
import { ContentIndexEntry } from './schema';
import { writeJsonCache, initCacheDirectory } from './cache';
import { sendNotification } from './notifications';
import { registerDraft } from './drafts';

const CACHE_DIR = path.join(process.cwd(), '.content-cache');
const CONTENT_INDEX_FILE = path.join(CACHE_DIR, 'content-index.json');
const WORKFLOW_STATE_FILE = path.join(CACHE_DIR, 'workflow-state.json');

export type ContentStatus = "DRAFT" | "IN_REVIEW" | "APPROVED" | "PUBLISHED" | "SCHEDULED" | "ARCHIVED";

export interface WorkflowState {
  slug: string;
  status: ContentStatus;
  lastModifiedBy: string;
  lastModifiedAt: string;
  approvedBy: string | null;
  approvedAt: string | null;
  scheduledPublishAt: string | null;
  notificationsSent: string[];
}

export function getWorkflowState(): Record<string, WorkflowState> {
  initCacheDirectory();
  try {
    const raw = readFileSync(WORKFLOW_STATE_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

export function syncWorkflowState() {
  if (!existsSync(CONTENT_INDEX_FILE)) {
    console.warn('[CW-02] No content-index.json found. Run content:build first.');
    return;
  }

  const rawDocs = readFileSync(CONTENT_INDEX_FILE, 'utf-8');
  const docs: ContentIndexEntry[] = JSON.parse(rawDocs);
  const state = getWorkflowState();
  const now = new Date();

  for (const doc of docs) {
    const existing = state[doc.slug];
    const pubDate = new Date(doc.publishedAt);
    
    let targetStatus: ContentStatus = "DRAFT";

    if (doc.draft) {
      targetStatus = "DRAFT";
      registerDraft(doc.slug);
    } else if (pubDate > now) {
      targetStatus = "SCHEDULED";
    } else {
      targetStatus = "PUBLISHED";
    }

    // Check for State Transitions
    if (existing && existing.status !== targetStatus) {
      sendNotification('STATUS_CHANGE', `${doc.slug} transitioned from ${existing.status} to ${targetStatus}`);
    }

    if (!existing) {
       sendNotification('NEW_CONTENT', `${doc.slug} integrated into workflow as ${targetStatus}`);
       state[doc.slug] = {
         slug: doc.slug,
         status: targetStatus,
         lastModifiedBy: doc.author,
         lastModifiedAt: now.toISOString(),
         approvedBy: null,
         approvedAt: null,
         scheduledPublishAt: targetStatus === 'SCHEDULED' ? doc.publishedAt.toString() : null,
         notificationsSent: []
       };
    } else {
       // Update existing
       state[doc.slug].status = targetStatus;
       state[doc.slug].lastModifiedAt = now.toISOString();
       if (targetStatus === 'SCHEDULED') {
         state[doc.slug].scheduledPublishAt = doc.publishedAt.toString();
       }
    }
  }

  writeJsonCache('workflow-state.json', state);
  console.log(`[CW-02] Workflow states synchronized for ${docs.length} documents.`);
}
