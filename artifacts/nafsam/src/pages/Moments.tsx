import { type Translations } from "@/i18n/translations";
import Footer from "@/components/Footer";
import usePageAudio from "@/hooks/usePageAudio";

const BASE = import.meta.env.BASE_URL;

interface Props {
  t: Translations;
}

export default function Moments({ t }: Props) {
  usePageAudio("song1.mp3");
  const moments = [
    {
      time: t.moment1_time,
      title: t.moment1_title,
      text: t.moment1_text,
      memory: t.moment1_memory,
      image: `/api/private/images/photo1.jpg`,
    },
    {
      time: t.moment2_time,
      title: t.moment2_title,
      text: t.moment2_text,
      memory: t.moment2_memory,
      image: `/api/private/images/photo2.png`,
    },
    {
      time: t.moment3_time,
      title: t.moment3_title,
      text: t.moment3_text,
      memory: t.moment3_memory,
      image: `/api/private/images/photo3.png`,
    },
  ];

  return (
    <div className="page-content">
      <div className="page-header">
        <h1>{t.moments_title}</h1>
        <p>{t.moments_text}</p>
      </div>

      <div className="timeline">
        {moments.map((m, i) => (
          <div key={i} className={`timeline-item ${i % 2 === 0 ? "left" : "right"}`}>
            <div className="timeline-marker" />
            <div className="timeline-card glass">
              <span className="timeline-time">{m.time}</span>
              <img src={m.image} alt={m.title} className="timeline-img" />
              <h3>{m.title}</h3>
              <p>{m.text}</p>
              <blockquote className="timeline-memory">{m.memory}</blockquote>
            </div>
          </div>
        ))}
      </div>

      <Footer text={t.moments_footer} />
    </div>
  );
}
