import sharp from 'sharp';
import { readdir, stat, mkdir } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const IMAGES_DIR = path.join(__dirname, '..', 'public', 'images');

// Config
const WEBP_QUALITY = 80;
const JPEG_QUALITY = 82;
const MAX_WIDTH = 1920;       // Hero/banner images max
const THUMB_WIDTH = 800;       // Card/gallery thumbnails (not used in this pass, but available)

const SUPPORTED_EXTENSIONS = ['.jpg', '.jpeg', '.png'];

async function getAllImages(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await getAllImages(fullPath)));
    } else if (SUPPORTED_EXTENSIONS.includes(path.extname(entry.name).toLowerCase())) {
      files.push(fullPath);
    }
  }
  return files;
}

async function optimizeImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const dir = path.dirname(filePath);
  const baseName = path.basename(filePath, ext);
  const webpPath = path.join(dir, `${baseName}.webp`);

  const fileStat = await stat(filePath);
  const originalSizeKB = (fileStat.size / 1024).toFixed(1);

  try {
    const image = sharp(filePath);
    const metadata = await image.metadata();

    // Resize if wider than MAX_WIDTH, preserving aspect ratio
    const pipeline = metadata.width > MAX_WIDTH
      ? image.resize({ width: MAX_WIDTH, withoutEnlargement: true })
      : image;

    // Generate WebP
    await pipeline
      .clone()
      .webp({ quality: WEBP_QUALITY, effort: 6 })
      .toFile(webpPath);

    // Also optimize the original format (overwrite)
    if (ext === '.png') {
      await sharp(filePath)
        .resize({ width: MAX_WIDTH, withoutEnlargement: true })
        .png({ quality: 80, compressionLevel: 9, palette: true })
        .toFile(filePath + '.tmp');
    } else {
      await sharp(filePath)
        .resize({ width: MAX_WIDTH, withoutEnlargement: true })
        .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
        .toFile(filePath + '.tmp');
    }

    // Replace original with optimized version
    const { rename } = await import('fs/promises');
    await rename(filePath + '.tmp', filePath);

    const webpStat = await stat(webpPath);
    const newOrigStat = await stat(filePath);
    const webpSizeKB = (webpStat.size / 1024).toFixed(1);
    const newOrigSizeKB = (newOrigStat.size / 1024).toFixed(1);

    console.log(
      `✓ ${path.relative(IMAGES_DIR, filePath)}: ${originalSizeKB}KB → ${newOrigSizeKB}KB (orig) | ${webpSizeKB}KB (webp)`
    );
  } catch (err) {
    console.error(`✗ Failed: ${path.relative(IMAGES_DIR, filePath)} - ${err.message}`);
  }
}

async function main() {
  console.log('🖼  Panch Kedar Yatra — Image Optimization\n');
  console.log(`Source: ${IMAGES_DIR}`);
  console.log(`WebP quality: ${WEBP_QUALITY} | JPEG quality: ${JPEG_QUALITY} | Max width: ${MAX_WIDTH}px\n`);

  const images = await getAllImages(IMAGES_DIR);
  console.log(`Found ${images.length} images to optimize.\n`);

  // Process sequentially to avoid memory spikes with huge files
  for (const img of images) {
    await optimizeImage(img);
  }

  // Summary
  const allFiles = await getAllImages(IMAGES_DIR);
  const webpFiles = (await readdir(IMAGES_DIR, { recursive: true }))
    .filter(f => f.endsWith('.webp'));

  console.log(`\n✅ Done! Generated ${webpFiles.length} WebP files.`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
