const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'src/app/[locale]');

function walkSync(dir, filelist = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filepath = path.join(dir, file);
    if (fs.statSync(filepath).isDirectory()) {
      if (file !== '(routes)' && !file.startsWith('.')) {
         filelist = walkSync(filepath, filelist);
      }
    } else if (file === 'page.tsx') {
      filelist.push(filepath);
    }
  }
  return filelist;
}

const files = walkSync(baseDir);
files.push(path.join(baseDir, '(routes)/[...slug]/page.tsx')); // add catch-all if it exists

for (const file of files) {
  if (!fs.existsSync(file)) continue;
  let content = fs.readFileSync(file, 'utf8');
  
  // Quick check if file has generateMetadata
  if (content.includes('generateMetadata')) {
    let modified = false;
    
    // Add import if not exists
    if (!content.includes('getAlternates')) {
      content = "import { getAlternates } from '@/lib/seo/metadata';\n" + content;
      modified = true;
    }

    // Try to replace alternates: { canonical: ... }
    // We use a regex that handles single or double quotes or backticks
    const alternatesRegex = /alternates:\s*\{\s*canonical:\s*["'`]?([^"'`\}]+)["'`]?\s*\}/g;
    
    content = content.replace(alternatesRegex, (match, url) => {
      // url might be "/" or "/menu" or `/${locale}/menu`
      // We want to extract the base path
      let cleanPath = url;
      if (cleanPath.startsWith('/${locale}')) cleanPath = cleanPath.replace('/${locale}', '');
      if (cleanPath.startsWith('/')) cleanPath = cleanPath.slice(1);
      
      return `alternates: getAlternates(locale, '${cleanPath}')`;
    });
    
    // Also replace static openGraph url if it matches the same pattern
    // OpenGraph url: "..."
    const ogUrlRegex = /url:\s*["'`]?([^"'`,]+)["'`]?/g;
    content = content.replace(ogUrlRegex, (match, url) => {
       if (url.includes('${locale}')) return match; // already dynamic
       if (url.startsWith('/')) {
         let cleanPath = url.slice(1);
         return `url: \`/\${locale}${cleanPath ? `/${cleanPath}` : ''}\``;
       }
       return match;
    });

    if (modified) {
      fs.writeFileSync(file, content);
      console.log('Updated', file);
    }
  }
}
