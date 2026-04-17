import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { type Translations } from "@/i18n/translations";
import usePageAudio from "@/hooks/usePageAudio";
import { safeGet, safeSet } from "@/lib/safeStorage";

const PASSWORDS = ["ashkim", "nafasm", "kaar", "asgoori", "lucifer", "ech&ska", "kchm", "nafas", "ech"];

const START = new Date("2025-08-20T04:04:00");

function getEndDate() {
  const d = new Date(START);
  d.setMonth(d.getMonth() + 7);
  d.setDate(d.getDate() + 26);
  return d;
}

const END = getEndDate();

interface CountdownTime {
  days: number;
  hrs: number;
  mins: number;
  secs: number;
}

function getCountdown(now: Date): CountdownTime | null {
  const diff = END.getTime() - now.getTime();
  if (diff <= 0) return null;
  const d = Math.floor(diff / 1000);
  return {
    days: Math.floor(d / 86400),
    hrs: Math.floor((d % 86400) / 3600),
    mins: Math.floor((d % 3600) / 60),
    secs: d % 60,
  };
}

const USER_CARDS = [
  { id: "Ashkim", name: "Ashkim" },
  { id: "nafasim", name: "nafasim" },
  { id: "kaar", name: "kaar" },
  { id: "asgoori", name: "asgoori" },
  { id: "lucifer", name: "Lucifer" },
  { id: "ECHSKA", name: "ECH&SKA" },
];

interface Props {
  t: Translations;
  onAuth?: () => void;
}

export default function Login({ t, onAuth }: Props) {
  usePageAudio("login_song.mp3");
  const [countdown, setCountdown] = useState<CountdownTime | null>(
    getCountdown(new Date())
  );
  const [answer, setAnswer] = useState("");
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState<"" | "error" | "success">("");
  const [, setLocation] = useLocation();

  const isOpen = countdown === null;

  useEffect(() => {
    if (safeGet("nafsam_auth") === "1") {
      setLocation("/home");
    }
  }, [setLocation]);

  useEffect(() => {
    const iv = setInterval(() => {
      setCountdown(getCountdown(new Date()));
    }, 1000);
    return () => clearInterval(iv);
  }, []);

  const riddleKeys: Record<string, keyof Translations> = {
    Ashkim: "riddle_ashkim",
    nafasim: "riddle_nafasim",
    kaar: "riddle_kaar",
    asgoori: "riddle_asgoori",
    lucifer: "riddle_lucifer",
    ECHSKA: "riddle_echska",
  };

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isOpen) {
      setMsg(t.login_msg_closed);
      setMsgType("error");
      return;
    }
    if (PASSWORDS.includes(answer.trim().toLowerCase())) {
      setMsg(t.login_msg_success);
      setMsgType("success");
      safeSet("nafsam_auth", "1");
      onAuth?.();
      setTimeout(() => setLocation("/home"), 800);
    } else {
      setMsg(t.login_msg_wrong);
      setMsgType("error");
    }
  }

  return (
    <div className="page-content login-page">
      <div className="login-container glass">
        <h1 className="login-title">{t.login_title}</h1>
        <p className="login-text">{t.login_text}</p>

        <div className="user-cards-grid">
          {USER_CARDS.map((u) => (
            <div key={u.id} className="user-card glass">
              <h4>{u.name}</h4>
              {countdown ? (
                <div className="countdown-mini">
                  <span>
                    {countdown.days}{t.countdown_day} {countdown.hrs}
                    {t.countdown_hour} {countdown.mins}{t.countdown_minute}{" "}
                    {countdown.secs}{t.countdown_second}
                  </span>
                </div>
              ) : (
                <div className="riddle-hint">
                  <span className="riddle-icon">🔓</span>
                  <p>{String(t[riddleKeys[u.id] as keyof Translations])}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <label className="sr-only" htmlFor="login-answer">{t.login_input}</label>
          <input
            id="login-answer"
            type="text"
            placeholder={t.login_input}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="login-input"
          />
          <button type="submit" className="btn btn-primary login-btn">
            {t.login_button}
          </button>
        </form>

        {msg && (
          <div className={`login-msg ${msgType}`} role="alert" aria-live="assertive">{msg}</div>
        )}

        <p className="login-hint">{t.login_hint}</p>
      </div>
    </div>
  );
}
