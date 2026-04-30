import express, { type Request, type Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import pinoHttpImport from "pino-http";
import path from "path";
import { fileURLToPath } from "url";
import router from "./routes/index.js";
import { logger } from "./lib/logger.js";

const pinoHttp = pinoHttpImport.default ?? pinoHttpImport;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req: Request & { id?: string }) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res: Response) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);

app.use(cors({ credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

if (process.env.NODE_ENV === "production" && !process.env.VERCEL) {
  const staticDir = path.resolve(__dirname, "../../nafsam/dist/public");

  app.use(express.static(staticDir));

  app.get("*path", (_req: Request, res: Response) => {
    res.sendFile(path.join(staticDir, "index.html"));
  });
}

export default app;