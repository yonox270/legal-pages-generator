import { createRequestHandler } from "@react-router/express";
import express from "express";
import * as build from "../build/server/index.js";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(
  "/assets",
  express.static(join(__dirname, "../build/client/assets"), {
    immutable: true,
    maxAge: "1y",
  })
);

app.use(express.static(join(__dirname, "../build/client"), { maxAge: "1h" }));

app.use(createRequestHandler({ build, mode: process.env.NODE_ENV }));

export default app;
```

Et dans le `.env` et sur Vercel, change le `DATABASE_URL` pour ajouter `&pgbouncer=true&connection_limit=1` à la fin :
```
DATABASE_URL=postgresql://neondb_owner:npg_szLQDi28pnhI@ep-floral-breeze-abtr6x2h-pooler.eu-west-2.aws.neon.tech/neondb?sslmode=require&pgbouncer=true&connection_limit=1