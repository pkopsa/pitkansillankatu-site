#!/usr/bin/env node
/**
 * Kuvien optimointi: pk33-aineiston lähdekuvat → public/img/pk33/
 *
 * Pohja: pitkansillankatu18-siten optimize-images.mjs (sovitettu tähän repoon).
 * Jokaisesta kuvasta tehdään WebP-versiot leveyksillä 1600, 1200 ja 800 px
 * (vain ne, joihin alkuperäinen riittää; pienestä kuvasta vähintään yksi
 * alkuperäisen kokoinen versio). Laatua lasketaan portaittain ja tarvittaessa
 * mittoja pienennetään, kunnes tiedosto on alle 250 kt. Jos raja ei täyty,
 * skripti ilmoittaa virheen eikä päivitä manifestia.
 * Lisäksi jokaisesta kuvasta tehdään 2400 px versio heroa ja lightboxia varten
 * (q82 tai alempi, kuitenkin vähintään q58, raja 900 kt). PK18:n 400 kt:n raja
 * pakotti yksityiskohtaiset ilma- ja katukuvat laatuun q46–52 tai alle 2400 px:n.
 * EXIF-metatiedot (sijainti, kamera) poistetaan; EXIF-suunta huomioidaan.
 *
 * Lähdekuvat ovat valmiiksi logottomia (pk33-kuvat-logoton.zip, ks. LUEMINUT.txt).
 * Jos lähdekansiossa on "<nimi>-sumennettu.jpg" (rekisterikilvet sumennettu, scripts/blur-plates.mjs),
 * käytetään sitä alkuperäisen sijaan; tulostiedoston nimi on ilman päätettä.
 *
 * Käyttö:
 *   npm run images                       # oletus: C:\kopsa-web\pk33-aineisto\original-logoton
 *   npm run images -- D:\polku\kuvat     # muu lähdekansio
 *
 * Manifesti (mitat ja versiotarkisteet sivua varten): src/data/pk33-images.json
 */

import { createHash } from "node:crypto";
import { promises as fs } from "node:fs";
import os from "node:os";
import path from "node:path";
import sharp from "sharp";

const AINEISTO = process.platform === "win32" ? "C:/kopsa-web/pk33-aineisto" : path.join(os.homedir(), "kopsa-web/pk33-aineisto");
const SRCS = (process.argv.length > 2 ? process.argv.slice(2) : [path.join(AINEISTO, "original-logoton")]).map((p) =>
  path.resolve(p),
);
const OUT = path.resolve("public/img/pk33");
const MANIFEST = path.resolve("src/data/pk33-images.json");
const WIDTHS = [1600, 1200, 800];
const MAX_BYTES = 250 * 1024;
const QUALITIES = [82, 74, 66, 58, 50];
const SHRINK_STEPS = [1, 0.85, 0.7]; // jos laatu ei riitä, pienennä mittoja
const EXT = new Set([".jpg", ".jpeg", ".png", ".tif", ".tiff", ".webp", ".avif", ".heic", ".heif"]);
// Kuvat, joissa on luettavia rekisterikilpiä: vain sumennettu versio kelpaa (scripts/blur-plates.mjs)
const REQUIRED_EDITS = new Set([
  "pk33-julkisivu-katukulma-1",
  "pk33-julkisivu-katukulma-2",
  "pk33-julkisivu-muraali",
  "pk33-katunakyma-pitkansillankatu",
  "pk33-ilmakuva-rakennus",
]);

// Muokattujen versioiden päätteet etusijajärjestyksessä
const EDIT_SUFFIXES = ["-sumennettu"];

// Heron ja lightboxin täysikokoiset (2400 px, q82–58, < 900 kt) – kaikista kuvista
const LARGE = { width: 2400, qualities: [82, 76, 70, 64, 58], maxBytes: 900 * 1024 };

function slugify(name) {
  return name
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // poista aksentit: ä → a
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Leveys EXIF-suunnan jälkeen: suunnat 5–8 kääntävät kuvan 90°. */
function orientedWidth(meta) {
  const rotated = meta.orientation && meta.orientation >= 5;
  return rotated ? meta.height : meta.width;
}

/** Yrittää tuottaa WebP:n annetulla leveydellä kokorajan alle; palauttaa null, jos ei onnistu. */
async function encodeUnderLimit(input, width, qualities = QUALITIES, maxBytes = MAX_BYTES) {
  for (const shrink of SHRINK_STEPS) {
    const w = Math.max(200, Math.round(width * shrink));
    for (const q of qualities) {
      const buf = await input
        .clone()
        .resize({ width: w, withoutEnlargement: true })
        .webp({ quality: q, effort: 5 })
        .toBuffer();
      if (buf.length <= maxBytes) return { buf, q, w };
    }
  }
  return null;
}

/** Valitsee lähdetiedostot: muokattu versio korvaa alkuperäisen (ks. EDIT_SUFFIXES). */
async function listSources(dir) {
  const files = (await fs.readdir(dir)).filter((f) => EXT.has(path.extname(f).toLowerCase())).sort();
  const byBase = new Map();
  for (const f of files) {
    const name = path.parse(f).name;
    const suffix = EDIT_SUFFIXES.find((s) => name.endsWith(s));
    const original = suffix ? name.slice(0, -suffix.length) : name;
    const rank = suffix ? EDIT_SUFFIXES.indexOf(suffix) : EDIT_SUFFIXES.length;
    const prev = byBase.get(original);
    if (!prev || rank < prev.rank) byBase.set(original, { file: f, rank });
  }
  return [...byBase.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([original, { file }]) => ({ dir, file, base: slugify(original) }));
}

async function writeVariant(base, encoded) {
  const info = await sharp(encoded.buf).metadata();
  const outName = `${base}-${info.width}.webp`; // nimi = todellinen leveys
  await fs.writeFile(path.join(OUT, outName), encoded.buf);
  return { outName, buf: encoded.buf, width: info.width, height: info.height, kb: Math.round(encoded.buf.length / 1024), q: encoded.q };
}

async function processOne({ dir, file, base }, seen) {
  if (seen.has(base)) {
    throw new Error(`Nimikonflikti: "${file}" ja "${seen.get(base)}" normalisoituvat samaksi nimeksi "${base}". Nimeä toinen uudelleen.`);
  }
  seen.set(base, file);

  if (REQUIRED_EDITS.has(base) && !path.parse(file).name.endsWith("-sumennettu")) {
    throw new Error(`"${file}": kuvassa on rekisterikilpiä – käytä sumennettua versiota (aja node scripts/blur-plates.mjs).`);
  }

  const input = sharp(path.join(dir, file), { failOn: "none" }).rotate(); // rotate() = EXIF-suunta
  let meta;
  try {
    meta = await input.metadata();
  } catch (e) {
    throw new Error(`"${file}": kuvaa ei voitu lukea (${e.message})`);
  }

  const srcWidth = orientedWidth(meta);
  if (!srcWidth) throw new Error(`"${file}": leveyttä ei saatu selville`);

  // Leveydet, joihin alkuperäinen riittää; pienestä kuvasta vähintään alkuperäinen koko
  let targets = WIDTHS.filter((w) => srcWidth >= w);
  if (targets.length === 0) targets = [srcWidth];

  const results = [];
  for (const width of targets) {
    const encoded = await encodeUnderLimit(input, width);
    if (!encoded) {
      throw new Error(`"${file}" (${width} px): ei saatu alle ${MAX_BYTES / 1024} kt edes pienentämällä. Rajaa tai pienennä kuva käsin.`);
    }
    results.push({ ...(await writeVariant(base, encoded)), shrunk: encoded.w !== width });
  }

  if (srcWidth >= LARGE.width) {
    const encoded = await encodeUnderLimit(input, LARGE.width, LARGE.qualities, LARGE.maxBytes);
    if (!encoded) throw new Error(`"${file}" (${LARGE.width} px): ei saatu alle ${LARGE.maxBytes / 1024} kt.`);
    results.push({ ...(await writeVariant(base, encoded)), shrunk: encoded.w !== LARGE.width });
  }
  // Versiotunniste sisällöstä: muuttunut kuva saa uuden URL:n (?v=), vaikka välimuisti on "immutable"
  const hash = createHash("sha1");
  for (const r of results) hash.update(r.buf);
  return { file, base, results, v: hash.digest("hex").slice(0, 8) };
}

async function main() {
  for (const src of SRCS) {
    try {
      await fs.access(src);
    } catch {
      console.error(`Lähdekansiota ei löydy: ${src}`);
      process.exit(1);
    }
  }
  await fs.mkdir(OUT, { recursive: true });
  await fs.mkdir(path.dirname(MANIFEST), { recursive: true });

  const sources = (await Promise.all(SRCS.map(listSources))).flat();
  if (sources.length === 0) {
    console.log(`Ei kuvia kansioissa ${SRCS.join(", ")}`);
    return;
  }

  console.log(`Optimoidaan ${sources.length} kuvaa → ${OUT}\n`);
  const manifest = [];
  const seen = new Map();
  let failed = 0;
  for (const s of sources) {
    try {
      const r = await processOne(s, seen);
      for (const x of r.results) {
        const flag = x.shrunk ? "  (pienennetty kokorajan takia)" : "";
        console.log(`  ${x.outName.padEnd(46)} ${String(x.width).padStart(4)}×${String(x.height).padEnd(4)} ${String(x.kb).padStart(4)} kt  q=${x.q}${flag}`);
      }
      manifest.push(r);
    } catch (e) {
      failed++;
      console.error(`  VIRHE: ${e.message}`);
    }
  }

  if (failed > 0) {
    // Ei kirjoiteta manifestia vajaana – sivu jatkaa edellisellä toimivalla manifestilla
    console.error(`\nKeskeytetty: ${failed} virhettä, manifestia ei päivitetty.`);
    process.exit(1);
  }

  // Manifesti: sivu lukee tästä kuvien mitat ja saatavilla olevat leveydet
  await fs.writeFile(
    MANIFEST,
    JSON.stringify(
      Object.fromEntries(
        manifest.map((m) => [
          m.base,
          {
            width: m.results[0].width,
            height: m.results[0].height,
            widths: m.results.map((x) => x.width).sort((a, b) => a - b),
            v: m.v,
          },
        ]),
      ),
      null,
      2,
    ) + "\n",
  );
  console.log(`\nValmis: ${manifest.length} kuvaa. Manifesti: ${MANIFEST}\nMuista alt-tekstit kaikilla kielillä (src/translations.ts → alt)!`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
