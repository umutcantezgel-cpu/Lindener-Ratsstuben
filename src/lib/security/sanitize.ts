/**
 * URL-Parameter-Sanitisierung — XSS Prevention.
 */

const HTML_ENTITY_MAP: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
};

/**
 * Escape HTML-Entities in einem String.
 */
export function escapeHtml(str: string): string {
    return str.replace(/[&<>"'/]/g, (char) => HTML_ENTITY_MAP[char] || char);
}

/**
 * Sanitize URL search parameter: escape, trim, and enforce max length.
 */
export function sanitizeSearchParam(param: string, maxLength = 200): string {
    if (!param) return '';
    const trimmed = param.trim().slice(0, maxLength);
    return escapeHtml(trimmed);
}
