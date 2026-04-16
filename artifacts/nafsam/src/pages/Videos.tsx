import { useState } from "react";
import { type Translations } from "@/i18n/translations";
import Footer from "@/components/Footer";
import { videosData, type VideoItem } from "@/data/videosData";
import { recordVideoPlay } from "@/lib/analytics";

interface Props {
  t: Translations;
}

function buildSrc(file: string) {
  return `${import.meta.env.BASE_URL}media/${encodeURIComponent(file)}`;
}

export default function Videos({ t }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const playVideo = (index: number) => {
    setActiveIndex(index);
    const item = videosData[index];
    if (item) recordVideoPlay(item.file);
  };

  return (
    <div className="page-content">
      <div className="page-header">
        <h1>{t.videos_title}</h1>
        <p>{t.videos_text}</p>
      </div>

      <div className="gallery-grid">
        {videosData.map((item: VideoItem, index) => {
          const isActive = activeIndex === index;
          return (
            <article
              key={item.file}
              className="video-card glass"
              onClick={() => !isActive && playVideo(index)}
              role={isActive ? undefined : "button"}
              tabIndex={isActive ? -1 : 0}
              onKeyDown={(e) => {
                if (!isActive && (e.key === "Enter" || e.key === " ")) {
                  e.preventDefault();
                  playVideo(index);
                }
              }}
            >
              <div className="thumb-area">
                {isActive ? (
                  <video
                    key={item.file}
                    src={buildSrc(item.file)}
                    controls
                    autoPlay
                    playsInline
                  />
                ) : (
                  <>
                    <video
                      src={buildSrc(item.file)}
                      muted
                      preload="metadata"
                      playsInline
                    />
                    <div className="play-hint">▶</div>
                  </>
                )}
              </div>
              <div className="info">
                <div className="date">
                  {t.video_memory_label} {index + 1}
                </div>
                <h3>{item.title}</h3>
              </div>
            </article>
          );
        })}
      </div>

      <Footer text={t.videos_footer} />
    </div>
  );
}
