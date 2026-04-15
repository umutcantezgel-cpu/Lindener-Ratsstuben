import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { checkRateLimit } from '@/lib/security/rate-limit';

declare global {
  // eslint-disable-next-line no-var, @typescript-eslint/no-explicit-any
  var _vitalsCache: any[];
}
const MAX_VITALS = 200;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const vitalsCache: any[] = global._vitalsCache || [];
if (process.env.NODE_ENV !== 'production') {
  global._vitalsCache = vitalsCache;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || 'anon';
    const rateLimit = checkRateLimit(`vitals-${ip}`, 100, 60000);
    if (!rateLimit.success) {
      return NextResponse.json({ error: 'Too Many Requests' }, { status: 429 });
    }

    const rawBody = await req.text();
    const data = JSON.parse(rawBody);

    // Ingest safely to Vercel Stdout
    console.log(JSON.stringify({ MTYPE: 'WEB_VITAL', ...data }));

    vitalsCache.unshift(data);
    if (vitalsCache.length > MAX_VITALS) {
      vitalsCache.pop(); // LRU
    }

    return NextResponse.json({ received: true });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return NextResponse.json({ error: 'Payload error' }, { status: 400 });
  }
}

export async function GET() {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  // Aggregate averages
  const agg = vitalsCache.reduce((acc, curr) => {
    if (!acc[curr.metric]) acc[curr.metric] = { sum: 0, count: 0, poors: 0 };
    acc[curr.metric].sum += curr.value;
    acc[curr.metric].count += 1;
    if (curr.rating === 'poor') acc[curr.metric].poors += 1;
    return acc;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }, {} as Record<string, any>);

  const response = Object.keys(agg).map(k => ({
    metric: k,
    avg: Math.round(agg[k].sum / agg[k].count),
    samples: agg[k].count,
    poorCount: agg[k].poors
  }));

  return NextResponse.json(response);
}
