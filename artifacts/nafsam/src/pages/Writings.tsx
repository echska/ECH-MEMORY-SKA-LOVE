import { useEffect, useState } from "react";
import { type Translations, type Lang } from "@/i18n/translations";
import Footer from "@/components/Footer";
import usePageAudio from "@/hooks/usePageAudio";

interface Props {
  t: Translations;
  lang: Lang;
}

interface WritingsBundle {
  w1?: string; w2?: string; w3?: string; w4?: string; w5?: string;
  w6?: string; w7?: string; w8?: string; w9?: string; w10?: string;
  farewell_title?: string;
  farewell_text?: string;
}

interface PrivateContent {
  writings?: Record<string, WritingsBundle>;
}

export default function Writings({ t, lang }: Props) {
  usePageAudio("song3.mp3");
  const [data, setData] = useState<WritingsBundle | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/private/content", { credentials: "same-origin" })
      .then((r) => (r.ok ? (r.json() as Promise<PrivateContent>) : null))
      .then((c) => {
        if (cancelled || !c) return;
        setData(c.writings?.[lang] ?? c.writings?.tr ?? null);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [lang]);

  const entries = data
    ? [data.w1, data.w2, data.w3, data.w4, data.w5, data.w6, data.w7, data.w8, data.w9, data.w10].filter(
        (s): s is string => !!s,
      )
    : [];

  return (
    <div className="page-content">
      <div className="page-header">
        <h1>{t.writings_title}</h1>
        <p>{t.writings_text}</p>
      </div>

      <div className="writings-list">
        {entries.map((w, i) => (
          <div key={i} className="writing-card glass">
            <span className="writing-num">{i + 1}</span>
            <p>{w}</p>
          </div>
        ))}
      </div>

      {data?.farewell_text && (
        <div className="farewell-section">
          <div className="farewell-card glass">
            <h2 className="farewell-title">{data.farewell_title ?? ""}</h2>
            <div className="farewell-divider" />
            {data.farewell_text.split("\n\n").map((paragraph, i) => (
              <p key={i} className="farewell-paragraph">{paragraph}</p>
            ))}
          </div>
        </div>
      )}

      <Footer text={t.writings_footer} />
    </div>
  );
}
