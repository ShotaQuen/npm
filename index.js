import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const modules = {};

const dirPath = path.join(__dirname, 'scrape');
const files = await fs.readdir(dirPath);

for (const file of files) {
  if (file.endsWith('.js')) {
    const name = path.basename(file, '.js');
    const modulePath = pathToFileURL(path.join(dirPath, file)).href;
    const mod = await import(modulePath);
    modules[name] = mod.default || mod;
  }
}

export default modules;
