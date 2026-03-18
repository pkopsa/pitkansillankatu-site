"use client";

import Image from "next/image";
import { useEffect, useRef, ReactNode } from "react";

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
  { src: "/lapihuoneisto.webp", alt: "Läpihuoneisto" },
  { src: "/keittiö2.webp", alt: "Keittiö" },
  { src: "/keittiökaapisto.webp", alt: "Keittiökaapisto" },
  { src: "/makuuhuone1.webp", alt: "Makuuhuone" },
  { src: "/kaytava1.webp", alt: "Käytävä" },
  { src: "/vaatekaapisto.webp", alt: "Vaatekaapisto" },
  { src: "/suihku.webp", alt: "Suihku" },
];

export default function Home() {
  return (
    <main className="bg-white text-slate-800 font-sans">

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
                value: "9–10 %",
                sub: "vuodessa",
                desc: "Kokkolan ydinkeskustan vahvalla vuokrakysyntäalueella",
              },
              {
                label: "Arvioitu markkinavuokra",
                value: "750–850 €",
                sub: "kuukaudessa",
                desc: "Alueen käypä vuokrataso vastaavalle kohteelle",
              },
              {
                label: "Nettotuotto",
                value: "5–6 %",
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-8">
            {[
              {
                icon: "🖌️",
                title: "Juuri maalattu",
                desc: "2026 valmistunut kattava maalausurakka. Kaikki pinnat uusittu ammattitaidolla — seinät, katot ja puuosat.",
              },
              {
                icon: "🪟",
                title: "Uudet säleverhot",
                desc: "Jokaiseen ikkunaan asennettu uudet laadukkaat säleverhot. Valoisa tunnelma ja helppo valaistuksen säätö.",
              },
              {
                icon: "✨",
                title: "Freesi valkoinen ilme",
                desc: "Ajaton ja valoisa sisustus, joka sopii kaikille. Ylin kerros tuo lisää luonnonvaloa päivittäin.",
              },
            ].map((item, i) => (
              <FadeIn key={item.title} delay={i * 120}>
                <div className="bg-white hover:bg-slate-50 rounded-2xl lg:rounded-3xl p-6 lg:p-12 transition-colors duration-300 border border-slate-100 shadow-lg hover:shadow-xl">
                  <div className="text-5xl mb-4 lg:mb-8">{item.icon}</div>
                  <h3 className="text-xl lg:text-3xl font-bold mb-3 lg:mb-5 text-slate-800">{item.title}</h3>
                  <p className="text-sm lg:text-xl text-slate-600 leading-relaxed">{item.desc}</p>
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
              <div className="relative aspect-square rounded-2xl lg:rounded-3xl overflow-hidden shadow-lg">
                <Image
                  src="/olohuone1.webp"
                  alt="Olohuone"
                  fill
                  className="object-cover brightness-105 contrast-105 hover:scale-105 transition-transform duration-500"
                />
              </div>
            </FadeIn>

            {galleryImages.slice(1).map((img, i) => (
              <FadeIn key={img.src} delay={(i + 1) * 80}>
                <div className="relative aspect-square rounded-xl lg:rounded-2xl overflow-hidden shadow-md">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover brightness-105 contrast-105 hover:scale-105 transition-transform duration-500"
                  />
                </div>
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-8">
            {[
              { icon: "👤", label: "Myyjä", value: "Petri Kopsa", href: null },
              { icon: "📞", label: "Puhelin", value: "+358 50 306 0635", href: "tel:+358503060635" },
              { icon: "✉️", label: "Sähköposti", value: "info@terassitalo.com", href: "mailto:info@terassitalo.com" },
            ].map((item, i) => (
              <FadeIn key={item.label} delay={i * 120}>
                <div className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl lg:rounded-3xl p-6 lg:p-10 transition-colors duration-300">
                  <div className="text-4xl lg:text-5xl mb-4 lg:mb-6">{item.icon}</div>
                  <p className="text-slate-400 text-sm lg:text-xl mb-2 lg:mb-3">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} className="text-lg lg:text-2xl font-bold text-amber-400 hover:text-amber-300 transition-colors">
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-lg lg:text-2xl font-bold text-white">{item.value}</p>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={400}>
            <div className="mt-12 pt-8 lg:mt-20 lg:pt-12 border-t border-white/10">
              <p className="text-slate-500 text-sm lg:text-xl">
                Pitkänsillankatu 33 A 13 · 67100 Kokkola · 69 m² · 99 200 €
              </p>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
