const fs = require('fs');
const path = require('path');

function replaceInFile(filePath, regex, replacement) {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');
    const newContent = content.replace(regex, replacement);
    if (content !== newContent) {
        fs.writeFileSync(filePath, newContent);
        console.log(`Updated: ${filePath}`);
    }
}

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        const dirPath = path.join(dir, f);
        const isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
    });
}

// 1. Update locales
const localesDir = path.join(__dirname, 'locales');
walkDir(localesDir, (filePath) => {
    if (filePath.endsWith('.json')) {
        replaceInFile(filePath, /"12:00 /g, '"12:30 ');
        replaceInFile(filePath, /"12:00 – /g, '"12:30 – ');
        replaceInFile(filePath, /"12:00 p\.m\./g, '"12:30 p.m.');
        replaceInFile(filePath, /"12:00～/g, '"12:30～');
        replaceInFile(filePath, /"12:00\s*-/g, '"12:30 -');
    }
});

// 2. Update specific source files
const srcFiles = [
    'src/app/[locale]/flyer/page.tsx',
    'src/app/[locale]/menu/print/components/MenuCover.tsx',
    'src/app/llms-full.txt/route.ts',
    'src/app/llms.txt/route.ts',
    'src/data/company.ts',
    'src/lib/email/templates/contact-guest.ts',
    'src/lib/seo/schema-generators.ts'
];

srcFiles.forEach(f => {
    const filePath = path.join(__dirname, f);
    if (fs.existsSync(filePath)) {
        replaceInFile(filePath, /12:00/g, '12:30');
    }
});

console.log("Done updating times.");
