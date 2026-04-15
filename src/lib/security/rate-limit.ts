/**
 * IN-MEMORY RATE LIMITER
 * Lightweight rate limiting for serverless/edge functions.
 * Note: In Vercel serverless, maps reset on cold starts and per instance.
 * For true global rate-limiting across regions, Upstash/Redis is required.
 * This prevents basic abusive tight-loops on a single instance.
 */

interface RateLimitTracker {
  count: number;
  resetAt: number;
}

const rateLimiterCache = new Map<string, RateLimitTracker>();

export function checkRateLimit(
  identifier: string,
  limit: number = 100, // requests allowed
  windowMs: number = 60000 // default 1 minute window
): { success: boolean; limit: number; remaining: number } {
  const now = Date.now();
  const current = rateLimiterCache.get(identifier);

  if (!current || now > current.resetAt) {
    // Reset or first time
    rateLimiterCache.set(identifier, { count: 1, resetAt: now + windowMs });
    return { success: true, limit, remaining: limit - 1 };
  }

  if (current.count >= limit) {
    return { success: false, limit, remaining: 0 };
  }

  current.count++;
  rateLimiterCache.set(identifier, current);
  return { success: true, limit, remaining: limit - current.count };
}
