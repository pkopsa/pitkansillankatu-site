"use client";

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

export default function Home() {
  return (
    <main className="bg-white text-stone-900 font-sans">

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Placeholder background – korvaa oikealla kuvalla asettamalla src-attribuutti */}
        <div className="absolute inset-0 bg-gradient-to-br from-stone-800 via-stone-700 to-amber-900">
          {/* <img src="/hero.jpg" alt="Pitkänsillankatu 33" className="w-full h-full object-cover opacity-60" /> */}
          <div className="absolute inset-0 bg-black/45" />
        </div>

        <div className="relative z-10 text-center px-8 max-w-5xl mx-auto">
          <p className="text-amber-400 text-2xl font-semibold tracking-widest uppercase mb-6">
            Kokkola · Ydinkeskusta
          </p>
          <h1 className="text-6xl md:text-8xl font-bold text-white leading-tight mb-8">
            Valoisa koti tai<br />
            <span className="text-amber-400">huipputuottava sijoitus</span><br />
            ydinkeskustasta
          </h1>
          <p className="text-2xl md:text-3xl text-stone-200 mb-12 font-light">
            Pitkänsillankatu 33 A 13 · 69 m² · Ylin kerros · 99 200 €
          </p>
          <a
            href="#yhteystiedot"
            className="inline-block bg-amber-500 hover:bg-amber-400 text-stone-900 text-2xl font-bold px-14 py-6 rounded-full transition-colors duration-300 shadow-2xl"
          >
            Ota yhteyttä
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-stone-300 animate-bounce">
          <span className="text-lg tracking-widest uppercase">Tutustu</span>
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ── PERUSTIEDOT ──────────────────────────────────────────────── */}
      <section className="py-28 px-8 bg-stone-50">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h2 className="text-5xl font-bold text-center mb-20 text-stone-800">Kohteen tiedot</h2>
          </FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Koko", value: "69 m²", sub: "2h + k + kh + wc" },
              { label: "Kerros", value: "3 / 3", sub: "Ei ylänaapuria" },
              { label: "Hinta", value: "99 200 €", sub: "Neuvoteltavissa" },
              { label: "Vastike", value: "324 €/kk", sub: "Yhteensä" },
            ].map((item, i) => (
              <FadeIn key={item.label} delay={i * 100}>
                <div className="bg-white rounded-3xl p-10 text-center shadow-sm border border-stone-100 hover:shadow-md transition-shadow">
                  <p className="text-stone-500 text-xl font-medium mb-3">{item.label}</p>
                  <p className="text-4xl font-bold text-stone-900 mb-2">{item.value}</p>
                  <p className="text-stone-400 text-lg">{item.sub}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── SIJOITTAJAN TIEDOT ───────────────────────────────────────── */}
      <section className="py-28 px-8 bg-stone-900 text-white">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="flex items-center gap-4 mb-6 justify-center">
              <span className="text-amber-400 text-2xl">◆</span>
              <p className="text-amber-400 text-2xl font-semibold tracking-widest uppercase">Sijoittajalle</p>
              <span className="text-amber-400 text-2xl">◆</span>
            </div>
            <h2 className="text-5xl font-bold text-center mb-20">Erinomainen tuottopotentiaali</h2>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
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
                <div className="relative bg-gradient-to-br from-amber-500 to-amber-600 rounded-3xl p-10 text-stone-900 overflow-hidden shadow-2xl">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
                  <p className="text-lg font-semibold mb-4 opacity-80">{item.label}</p>
                  <p className="text-6xl font-black mb-1">{item.value}</p>
                  <p className="text-xl font-medium mb-6 opacity-70">{item.sub}</p>
                  <p className="text-base opacity-80 leading-relaxed">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn>
            <div className="bg-white/5 border border-white/10 rounded-3xl p-10 text-center">
              <p className="text-2xl text-stone-300 leading-relaxed">
                Hankintahinta <strong className="text-white">99 200 €</strong> ja vastike vain{" "}
                <strong className="text-white">324 €/kk</strong> tekevät tästä yhden Kokkolan
                houkuttelevimmista sijoitusasunnoista.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── MUUTTOVALMIS KOTI ───────────────────────────────────────── */}
      <section className="py-28 px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h2 className="text-5xl font-bold text-center mb-6 text-stone-800">Muuttovalmis & freesi</h2>
            <p className="text-2xl text-stone-500 text-center mb-20">Ei remonttitarvetta — voit vuokrata tai muuttaa heti</p>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8">
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
                <div className="group bg-stone-50 hover:bg-amber-50 rounded-3xl p-12 transition-colors duration-300 border border-stone-100">
                  <div className="text-6xl mb-8">{item.icon}</div>
                  <h3 className="text-3xl font-bold mb-5 text-stone-800">{item.title}</h3>
                  <p className="text-xl text-stone-600 leading-relaxed">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── HISTORIA & SIJAINTI ─────────────────────────────────────── */}
      <section className="py-28 px-8 bg-stone-50">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h2 className="text-5xl font-bold text-center mb-6 text-stone-800">Historia & sijainti</h2>
            <p className="text-2xl text-stone-500 text-center mb-20">
              Arvokas sijainti Kokkolan sydämessä — historiaa ja nykypäivää
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-10 mb-16">
            {/* Kuva 1 — historiallinen katukuva */}
            <FadeIn delay={0}>
              <div className="rounded-3xl overflow-hidden bg-stone-200 aspect-[4/3] flex flex-col items-center justify-center border-2 border-dashed border-stone-300 relative">
                {/* Korvaa tämä oikealla kuvalla: <img src="/historia.jpg" className="w-full h-full object-cover" alt="Pitkänsillankatu 1950-luku" /> */}
                <svg className="w-20 h-20 text-stone-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-stone-400 text-xl font-medium">Historiallinen katukuva</p>
                <p className="text-stone-400 text-lg">Pitkänsillankatu 1950-luku</p>
              </div>
            </FadeIn>

            {/* Kuva 2 — nykyinen ikkunanäkymä */}
            <FadeIn delay={150}>
              <div className="rounded-3xl overflow-hidden bg-stone-200 aspect-[4/3] flex flex-col items-center justify-center border-2 border-dashed border-stone-300 relative">
                {/* Korvaa tämä oikealla kuvalla: <img src="/nakyma.jpg" className="w-full h-full object-cover" alt="Ikkunanäkymä" /> */}
                <svg className="w-20 h-20 text-stone-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-stone-400 text-xl font-medium">Nykyinen ikkunanäkymä</p>
                <p className="text-stone-400 text-lg">Ylin kerros, avara näkymä</p>
              </div>
            </FadeIn>
          </div>

          <FadeIn>
            <div className="bg-white rounded-3xl p-12 shadow-sm border border-stone-100">
              <div className="grid md:grid-cols-3 gap-10 text-center">
                {[
                  { icon: "📍", label: "Sijainti", value: "Kokkolan ydinkeskusta" },
                  { icon: "🚶", label: "Palvelut", value: "Kaikki kävelyetäisyydellä" },
                  { icon: "🏛️", label: "Rakennettu", value: "1950-luvun historiallinen talo" },
                ].map((item, i) => (
                  <div key={item.label} className="flex flex-col items-center">
                    <span className="text-5xl mb-4">{item.icon}</span>
                    <p className="text-stone-500 text-lg mb-2">{item.label}</p>
                    <p className="text-2xl font-bold text-stone-800">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── OTA YHTEYTTÄ ────────────────────────────────────────────── */}
      <section id="yhteystiedot" className="py-28 px-8 bg-stone-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <p className="text-amber-400 text-2xl font-semibold tracking-widest uppercase mb-6">Kiinnostuitko?</p>
            <h2 className="text-6xl font-bold mb-8">Ota yhteyttä</h2>
            <p className="text-2xl text-stone-300 mb-20 leading-relaxed">
              Varaa näyttöaika tai pyydä lisätietoja — vastataan nopeasti.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "👤",
                label: "Myyjä",
                value: "Petri Kopsa",
                href: null,
              },
              {
                icon: "📞",
                label: "Puhelin",
                value: "+358 50 306 0635",
                href: "tel:+358503060635",
              },
              {
                icon: "✉️",
                label: "Sähköposti",
                value: "info@terassitalo.com",
                href: "mailto:info@terassitalo.com",
              },
            ].map((item, i) => (
              <FadeIn key={item.label} delay={i * 120}>
                <div className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-3xl p-10 transition-colors duration-300">
                  <div className="text-5xl mb-6">{item.icon}</div>
                  <p className="text-stone-400 text-xl mb-3">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} className="text-2xl font-bold text-amber-400 hover:text-amber-300 transition-colors">
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-2xl font-bold text-white">{item.value}</p>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={400}>
            <div className="mt-20 pt-12 border-t border-white/10">
              <p className="text-stone-500 text-xl">
                Pitkänsillankatu 33 A 13 · 67100 Kokkola · 69 m² · 99 200 €
              </p>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
