const fs = require('fs');
const path = require('path');

const walk = async (dir) => {
    let results = [];
    const list = await fs.promises.readdir(dir, { withFileTypes: true });
    for (const file of list) {
        const res = path.resolve(dir, file.name);
        if (file.isDirectory()) {
            results = results.concat(await walk(res));
        } else if (file.isFile() && /\.(tsx?|json)$/i.test(res)) {
            results.push(res);
        }
    }
    return results;
};

const replacePngs = async () => {
    const srcDir = path.join(__dirname, 'src');
    const files = await walk(srcDir);
    
    let changedFiles = 0;
    
    for (const file of files) {
        const content = await fs.promises.readFile(file, 'utf8');
        
        // Regex to find internal PNG paths starting with /images/
        // It matches something like "/images/editorial/pizza.png"
        const newContent = content.replace(/(\/images\/[a-zA-Z0-9_\-\/]+)\.png/g, '$1.webp');
        
        if (content !== newContent) {
            await fs.promises.writeFile(file, newContent, 'utf8');
            console.log(`Updated: ${file}`);
            changedFiles++;
        }
    }
    
    console.log(`Updated ${changedFiles} files.`);
};

replacePngs().catch(console.error);
