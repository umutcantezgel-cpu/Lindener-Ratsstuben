const fs = require('fs');
const path = 'src/app/[locale]/PageClient.tsx';

let lines = fs.readFileSync(path, 'utf8').split('\n');

// The section is from line 41 to 272.
// And we also want to remove `            {/* Epic Cinematic Hero Section - 10x Redesign */}` which is on line 40.
// So we want to replace lines 40 to 272 (index 39 to 271) with the new HeroRoot.
// Let's verify our indices: lines[39] should be the comment, lines[271] should be `            </section>`.
let updated = [];

for (let i = 0; i < lines.length; i++) {
    if (i === 39) {
        // Double check it's the expected line
        if (lines[i].includes('Epic Cinematic Hero Section - 10x Redesign')) {
            updated.push('            {/* Modular Epic Cinematic Hero Section - 10x Redesign */}');
            updated.push('            <HeroRoot mainMenuPdfUrl={mainMenuPdfUrl} />');
            
            // Skip until we find the closing </section>
            while (i < lines.length && !lines[i].includes('</section>')) {
                i++;
            }
            continue; // this will skip the </section> line itself
        }
    }
    updated.push(lines[i]);
}

fs.writeFileSync(path, updated.join('\n'), 'utf8');
console.log("Successfully replaced lines with array slicing!");
