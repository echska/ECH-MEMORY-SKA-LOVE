import { useEffect, useState, type FormEvent } from "react";
import { type Translations } from "@/i18n/translations";
import Footer from "@/components/Footer";

interface Props {
  t: Translations;
}

interface Entry {
  id: string;
  name: string;
  message: string;
  createdAt: number;
}

const MAX_NAME = 60;
const MAX_MESSAGE = 500;

function formatDate(ts: number): string {
  try {
    return new Date(ts).toLocaleString();
  } catch {
    return "";
  }
}

export default function Guestbook({ t }: Props) {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<{ kind: "ok" | "err"; text: string } | null>(null);

  const load = async () => {
    try {
      const r = await fetch("/api/guestbook");
      if (!r.ok) throw new Error("load");
      const data = (await r.json()) as { entries: Entry[] };
      setEntries(Array.isArray(data.entries) ? data.entries : []);
    } catch {
      setEntries([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const trimmed = message.trim();
    if (!trimmed) {
      setStatus({ kind: "err", text: t.guestbook_err_empty });
      return;
    }
    setSubmitting(true);
    setStatus(null);
    try {
      const r = await fetch("/api/guestbook", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: name.trim().slice(0, MAX_NAME),
          message: trimmed.slice(0, MAX_MESSAGE),
        }),
      });
      if (r.status === 429) {
        setStatus({ kind: "err", text: t.guestbook_err_rate });
      } else if (!r.ok) {
        setStatus({ kind: "err", text: t.guestbook_err_generic });
      } else {
        setMessage("");
        setStatus({ kind: "ok", text: t.guestbook_ok });
        await load();
      }
    } catch {
      setStatus({ kind: "err", text: t.guestbook_err_generic });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page-content">
      <div className="page-header">
        <h1>{t.guestbook_title}</h1>
        <p>{t.guestbook_text}</p>
      </div>

      <form className="glass" style={{ padding: 20, marginBottom: 24 }} onSubmit={handleSubmit}>
        <div style={{ marginBottom: 12 }}>
          <label style={{ display: "block", marginBottom: 6, opacity: 0.8 }}>
            {t.guestbook_name_label}
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={MAX_NAME}
            placeholder={t.guestbook_name_placeholder}
            style={{
              width: "100%",
              padding: "10px 12px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(217,185,140,0.25)",
              borderRadius: 8,
              color: "inherit",
              fontFamily: "inherit",
            }}
          />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label style={{ display: "block", marginBottom: 6, opacity: 0.8 }}>
            {t.guestbook_message_label}
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            maxLength={MAX_MESSAGE}
            rows={4}
            placeholder={t.guestbook_message_placeholder}
            style={{
              width: "100%",
              padding: "10px 12px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(217,185,140,0.25)",
              borderRadius: 8,
              color: "inherit",
              fontFamily: "inherit",
              resize: "vertical",
            }}
          />
          <div style={{ fontSize: 12, opacity: 0.6, textAlign: "end", marginTop: 4 }}>
            {message.length} / {MAX_MESSAGE}
          </div>
        </div>
        <div style={{ fontSize: 13, opacity: 0.7, marginBottom: 12 }}>
          {t.guestbook_disclaimer}
        </div>
        <button type="submit" className="btn" disabled={submitting}>
          {submitting ? t.guestbook_sending : t.guestbook_send}
        </button>
        {status && (
          <div
            style={{
              marginTop: 12,
              fontSize: 14,
              color: status.kind === "ok" ? "#a7e3b0" : "#e3a7a7",
            }}
          >
            {status.text}
          </div>
        )}
      </form>

      <section className="stats-section">
        <h2>
          {t.guestbook_list_heading} ({entries.length})
        </h2>
        {loading ? (
          <div className="stats-empty glass">…</div>
        ) : entries.length === 0 ? (
          <div className="stats-empty glass">{t.guestbook_empty}</div>
        ) : (
          <div className="stats-list">
            {entries.map((e) => (
              <div key={e.id} className="stats-row glass">
                <div className="stats-row-main">
                  <div className="stats-row-title">{e.name}</div>
                  <div style={{ whiteSpace: "pre-wrap", lineHeight: 1.6 }}>{e.message}</div>
                  <div style={{ fontSize: 12, opacity: 0.6, marginTop: 6 }}>
                    {formatDate(e.createdAt)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer text={t.stats_footer} />
    </div>
  );
}
