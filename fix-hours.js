const fs = require('fs');
const path = require('path');

const targetDirs = ['locales', 'src', 'public'];

function processDir(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            if (!fullPath.includes('node_modules') && !fullPath.includes('.git') && !fullPath.includes('.next')) {
                processDir(fullPath);
            }
        } else if (fullPath.endsWith('.json') || fullPath.endsWith('.ts') || fullPath.endsWith('.tsx') || fullPath.endsWith('.md')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let original = content;

            // Replacements
            content = content.replace(/22:30/g, '22:00');
            content = content.replace(/11:30/g, '12:00');
            
            // Special cases for english am/pm
            content = content.replace(/12:00 AM/gi, '12:00 PM'); // if it was 11:30 AM -> 12:00 AM, it should be PM
            
            if (content !== original) {
                fs.writeFileSync(fullPath, content);
                console.log('Updated', fullPath);
            }
        }
    }
}

targetDirs.forEach(processDir);
console.log('Done');
