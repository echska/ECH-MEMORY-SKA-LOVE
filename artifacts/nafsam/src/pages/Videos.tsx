import { useRef, useState } from "react";
import { type Translations } from "@/i18n/translations";
import Footer from "@/components/Footer";
import { videosData, type VideoItem } from "@/data/videosData";

interface Props {
  t: Translations;
}

function buildSrc(file: string) {
  return `${import.meta.env.BASE_URL}media/${encodeURIComponent(file)}`;
}

export default function Videos({ t }: Props) {
  const [active, setActive] = useState<VideoItem | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const playerSectionRef = useRef<HTMLDivElement | null>(null);

  const openVideo = (item: VideoItem, index: number) => {
    setActive(item);
    setActiveIndex(index);
    requestAnimationFrame(() => {
      playerSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <div className="page-content">
      <div className="page-header">
        <h1>{t.videos_title}</h1>
        <p>{t.videos_text}</p>
      </div>

      {active && (
        <section
          ref={playerSectionRef}
          className="player-section glass"
        >
          <video
            key={active.file}
            controls
            autoPlay
            playsInline
            className="main-video"
          >
            <source src={buildSrc(active.file)} />
          </video>
          <div className="player-info">
            <h3 className="player-title">
              {t.video_memory_label} {(activeIndex ?? 0) + 1}
            </h3>
            <p className="player-date">{active.title}</p>
          </div>
        </section>
      )}

      <div className="gallery-grid">
        {videosData.map((item, index) => (
          <article
            key={item.file}
            className="video-card glass"
            onClick={() => openVideo(item, index)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openVideo(item, index);
              }
            }}
          >
            <div className="thumb-area">
              <video
                src={buildSrc(item.file)}
                muted
                preload="metadata"
                playsInline
              />
              <div className="play-hint">▶</div>
            </div>
            <div className="info">
              <div className="date">
                {t.video_memory_label} {index + 1}
              </div>
              <h3>{item.title}</h3>
            </div>
          </article>
        ))}
      </div>

      <Footer text={t.videos_footer} />
    </div>
  );
}
