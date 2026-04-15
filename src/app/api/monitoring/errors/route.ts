import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import type { ErrorReport } from '@/lib/monitoring/error-logger';
import { checkRateLimit } from '@/lib/security/rate-limit';

// Vercel Serverless Cache for the /dev dashboard
declare global {
  // eslint-disable-next-line no-var
  var _errorCache: ErrorReport[];
}
const MAX_ERRORS = 100;
const errorCache: ErrorReport[] = global._errorCache || [];
if (process.env.NODE_ENV !== 'production') {
  global._errorCache = errorCache;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || 'anon';
    const rateLimit = checkRateLimit(`errors-${ip}`, 100, 60000);
    if (!rateLimit.success) {
      return NextResponse.json({ error: 'Too Many Requests' }, { status: 429 });
    }

    const data = await req.json();
    const errors: ErrorReport[] = Array.isArray(data.errors) ? data.errors : [data];

    for (const error of errors) {
      // Basic sanitization server-side
      const safeError = {
        ...error,
        timestamp: new Date().toISOString(),
      };

      // Ingest to native stdout for Vercel logging ingestion
      console.error(JSON.stringify({ MTYPE: 'CLIENT_ERROR', ...safeError }));

      // Append to cache for dashboard rendering
      errorCache.unshift(safeError);
      if (errorCache.length > MAX_ERRORS) {
        errorCache.pop(); // LRU eject
      }
    }

    return NextResponse.json({ received: true, count: errors.length }, { status: 202 });
  } catch {
    return NextResponse.json({ error: 'Payload parse failure' }, { status: 400 });
  }
}

export async function GET() {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  // Aggregate by message/fingerprint
  const aggregated = errorCache.reduce((acc, curr) => {
    const key = curr.message.substring(0, 100);
    if (!acc[key]) {
      acc[key] = { ...curr, count: 1, lastSeen: curr.timestamp };
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (acc[key] as any).count += 1;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (acc[key] as any).lastSeen = curr.timestamp;
    }
    return acc;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }, {} as Record<string, any>);

  return NextResponse.json(Object.values(aggregated));
}
