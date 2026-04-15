import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { getPlaiceholder } from 'plaiceholder';
import crypto from 'crypto';


const PUBLIC_DIR = path.join(process.cwd(), 'public');
const OPTIMIZED_DIR = path.join(PUBLIC_DIR, 'images', 'optimized');

export function initOptimizedDirectory() {
  if (!fs.existsSync(OPTIMIZED_DIR)) {
    fs.mkdirSync(OPTIMIZED_DIR, { recursive: true });
  }
}

export async function processImage(imagePath: string, relativeSrc: string) {
  initOptimizedDirectory();
  
  const ext = path.extname(imagePath);
  const baseName = path.basename(imagePath, ext);
  const fileBuffer = fs.readFileSync(imagePath);
  const hash = crypto.createHash('sha256').update(fileBuffer).digest('hex').substring(0, 8);
  
  // Placholder generation
  const { base64 } = await getPlaiceholder(fileBuffer);
  
  const optimizedData: { original: string; blurHash: string; formats: Record<string, string[]> } = {
    original: relativeSrc,
    blurHash: base64,
    formats: {}
  };

  const widths = [500, 800, 1200];
  
  for (const width of widths) {
    const webpName = `${baseName}-${hash}-${width}w.webp`;
    const avifName = `${baseName}-${hash}-${width}w.avif`;
    
    // WebP creation
    await sharp(fileBuffer).resize(width).webp({ quality: 80 }).toFile(path.join(OPTIMIZED_DIR, webpName));
    
    // AVIF creation
    await sharp(fileBuffer).resize(width).avif({ quality: 75 }).toFile(path.join(OPTIMIZED_DIR, avifName));
    
    if (!optimizedData.formats.webp) optimizedData.formats.webp = [];
    if (!optimizedData.formats.avif) optimizedData.formats.avif = [];
    
    optimizedData.formats.webp.push(`/images/optimized/${webpName} ${width}w`);
    optimizedData.formats.avif.push(`/images/optimized/${avifName} ${width}w`);
  }

  return optimizedData;
}

export function enforceAltTextInMdx(mdxBody: string, filePath: string) {
  // Matches markdown images: ![alt](url)
  const mdRegex = /!\[(.*?)\]\((.*?)\)/g;
  let match;
  
  while ((match = mdRegex.exec(mdxBody)) !== null) {
    const alt = match[1].trim();
    if (!alt) {
      console.error(`[CW-03] ERROR: Missing alt text in Markdown image at ${filePath}`);
    }
  }

  // Matches Next.js/MDX-Tag images: <Image ... alt="" />
  const jsxRegex = /<Image[^>]+alt=["'](.*?)["'][^>]*>/g;
  while ((match = jsxRegex.exec(mdxBody)) !== null) {
    const alt = match[1].trim();
    if (!alt) {
      console.error(`[CW-03] ERROR: Missing alt text in JSX image at ${filePath}`);
    }
  }
}
