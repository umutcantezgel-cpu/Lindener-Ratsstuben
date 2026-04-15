import { NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/security/rate-limit';

declare global {
  // eslint-disable-next-line no-var, @typescript-eslint/no-explicit-any
  var _conversionsCache: any[];
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const conversions: any[] = global._conversionsCache || [];
if (process.env.NODE_ENV !== 'production') {
  global._conversionsCache = conversions;
}

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for') || 'anon';
    const rateLimit = checkRateLimit(`conversions-${ip}`, 50, 60000);
    if (!rateLimit.success) {
      return NextResponse.json({ error: 'Too Many Requests' }, { status: 429 });
    }

    const data = await req.json();
    
    const event = {
       type: data.type, // 'form_submit', 'calendly_booking'
       timestamp: new Date().toISOString(),
       segment: data.segment || 'unknown',
       value: data.value || 0
    };
    
    // Log for local cache
    conversions.unshift(event);
    if (conversions.length > 500) conversions.pop();
    
    // Output formatted string for Vercel indexing
    console.log(`[CONVERSION_EVENT] ${event.type} via ${event.segment}`);
    
    return NextResponse.json({ success: true });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch(e: unknown) {
    return NextResponse.json({ error: 'Bad Payload' }, { status: 400 });
  }
}

export async function GET() {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }
  
  const weeklyCount = conversions.filter(c => {
     const t = new Date(c.timestamp).getTime();
     return Date.now() - t < 7 * 24 * 60 * 60 * 1000;
  }).length;
  
  // Fake historical reference to show anomalies in dev
  const anomaly = weeklyCount < 3 && conversions.length > 5 ? "Warnung: Signifikant niedrigere Conversions." : "none";

  return NextResponse.json({ 
    totalInCache: conversions.length,
    weeklyConversions: weeklyCount,
    events: conversions,
    anomalies: anomaly
  });
}
