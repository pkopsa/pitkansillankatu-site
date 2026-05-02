import sharp from "sharp";
import { stat } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = join(__dirname, "..", "public");

const SOURCE = join(PUBLIC_DIR, "kalustettu-olohuone-1.jpeg");
const TARGET = join(PUBLIC_DIR, "og-image.jpg");

await sharp(SOURCE)
  .rotate()
  .resize(1200, 630, { fit: "cover", position: "center" })
  .jpeg({ quality: 85, mozjpeg: true })
  .toFile(TARGET);

const size = (await stat(TARGET)).size;
console.log(`og-image.jpg: 1200x630, ${(size/1024).toFixed(0)} KB`);
