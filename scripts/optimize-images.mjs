import sharp from "sharp";
import { stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, parse, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = join(__dirname, "..", "public");

const TARGETS = [
  // Suuret iPhone-lähdekuvat (3-4 MB)
  "IMG_1501.jpeg", "IMG_1503.jpeg", "IMG_1504.jpeg", "IMG_1505.jpeg", "IMG_1507.jpeg",
  "uusi1.jpeg", "uusi2.jpeg", "uusi3.jpeg",
  // Kadulle ja muut isot
  "katu-nyt.jpeg",
  // Uudet kalustetut (jo pieniä mutta tehdään yhtenäisiksi WebP:ksi)
  "kalustettu-olohuone-1.jpeg", "kalustettu-olohuone-2.jpeg",
  "kalustettu-makuuhuone-1.jpeg", "kalustettu-makuuhuone-2.jpeg",
  "kalustettu-tyopiste.jpeg", "kalustettu-eteinen.jpeg",
  // Pienet maalattukuvat
  "maalattu1.jpeg", "maalattu2.jpeg",
];

const MAX_WIDTH = 1600;
const QUALITY = 80;

let totalIn = 0, totalOut = 0;

for (const file of TARGETS) {
  const input = join(PUBLIC_DIR, file);
  if (!existsSync(input)) {
    console.log(`SKIP (ei löydy): ${file}`);
    continue;
  }
  const { name } = parse(file);
  const output = join(PUBLIC_DIR, `${name}.webp`);

  const inSize = (await stat(input)).size;
  const meta = await sharp(input).metadata();
  const resize = meta.width && meta.width > MAX_WIDTH ? { width: MAX_WIDTH } : {};

  await sharp(input)
    .rotate() // honor EXIF orientation
    .resize(resize)
    .webp({ quality: QUALITY })
    .toFile(output);

  const outSize = (await stat(output)).size;
  totalIn += inSize;
  totalOut += outSize;
  const pct = ((1 - outSize / inSize) * 100).toFixed(0);
  console.log(`${file.padEnd(36)} ${(inSize/1024).toFixed(0).padStart(6)} KB → ${name}.webp ${(outSize/1024).toFixed(0).padStart(6)} KB  (-${pct}%)`);
}

console.log("---");
console.log(`Yhteensä: ${(totalIn/1024/1024).toFixed(2)} MB → ${(totalOut/1024/1024).toFixed(2)} MB  (säästö ${((1-totalOut/totalIn)*100).toFixed(0)}%)`);
