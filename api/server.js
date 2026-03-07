import { createRequestHandler } from "@react-router/express";
import express from "express";
import * as build from "../build/server/index.js";

const app = express();

// Servir les fichiers statiques
app.use(express.static("build/client", { maxAge: "1y" }));

// Handler React Router
app.use(createRequestHandler({ build }));

export default app;