import { useState } from "react";
import { type Translations } from "@/i18n/translations";
import Footer from "@/components/Footer";
import { allPhotos } from "@/data/allPhotos";

const BASE = import.meta.env.BASE_URL;

interface Props {
  t: Translations;
}

export default function Photos({ t }: Props) {
  const [lightbox, setLightbox] = useState<string | null>(null);

  const specialPhotos = [
    { src: `${BASE}images/photo1.jpg`, text: t.photo1_text },
    { src: `${BASE}images/photo2.png`, text: t.photo2_text },
    { src: `${BASE}images/photo3.png`, text: t.photo3_text },
    { src: `${BASE}images/photo4.jpg`, text: t.photo4_text },
  ];

  const albumPhotos = allPhotos.map((name) => ({
    src: `${BASE}images/all_photos/${name}`,
  }));

  return (
    <div className="page-content">
      <div className="page-header">
        <h1>{t.photos_title}</h1>
        <p>{t.photos_text}</p>
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
          </div>
        ))}
      </div>

      {lightbox && (
        <div className="lightbox-overlay" onClick={() => setLightbox(null)}>
          <img src={lightbox} alt="" className="lightbox-img" />
        </div>
      )}

      <Footer text={t.photos_footer} />
    </div>
  );
}
