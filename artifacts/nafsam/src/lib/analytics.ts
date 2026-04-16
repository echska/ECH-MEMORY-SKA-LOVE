const STORAGE_KEY = "nafsam_analytics_v1";
const HEARTBEAT_MS = 15_000;
const STALE_THRESHOLD_MS = 60_000;
const ALLOWED_HOST = "ech-nafas-ska-1.replit.app";

function isRecordingAllowed(): boolean {
  if (typeof window === "undefined") return false;
  return window.location.hostname === ALLOWED_HOST;
}

export interface SessionRecord {
  id: string;
  start: number;
  end: number;
  lastSeen: number;
  closedCleanly: boolean;
}

export interface VideoPlayRecord {
  count: number;
  lastPlayedAt: number;
  totalWatchedMs: number;
}

interface AnalyticsData {
  firstOpenedAt: number | null;
  sessions: SessionRecord[];
  currentSessionId: string | null;
  videoPlays: Record<string, VideoPlayRecord>;
}

function emptyData(): AnalyticsData {
  return {
    firstOpenedAt: null,
    sessions: [],
    currentSessionId: null,
    videoPlays: {},
  };
}

function load(): AnalyticsData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyData();
    const parsed = JSON.parse(raw) as Partial<AnalyticsData>;
    return {
      firstOpenedAt: parsed.firstOpenedAt ?? null,
      sessions: Array.isArray(parsed.sessions) ? parsed.sessions : [],
      currentSessionId: parsed.currentSessionId ?? null,
      videoPlays:
        parsed.videoPlays && typeof parsed.videoPlays === "object"
          ? parsed.videoPlays
          : {},
    };
  } catch {
    return emptyData();
  }
}

function save(data: AnalyticsData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    /* ignore quota errors */
  }
}

function newId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

let heartbeatTimer: ReturnType<typeof setInterval> | null = null;
let activeSessionId: string | null = null;
let listenersBound = false;

function finalizeStaleSessions(data: AnalyticsData, now: number) {
  for (const s of data.sessions) {
    if (!s.closedCleanly && s.end < s.lastSeen) {
      s.end = s.lastSeen;
    }
    if (!s.closedCleanly && now - s.lastSeen > STALE_THRESHOLD_MS) {
      s.closedCleanly = true;
    }
  }
}

function bindLifecycleListeners() {
  if (listenersBound) return;
  listenersBound = true;
  const close = () => endSession();
  window.addEventListener("pagehide", close);
  window.addEventListener("beforeunload", close);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      heartbeat();
    }
  });
}

export function startSession() {
  if (!isRecordingAllowed()) return;
  const data = load();
  const now = Date.now();

  if (data.currentSessionId) {
    const prev = data.sessions.find((s) => s.id === data.currentSessionId);
    if (prev && !prev.closedCleanly) {
      prev.end = prev.lastSeen || now;
      prev.closedCleanly = true;
    }
  }
  finalizeStaleSessions(data, now);

  const session: SessionRecord = {
    id: newId(),
    start: now,
    end: now,
    lastSeen: now,
    closedCleanly: false,
  };
  data.sessions.push(session);
  data.currentSessionId = session.id;
  if (!data.firstOpenedAt) data.firstOpenedAt = now;
  save(data);
  activeSessionId = session.id;

  bindLifecycleListeners();

  if (heartbeatTimer) clearInterval(heartbeatTimer);
  heartbeatTimer = setInterval(heartbeat, HEARTBEAT_MS);
}

export function heartbeat() {
  if (!isRecordingAllowed()) return;
  if (!activeSessionId) return;
  const data = load();
  const s = data.sessions.find((x) => x.id === activeSessionId);
  if (!s) return;
  const now = Date.now();
  s.lastSeen = now;
  s.end = now;
  save(data);
}

export function endSession() {
  if (!activeSessionId) return;
  const data = load();
  const s = data.sessions.find((x) => x.id === activeSessionId);
  if (s) {
    const now = Date.now();
    s.end = now;
    s.lastSeen = now;
    s.closedCleanly = true;
    if (data.currentSessionId === activeSessionId) {
      data.currentSessionId = null;
    }
    save(data);
  }
  if (heartbeatTimer) {
    clearInterval(heartbeatTimer);
    heartbeatTimer = null;
  }
  activeSessionId = null;
}

export function recordVideoPlay(file: string) {
  if (!isRecordingAllowed()) return;
  const data = load();
  const now = Date.now();
  const existing = data.videoPlays[file] ?? {
    count: 0,
    lastPlayedAt: 0,
    totalWatchedMs: 0,
  };
  existing.count += 1;
  existing.lastPlayedAt = now;
  data.videoPlays[file] = existing;
  save(data);
}

export function recordVideoWatch(file: string, addedMs: number) {
  if (!isRecordingAllowed()) return;
  if (addedMs <= 0) return;
  const data = load();
  const existing = data.videoPlays[file] ?? {
    count: 0,
    lastPlayedAt: Date.now(),
    totalWatchedMs: 0,
  };
  existing.totalWatchedMs += addedMs;
  data.videoPlays[file] = existing;
  save(data);
}

export interface AnalyticsSnapshot {
  firstOpenedAt: number | null;
  totalActiveMs: number;
  sessionCount: number;
  sessions: SessionRecord[];
  videoPlays: Record<string, VideoPlayRecord>;
  totalVideoPlays: number;
}

export function getSnapshot(): AnalyticsSnapshot {
  const data = load();
  const now = Date.now();
  finalizeStaleSessions(data, now);

  let totalActiveMs = 0;
  for (const s of data.sessions) {
    const end =
      s.id === data.currentSessionId && !s.closedCleanly
        ? Math.max(s.end, s.lastSeen, now)
        : Math.max(s.end, s.lastSeen);
    totalActiveMs += Math.max(0, end - s.start);
  }

  const totalVideoPlays = Object.values(data.videoPlays).reduce(
    (sum, v) => sum + v.count,
    0
  );

  return {
    firstOpenedAt: data.firstOpenedAt,
    totalActiveMs,
    sessionCount: data.sessions.length,
    sessions: [...data.sessions].sort((a, b) => b.start - a.start),
    videoPlays: data.videoPlays,
    totalVideoPlays,
  };
}

export function resetAnalytics() {
  if (heartbeatTimer) {
    clearInterval(heartbeatTimer);
    heartbeatTimer = null;
  }
  activeSessionId = null;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}
