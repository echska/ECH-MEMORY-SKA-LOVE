import { Router, type IRouter } from "express";
import fs from "fs";
import path from "path";

const router: IRouter = Router();

interface Entry {
  id: string;
  name: string;
  message: string;
  createdAt: number;
}

const DATA_DIR = path.resolve(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "guestbook.json");

function ensureStore(): Entry[] {
  try {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, "[]", "utf-8");
      return [];
    }
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Entry[]) : [];
  } catch {
    return [];
  }
}

function writeStore(entries: Entry[]): void {
  try {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    fs.writeFileSync(DATA_FILE, JSON.stringify(entries, null, 2), "utf-8");
  } catch {
    /* ignore disk errors */
  }
}

const lastSubmitByIp = new Map<string, number>();
const MIN_INTERVAL_MS = 5_000;

router.get("/guestbook", (_req, res) => {
  const entries = ensureStore();
  const sorted = [...entries].sort((a, b) => b.createdAt - a.createdAt);
  res.json({ entries: sorted, count: sorted.length });
});

router.post("/guestbook", (req, res) => {
  const ip = (req.ip || req.socket.remoteAddress || "unknown").toString();
  const now = Date.now();
  const last = lastSubmitByIp.get(ip) ?? 0;
  if (now - last < MIN_INTERVAL_MS) {
    return res.status(429).json({ error: "rate_limited" });
  }

  const body = (req.body ?? {}) as { name?: unknown; message?: unknown };
  const rawName = typeof body.name === "string" ? body.name.trim() : "";
  const rawMessage = typeof body.message === "string" ? body.message.trim() : "";

  if (!rawMessage) {
    return res.status(400).json({ error: "message_required" });
  }
  const name = rawName.slice(0, 60);
  const message = rawMessage.slice(0, 500);

  const entry: Entry = {
    id: `${now}-${Math.random().toString(36).slice(2, 8)}`,
    name: name || "زائر",
    message,
    createdAt: now,
  };

  const entries = ensureStore();
  entries.push(entry);
  writeStore(entries);
  lastSubmitByIp.set(ip, now);

  res.status(201).json({ entry });
});

export default router;
