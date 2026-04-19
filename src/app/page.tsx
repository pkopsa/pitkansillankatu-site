"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState, ReactNode } from "react";
import ContactSection from "@/components/ContactSection";

const QRCodeSVG = dynamic(
  () => import("qrcode.react").then((mod) => ({ default: mod.QRCodeSVG })),
  { ssr: false }
);
import PropertyMap from "@/components/PropertyMap";
import FloorPlan from "@/components/FloorPlan";
import Lightbox from "@/components/Lightbox";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Lang, translations } from "@/translations";

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
  { src: "/olohuone3.webp",               alt: "Olohuone – tilava ja valoisa" },
  { src: "/olohuoneesta-keittioon.webp",  alt: "Olohuoneesta keittiöön" },
  { src: "/uusi1.jpeg",                   alt: "Olohuone – freesi ilme" },
  { src: "/makuuhuone1.webp",             alt: "Makuuhuone" },
  { src: "/makuuhuoneesta-olohuoneeseen.webp", alt: "Makuuhuone ja kaapisto" },
  { src: "/uusi3.jpeg",                   alt: "Makuuhuone – freesi ilme" },
  { src: "/keittio3.webp",               alt: "Keittiö – kodinkoneet" },
  { src: "/uusi2.jpeg",                   alt: "Keittiö – freesi ilme" },
  { src: "/vaatehuone-kaapisto.webp",     alt: "Iso kaapistoseinä" },
  { src: "/kaytava1.webp",               alt: "Käytävä ja eteinen" },
  { src: "/suihkukaappi.webp",           alt: "Kylpyhuone" },
  { src: "/pesukone.webp",               alt: "Pesutila ja suihku" },
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

const PAUSE_MS = 2000;
const LANGS_CYCLE: Lang[] = ["fi", "sv", "en"];
function getScrollSpeed() {
  if (typeof window === "undefined") return 1.0;
  if (window.innerWidth >= 1920) return 4.16;
  if (window.innerWidth >= 1024) return 1.6;
  return 0.64;
}

export default function Home() {
  const [lang, setLang] = useState<Lang>("fi");
  const [lightbox, setLightbox] = useState<{ images: typeof galleryImages; index: number } | null>(null);

  const t = translations[lang];

  // Skrollaa ylös kielen vaihtuessa
  function handleSetLang(l: Lang) {
    setLang(l);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Wake Lock — estää näytön sammumisen (toimii Chromiumissa)
  useEffect(() => {
    let wakeLock: WakeLockSentinel | null = null;
    async function acquire() {
      try {
        wakeLock = await navigator.wakeLock.request("screen");
      } catch {
        // Selain ei tue Wake Lockia — ei haittaa
      }
    }
    acquire();
    // Hankitaan uudelleen jos välilehti palaa taustalta
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") acquire();
    });
    return () => { wakeLock?.release(); };
  }, []);

  // Auto-reload — lataa sivun uudelleen jos yhteys on poikki yli 2 min
  useEffect(() => {
    const RELOAD_INTERVAL_MS = 2 * 60 * 1000; // 2 minuuttia
    const id = setInterval(() => {
      if (!navigator.onLine) {
        // Ei yhteyttä — yritetään uudelleen 10 sekunnin päästä
        setTimeout(() => window.location.reload(), 10_000);
      }
    }, RELOAD_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  // Kiosk-skrollaus: fi → sv → en → fi → ...
  useEffect(() => {
    let rafId: number;
    let pausing = false;
    let langIndex = 0;

    function switchLang() {
      pausing = true;
      setTimeout(() => {
        langIndex = (langIndex + 1) % LANGS_CYCLE.length;
        setLang(LANGS_CYCLE[langIndex]);
        window.scrollTo({ top: 0, behavior: "instant" });
        pausing = false;
      }, PAUSE_MS);
    }

    function step() {
      if (pausing) { rafId = requestAnimationFrame(step); return; }
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (window.scrollY >= maxScroll - 1) {
        switchLang();
      } else {
        window.scrollBy(0, getScrollSpeed());
      }
      rafId = requestAnimationFrame(step);
    }

    function stop() { cancelAnimationFrame(rafId); }
    window.addEventListener("wheel", stop, { passive: true });
    window.addEventListener("touchstart", stop, { passive: true });
    window.addEventListener("keydown", stop);

    rafId = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("wheel", stop);
      window.removeEventListener("touchstart", stop);
      window.removeEventListener("keydown", stop);
    };
  }, []);

  function openLightbox(images: typeof galleryImages, index: number) { setLightbox({ images, index }); }
  function closeLightbox() { setLightbox(null); }
  function prevImage() { setLightbox((lb) => lb && { ...lb, index: (lb.index - 1 + lb.images.length) % lb.images.length }); }
  function nextImage() { setLightbox((lb) => lb && { ...lb, index: (lb.index + 1) % lb.images.length }); }

  return (
    <main className="bg-white text-slate-800 font-sans">
      <LanguageSwitcher lang={lang} setLang={handleSetLang} />

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
            {t.heroLocation}
          </p>
          <h1 className="text-[2.14rem] sm:text-[2.85rem] md:text-[4.28rem] lg:text-[7.6rem] font-black text-white leading-[1.05] lg:leading-[1.0] tracking-tight mb-6 lg:mb-10">
            {t.heroLine1}<br />
            <span className="text-amber-400">
              {t.heroLine2.split("\n").map((line, i) => (
                <span key={i}>{line}{i === 0 && <br />}</span>
              ))}
            </span><br />
            {t.heroLine3}
          </h1>
          <p className="text-sm sm:text-base md:text-xl lg:text-2xl text-slate-300 mb-2 lg:mb-3 font-light tracking-wide">
            {t.heroAddress}
          </p>
          <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-amber-400 font-black mb-8 lg:mb-12 tracking-tight">
            {t.heroPrice}
          </p>
          <a
            href="#yhteystiedot"
            className="inline-block bg-amber-500 hover:bg-amber-400 text-slate-900 text-lg lg:text-2xl font-bold px-8 lg:px-14 py-4 lg:py-6 rounded-full transition-colors duration-300 shadow-2xl"
          >
            {t.heroBtn}
          </a>
        </div>

        <a
          href="#pohjapiirros"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-300 animate-bounce hover:text-amber-400 transition-colors"
        >
          <span className="text-sm lg:text-lg tracking-widest uppercase">{t.heroScroll}</span>
          <svg className="w-6 h-6 lg:w-8 lg:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </a>
      </section>

      {/* ── PERUSTIEDOT ──────────────────────────────────────────────── */}
      <section className="py-14 px-4 lg:py-28 lg:px-8 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl lg:text-5xl font-bold text-center mb-10 lg:mb-20 text-slate-800">{t.detailsTitle}</h2>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
            {[
              { label: t.detailSize,  value: "69 m²",          sub: t.detailSizeSub   },
              { label: t.detailFloor, value: "3 / 3",           sub: t.detailFloorSub  },
              { label: t.detailPrice, value: t.detailPriceVal,  sub: t.detailPriceSub  },
              { label: t.detailMaint, value: "~332 €/kk",       sub: t.detailMaintSub  },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div className="bg-white rounded-2xl lg:rounded-3xl p-6 lg:p-10 text-center shadow-lg border border-slate-100 hover:shadow-xl transition-shadow">
                  <p className="text-slate-500 text-[1.2rem] lg:text-[1.5rem] font-semibold mb-3 lg:mb-4">{item.label}</p>
                  <p className="text-[3.24rem] lg:text-[4.06rem] font-black text-emerald-700 mb-1 lg:mb-2 whitespace-nowrap leading-none">{item.value}</p>
                  <p className="text-slate-400 text-[1.2rem] lg:text-[1.5rem] font-medium mt-2">{item.sub}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── VASTIKKEET ──────────────────────────────────────────────── */}
      <section className="py-14 px-4 lg:py-24 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <h2 className="text-2xl lg:text-4xl font-bold text-center mb-2 text-slate-800">{t.chargesTitle}</h2>
            <p className="text-sm lg:text-base text-slate-400 text-center mb-8 lg:mb-12">{t.chargesFromDate}</p>
          </FadeIn>
          <FadeIn delay={100}>
            <div className="bg-slate-50 rounded-2xl lg:rounded-3xl overflow-hidden border border-slate-200 shadow-lg mb-6">
              <table className="w-full text-sm lg:text-base">
                <thead>
                  <tr className="bg-slate-800 text-white">
                    <th className="text-left px-4 lg:px-8 py-3 lg:py-4 font-semibold">Vastike</th>
                    <th className="text-right px-4 lg:px-8 py-3 lg:py-4 font-semibold">{t.chargesRateHeader}</th>
                    <th className="text-right px-4 lg:px-8 py-3 lg:py-4 font-semibold">{t.chargesMonthHeader}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-200">
                    <td className="px-4 lg:px-8 py-3 lg:py-4 text-slate-700 font-medium">{t.chargesMaintLabel}</td>
                    <td className="px-4 lg:px-8 py-3 lg:py-4 text-right text-slate-600">{t.chargesMaintRate}</td>
                    <td className="px-4 lg:px-8 py-3 lg:py-4 text-right font-bold text-slate-900">{t.chargesMaintTotal}</td>
                  </tr>
                  <tr className="border-b border-slate-200 bg-amber-50">
                    <td className="px-4 lg:px-8 py-3 lg:py-4 text-slate-700">{t.chargesRL2Label}</td>
                    <td className="px-4 lg:px-8 py-3 lg:py-4 text-right text-slate-600">{t.chargesRL2Rate}</td>
                    <td className="px-4 lg:px-8 py-3 lg:py-4 text-right font-semibold text-amber-700">{t.chargesRL2Total}</td>
                  </tr>
                  <tr className="border-b border-slate-200 bg-amber-50">
                    <td className="px-4 lg:px-8 py-3 lg:py-4 text-slate-700">{t.chargesRL3Label}</td>
                    <td className="px-4 lg:px-8 py-3 lg:py-4 text-right text-slate-600">{t.chargesRL3Rate}</td>
                    <td className="px-4 lg:px-8 py-3 lg:py-4 text-right font-semibold text-amber-700">{t.chargesRL3Total}</td>
                  </tr>
                  <tr>
                    <td className="px-4 lg:px-8 py-3 lg:py-4 text-slate-700">{t.chargesWaterLabel}</td>
                    <td className="px-4 lg:px-8 py-3 lg:py-4 text-right text-slate-400 text-xs lg:text-sm">—</td>
                    <td className="px-4 lg:px-8 py-3 lg:py-4 text-right text-slate-600">{t.chargesWaterRate}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl lg:rounded-2xl px-6 py-4 mb-3">
              <p className="text-amber-800 text-sm lg:text-base">ℹ️ {t.chargesEstimateNote}</p>
            </div>
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl lg:rounded-2xl px-6 py-4 text-center">
              <p className="text-emerald-800 text-sm lg:text-base font-medium">↓ {t.chargesNote}</p>
            </div>

            {/* ── YHTIÖKOKOUKSEN ASIAKIRJAT ── */}
            <div className="mt-6 bg-slate-800 border border-white/10 rounded-xl lg:rounded-2xl p-6 lg:p-8">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-emerald-400 text-lg">📄</span>
                <h3 className="text-white font-bold text-base lg:text-lg">{t.agmDocsTitle}</h3>
              </div>
              <p className="text-slate-400 text-sm lg:text-base mb-4">{t.agmDocsDesc}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { label: t.agmDoc1, href: "/docs/tilinpaatos2025.pdf" },
                  { label: t.agmDoc2, href: "/docs/talousarvio2026.pdf" },
                  { label: t.agmDoc3, href: "/docs/yhtiokokouskutsu2026.pdf" },
                  { label: t.agmDoc4, href: "/docs/kunnossapitotarveselvitys2026.pdf" },
                ].map((doc) => (
                  <a
                    key={doc.href}
                    href={doc.href}
                    download
                    className="flex items-center gap-3 bg-slate-700 hover:bg-slate-600 border border-white/10 rounded-lg px-4 py-3 transition-colors group"
                  >
                    <span className="text-emerald-400 text-lg shrink-0">⬇</span>
                    <span className="text-slate-200 text-sm lg:text-base font-medium group-hover:text-white transition-colors">{doc.label}</span>
                    <span className="ml-auto text-slate-500 text-xs">PDF</span>
                  </a>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── SIJOITTAJAN TIEDOT ───────────────────────────────────────── */}
      <section className="py-14 px-4 lg:py-28 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="flex items-center gap-3 mb-4 lg:mb-6 justify-center">
              <span className="text-emerald-600 text-lg lg:text-2xl">◆</span>
              <p className="text-emerald-600 text-lg lg:text-2xl font-semibold tracking-widest uppercase">{t.investorBadge}</p>
              <span className="text-emerald-600 text-lg lg:text-2xl">◆</span>
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold text-center mb-10 lg:mb-20 text-slate-800">{t.investorTitle}</h2>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8 mb-8 lg:mb-16">
            {[
              { label: t.grossLabel, value: "8,7–10,0 %", sub: t.grossSub, desc: t.grossDesc },
              { label: t.rentLabel,  value: "650–750 €",  sub: t.rentSub,  desc: t.rentDesc  },
              { label: t.netLabel,   value: "4,2–6,2 %", sub: t.netSub,   desc: t.netDesc   },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 150}>
                <div className="relative bg-white rounded-2xl lg:rounded-3xl p-6 lg:p-10 overflow-hidden shadow-lg border border-slate-100 hover:shadow-xl transition-shadow text-center">
                  <div className="absolute top-0 right-0 w-32 h-32 lg:w-40 lg:h-40 bg-emerald-50 rounded-full -translate-y-12 translate-x-12 lg:-translate-y-16 lg:translate-x-16" />
                  <p className="text-slate-500 text-[1.2rem] lg:text-[1.5rem] font-semibold mb-3 lg:mb-4">{item.label}</p>
                  <p className="text-[3.24rem] lg:text-[4.06rem] font-black mb-1 text-emerald-700 whitespace-nowrap leading-none">{item.value}</p>
                  <p className="text-[1.2rem] lg:text-[1.5rem] font-medium mb-4 lg:mb-6 text-slate-400">{item.sub}</p>
                  <p className="text-[1.05rem] lg:text-[1.2rem] text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl lg:rounded-3xl p-6 lg:p-10 text-center shadow-lg">
              <p className="text-base lg:text-2xl text-slate-600 leading-relaxed">
                {t.investorSummary}
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── TUOTTOLASKELMA ──────────────────────────────────────────── */}
      <section className="py-14 px-4 lg:py-24 lg:px-8 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <h2 className="text-2xl lg:text-4xl font-bold text-center mb-3 text-slate-800">{t.yieldTitle}</h2>
            <p className="text-xs lg:text-sm text-slate-400 text-center mb-8 lg:mb-12">{t.yieldBasis}</p>
          </FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 mb-6">
            {[
              { label: t.yieldScenALabel, details: t.yieldScenADetails, yield: "4,2 %" },
              { label: t.yieldScenBLabel, details: t.yieldScenBDetails, yield: "4,9 %" },
              { label: t.yieldScenCLabel, details: t.yieldScenCDetails, yield: "5,6 %" },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 120}>
                <div className="bg-white rounded-2xl lg:rounded-3xl p-6 lg:p-10 shadow-lg border border-slate-100 hover:shadow-xl transition-shadow text-center">
                  <p className="text-slate-500 text-[1.2rem] lg:text-[1.5rem] font-semibold mb-3 lg:mb-4">{item.label}</p>
                  <p className="text-[3.24rem] lg:text-[4.06rem] font-black mb-1 lg:mb-2 text-emerald-700 whitespace-nowrap leading-none">{item.yield}</p>
                  <p className="text-slate-400 text-[1.05rem] lg:text-[1.2rem] leading-relaxed mt-2">{item.details}</p>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={400}>
            <p className="text-center text-xs lg:text-sm text-slate-400 italic">{t.yieldDisclaimer}</p>
          </FadeIn>
        </div>
      </section>

      {/* ── MUUTTOVALMIS KOTI ───────────────────────────────────────── */}
      <section className="py-14 px-4 lg:py-28 lg:px-8 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl lg:text-5xl font-bold text-center mb-4 lg:mb-6 text-slate-800">{t.readyTitle}</h2>
            <p className="text-base lg:text-2xl text-slate-500 text-center mb-10 lg:mb-20">{t.readySub}</p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-8 items-stretch">
            {[
              { icon: "🖌️", title: t.card1Title, desc: t.card1Desc, images: maalaattuImages },
              { icon: "🪟", title: t.card2Title, desc: t.card2Desc, images: null },
              { icon: "✨", title: t.card3Title, desc: t.card3Desc, images: freesiImages },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 120}>
                <div className="bg-white hover:bg-slate-50 rounded-2xl lg:rounded-3xl p-6 lg:p-12 transition-colors duration-300 border border-slate-100 shadow-lg hover:shadow-xl flex flex-col h-full">
                  <div className="text-5xl mb-4 lg:mb-8">{item.icon}</div>
                  <h3 className="text-xl lg:text-3xl font-bold mb-3 lg:mb-5 text-slate-800">{item.title}</h3>
                  <p className="text-sm lg:text-xl text-slate-600 leading-relaxed flex-1">{item.desc}</p>
                  {item.images ? (
                    <button
                      onClick={() => openLightbox(item.images!, 0)}
                      className="mt-6 inline-flex items-center gap-2 text-sm lg:text-base font-semibold text-amber-600 hover:text-amber-500 transition-colors"
                    >
                      {t.viewPhotos}
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
            <h2 className="text-3xl lg:text-5xl font-bold text-center mb-10 lg:mb-20 text-slate-800">{t.galleryTitle}</h2>
          </FadeIn>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-4">
            <FadeIn className="col-span-2 row-span-2" delay={0}>
              <button
                onClick={() => openLightbox(galleryImages, 0)}
                className="relative aspect-square rounded-2xl lg:rounded-3xl overflow-hidden shadow-lg w-full block cursor-zoom-in"
              >
                <Image src="/olohuone3.webp" alt="Olohuone" fill className="object-cover brightness-105 contrast-105 hover:scale-105 transition-transform duration-500" />
              </button>
            </FadeIn>
            {galleryImages.slice(1).map((img, i) => (
              <FadeIn key={img.src} delay={(i + 1) * 80}>
                <button
                  onClick={() => openLightbox(galleryImages, i + 1)}
                  className="relative aspect-square rounded-xl lg:rounded-2xl overflow-hidden shadow-md w-full block cursor-zoom-in"
                >
                  <Image src={img.src} alt={img.alt} fill className="object-cover brightness-105 contrast-105 hover:scale-105 transition-transform duration-500" />
                </button>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── POHJAPIIRROS ────────────────────────────────────────────── */}
      <section id="pohjapiirros" className="py-14 px-4 lg:py-24 lg:px-8 bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <p className="text-amber-400 text-sm lg:text-base font-semibold tracking-widest uppercase mb-3 text-center">{t.floorPlanBadge}</p>
            <h2 className="text-3xl lg:text-5xl font-bold text-center mb-3 text-white">{t.floorPlanTitle}</h2>
            <p className="text-slate-400 text-sm lg:text-lg text-center mb-10 lg:mb-16">{t.floorPlanSub}</p>
          </FadeIn>
          <FadeIn delay={150}>
            <div className="rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl border border-white/10">
              <FloorPlan lang={lang} />
            </div>
            <p className="text-center text-slate-500 text-xs mt-4">{t.floorPlanNote}</p>
          </FadeIn>
        </div>
      </section>

      {/* ── HISTORIA & SIJAINTI ─────────────────────────────────────── */}
      <section className="py-14 px-4 lg:py-28 lg:px-8 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl lg:text-5xl font-bold text-center mb-3 lg:mb-6 text-slate-800">{t.historyTitle}</h2>
            <p className="text-base lg:text-2xl text-slate-500 text-center mb-10 lg:mb-20">{t.historySub}</p>
          </FadeIn>

          <FadeIn delay={0} className="mb-8 lg:mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
              {/* Ikkunanäkymä — iso vasen */}
              <button
                onClick={() => openLightbox([
                  { src: "/nakyma.webp", alt: "Näkymä ikkunasta" },
                ], 0)}
                className="relative rounded-2xl lg:rounded-3xl overflow-hidden aspect-[4/3] shadow-xl cursor-zoom-in group"
              >
                <Image src="/nakyma.webp" alt="Ikkunanäkymä Pitkänsillankadulle" fill className="object-cover brightness-105 contrast-105 group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 lg:p-6">
                  <p className="text-white text-sm lg:text-xl font-semibold">{t.historyCaption}</p>
                  <p className="text-amber-400 text-xs lg:text-sm mt-1">🔍 Klikkaa suurentaaksesi</p>
                </div>
              </button>

              {/* Oikea sarake: historia + nykypäivä päällekkäin */}
              <div className="flex flex-col gap-4 lg:gap-6">
                {/* Historiallinen katukuva */}
                <button
                  onClick={() => openLightbox([
                    { src: "/katu-historia.jpeg", alt: "Historiallinen näkymä Kokkolan keskustasta" },
                    { src: "/katu-nyt.jpeg",      alt: "Pitkänsillankatu tänään – BioRex" },
                  ], 0)}
                  className="relative rounded-2xl lg:rounded-3xl overflow-hidden aspect-[16/9] shadow-xl cursor-zoom-in group flex-1"
                >
                  <Image src="/katu-historia.jpeg" alt="Historiallinen katukuva Kokkolasta" fill className="object-cover brightness-100 contrast-105 sepia-[0.2] group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 lg:p-5">
                    <p className="text-white text-sm lg:text-lg font-semibold">Historiallinen näkymä</p>
                    <p className="text-amber-400 text-xs lg:text-sm mt-0.5">🔍 Klikkaa suurentaaksesi</p>
                  </div>
                </button>
                {/* Nykypäivän katukuva */}
                <button
                  onClick={() => openLightbox([
                    { src: "/katu-nyt.jpeg",      alt: "Pitkänsillankatu tänään – BioRex" },
                    { src: "/katu-historia.jpeg", alt: "Historiallinen näkymä Kokkolan keskustasta" },
                  ], 0)}
                  className="relative rounded-2xl lg:rounded-3xl overflow-hidden aspect-[16/9] shadow-xl cursor-zoom-in group flex-1"
                >
                  <Image src="/katu-nyt.jpeg" alt="Pitkänsillankatu nykypäivänä" fill className="object-cover brightness-105 contrast-105 group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 lg:p-5">
                    <p className="text-white text-sm lg:text-lg font-semibold">Pitkänsillankatu tänään</p>
                    <p className="text-amber-400 text-xs lg:text-sm mt-0.5">🔍 Klikkaa suurentaaksesi</p>
                  </div>
                </button>
              </div>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="bg-white rounded-2xl lg:rounded-3xl p-6 lg:p-12 border border-slate-100 shadow-lg">
              <div className="grid grid-cols-3 gap-4 lg:gap-10 text-center">
                {[
                  { icon: "📍", label: t.locLabel,   value: t.locValue   },
                  { icon: "🚶", label: t.svcLabel,   value: t.svcValue   },
                  { icon: "🏛️", label: t.builtLabel, value: t.builtValue },
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

      {/* ── TULEVAT REMONTIT ────────────────────────────────────────── */}
      <section className="py-14 px-4 lg:py-24 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <h2 className="text-2xl lg:text-4xl font-bold text-center mb-2 text-slate-800">{t.renovTitle}</h2>
            <p className="text-sm lg:text-lg text-slate-500 text-center mb-8 lg:mb-14">{t.renovSubtitle}</p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mb-8">
            {[
              { item: t.renovItem1, year: t.renovItem1Year, note: t.renovItem1Note },
              { item: t.renovItem2, year: t.renovItem2Year, note: null },
              { item: t.renovItem3, year: t.renovItem3Year, note: t.renovItem3Note },
            ].map((r, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div className="bg-slate-50 rounded-2xl p-5 lg:p-7 border border-slate-200 shadow-sm">
                  <span className="inline-block bg-slate-800 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">{r.year}</span>
                  <p className="text-sm lg:text-base font-semibold text-slate-800 mb-2 leading-snug">{r.item}</p>
                  {r.note && <p className="text-xs lg:text-sm text-slate-400 italic">{r.note}</p>}
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={350}>
            <div className="bg-amber-50 border border-amber-200 rounded-xl lg:rounded-2xl px-6 py-4 mb-8">
              <p className="text-amber-800 text-sm lg:text-base">ℹ️ {t.renovAGMNote}</p>
            </div>
          </FadeIn>

          <FadeIn delay={450}>
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl lg:rounded-2xl p-5 lg:p-7">
              <p className="text-sm lg:text-base font-semibold text-emerald-800 mb-3">✓ {t.renovPast2025Title}</p>
              <ul className="space-y-1">
                {[t.renovPast2025Item1, t.renovPast2025Item2, t.renovPast2025Item3].map((item, i) => (
                  <li key={i} className="text-xs lg:text-sm text-emerald-700 flex items-start gap-2">
                    <span className="mt-0.5 shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── OTA YHTEYTTÄ ────────────────────────────────────────────── */}
      <section id="yhteystiedot" className="py-14 px-4 lg:py-28 lg:px-8 bg-slate-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <p className="text-amber-400 text-base lg:text-2xl font-semibold tracking-widest uppercase mb-4 lg:mb-6">{t.contactBadge}</p>
            <h2 className="text-4xl lg:text-6xl font-bold mb-4 lg:mb-8">{t.contactTitle}</h2>
            <p className="text-base lg:text-2xl text-slate-300 mb-10 lg:mb-20 leading-relaxed">{t.contactSub}</p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-8 items-stretch">
            {[
              {
                icon: "👤",
                label: t.sellerLabel,
                lines: [
                  { text: "Petri Kopsa", href: null },
                  { text: "petri.kopsa@gmail.com", href: "mailto:petri.kopsa@gmail.com" },
                ],
              },
              {
                icon: "📞",
                label: t.phoneLabel,
                lines: [{ text: "+358 50 306 0635", href: "tel:+358503060635" }],
              },
              {
                icon: "✉️",
                label: t.emailLabel,
                lines: [{ text: "info@terassitalo.com", href: "mailto:info@terassitalo.com" }],
              },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 120}>
                <div className="bg-slate-700 hover:bg-slate-600 border border-white/10 rounded-2xl lg:rounded-3xl p-6 lg:p-10 transition-colors duration-300 flex flex-col gap-2">
                  <div className="text-4xl lg:text-5xl">{item.icon}</div>
                  <p className="text-slate-400 text-sm lg:text-xl">{item.label}</p>
                  <div className="flex flex-col gap-1">
                    {item.lines.map((line) =>
                      line.href ? (
                        <a key={line.text} href={line.href} className="text-[0.9rem] lg:text-[1.13rem] font-bold text-amber-400 hover:text-amber-300 transition-colors break-all">
                          {line.text}
                        </a>
                      ) : (
                        <p key={line.text} className="text-[0.9rem] lg:text-[1.13rem] font-bold text-white break-all">{line.text}</p>
                      )
                    )}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={400}>
            <div className="mt-12 lg:mt-20 flex flex-wrap justify-center gap-4 lg:gap-6">

              {/* QR-koodi */}
              <div className="flex flex-col items-center gap-3 w-40">
                <div className="bg-white rounded-2xl p-3 shadow-lg w-40 h-40 flex items-center justify-center">
                  <QRCodeSVG value="https://pitkansillankatu33.com/" size={120} bgColor="#ffffff" fgColor="#1e293b" level="M" />
                </div>
                <p className="text-amber-400 font-semibold text-xs lg:text-sm tracking-wide text-center">{t.qrCaption}</p>
              </div>

              {/* Etuovi */}
              <div className="flex flex-col items-center gap-3 w-40">
                <a
                  href="https://www.etuovi.com/kohde/w24967"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center gap-3 bg-white rounded-2xl p-4 shadow-lg w-40 h-40 hover:shadow-xl transition-shadow group"
                >
                  <svg viewBox="0 0 24 24" className="w-10 h-10 shrink-0" fill="none">
                    <path d="M3 10.5L12 3l9 7.5V21a1 1 0 01-1 1H5a1 1 0 01-1-1V10.5z" fill="#FF6600" />
                    <rect x="9" y="13" width="6" height="8" rx="0.5" fill="#fff" />
                  </svg>
                  <span className="text-slate-800 font-bold text-base text-center leading-tight">
                    {t.etuoviLine1}<br />{t.etuoviLine2}
                  </span>
                  <span className="text-[#FF6600] font-semibold text-sm group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    {t.etuoviOpen}
                  </span>
                </a>
                <p className="text-amber-400 font-semibold text-xs lg:text-sm tracking-wide text-center">Etuovi</p>
              </div>

              {/* Retta */}
              <div className="flex flex-col items-center gap-3 w-40">
                <a
                  href="/docs/isannoitsijantodistus.pdf"
                  download
                  className="flex flex-col items-center justify-center gap-3 bg-white rounded-2xl p-4 shadow-lg w-40 h-40 hover:shadow-xl transition-shadow group"
                >
                  <img src="/retta-logo-dark.svg" alt="Retta" className="w-24 h-auto" />
                  <span className="text-slate-500 font-semibold text-sm group-hover:translate-y-0.5 transition-transform inline-flex items-center gap-1 text-center">
                    {t.rettaDownload}
                  </span>
                </a>
                <p className="text-amber-400 font-semibold text-xs lg:text-sm tracking-wide text-center">{t.rettaCaption}</p>
              </div>

              {/* Kunnossapito */}
              <div className="flex flex-col items-center gap-3 w-40">
                <a
                  href="/docs/kunnossapito2025.pdf"
                  download
                  className="flex flex-col items-center justify-center gap-3 bg-white rounded-2xl p-4 shadow-lg w-40 h-40 hover:shadow-xl transition-shadow group"
                >
                  <svg viewBox="0 0 24 24" className="w-10 h-10 shrink-0" fill="none" stroke="#1e293b" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l5.653-4.655m5.833-4.322a7.5 7.5 0 00-10.23 0" />
                  </svg>
                  <span className="text-slate-800 font-bold text-base text-center leading-tight">
                    {t.maintLine1}<br />{t.maintLine2}
                  </span>
                  <span className="text-slate-500 font-semibold text-sm group-hover:translate-y-0.5 transition-transform inline-flex items-center gap-1">
                    {t.maintDownload}
                  </span>
                </a>
                <p className="text-amber-400 font-semibold text-xs lg:text-sm tracking-wide text-center">{t.maintCaption}</p>
              </div>

              {/* Vuokrausilmoitus — piilotettu tilapäisesti hintapäivityksen ajaksi
              <div className="flex flex-col items-center gap-3 w-40">
                <a
                  href="https://pitkanshop-gatafh9w.manus.space/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center gap-3 bg-amber-500 hover:bg-amber-400 rounded-2xl p-4 shadow-lg w-40 h-40 hover:shadow-xl transition-all duration-300 group"
                >
                  <svg viewBox="0 0 24 24" className="w-10 h-10 shrink-0" fill="none" stroke="#1e293b" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
                  </svg>
                  <span className="text-slate-900 font-black text-base text-center leading-tight">
                    {t.rentalLine1}<br />{t.rentalLine2}
                  </span>
                  <span className="text-slate-700 font-semibold text-sm group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    {t.rentalOpen}
                  </span>
                </a>
                <p className="text-amber-400 font-semibold text-xs lg:text-sm tracking-wide text-center">{t.rentalCaption}</p>
              </div>
              */}

            </div>
          </FadeIn>

          <FadeIn delay={500}>
            <div className="mt-8 pt-8 lg:mt-12 lg:pt-12 border-t border-white/10">
              <p className="text-slate-500 text-sm lg:text-xl">{t.footer}</p>
              <p className="text-slate-600 text-xs lg:text-sm mt-3 italic">{t.dataUpdated}</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── YHTEYDENOTTOLOMAKE ──────────────────────────────────────── */}
      <ContactSection lang={lang} />

      {/* ── SIJAINTI ────────────────────────────────────────────────── */}
      <section className="bg-slate-900 py-14 px-4 lg:py-24 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8 lg:mb-14">
            <p className="text-amber-400 text-sm lg:text-base font-semibold tracking-widest uppercase mb-3">Sijainti</p>
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-3">Kohteen sijainti</h2>
            <p className="text-slate-400 text-base lg:text-xl">Pitkänsillankatu 33, 67100 Kokkola — BioRexin vieressä</p>
          </div>
          <div className="rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl border border-white/10">
            <PropertyMap />
          </div>
          <p className="text-center text-slate-500 text-sm mt-4">
            <a
              href="https://maps.google.com/maps?q=Pitkänsillankatu+33,+67100+Kokkola"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-400 transition-colors"
            >
              Avaa Google Mapsissa →
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
