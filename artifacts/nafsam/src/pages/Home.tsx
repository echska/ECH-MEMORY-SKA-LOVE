import { useState, useEffect } from "react";
import { Link } from "wouter";
import { type Translations } from "@/i18n/translations";
import TypedText from "@/components/TypedText";
import Footer from "@/components/Footer";
import usePageAudio from "@/hooks/usePageAudio";

const BASE = import.meta.env.BASE_URL;

const START = new Date("2025-08-20T04:04:00");

function elapsed(now: Date) {
  let d = Math.floor((now.getTime() - START.getTime()) / 1000);
  if (d < 0) d = 0;
  const days = Math.floor(d / 86400);
  const hrs = Math.floor((d % 86400) / 3600);
  const mins = Math.floor((d % 3600) / 60);
  const secs = d % 60;
  return { days, hrs, mins, secs };
}

interface Props {
  t: Translations;
}

export default function Home({ t }: Props) {
  usePageAudio("song4.mp3");
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [el, setEl] = useState(elapsed(new Date()));

  const quotes = [t.quote_1, t.quote_2, t.quote_3, t.quote_4];
  const typedPhrases = [t.typed_1, t.typed_2, t.typed_3, t.typed_4];

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIdx((i) => (i + 1) % quotes.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [quotes.length]);

  useEffect(() => {
    const interval = setInterval(() => setEl(elapsed(new Date())), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="page-content">
      <section className="hero">
        <div className="hero-bg" style={{ backgroundImage: `url(${BASE}images/hero.png)` }} />
        <div className="hero-overlay" />
        <div className="hero-body">
          <span className="eyebrow">{t.hero_eyebrow}</span>
          <h1 className="hero-title">{t.hero_title}</h1>
          <TypedText phrases={typedPhrases} />
          <p className="hero-text">{t.hero_text}</p>
          <div className="quote-rotator" key={quoteIdx}>
            <q>{quotes[quoteIdx]}</q>
          </div>
          <div className="elapsed-counter">
            <span>{el.days} {t.countdown_day}</span>
            <span>{el.hrs} {t.countdown_hour}</span>
            <span>{el.mins} {t.countdown_minute}</span>
            <span>{el.secs} {t.countdown_second}</span>
          </div>
          <div className="hero-buttons">
            <Link href="/moments" className="btn btn-primary">
              {t.open_story}
            </Link>
            <Link href="/writings" className="btn btn-outline">
              {t.read_pain}
            </Link>
          </div>
        </div>
      </section>

      <section className="cards-section">
        <div className="cards-grid">
          <Link href="/moments" className="card glass">
            <h3>{t.card_moments_title}</h3>
            <p>{t.card_moments_text}</p>
          </Link>
          <Link href="/photos" className="card glass">
            <h3>{t.card_photos_title}</h3>
            <p>{t.card_photos_text}</p>
          </Link>
          <Link href="/songs" className="card glass">
            <h3>{t.card_songs_title}</h3>
            <p>{t.card_songs_text}</p>
          </Link>
          <Link href="/writings" className="card glass">
            <h3>{t.card_writings_title}</h3>
            <p>{t.card_writings_text}</p>
          </Link>
        </div>
      </section>
      <Footer text={t.footer_text} />
    </div>
  );
}
