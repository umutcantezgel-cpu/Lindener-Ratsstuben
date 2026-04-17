const fs = require('fs');

const path = 'src/app/[locale]/PageClient.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. imports
content = content.replace(
    `import { useAdaptiveMessaging } from '@/hooks/useAdaptiveMessaging';\nimport { motion, useScroll, useTransform } from 'framer-motion';`,
    `import { useAdaptiveMessaging } from '@/hooks/useAdaptiveMessaging';\nimport { HeroRoot } from '@/components/hero/HeroRoot';`
);

// 2. remove unused hooks inside Home
content = content.replace(
    `    const containerRef = useRef<HTMLElement>(null);\n    const { scrollYProgress } = useScroll({\n        target: containerRef,\n        offset: ["start start", "end start"]\n    });\n\n    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);\n    const textY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);\n    const opacityTransform = useTransform(scrollYProgress, [0, 0.8], [1, 0]);`,
    ``
);

// 3. remove the monolithic hero section and replace with <HeroRoot />
// Use indexOf and substring since regex on huge blocks is tricky.
const sectionStartStr = `            {/* Epic Cinematic Hero Section - 10x Redesign */}`;
const sectionEndStr = `                {/* Welcome / Philosophy Section */}`;

const startIndex = content.indexOf(sectionStartStr);
const endIndex = content.indexOf(sectionEndStr);

if (startIndex !== -1 && endIndex !== -1) {
    const before = content.substring(0, startIndex);
    const after = content.substring(endIndex);
    
    // Check if we captured the end of the section correctly. Let's make sure.
    // The monolithic section ends with `</section>\n\n            {/* Welcome`
    const replacement = `            {/* Modular Epic Cinematic Hero Section - 10x Redesign */}\n            <HeroRoot mainMenuPdfUrl={mainMenuPdfUrl} />\n\n`;
    
    content = before + replacement + after;
    fs.writeFileSync(path, content, 'utf8');
    console.log("Patched successfully!");
} else {
    console.log("Could not find section boundaries");
}
