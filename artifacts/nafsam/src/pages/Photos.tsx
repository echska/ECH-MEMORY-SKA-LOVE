import { useEffect, useState } from "react";
import { type Translations, type Lang } from "@/i18n/translations";
import Footer from "@/components/Footer";
import { allPhotos } from "@/data/allPhotos";
import usePageAudio from "@/hooks/usePageAudio";
import { privateImage } from "@/lib/privateAssets";

interface Props {
  t: Translations;
  lang: Lang;
}

interface StoryCaption {
  title: string;
  text: string;
}

interface PrivateContent {
  captions?: { ar?: StoryCaption[]; tr?: StoryCaption[] };
}

export default function Photos({ t, lang }: Props) {
  usePageAudio("song2.mp3");
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [captions, setCaptions] = useState<StoryCaption[]>([]);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/private/content", { credentials: "same-origin" })
      .then((r) => (r.ok ? (r.json() as Promise<PrivateContent>) : null))
      .then((data) => {
        if (cancelled || !data) return;
        const langKey: "ar" | "tr" = lang === "ar" ? "ar" : "tr";
        setCaptions(data.captions?.[langKey] ?? []);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [lang]);

  const specialPhotos = [
    { src: privateImage("photo1.jpg"), text: t.photo1_text },
    { src: privateImage("photo2.png"), text: t.photo2_text },
    { src: privateImage("photo3.png"), text: t.photo3_text },
    { src: privateImage("photo4.jpg"), text: t.photo4_text },
    { src: privateImage("photo5.jpg"), text: t.photo5_text },
    { src: privateImage("photo6.jpg"), text: t.photo6_text },
  ];

  const albumPhotos = allPhotos.map((name, i) => {
    const story = i < captions.length ? captions[i] : null;
    return {
      src: privateImage(`all_photos/${name}`),
      title: story?.title ?? null,
      text: story?.text ?? t.photos_fallback_caption,
    };
  });

  return (
    <div className="page-content">
      <div className="page-header">
        <h1>{t.photos_title}</h1>
        <p className="photos-header-sub">{t.photos_header_sub}</p>
      </div>

      <div className="photo-grid">
        {specialPhotos.map((p, i) => (
          <div key={`s-${i}`} className="photo-card glass">
            <img
              src={p.src}
              alt=""
              className="photo-img"
              onClick={() => setLightbox(p.src)}
              style={{ cursor: "pointer" }}
            />
            <p className="photo-caption">{p.text}</p>
          </div>
        ))}

        <div className="photo-card glass photo-card-featured">
          <img
            src={privateImage("photo7.jpg")}
            alt=""
            className="photo-img"
            onClick={() => setLightbox(privateImage("photo7.jpg"))}
            style={{ cursor: "pointer" }}
          />
          <div className="photo-caption-featured">
            <p className="featured-quote">{t.photo7_text}</p>
            <p className="featured-sub">{t.photo7_sub}</p>
          </div>
        </div>
      </div>

      <div className="album-divider">
        <span className="album-divider-line" />
        <span className="album-divider-text">{t.photos_title}</span>
        <span className="album-divider-line" />
      </div>

      <div className="photo-grid album-grid">
        {albumPhotos.map((p, i) => (
          <div key={`a-${i}`} className="photo-card glass">
            <img
              src={p.src}
              alt=""
              className="photo-img"
              onClick={() => setLightbox(p.src)}
              style={{ cursor: "pointer" }}
            />
            <div className="album-caption-block">
              {p.title && <span className="album-caption-title">{p.title}</span>}
              <p className="album-caption-text">{p.text}</p>
            </div>
          </div>
        ))}
      </div>

      {lightbox && (
        <div className="lightbox-overlay" onClick={() => setLightbox(null)}>
          <button
            className="lightbox-close"
            onClick={(e) => { e.stopPropagation(); setLightbox(null); }}
            aria-label="Close"
          >
            &times;
          </button>
          <img src={lightbox} alt="" className="lightbox-img" onClick={(e) => e.stopPropagation()} />
        </div>
      )}

      <Footer text={t.photos_footer} />
    </div>
  );
}
