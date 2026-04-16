import { NextResponse, NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || request.nextUrl.origin;
    
    // Core routes based on the current structure
    const routes = [
        '/',
        '/about',
        '/menu',
        '/contact',
        '/gallery',
        '/reservation'
    ];
    
    // Fallback locales
    const locales = ['de', 'en', 'fr', 'ar']; // Assuming these are standard based on previous interactions
    
    let content = `# Lindener Ratsstuben - LLM Knowledge Index\n\n`;
    content += `This is the Markdown Mirror architecture index. ` +
               `Access native structured markdown versions of our pages by appending \`.md\` to the URL paths below.\n\n`;
    
    for (const locale of locales) {
        content += `## Locale: ${locale.toUpperCase()}\n`;
        for (const route of routes) {
            // e.g. /de, /de/about.md
            const urlPath = `/${locale}${route === '/' ? '' : route}`;
            const fullMdUrl = `${baseUrl}${urlPath}.md`;
            content += `- [${route || '/'}](${fullMdUrl})\n`;
        }
        content += `\n`;
    }
    
    return new NextResponse(content, {
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
        }
    });
}
