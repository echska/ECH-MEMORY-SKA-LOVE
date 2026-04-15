import { type Translations } from "@/i18n/translations";
import Footer from "@/components/Footer";

const BASE = import.meta.env.BASE_URL;

interface Props {
  t: Translations;
}

export default function Photos({ t }: Props) {
  const photos = [
    { src: `${BASE}images/photo1.png`, text: t.photo1_text },
    { src: `${BASE}images/photo2.png`, text: t.photo2_text },
    { src: `${BASE}images/photo3.png`, text: t.photo3_text },
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
            <img src={p.src} alt="" className="photo-img" />
            <p className="photo-caption">{p.text}</p>
          </div>
        ))}
      </div>

      <Footer text={t.photos_footer} />
    </div>
  );
}
