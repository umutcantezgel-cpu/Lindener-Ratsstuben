const fs = require('fs');
const path = require('path');

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Remove heated terrace
    content = content.replace(/Beheizte Terrasse/ig, 'Terrasse');
    content = content.replace(/beheizte Außenterrasse/ig, 'Außenterrasse');
    content = content.replace(/beheizte Terrasse/ig, 'Terrasse');
    content = content.replace(/beheizten Terrasse/ig, 'Terrasse');

    // Replace Wetzlar, Gießen, Marburg, Aßlar with Linden
    const geoTerms = [/Gießen/g, /Wetzlar/g, /Marburg/g, /Aßlar/g];
    geoTerms.forEach(term => {
        content = content.replace(term, 'Linden');
    });

    // Cleanup redundant "Linden" combinations
    content = content.replace(/Linden und Linden/g, 'Linden');
    content = content.replace(/Linden, Linden/g, 'Linden');
    content = content.replace(/Linden \/ Linden/g, 'Linden');
    content = content.replace(/Linden & Linden/g, 'Linden');
    content = content.replace(/Linden in Linden/g, 'Linden');
    content = content.replace(/Linden \(bei Linden\)/g, 'Linden');
    content = content.replace(/Raum Linden \/ Linden/g, 'Raum Linden');
    content = content.replace(/Linden oder Linden/g, 'Linden');
    content = content.replace(/im Großraum Linden/g, 'in Linden und Umgebung');
    content = content.replace(/Linden und im Umkreis von 50 km/g, 'Linden und Umgebung');
    
    // Clean up awkward spaces/commas after replacement
    content = content.replace(/Linden, und Linden/g, 'Linden');
    content = content.replace(/Linden, Linden und Umgebung/g, 'Linden und Umgebung');
    content = content.replace(/Linden, Linden, und Linden/g, 'Linden');
    content = content.replace(/Linden,  und Linden/g, 'Linden');

    // Make sure we didn't miss something obvious
    content = content.replace(/Linden, Linden/g, 'Linden');
    content = content.replace(/Linden und Linden/g, 'Linden');
    content = content.replace(/Linden, Linden, Linden/g, 'Linden');

    if (content !== original) {
        fs.writeFileSync(filePath, content);
        console.log('Updated', filePath);
    }
}

function processDir(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            processDir(fullPath);
        } else if (fullPath.endsWith('.json') || fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
            processFile(fullPath);
        }
    }
}

['locales', 'public/locales', 'src'].forEach(processDir);
console.log('Done');
