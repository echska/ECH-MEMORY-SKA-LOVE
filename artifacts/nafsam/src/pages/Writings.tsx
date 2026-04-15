import { type Translations } from "@/i18n/translations";
import Footer from "@/components/Footer";
import usePageAudio from "@/hooks/usePageAudio";

interface Props {
  t: Translations;
}

export default function Writings({ t }: Props) {
  usePageAudio("song3.mp3");
  const entries = [t.w1, t.w2, t.w3, t.w4, t.w5, t.w6, t.w7, t.w8, t.w9, t.w10];

  return (
    <div className="page-content">
      <div className="page-header">
        <h1>{t.writings_title}</h1>
        <p>{t.writings_text}</p>
      </div>

      <div className="writings-list">
        {entries.map((w, i) => (
          <div key={i} className="writing-card glass">
            <span className="writing-num">{i + 1}</span>
            <p>{w}</p>
          </div>
        ))}
      </div>

      <Footer text={t.writings_footer} />
    </div>
  );
}
