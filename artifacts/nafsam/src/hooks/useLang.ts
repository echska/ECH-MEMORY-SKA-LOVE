import { useState, useEffect, useCallback } from "react";
import { type Lang, translations } from "@/i18n/translations";

export function useLang() {
  const [lang, setLangState] = useState<Lang>(() => {
    const stored = localStorage.getItem("site_lang");
    if (stored === "tr" || stored === "fa" || stored === "ar" || stored === "en") return stored;
    return "tr";
  });

  const setLang = useCallback((l: Lang) => {
    localStorage.setItem("site_lang", l);
    setLangState(l);
  }, []);

  useEffect(() => {
    const t = translations[lang];
    document.documentElement.lang = lang;
    document.documentElement.dir = t.dir;
  }, [lang]);

  const t = translations[lang];

  return { lang, setLang, t };
}
