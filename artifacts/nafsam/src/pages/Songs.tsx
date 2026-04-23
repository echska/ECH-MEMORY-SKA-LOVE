import { type Translations } from "@/i18n/translations";
import Footer from "@/components/Footer";

interface Props {
  t: Translations;
}

export default function Songs({ t }: Props) {
  const songs = [
    { title: "Be Koja Residi - Dorcci", text: t.song1_text, src: "/api/private/media/song1.mp3" },
    { title: "Ghatle Amd - Dorcci", text: t.song2_text, src: "/api/private/media/song2.mp3" },
    { title: t.song3_title, text: t.song3_text, src: "/api/private/media/song3.mp3" },
    { title: t.song4_title, text: t.song4_text, src: "/api/private/media/song4.mp3" },
  ];

  return (
    <div className="page-content">
      <div className="page-header">
        <h1>{t.songs_title}</h1>
        <p>{t.songs_text}</p>
      </div>

      <div className="songs-list">
        {songs.map((s, i) => (
          <div key={i} className="song-card glass">
            <h3>{s.title}</h3>
            <p>{s.text}</p>
            <audio controls src={s.src} className="audio-player">
              Your browser does not support audio.
            </audio>
          </div>
        ))}
      </div>

      <Footer text={t.songs_footer} />
    </div>
  );
}
