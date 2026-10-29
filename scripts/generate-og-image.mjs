import sharp from "sharp";
import { createHash } from "node:crypto";
import { readFile, stat } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = join(__dirname, "..", "public");

// Lähde: heron kuva (npm run images tekee 2400 px version)
const SOURCE = join(PUBLIC_DIR, "img", "pk33", "pk33-olohuone-sohva-2400.webp");
const TARGET = join(PUBLIC_DIR, "og-image.jpg");

await sharp(SOURCE)
  .rotate()
  .resize(1200, 630, { fit: "cover", position: "center" })
  .jpeg({ quality: 85, mozjpeg: true })
  .toFile(TARGET);

const size = (await stat(TARGET)).size;
// Kuva välimuistitetaan vuodeksi ("immutable") ja somepalvelut muistavat sen pitkään:
// päivitä tarkiste OG_IMAGE-vakioon (src/data/pk33-images.ts), jotta jakokuvan URL vaihtuu.
const v = createHash("sha1").update(await readFile(TARGET)).digest("hex").slice(0, 8);
console.log(`og-image.jpg: 1200x630, ${(size/1024).toFixed(0)} KB, tarkiste v=${v}`);
