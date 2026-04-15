import { readFileSync } from 'fs';
import { writeJsonCache, initCacheDirectory } from './cache';
import path from 'path';

const CACHE_DIR = path.join(process.cwd(), '.content-cache');
const LOCKS_FILE = path.join(CACHE_DIR, 'locks.json');

export interface LockEntry {
  slug: string;
  lockedBy: string;
  lockedAt: string; // ISO String
  expiresAt: string; // ISO String
}

function getLocks(): Record<string, LockEntry> {
  initCacheDirectory();
  try {
    const raw = readFileSync(LOCKS_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

export function acquireLock(slug: string, username: string): boolean {
  const locks = getLocks();
  const existingLock = locks[slug];

  const now = new Date();
  
  // If lock exists and hasn't expired yet
  if (existingLock && new Date(existingLock.expiresAt) > now) {
    if (existingLock.lockedBy === username) {
       // Extend their lock
       existingLock.expiresAt = new Date(now.getTime() + 60 * 60 * 1000).toISOString();
       writeJsonCache('locks.json', locks);
       return true;
    }
    return false; // Locked by someone else
  }

  // Grant new lock (1 hour)
  locks[slug] = {
    slug,
    lockedBy: username,
    lockedAt: now.toISOString(),
    expiresAt: new Date(now.getTime() + 60 * 60 * 1000).toISOString()
  };

  writeJsonCache('locks.json', locks);
  return true;
}

export function releaseLock(slug: string, username: string): boolean {
  const locks = getLocks();
  const existingLock = locks[slug];

  if (existingLock && existingLock.lockedBy === username) {
    delete locks[slug];
    writeJsonCache('locks.json', locks);
    return true;
  }
  return false;
}
