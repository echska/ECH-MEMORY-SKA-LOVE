import { useState } from "react";
import { type Translations, type Lang } from "@/i18n/translations";
import Footer from "@/components/Footer";
import { allPhotos } from "@/data/allPhotos";
import { getStoryCaptions } from "@/data/storyCaptions";
import usePageAudio from "@/hooks/usePageAudio";

const BASE = import.meta.env.BASE_URL;

interface Props {
  t: Translations;
  lang: Lang;
}

export default function Photos({ t, lang }: Props) {
  usePageAudio("song2.mp3");
  const [lightbox, setLightbox] = useState<string | null>(null);

  const specialPhotos = [
    { src: `${BASE}images/photo1.jpg`, text: t.photo1_text },
    { src: `${BASE}images/photo2.png`, text: t.photo2_text },
    { src: `${BASE}images/photo3.png`, text: t.photo3_text },
    { src: `${BASE}images/photo4.jpg`, text: t.photo4_text },
    { src: `${BASE}images/photo5.jpg`, text: t.photo5_text },
    { src: `${BASE}images/photo6.jpg`, text: t.photo6_text },
  ];

  const captions = getStoryCaptions(lang);
  const albumPhotos = allPhotos.map((name, i) => {
    const story = i < captions.length ? captions[i] : null;
    return {
      src: `${BASE}images/all_photos/${name}`,
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
            src={`${BASE}images/photo7.jpg`}
            alt=""
            className="photo-img"
            onClick={() => setLightbox(`${BASE}images/photo7.jpg`)}
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
