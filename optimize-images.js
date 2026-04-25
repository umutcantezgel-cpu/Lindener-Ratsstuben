const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const IMAGE_DIR = path.join(__dirname, 'public', 'images');

const optimizeImages = async (dir) => {
    try {
        const files = await fs.promises.readdir(dir, { withFileTypes: true });

        for (const file of files) {
            const res = path.resolve(dir, file.name);
            
            if (file.isDirectory()) {
                await optimizeImages(res);
            } else if (file.isFile() && path.extname(res).toLowerCase() === '.png') {
                console.log(`Optimizing: ${res}`);
                
                const webpPath = res.replace(/\.png$/i, '.webp');
                
                try {
                    await sharp(res)
                        .webp({ quality: 80, effort: 6 })
                        .toFile(webpPath);
                    console.log(`Created: ${webpPath}`);
                    
                    // Note: We're not deleting the PNGs right away to ensure we don't break links before updating them
                    // but normally we would delete them or move to an archive folder.
                    // fs.unlinkSync(res);
                } catch (err) {
                    console.error(`Error processing ${res}:`, err);
                }
            }
        }
    } catch (err) {
        console.error(`Error reading directory ${dir}:`, err);
    }
};

console.log('Starting image optimization...');
optimizeImages(IMAGE_DIR).then(() => {
    console.log('Optimization complete.');
});
