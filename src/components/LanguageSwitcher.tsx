"use client";

import { useEffect } from "react";
import { Lang, translations } from "@/translations";

const LANGS: Lang[] = ["fi", "sv", "en"];
const AUTO_ROTATE_MS = 25000; // vaihto 25 sekunnin välein

type Props = {
  lang: Lang;
  setLang: (l: Lang) => void;
};

export default function LanguageSwitcher({ lang, setLang }: Props) {
  // Auto-rotaatio
  useEffect(() => {
    const id = setInterval(() => {
      setLang(LANGS[(LANGS.indexOf(lang) + 1) % LANGS.length]);
    }, AUTO_ROTATE_MS);
    return () => clearInterval(id);
  }, [lang, setLang]);

  return (
    <div className="fixed top-4 right-4 z-50 flex gap-1 bg-black/60 backdrop-blur-sm rounded-full px-2 py-1.5 shadow-xl">
      {LANGS.map((l) => {
        const t = translations[l];
        const active = l === lang;
        return (
          <button
            key={l}
            onClick={() => setLang(l)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold transition-all duration-300 ${
              active
                ? "bg-amber-500 text-slate-900 shadow-md"
                : "text-white/70 hover:text-white hover:bg-white/10"
            }`}
          >
            <span>{t.langFlag}</span>
            <span className="hidden sm:inline">{t.langLabel}</span>
          </button>
        );
      })}
    </div>
  );
}
