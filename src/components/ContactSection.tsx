"use client";

import { useState } from "react";
import { Lang, translations } from "@/translations";

type FormState = {
  nimi: string;
  email: string;
  puhelin: string;
  aihe: string;
  viesti: string;
};

const empty: FormState = { nimi: "", email: "", puhelin: "", aihe: "", viesti: "" };

export default function ContactSection({ lang = "fi" }: { lang?: Lang }) {
  const t = translations[lang];
  const [form, setForm] = useState<FormState>(empty);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? t.formError);
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : t.formError);
    } finally {
      setLoading(false);
    }
  }

  const subjectOptions = [
    { value: "", label: t.formSubjectDefault },
    { value: "buy", label: t.formSubjectBuy },
    { value: "rent-long", label: t.formSubjectRentLong },
    { value: "rent-short", label: t.formSubjectRentShort },
    { value: "viewing", label: t.formSubjectViewing },
  ];

  return (
    <section id="lomake" className="py-14 px-4 lg:py-28 lg:px-8 bg-white">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10 lg:mb-16">
          <span className="inline-block bg-amber-100 text-amber-700 text-xs lg:text-sm font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-4">
            {t.formBadge}
          </span>
          <h2 className="text-3xl lg:text-5xl font-bold text-slate-800 mb-3 lg:mb-5">
            {t.formTitle}
          </h2>
          <p className="text-base lg:text-xl text-slate-500">
            {t.formSub}
          </p>
        </div>

        {submitted ? (
          <div className="text-center bg-emerald-50 border border-emerald-200 rounded-2xl lg:rounded-3xl px-8 py-14 lg:py-20 shadow-sm">
            <div className="text-5xl lg:text-6xl mb-6">✅</div>
            <h3 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-3">
              {t.formSuccess}
            </h3>
            <p className="text-slate-500 text-base lg:text-xl mb-8">
              {t.formSuccessSub}
            </p>
            <button
              onClick={() => { setForm(empty); setSubmitted(false); }}
              className="text-sm lg:text-base font-semibold text-amber-600 hover:text-amber-500 underline underline-offset-4 transition-colors"
            >
              {t.formSuccessBtn}
            </button>
          </div>
        ) : (
          <>
          <form
            onSubmit={handleSubmit}
            className="bg-slate-50 border border-slate-200 rounded-2xl lg:rounded-3xl p-6 lg:p-12 shadow-lg space-y-5 lg:space-y-7"
          >
            <label className="flex flex-col gap-2">
              <span className="text-sm lg:text-base font-semibold text-slate-700">
                {t.formSubjectLabel}
              </span>
              <select
                name="aihe"
                value={form.aihe}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 lg:py-4 text-slate-800 text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
              >
                {subjectOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-7">
              <label className="flex flex-col gap-2">
                <span className="text-sm lg:text-base font-semibold text-slate-700">
                  {t.formNimi} <span className="text-amber-500">*</span>
                </span>
                <input
                  type="text"
                  name="nimi"
                  value={form.nimi}
                  onChange={handleChange}
                  required
                  placeholder={t.formNimiPlaceholder}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 lg:py-4 text-slate-800 placeholder-slate-400 text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-sm lg:text-base font-semibold text-slate-700">
                  {t.formEmail} <span className="text-amber-500">*</span>
                </span>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder={t.formEmailPlaceholder}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 lg:py-4 text-slate-800 placeholder-slate-400 text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
                />
              </label>
            </div>

            <label className="flex flex-col gap-2">
              <span className="text-sm lg:text-base font-semibold text-slate-700">
                {t.formPuhelin}{" "}
                <span className="text-slate-400 font-normal">{t.formPuhelinOptional}</span>
              </span>
              <input
                type="tel"
                name="puhelin"
                value={form.puhelin}
                onChange={handleChange}
                placeholder="+358 50 000 0000"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 lg:py-4 text-slate-800 placeholder-slate-400 text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-sm lg:text-base font-semibold text-slate-700">
                {t.formViesti} <span className="text-amber-500">*</span>
              </span>
              <textarea
                name="viesti"
                value={form.viesti}
                onChange={handleChange}
                required
                rows={5}
                placeholder={t.formViestiPlaceholder}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 lg:py-4 text-slate-800 placeholder-slate-400 text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition resize-none"
              />
            </label>

            {error && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-500 hover:bg-amber-400 disabled:bg-amber-300 text-slate-900 font-bold text-base lg:text-xl py-4 lg:py-5 rounded-xl transition-colors duration-300 shadow-md flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  {t.formSending}
                </>
              ) : (
                t.formBtn
              )}
            </button>
          </form>

          <div className="mt-6 lg:mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center" aria-hidden>
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-4 text-sm text-slate-500">{t.formOr}</span>
              </div>
            </div>
            <div className="mt-6 bg-slate-50 border border-slate-200 rounded-2xl p-6 lg:p-8 text-center">
              <div className="text-3xl mb-3">📅</div>
              <h3 className="text-base lg:text-lg font-bold text-slate-800 mb-4">
                {t.formBookViewing}
              </h3>
              <a
                href="tel:+358401480636"
                className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm lg:text-base px-6 py-3 rounded-xl transition-colors duration-200 shadow-sm"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.28 11.8 19.79 19.79 0 011.22 3.22 2 2 0 013.22 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
                +358 40 148 0636
              </a>
            </div>
          </div>
          </>
        )}
      </div>
    </section>
  );
}
