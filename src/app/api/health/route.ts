import { NextResponse } from 'next/server';

export async function GET() {
    // Basic verification of required keys
    const deps = {
      formspree: !!process.env.NEXT_PUBLIC_FORMSPREE_ID,
      environment: !!process.env.NODE_ENV
    };

    const isOk = Object.values(deps).every(v => v === true);
    
    // Memory usage info (optional for health checks)
    const mem = process.memoryUsage();
    
    return NextResponse.json({
        status: isOk ? 'ok' : 'degraded',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        version: process.env.NEXT_PUBLIC_APP_VERSION || process.env.VERCEL_GIT_COMMIT_SHA || 'unknown',
        environment: process.env.NODE_ENV || 'development',
        dependencies: deps,
        memory: {
          rssMB: Math.round(mem.rss / 1024 / 1024)
        }
    }, {
        status: isOk ? 200 : 503,
        headers: {
            'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate'
        }
    });
}
