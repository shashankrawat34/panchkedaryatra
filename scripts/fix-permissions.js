import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const binDir = path.join(__dirname, '../node_modules/.bin');

try {
  if (fs.existsSync(binDir)) {
    const files = fs.readdirSync(binDir);
    files.forEach((file) => {
      const filePath = path.join(binDir, file);
      try {
        // Set executable permissions (0o755)
        fs.chmodSync(filePath, 0o755);
        console.log(`✓ Fixed permissions for ${file}`);
      } catch (err) {
        console.error(`✗ Failed to fix ${file}: ${err.message}`);
      }
    });
    console.log('✓ All node_modules/.bin files are now executable');
  } else {
    console.warn('⚠ node_modules/.bin directory not found');
  }
} catch (err) {
  console.error('✗ Permission fix failed:', err.message);
  process.exit(1);
}
