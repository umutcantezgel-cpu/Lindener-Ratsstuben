const fs = require('fs');
const path = require('path');

const targetDirs = ['locales', 'public/locales'];

function processDir(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            processDir(fullPath);
        } else if (fullPath.endsWith('.json')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let original = content;

            content = content.replace(/ Rahul/g, '');
            content = content.replace(/Rahul /g, '');
            content = content.replace(/Rahul/g, '');
            
            if (content !== original) {
                fs.writeFileSync(fullPath, content);
                console.log('Updated', fullPath);
            }
        }
    }
}

targetDirs.forEach(processDir);
console.log('Done');
