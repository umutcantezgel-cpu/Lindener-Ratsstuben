import { NextRequest, NextResponse } from 'next/server';
import * as cheerio from 'cheerio';
import TurndownService from 'turndown';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const path = searchParams.get('path') || '/';
    
    // Construct the absolute URL to fetch the original HTML
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || request.nextUrl.origin;
    const htmlUrl = new URL(path, baseUrl).toString();
    
    // Prevent infinite loop if something tries to fetch markdown recursively
    if (request.headers.get('x-internal-markdown-request') === 'true') {
        return new NextResponse('Infinite loop detected', { status: 508 });
    }
    
    try {
        const res = await fetch(htmlUrl, {
            headers: {
                // Signal that this is an internal request for DOM extraction
                'x-internal-markdown-request': 'true'
            }
        });
        
        if (!res.ok) {
            return new NextResponse('Page not found', { status: res.status });
        }
        
        const html = await res.text();
        const $ = cheerio.load(html);
        
        // Edge Cases & Interactivity (T-61.13): Remove forms, iframes, widgets, modals
        // And replace with a prompt to visit the original URL (T-61.14)
        $('form, iframe, dialog, .widget, [data-interactive]').replaceWith(() => {
            return `<blockquote><em>Interaktive Komponente entfernt. Bitte besuchen Sie die <a href="${htmlUrl}">Original-Webseite</a> für diese Funktion.</em></blockquote>`;
        });

        // Extract Meta Information for Frontmatter (SEQ-62.4)
        const pageTitle = $('title').first().text() || 'Lindener Ratsstuben';
        const pageDescription = $('meta[name="description"]').attr('content') || '';
        
        // Extract Entities from JSON-LD
        const jsonLdScripts = $('script[type="application/ld+json"]');
        const entities: string[] = [];
        jsonLdScripts.each((_, el) => {
            try {
                const content = $(el).text() || $(el).html() || '{}';
                const json = JSON.parse(content);
                if (json['@type']) entities.push(json['@type']);
                if (json['@graph'] && Array.isArray(json['@graph'])) {
                    json['@graph'].forEach((node: Record<string, unknown>) => {
                         if (typeof node['@type'] === 'string') entities.push(node['@type']);
                    });
                }
                if (Array.isArray(json)) {
                     json.forEach(item => {
                         if (item && typeof item === 'object' && typeof item['@type'] === 'string') entities.push(item['@type']);
                     })
                }
            } catch (e) {
               console.error('Failed to parse JSON-LD', e);
            }
        });
        const uniqueEntities = Array.from(new Set(entities));
        
        // Strip hidden elements inside HTML entirely
        $('[aria-hidden="true"]').remove();
        $('style, script, noscript').remove();
        
        // Target semantic tags like <main> or <article> 
        let mainContentHtml = $('main').html() || $('article').html() || $('body').html();
        
        if (!mainContentHtml) {
             return new NextResponse('No semantic content found', { status: 404 });
        }
        
        // Inject AiKnowledgeBase if it exists but wasn't captured in <main>
        const knowledgeBase = $('aside.sr-only');
        if (knowledgeBase.length > 0) {
            mainContentHtml += `\n<div class="ai-knowledge-base">${knowledgeBase.html()}</div>\n`;
        }
        
        // Dynamische Konvertierungs-Engine (T-61.05 & T-61.06)
        const turndownService = new TurndownService({ headingStyle: 'atx', codeBlockStyle: 'fenced' });
        
        // T-61.07: Wandle alle relativen Asset- und Link-Pfade in absolute URLs um
        turndownService.addRule('absoluteImageUrls', {
            filter: 'img',
            replacement: (_content: string, node: HTMLElement) => {
                const src = node.getAttribute('src');
                if (!src) return '';
                // Resolve relative src against baseUrl
                const absoluteUrl = new URL(src, baseUrl).toString();
                const alt = node.getAttribute('alt') || '';
                return `![${alt}](${absoluteUrl})`;
            }
        });

        turndownService.addRule('absoluteLinkUrls', {
            filter: 'a',
            replacement: (content: string, node: HTMLElement) => {
                const href = node.getAttribute('href');
                if (!href) return content;
                
                // Skip anchor links
                if (href.startsWith('#')) {
                    return `[${content}](${htmlUrl}${href})`;
                }

                try {
                    const absoluteUrl = new URL(href, baseUrl).toString();
                    return `[${content}](${absoluteUrl})`;
                } catch {
                     return `[${content}](${href})`;
                }
            }
        });
        
        // Some elements are completely stripped by default in turndown but we want to retain custom elements or layout text properly
        turndownService.addRule('stripButtons', {
            filter: ['button'],
            replacement: (content: string) => {
                // If the button has a link semantics or a text, just output the text
                return content ? `**[Button: ${content}]** ` : '';
            }
        });

        const markdown = turndownService.turndown(mainContentHtml);
        
        // Formulate AI-focused YAML Frontmatter
        const frontmatter = `---
title: "${pageTitle.replace(/"/g, '\\"')}"
description: "${pageDescription.replace(/"/g, '\\"')}"
source: "${htmlUrl}"
entities: [${uniqueEntities.map(e => `"${e}"`).join(', ')}]
---

`;
        
        const finalContent = frontmatter + markdown;
        
        // SEO Protection & Strict Fallbacks (T-61.10 & T-61.11 & SEQ-62.4)
        const response = new NextResponse(finalContent, {
            headers: {
                'Content-Type': 'text/markdown; charset=utf-8',
                'Link': `<${htmlUrl}>; rel="canonical"`,
                'X-Robots-Tag': 'noindex, noarchive',
                'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400'
            }
        });
        
        return response;
        
    } catch (error) {
        console.error('[Markdown Extraction Engine Error]: ', error);
        return new NextResponse('Internal Markdown Generator Error', { status: 500 });
    }
}
