import { type Translations } from "@/i18n/translations";
import Footer from "@/components/Footer";

interface Props {
  t: Translations;
}

export default function Videos({ t }: Props) {
  const videos = [
    { title: t.video1_title, text: t.video1_text, src: `${import.meta.env.BASE_URL}media/video1.mp4` },
    { title: t.video2_title, text: t.video2_text, src: null },
  ];

  return (
    <div className="page-content">
      <div className="page-header">
        <h1>{t.videos_title}</h1>
        <p>{t.videos_text}</p>
      </div>

      <div className="videos-list">
        {videos.map((v, i) => (
          <div key={i} className="video-card glass">
            <h3>{v.title}</h3>
            <p>{v.text}</p>
            {v.src ? (
              <video controls className="video-player">
                <source src={v.src} type="video/mp4" />
              </video>
            ) : (
              <div className="video-placeholder">
                <span>🎬</span>
              </div>
            )}
          </div>
        ))}
      </div>

      <Footer text={t.videos_footer} />
    </div>
  );
}
