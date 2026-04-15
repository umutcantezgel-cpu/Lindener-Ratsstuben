import { NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/security/rate-limit';

declare global {
  // eslint-disable-next-line no-var, @typescript-eslint/no-explicit-any
  var _deploymentsCache: any[];
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const deployments: any[] = global._deploymentsCache || [];
if (process.env.NODE_ENV !== 'production') {
  global._deploymentsCache = deployments;
}

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for') || 'anon';
    const rateLimit = checkRateLimit(`deployments-${ip}`, 20, 60000);
    if (!rateLimit.success) {
      return NextResponse.json({ error: 'Too Many Requests' }, { status: 429 });
    }

    const data = await req.json();
    const deploy = {
       version: data.version || 'unknown',
       commitSha: data.commitSha || 'unknown',
       author: data.author || 'system',
       environment: data.environment || 'production',
       timestamp: new Date().toISOString(),
       status: data.status || 'success'
    };
    
    deployments.unshift(deploy);
    if (deployments.length > 50) deployments.pop();
    
    console.log(`[DEPLOYMENT_REGISTERED] ${deploy.version} - ${deploy.status}`);
    
    return NextResponse.json({ success: true });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch(e: unknown) {
    return NextResponse.json({ error: 'Payload Error' }, { status: 400 });
  }
}

export async function GET() {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }
  
  return NextResponse.json(deployments);
}
