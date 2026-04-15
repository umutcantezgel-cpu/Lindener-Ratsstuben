import fs from 'fs';
import path from 'path';
import { initCacheDirectory } from './cache';

const CACHE_DIR = path.join(process.cwd(), '.content-cache');
const LOG_FILE = path.join(CACHE_DIR, 'notifications.log');

export function initNotificationsLog() {
  initCacheDirectory();
  if (!fs.existsSync(LOG_FILE)) {
    fs.writeFileSync(LOG_FILE, '--- NOTIFICATIONS LOG ---\n', 'utf-8');
  }
}

export function sendNotification(eventType: string, message: string) {
  initNotificationsLog();
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] [${eventType.toUpperCase()}] ${message}\n`;
  fs.appendFileSync(LOG_FILE, logEntry, 'utf-8');
  console.log(`[CW-02] Notification Dispatch: ${logEntry.trim()}`);
}
