import type { ImageLoaderProps } from "next/image";
import manifest from "@/data/pk33-images.json";

type ManifestEntry = { width: number; height: number; widths: number[]; v?: string };
const MANIFEST = manifest as Record<string, ManifestEntry>;

export type GalleryImage = { base: string; src: string; width: number; height: number };

function pk33(base: string): GalleryImage {
  const m = MANIFEST[base];
  if (!m) throw new Error(`Kuvaa ei löydy manifestista: ${base} (aja npm run images)`);
  return { base, src: `/img/pk33/${base}`, width: m.width, height: m.height };
}

// Galleria kolmessa ryhmässä: sisätilat (15), julkisivu ja katu (4), ilmakuvat (4).
// Sisätilat huone kerrallaan – neljän sarakkeen ruudukossa yksi rivi on yksi huone.
export const GALLERY = {
  interior: [
    "pk33-olohuone-sohva",
    "pk33-olohuone-nojatuoli",
    "pk33-olohuone-tv-kirjahylly",
    "pk33-olohuone-ikkuna-tv",
    "pk33-keittio-ruokailutila",
    "pk33-keittio-ruokapoyta",
    "pk33-keittio-kaapistot",
    "pk33-keittiosta-olohuoneeseen",
    "pk33-makuuhuone-sanky-ikkuna",
    "pk33-makuuhuone-kaapistot",
    "pk33-makuuhuone-tyopoyta-1",
    "pk33-makuuhuone-tyopoyta-2",
    "pk33-eteinen-kaytava",
    "pk33-kylpyhuone-suihku",
    "pk33-wc",
  ].map(pk33),
  exterior: [
    "pk33-julkisivu-katukulma-1",
    "pk33-julkisivu-katukulma-2",
    "pk33-julkisivu-muraali",
    "pk33-katunakyma-pitkansillankatu",
  ].map(pk33),
  aerial: [
    "pk33-ilmakuva-kaupunki-meri",
    "pk33-ilmakuva-keskusta-1",
    "pk33-ilmakuva-keskusta-2",
    "pk33-ilmakuva-rakennus",
  ].map(pk33),
};

export const HERO_IMAGE = pk33("pk33-olohuone-sohva");

// "Muuttovalmis & freesi" -korttien kuvat (kortit 1–3); kuvat ovat myös sisätilagalleriassa
export const READY_CARD_IMAGES = [
  "pk33-keittio-ruokapoyta",
  "pk33-makuuhuone-sanky-ikkuna",
  "pk33-olohuone-nojatuoli",
].map(pk33);

// Historia & sijainti -osio
export const LOCATION_IMAGE = pk33("pk33-ilmakuva-kaupunki-meri");
export const STREET_IMAGE = pk33("pk33-julkisivu-katukulma-1");

// Jakokuva (og:image, JSON-LD). scripts/generate-og-image.mjs tulostaa tarkisteen – päivitä se tähän,
// kun kuva muuttuu, jotta selaimet ja somepalvelut hakevat uuden version.
export const OG_IMAGE = "/og-image.jpg?v=7e0916e2";

/** Onko kuvasta valmiit WebP-versiot (muut, esim. /katu-historia.jpeg, kulkevat Nextin oletuslataajalla). */
export function hasVariants(src: string): boolean {
  return src.startsWith("/img/pk33/") && src.slice(src.lastIndexOf("/") + 1) in MANIFEST;
}

// Valmiiksi optimoidut WebP-versiot: valitaan pienin leveys, joka riittää.
// src on muotoa "/img/pk33/<base>" ilman päätettä.
// ?v= = sisällön tarkiste: kuvat välimuistitetaan vuodeksi ("immutable", next.config.ts), joten muuttunut
// kuva tarvitsee uuden URL:n – muuten selain näyttää vanhan version.
export function webpLoader({ src, width }: ImageLoaderProps): string {
  const m = MANIFEST[src.slice(src.lastIndexOf("/") + 1)];
  if (!m) return src;
  const w = m.widths.find((x) => x >= width) ?? m.widths[m.widths.length - 1];
  return `${src}-${w}.webp${m.v ? `?v=${m.v}` : ""}`;
}
