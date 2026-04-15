import { describe, it, expect } from 'vitest';
import { escapeHtml, sanitizeSearchParam } from '@/lib/security/sanitize';

describe('escapeHtml', () => {
    it('escapes HTML special characters', () => {
        expect(escapeHtml('<script>alert("xss")</script>')).toBe(
            '&lt;script&gt;alert(&quot;xss&quot;)&lt;&#x2F;script&gt;'
        );
    });

    it('returns plain text unchanged', () => {
        expect(escapeHtml('Hello World')).toBe('Hello World');
    });

    it('escapes ampersands', () => {
        expect(escapeHtml('foo & bar')).toBe('foo &amp; bar');
    });
});

describe('sanitizeSearchParam', () => {
    it('trims and escapes input', () => {
        expect(sanitizeSearchParam('  <b>bold</b>  ')).toBe('&lt;b&gt;bold&lt;&#x2F;b&gt;');
    });

    it('enforces max length', () => {
        const long = 'a'.repeat(500);
        expect(sanitizeSearchParam(long, 100).length).toBeLessThanOrEqual(100);
    });

    it('returns empty string for empty input', () => {
        expect(sanitizeSearchParam('')).toBe('');
    });
});
