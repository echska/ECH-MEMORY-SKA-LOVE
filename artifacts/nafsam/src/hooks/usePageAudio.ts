import { useEffect, useRef } from "react";

const BASE = import.meta.env.BASE_URL;

export default function usePageAudio(songFile: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const src =
      songFile === "login_song.mp3"
        ? `${BASE}media/${songFile}`
        : `/api/private/media/${encodeURIComponent(songFile)}`;
    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = 0.3;
    audioRef.current = audio;

    const play = () => {
      audio.play().catch(() => {});
    };

    play();

    return () => {
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
  }, [songFile]);
}
