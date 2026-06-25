const fs = require('fs');
const path = require('path');

const pagePaths = [
    'about', 'agb', 'barrierefreiheit', 'contact', 'cookie-richtlinie', 'cookies',
    'datenschutz', 'gallery', 'impressum', 'kegelbahn', 'menu', 'reservation', 'widerruf'
];

pagePaths.forEach(page => {
    const filePath = path.join('src/app/[locale]', page, 'page.tsx');
    if (!fs.existsSync(filePath)) return;

    let content = fs.readFileSync(filePath, 'utf8');

    // We want to replace getTranslations(..., 'pages') or ('legal') with both namespaces if needed.
    // Actually, each page uses different namespaces. 'agb' uses 'meta', 'barrierefreiheit' uses 'meta', etc.
    // Let's just manually replace the relevant parts using regex or string replacement for the most common ones.
    
    let namespaceMatch = content.match(/const\s+(\w+)\s*=\s*await\s+getTranslations\([^,]+,\s*'([^']+)'\);/);
    if (!namespaceMatch) return;
    
    const tVar = namespaceMatch[1];
    const originalNamespace = namespaceMatch[2];
    
    // We only need to fix if it's NOT 'meta'.
    if (originalNamespace !== 'meta') {
        content = content.replace(
            /const\s+(\w+)\s*=\s*await\s+getTranslations\([^,]+,\s*'([^']+)'\);/,
            `const $1 = await getTranslations(locale as any, '$2');\n  const tMeta = await getTranslations(locale as any, 'meta');`
        );
        
        // Now replace the title usage
        // e.g. t('about.title', '...') -> tMeta('about.title', '...')
        content = content.replace(/t\('([^']+)\.title'/g, `tMeta('$1.title'`);
        
        fs.writeFileSync(filePath, content);
        console.log(`Updated ${filePath}`);
    }
});
