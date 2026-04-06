"use client";

import Image from "next/image";
import { useEffect, useRef, useState, ReactNode } from "react";
import { QRCodeSVG } from "qrcode.react";
import ContactSection from "@/components/ContactSection";
import Lightbox from "@/components/Lightbox";

function FadeIn({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transitionDelay = `${delay}ms`;
          el.classList.add("opacity-100", "translate-y-0");
          el.classList.remove("opacity-0", "translate-y-8");
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`opacity-0 translate-y-8 transition-all duration-700 ease-out ${className}`}
    >
      {children}
    </div>
  );
}

const galleryImages = [
  { src: "/olohuone1.webp", alt: "Olohuone" },
  { src: "/olohuone2.webp", alt: "Olohuone" },
  { src: "/olohuone3.webp", alt: "Olohuone" },
  { src: "/olohuone4.webp", alt: "Olohuone" },
  { src: "/olohuoneesta-keittioon.webp", alt: "Olohuoneesta keittiöön" },
  { src: "/lapitalo-kruunut.webp", alt: "Läpitalo" },
  { src: "/lapihuoneisto.webp", alt: "Läpihuoneisto" },
  { src: "/makuuhuone1.webp", alt: "Makuuhuone" },
  { src: "/makuuhuoneesta-olohuoneeseen.webp", alt: "Makuuhuoneesta olohuoneeseen" },
  { src: "/keittiö2.webp", alt: "Keittiö" },
  { src: "/keittio3.webp", alt: "Keittiö" },
  { src: "/keittiökaapisto.webp", alt: "Keittiökaapisto" },
  { src: "/jaakaappi.webp", alt: "Jääkaappi ja mikroaaltouuni" },
  { src: "/kaytava1.webp", alt: "Käytävä" },
  { src: "/kaytava2.webp", alt: "Käytävä" },
  { src: "/vaatekaapisto.webp", alt: "Vaatekaapisto" },
  { src: "/vaatehuone-kaapisto.webp", alt: "Vaatehuoneen kaapisto" },
  { src: "/vaatekaapisto-kruunu.webp", alt: "Vaatekaapisto ja kattokruunu" },
  { src: "/suihku.webp", alt: "Suihku" },
  { src: "/suihkukaappi.webp", alt: "Suihkukaappi" },
  { src: "/wc-lavuaari.webp", alt: "WC ja lavuaari" },
  { src: "/pesukone.webp", alt: "Pesukone" },
  { src: "/pesukone2.webp", alt: "Pesukone" },
  { src: "/pesukone-ja-liesi.webp", alt: "Pesukone ja liesi" },
  { src: "/uusi1.jpeg", alt: "Olohuone ja keittiö" },
  { src: "/uusi2.jpeg", alt: "Keittiö" },
  { src: "/uusi3.jpeg", alt: "Makuuhuone" },
  { src: "/uusi4.jpeg", alt: "Vaatekaapisto" },
  { src: "/uusi5.jpeg", alt: "Kylpyhuone" },
  { src: "/IMG_1504.jpeg", alt: "Makuuhuone" },
  { src: "/IMG_1505.jpeg", alt: "Säilytystilaa" },
  { src: "/IMG_1507.jpeg", alt: "Käytävä" },
  { src: "/IMG_1501.jpeg", alt: "Olohuone" },
  { src: "/IMG_1503.jpeg", alt: "Keittiö" },
  { src: "/img-1479.jpeg", alt: "Huone" },
  { src: "/maalattu1.jpeg", alt: "Olohuone ja keittiö" },
  { src: "/maalattu2.jpeg", alt: "Makuuhuone" },
  { src: "/image0.jpeg", alt: "Makuuhuone" },
  { src: "/image1.jpeg", alt: "Käytävä" },
  { src: "/image2.jpeg", alt: "Huone" },
];

const freesiImages = [
  { src: "/IMG_1504.jpeg", alt: "Makuuhuone" },
  { src: "/IMG_1505.jpeg", alt: "Säilytystilaa" },
  { src: "/IMG_1507.jpeg", alt: "Käytävä" },
  { src: "/IMG_1501.jpeg", alt: "Olohuone" },
  { src: "/IMG_1503.jpeg", alt: "Keittiö" },
];

const maalaattuImages = [
  { src: "/maalattu1.jpeg", alt: "Olohuone ja keittiö" },
  { src: "/maalattu2.jpeg", alt: "Makuuhuone" },
];

export default function Home() {
  const [lightbox, setLightbox] = useState<{ images: typeof galleryImages; index: number } | null>(null);

  function openLightbox(images: typeof galleryImages, index: number) {
    setLightbox({ images, index });
  }
  function closeLightbox() { setLightbox(null); }
  function prevImage() { setLightbox((lb) => lb && { ...lb, index: (lb.index - 1 + lb.images.length) % lb.images.length }); }
  function nextImage() { setLightbox((lb) => lb && { ...lb, index: (lb.index + 1) % lb.images.length }); }

  return (
    <main className="bg-white text-slate-800 font-sans">
      {lightbox && (
        <Lightbox
          images={lightbox.images}
          index={lightbox.index}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/hero.webp"
            alt="Pitkänsillankatu 33 – olohuone"
            fill
            className="object-cover brightness-105 contrast-105"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative z-10 text-center px-4 lg:px-8 max-w-6xl mx-auto">
          <p className="text-amber-400 text-base lg:text-2xl font-semibold tracking-widest uppercase mb-4 lg:mb-6">
            Kokkola · Ydinkeskusta
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-[8rem] font-black text-white leading-[1.05] lg:leading-[1.0] tracking-tight mb-6 lg:mb-10">
            Valoisa koti tai<br />
            <span className="text-amber-400">huipputuottava<br />sijoitus</span><br />
            ydinkeskustasta
          </h1>
          <p className="text-base sm:text-lg md:text-2xl lg:text-3xl text-slate-200 mb-8 lg:mb-12 font-light">
            Pitkänsillankatu 33 A 13 · 69 m² · Ylin kerros · 99 200 €
          </p>
          <a
            href="#yhteystiedot"
            className="inline-block bg-amber-500 hover:bg-amber-400 text-slate-900 text-lg lg:text-2xl font-bold px-8 lg:px-14 py-4 lg:py-6 rounded-full transition-colors duration-300 shadow-2xl"
          >
            Ota yhteyttä
          </a>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-300 animate-bounce">
          <span className="text-sm lg:text-lg tracking-widest uppercase">Tutustu</span>
          <svg className="w-6 h-6 lg:w-8 lg:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ── PERUSTIEDOT ──────────────────────────────────────────────── */}
      <section className="py-14 px-4 lg:py-28 lg:px-8 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl lg:text-5xl font-bold text-center mb-10 lg:mb-20 text-slate-800">Kohteen tiedot</h2>
          </FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-8">
            {[
              { label: "Koko", value: "69 m²", sub: "2h + k + kh + wc" },
              { label: "Kerros", value: "3 / 3", sub: "Ei ylänaapuria" },
              { label: "Hinta", value: "99 200 €", sub: "Neuvoteltavissa" },
              { label: "Vastike", value: "324 €/kk", sub: "Yhteensä" },
            ].map((item, i) => (
              <FadeIn key={item.label} delay={i * 100}>
                <div className="bg-white rounded-2xl lg:rounded-3xl p-5 lg:p-10 text-center shadow-lg border border-slate-100 hover:shadow-xl transition-shadow">
                  <p className="text-slate-500 text-sm lg:text-xl font-medium mb-2 lg:mb-3">{item.label}</p>
                  <p className="text-2xl lg:text-4xl font-bold text-slate-900 mb-1 lg:mb-2">{item.value}</p>
                  <p className="text-slate-400 text-xs lg:text-lg">{item.sub}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── SIJOITTAJAN TIEDOT ───────────────────────────────────────── */}
      <section className="py-14 px-4 lg:py-28 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="flex items-center gap-3 mb-4 lg:mb-6 justify-center">
              <span className="text-emerald-600 text-lg lg:text-2xl">◆</span>
              <p className="text-emerald-600 text-lg lg:text-2xl font-semibold tracking-widest uppercase">Sijoittajalle</p>
              <span className="text-emerald-600 text-lg lg:text-2xl">◆</span>
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold text-center mb-10 lg:mb-20 text-slate-800">Erinomainen tuottopotentiaali</h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-8 mb-8 lg:mb-16">
            {[
              {
                label: "Bruttovuokratuotto",
                value: "8,5–10 %",
                sub: "vuodessa",
                desc: "Kokkolan ydinkeskustan vahvalla vuokrakysyntäalueella",
              },
              {
                label: "Arvioitu markkinavuokra",
                value: "700–850 €",
                sub: "kuukaudessa",
                desc: "700 € ilman kalusteita · 850 € kevyesti kalustettuna",
              },
              {
                label: "Nettotuotto",
                value: "4,5–6 %",
                sub: "vuodessa",
                desc: "Vastikekulujen jälkeen laskettuna",
              },
            ].map((item, i) => (
              <FadeIn key={item.label} delay={i * 150}>
                <div className="relative bg-white rounded-2xl lg:rounded-3xl p-6 lg:p-10 overflow-hidden shadow-lg border border-slate-100 hover:shadow-xl transition-shadow">
                  <div className="absolute top-0 right-0 w-32 h-32 lg:w-40 lg:h-40 bg-emerald-50 rounded-full -translate-y-12 translate-x-12 lg:-translate-y-16 lg:translate-x-16" />
                  <p className="text-slate-500 text-sm lg:text-lg font-semibold mb-3 lg:mb-4">{item.label}</p>
                  <p className="text-5xl lg:text-6xl font-black mb-1 text-emerald-700">{item.value}</p>
                  <p className="text-base lg:text-xl font-medium mb-4 lg:mb-6 text-slate-400">{item.sub}</p>
                  <p className="text-sm lg:text-base text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl lg:rounded-3xl p-6 lg:p-10 text-center shadow-lg">
              <p className="text-base lg:text-2xl text-slate-600 leading-relaxed">
                Hankintahinta <strong className="text-emerald-700">99 200 €</strong> ja vastike vain{" "}
                <strong className="text-emerald-700">324 €/kk</strong> tekevät tästä yhden Kokkolan
                houkuttelevimmista sijoitusasunnoista.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── MUUTTOVALMIS KOTI ───────────────────────────────────────── */}
      <section className="py-14 px-4 lg:py-28 lg:px-8 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl lg:text-5xl font-bold text-center mb-4 lg:mb-6 text-slate-800">Muuttovalmis & freesi</h2>
            <p className="text-base lg:text-2xl text-slate-500 text-center mb-10 lg:mb-20">Ei remonttitarvetta — voit vuokrata tai muuttaa heti</p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-8 items-stretch">
            {[
              {
                icon: "🖌️",
                title: "Juuri maalattu",
                desc: "2026 valmistunut kattava maalausurakka. Kaikki pinnat uusittu ammattitaidolla — seinät, katot ja puuosat.",
                images: maalaattuImages,
              },
              {
                icon: "🪟",
                title: "Uudet säleverhot",
                desc: "Jokaiseen ikkunaan asennettu uudet laadukkaat säleverhot. Valoisa tunnelma ja helppo valaistuksen säätö.",
                images: null,
              },
              {
                icon: "✨",
                title: "Freesi valkoinen ilme",
                desc: "Ajaton ja valoisa sisustus, joka sopii kaikille. Ylin kerros tuo lisää luonnonvaloa päivittäin.",
                images: freesiImages,
              },
            ].map((item, i) => (
              <FadeIn key={item.title} delay={i * 120}>
                <div className="bg-white hover:bg-slate-50 rounded-2xl lg:rounded-3xl p-6 lg:p-12 transition-colors duration-300 border border-slate-100 shadow-lg hover:shadow-xl flex flex-col h-full">
                  <div className="text-5xl mb-4 lg:mb-8">{item.icon}</div>
                  <h3 className="text-xl lg:text-3xl font-bold mb-3 lg:mb-5 text-slate-800">{item.title}</h3>
                  <p className="text-sm lg:text-xl text-slate-600 leading-relaxed flex-1">{item.desc}</p>
                  {item.images ? (
                    <button
                      onClick={() => openLightbox(item.images!, 0)}
                      className="mt-6 inline-flex items-center gap-2 text-sm lg:text-base font-semibold text-amber-600 hover:text-amber-500 transition-colors"
                    >
                      Katso kuvat
                      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  ) : (
                    <div className="mt-6 h-6" />
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── KUVAGALLERIA ────────────────────────────────────────────── */}
      <section className="py-14 px-4 lg:py-28 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl lg:text-5xl font-bold text-center mb-10 lg:mb-20 text-slate-800">Kuvagalleria</h2>
          </FadeIn>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-4">
            {/* Pääkuva — leveä */}
            <FadeIn className="col-span-2 row-span-2" delay={0}>
              <button
                onClick={() => openLightbox(galleryImages, 0)}
                className="relative aspect-square rounded-2xl lg:rounded-3xl overflow-hidden shadow-lg w-full block cursor-zoom-in"
              >
                <Image
                  src="/olohuone1.webp"
                  alt="Olohuone"
                  fill
                  className="object-cover brightness-105 contrast-105 hover:scale-105 transition-transform duration-500"
                />
              </button>
            </FadeIn>

            {galleryImages.slice(1).map((img, i) => (
              <FadeIn key={img.src} delay={(i + 1) * 80}>
                <button
                  onClick={() => openLightbox(galleryImages, i + 1)}
                  className="relative aspect-square rounded-xl lg:rounded-2xl overflow-hidden shadow-md w-full block cursor-zoom-in"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover brightness-105 contrast-105 hover:scale-105 transition-transform duration-500"
                  />
                </button>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── HISTORIA & SIJAINTI ─────────────────────────────────────── */}
      <section className="py-14 px-4 lg:py-28 lg:px-8 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl lg:text-5xl font-bold text-center mb-3 lg:mb-6 text-slate-800">Historia & sijainti</h2>
            <p className="text-base lg:text-2xl text-slate-500 text-center mb-10 lg:mb-20">
              Arvokas sijainti Kokkolan sydämessä — historiaa ja nykypäivää
            </p>
          </FadeIn>

          <FadeIn delay={0} className="mb-8 lg:mb-16">
            <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden aspect-[16/9] lg:aspect-[16/7] shadow-xl">
              <Image
                src="/nakyma.webp"
                alt="Ikkunanäkymä Nordealle"
                fill
                className="object-cover brightness-105 contrast-105"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 lg:p-8">
                <p className="text-white text-base lg:text-2xl font-semibold">Näkymä ylimmästä kerroksesta — suoraan Kokkolan sydämeen</p>
              </div>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="bg-white rounded-2xl lg:rounded-3xl p-6 lg:p-12 border border-slate-100 shadow-lg">
              <div className="grid grid-cols-3 gap-4 lg:gap-10 text-center">
                {[
                  { icon: "📍", label: "Sijainti", value: "Kokkolan ydinkeskusta" },
                  { icon: "🚶", label: "Palvelut", value: "Kaikki kävelyetäisyydellä" },
                  { icon: "🏛️", label: "Rakennettu", value: "1950-luvun historiallinen talo" },
                ].map((item) => (
                  <div key={item.label} className="flex flex-col items-center">
                    <span className="text-3xl lg:text-5xl mb-2 lg:mb-4">{item.icon}</span>
                    <p className="text-slate-500 text-xs lg:text-lg mb-1 lg:mb-2">{item.label}</p>
                    <p className="text-sm lg:text-2xl font-bold text-slate-800">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── OTA YHTEYTTÄ ────────────────────────────────────────────── */}
      <section id="yhteystiedot" className="py-14 px-4 lg:py-28 lg:px-8 bg-slate-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <p className="text-amber-400 text-base lg:text-2xl font-semibold tracking-widest uppercase mb-4 lg:mb-6">Kiinnostuitko?</p>
            <h2 className="text-4xl lg:text-6xl font-bold mb-4 lg:mb-8">Ota yhteyttä</h2>
            <p className="text-base lg:text-2xl text-slate-300 mb-10 lg:mb-20 leading-relaxed">
              Varaa näyttöaika tai pyydä lisätietoja — vastataan nopeasti.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-8 items-stretch">
            {[
              {
                icon: "👤",
                label: "Myyjä",
                lines: [
                  { text: "Petri Kopsa", href: null },
                  { text: "petri.kopsa@gmail.com", href: "mailto:petri.kopsa@gmail.com" },
                ],
              },
              {
                icon: "📞",
                label: "Puhelin",
                lines: [
                  { text: "+358 50 306 0635", href: "tel:+358503060635" },
                ],
              },
              {
                icon: "✉️",
                label: "Sähköposti",
                lines: [
                  { text: "info@terassitalo.com", href: "mailto:info@terassitalo.com" },
                ],
              },
            ].map((item, i) => (
              <FadeIn key={item.label} delay={i * 120}>
                <div className="bg-slate-700 hover:bg-slate-600 border border-white/10 rounded-2xl lg:rounded-3xl p-6 lg:p-10 transition-colors duration-300 h-full flex flex-col">
                  <div className="text-4xl lg:text-5xl mb-4 lg:mb-6">{item.icon}</div>
                  <p className="text-slate-400 text-sm lg:text-xl mb-2 lg:mb-3">{item.label}</p>
                  <div className="flex flex-col gap-1 mt-auto">
                    {item.lines.map((line) =>
                      line.href ? (
                        <a key={line.text} href={line.href} className="text-base lg:text-xl font-bold text-amber-400 hover:text-amber-300 transition-colors whitespace-nowrap">
                          {line.text}
                        </a>
                      ) : (
                        <p key={line.text} className="text-base lg:text-xl font-bold text-white">{line.text}</p>
                      )
                    )}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={400}>
            <div className="mt-12 lg:mt-20 flex flex-col sm:flex-row items-end justify-center gap-6">
              {/* QR-koodi */}
              <div className="flex flex-col items-center gap-3">
                <div className="bg-white rounded-2xl p-4 shadow-lg">
                  <QRCodeSVG
                    value="https://pitkansillankatu33.com/"
                    size={160}
                    bgColor="#ffffff"
                    fgColor="#1e293b"
                    level="M"
                  />
                </div>
                <p className="text-amber-400 font-semibold text-base lg:text-lg tracking-wide">
                  Skannaa ja varaa
                </p>
              </div>

              {/* Etuovi-linkki */}
              <div className="flex flex-col items-center gap-3">
                <a
                  href="https://www.etuovi.com/kohde/w24967"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center gap-3 bg-white rounded-2xl p-6 shadow-lg w-48 h-48 hover:shadow-xl transition-shadow group"
                >
                  <svg viewBox="0 0 24 24" className="w-10 h-10" fill="none">
                    <path d="M3 10.5L12 3l9 7.5V21a1 1 0 01-1 1H5a1 1 0 01-1-1V10.5z" fill="#FF6600" />
                    <rect x="9" y="13" width="6" height="8" rx="0.5" fill="#fff" />
                  </svg>
                  <span className="text-slate-800 font-bold text-base text-center leading-tight">
                    Katso ilmoitus<br />Etuovessa
                  </span>
                  <span className="text-[#FF6600] font-semibold text-sm group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    Avaa →
                  </span>
                </a>
                <p className="text-amber-400 font-semibold text-base lg:text-lg tracking-wide">
                  Etuovi
                </p>
              </div>

              {/* Isännöitsijäntodistus — Retta */}
              <div className="flex flex-col items-center gap-3">
                <a
                  href="/docs/isannoitsijantodistus.pdf"
                  download
                  className="flex flex-col items-center justify-center gap-3 bg-white rounded-2xl p-6 shadow-lg w-48 h-48 hover:shadow-xl transition-shadow group"
                >
                  <img src="/retta-logo-dark.svg" alt="Retta" className="w-28 h-auto" />
                  <span className="text-slate-500 font-semibold text-sm group-hover:translate-y-0.5 transition-transform inline-flex items-center gap-1">
                    Lataa PDF ↓
                  </span>
                </a>
                <p className="text-amber-400 font-semibold text-base lg:text-lg tracking-wide">
                  Isännöitsijäntodistus
                </p>
              </div>

              {/* Kunnossapitotarveselvitys */}
              <div className="flex flex-col items-center gap-3">
                <a
                  href="/docs/kunnossapito2025.pdf"
                  download
                  className="flex flex-col items-center justify-center gap-3 bg-white rounded-2xl p-6 shadow-lg w-48 h-48 hover:shadow-xl transition-shadow group"
                >
                  <svg viewBox="0 0 24 24" className="w-10 h-10" fill="none" stroke="#1e293b" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l5.653-4.655m5.833-4.322a7.5 7.5 0 00-10.23 0" />
                  </svg>
                  <span className="text-slate-800 font-bold text-base text-center leading-tight">
                    Kunnossapito-<br />tarveselvitys
                  </span>
                  <span className="text-slate-500 font-semibold text-sm group-hover:translate-y-0.5 transition-transform inline-flex items-center gap-1">
                    Lataa PDF ↓
                  </span>
                </a>
                <p className="text-amber-400 font-semibold text-base lg:text-lg tracking-wide">
                  Remontit
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={500}>
            <div className="mt-8 pt-8 lg:mt-12 lg:pt-12 border-t border-white/10">
              <p className="text-slate-500 text-sm lg:text-xl">
                Pitkänsillankatu 33 A 13 · 67100 Kokkola · 69 m² · 99 200 €
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── YHTEYDENOTTOLOMAKE ──────────────────────────────────────── */}
      <ContactSection />
    </main>
  );
}
