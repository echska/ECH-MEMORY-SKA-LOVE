import { useState } from "react";
import { type Translations } from "@/i18n/translations";
import Footer from "@/components/Footer";

const BASE = import.meta.env.BASE_URL;

interface Props {
  t: Translations;
}

export default function Photos({ t }: Props) {
  const [lightbox, setLightbox] = useState<string | null>(null);

  const photos = [
    { src: `${BASE}images/photo1.jpg`, text: t.photo1_text },
    { src: `${BASE}images/photo2.png`, text: t.photo2_text },
    { src: `${BASE}images/photo3.png`, text: t.photo3_text },
    { src: `${BASE}images/photo4.jpg`, text: t.photo4_text },
  ];

  return (
    <div className="page-content">
      <div className="page-header">
        <h1>{t.photos_title}</h1>
        <p>{t.photos_text}</p>
      </div>

      <div className="photo-grid">
        {photos.map((p, i) => (
          <div key={i} className="photo-card glass">
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

      {lightbox && (
        <div className="lightbox-overlay" onClick={() => setLightbox(null)}>
          <img src={lightbox} alt="" className="lightbox-img" />
        </div>
      )}

      <Footer text={t.photos_footer} />
    </div>
  );
}
