import { useEffect, useState } from "react";
import { type Translations } from "@/i18n/translations";
import Footer from "@/components/Footer";
import { videosData } from "@/data/videosData";
import {
  getSnapshot,
  resetAnalytics,
  type AnalyticsSnapshot,
} from "@/lib/analytics";

interface Props {
  t: Translations;
}

function formatDuration(ms: number, t: Translations): string {
  if (ms <= 0) return "0 " + t.countdown_minute;
  const totalMinutes = Math.floor(ms / 60000);
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;
  const parts: string[] = [];
  if (days > 0) parts.push(`${days} ${t.countdown_day}`);
  if (hours > 0) parts.push(`${hours} ${t.countdown_hour}`);
  parts.push(`${minutes} ${t.countdown_minute}`);
  return parts.join(" ");
}

function formatDate(ts: number | null | undefined): string {
  if (!ts) return "—";
  try {
    return new Date(ts).toLocaleString();
  } catch {
    return "—";
  }
}

export default function Stats({ t }: Props) {
  const [snap, setSnap] = useState<AnalyticsSnapshot>(() => getSnapshot());

  useEffect(() => {
    const tick = () => setSnap(getSnapshot());
    const id = setInterval(tick, 5000);
    return () => clearInterval(id);
  }, []);

  const handleReset = () => {
    if (window.confirm(t.stats_reset_confirm)) {
      resetAnalytics();
      setSnap(getSnapshot());
    }
  };

  const lastOpenedAt = snap.sessions.length > 0 ? snap.sessions[0].start : null;

  const playRows = videosData.map((v, idx) => {
    const rec = snap.videoPlays[v.file];
    return {
      file: v.file,
      title: v.title,
      memoryNumber: idx + 1,
      count: rec?.count ?? 0,
      lastPlayedAt: rec?.lastPlayedAt ?? 0,
    };
  });
  const playedRows = playRows
    .filter((r) => r.count > 0)
    .sort((a, b) => b.count - a.count || b.lastPlayedAt - a.lastPlayedAt);
  const neverPlayedRows = playRows.filter((r) => r.count === 0);
  const uniqueWatched = playedRows.length;
  const mostPlayed = playedRows[0];

  const hasAnyData = snap.sessionCount > 0 || snap.totalVideoPlays > 0;

  return (
    <div className="page-content">
      <div className="page-header">
        <h1>{t.stats_title}</h1>
        <p>{t.stats_text}</p>
      </div>

      {!hasAnyData && (
        <div className="stats-empty glass">{t.stats_no_data}</div>
      )}

      <div className="stats-summary">
        <div className="stat-card glass">
          <div className="stat-label">{t.stats_total_time}</div>
          <div className="stat-value">{formatDuration(snap.totalActiveMs, t)}</div>
        </div>
        <div className="stat-card glass">
          <div className="stat-label">{t.stats_session_count}</div>
          <div className="stat-value">{snap.sessionCount}</div>
        </div>
        <div className="stat-card glass">
          <div className="stat-label">{t.stats_first_open}</div>
          <div className="stat-value stat-value-sm">{formatDate(snap.firstOpenedAt)}</div>
        </div>
        <div className="stat-card glass">
          <div className="stat-label">{t.stats_last_open}</div>
          <div className="stat-value stat-value-sm">{formatDate(lastOpenedAt)}</div>
        </div>
        <div className="stat-card glass">
          <div className="stat-label">{t.stats_total_plays}</div>
          <div className="stat-value">{snap.totalVideoPlays}</div>
        </div>
        <div className="stat-card glass">
          <div className="stat-label">{t.stats_unique_videos}</div>
          <div className="stat-value">{uniqueWatched} / {videosData.length}</div>
        </div>
        {mostPlayed && (
          <div className="stat-card glass stat-card-wide">
            <div className="stat-label">{t.stats_most_played}</div>
            <div className="stat-value stat-value-sm">
              {t.video_memory_label} {mostPlayed.memoryNumber} · {mostPlayed.count} {t.stats_play_count}
            </div>
          </div>
        )}
      </div>

      <section className="stats-section">
        <h2>{t.stats_sessions_heading}</h2>
        {snap.sessions.length === 0 ? (
          <div className="stats-empty glass">{t.stats_no_data}</div>
        ) : (
          <div className="stats-list">
            {snap.sessions.map((s) => {
              const duration = Math.max(0, (s.lastSeen || s.end) - s.start);
              return (
                <div key={s.id} className="stats-row glass">
                  <div className="stats-row-main">
                    <div>
                      <span className="stats-row-label">{t.stats_session_open}:</span>{" "}
                      {formatDate(s.start)}
                    </div>
                    <div>
                      <span className="stats-row-label">{t.stats_session_close}:</span>{" "}
                      {s.closedCleanly ? formatDate(s.end) : (
                        <span className="stats-badge">{t.stats_session_active}</span>
                      )}
                    </div>
                    <div>
                      <span className="stats-row-label">{t.stats_session_duration}:</span>{" "}
                      {formatDuration(duration, t)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <section className="stats-section">
        <h2>{t.stats_videos_heading}</h2>
        {playedRows.length === 0 ? (
          <div className="stats-empty glass">{t.stats_no_data}</div>
        ) : (
          <div className="stats-list">
            {playedRows.map((r) => (
              <div key={r.file} className="stats-row glass">
                <div className="stats-row-main">
                  <div className="stats-row-title">
                    {t.video_memory_label} {r.memoryNumber} — {r.title}
                  </div>
                  <div>
                    <span className="stats-row-label">{t.stats_play_count}:</span>{" "}
                    <strong className="stats-count">{r.count}</strong>
                  </div>
                  <div>
                    <span className="stats-row-label">{t.stats_last_played}:</span>{" "}
                    {r.lastPlayedAt ? formatDate(r.lastPlayedAt) : t.stats_never}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {neverPlayedRows.length > 0 && (
        <section className="stats-section">
          <h2>{t.stats_never_played} ({neverPlayedRows.length})</h2>
          <div className="stats-never-grid">
            {neverPlayedRows.map((r) => (
              <span key={r.file} className="stats-chip">
                {t.video_memory_label} {r.memoryNumber}
              </span>
            ))}
          </div>
        </section>
      )}

      <div className="stats-actions">
        <button type="button" className="btn btn-outline" onClick={handleReset}>
          {t.stats_reset}
        </button>
      </div>

      <Footer text={t.stats_footer} />
    </div>
  );
}
