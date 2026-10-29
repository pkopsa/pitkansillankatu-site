#!/usr/bin/env node
/**
 * Rekisterikilpien sumennus ennen julkaisua (pohja: pitkansillankatu18-siten blur-plates.mjs).
 *
 * Lukee lähdekuvat aineistokansiosta (repon ulkopuolella) ja kirjoittaa samaan
 * kansioon versiot "<nimi>-sumennettu.jpg". Alueet ovat alkuperäisen kuvan
 * pikselikoordinaatteja (rajataan alue, blur 30, composite takaisin).
 * npm run images käyttää sumennettua versiota alkuperäisen sijaan.
 *
 * Käyttö:
 *   node scripts/blur-plates.mjs                       # oletus: C:\kopsa-web\pk33-aineisto\original-logoton
 *   node scripts/blur-plates.mjs D:\polku\kuvat
 */

import os from "node:os";
import path from "node:path";
import sharp from "sharp";

const AINEISTO = process.platform === "win32" ? "C:/kopsa-web/pk33-aineisto" : path.join(os.homedir(), "kopsa-web/pk33-aineisto");
const SRC = path.resolve(process.argv[2] ?? path.join(AINEISTO, "original-logoton"));
const BLUR_SIGMA = 30;

const TARGETS = {
  "pk33-julkisivu-katukulma-1.jpg": [
    { left: 300, top: 2372, width: 120, height: 52 }, // musta Nissan
    { left: 548, top: 2138, width: 74, height: 36 }, // punainen Renault
    { left: 844, top: 2128, width: 64, height: 34 }, // vastaan tuleva auto
    { left: 1494, top: 2194, width: 48, height: 32 }, // valkoinen pakettiauto (osittain näkyvissä)
    { left: 1964, top: 2430, width: 105, height: 46 }, // valkoinen Audi
    { left: 1088, top: 1942, width: 30, height: 20 }, // sininen auto, kaukana
    { left: 1125, top: 1985, width: 26, height: 18 }, // pakettiauto, kaukana
    { left: 1184, top: 1998, width: 32, height: 20 }, // musta auto, kaukana
  ],
  "pk33-julkisivu-katukulma-2.jpg": [
    { left: 386, top: 2368, width: 130, height: 52 }, // musta Nissan
    { left: 28, top: 2152, width: 72, height: 36 }, // punainen Renault
    { left: 1018, top: 2120, width: 74, height: 36 }, // tumma Renault Captur
    { left: 1288, top: 2167, width: 80, height: 38 }, // valkoinen pakettiauto
    { left: 2206, top: 2360, width: 96, height: 50 }, // valkoinen Audi
    { left: 515, top: 1995, width: 40, height: 25 }, // musta VW, kaukana
  ],
  "pk33-julkisivu-muraali.jpg": [
    { left: 3728, top: 2624, width: 102, height: 48 }, // hopea Volvo
    { left: 3862, top: 2408, width: 84, height: 42 }, // tumma Renault Captur
    { left: 4622, top: 2115, width: 74, height: 34 }, // punainen auto
  ],
  "pk33-katunakyma-pitkansillankatu.jpg": [
    { left: 2964, top: 2280, width: 74, height: 36 }, // hopea Opel
    { left: 1080, top: 2408, width: 44, height: 52 }, // valkoinen Audi (kilpi vinossa)
    { left: 332, top: 2416, width: 38, height: 38 }, // vasen reuna, osittain näkyvä kilpi
  ],
  "pk33-ilmakuva-rakennus.jpg": [
    { left: 1566, top: 1884, width: 50, height: 46 }, // musta Mercedes
    { left: 1994, top: 2054, width: 52, height: 48 }, // valkoinen Audi
    { left: 3430, top: 2366, width: 56, height: 38 }, // hopea Opel
  ],
};

async function blurFile(file, regions) {
  const input = path.join(SRC, file);
  const output = path.join(SRC, file.replace(/\.jpg$/, "-sumennettu.jpg"));
  const patches = await Promise.all(
    regions.map(async (r) => ({
      input: await sharp(input).extract(r).blur(BLUR_SIGMA).toBuffer(),
      left: r.left,
      top: r.top,
    })),
  );
  await sharp(input).composite(patches).jpeg({ quality: 92 }).toFile(output);
  console.log(`${file} → ${path.basename(output)} (${regions.length} aluetta)`);
}

for (const [file, regions] of Object.entries(TARGETS)) {
  await blurFile(file, regions);
}
