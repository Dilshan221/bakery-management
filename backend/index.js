// backend/index.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

import userRoute from "./routes/userRoute.js";
import attendanceRoute from "./routes/attendanceRoute.js";
import usermanagementRoute from "./routes/usermanagementRoute.js";

dotenv.config();

const app = express();

/* ----------------------------- Core middleware ----------------------------- */
app.use(morgan("dev"));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

// CORS: allow one or more origins (comma-separated in .env)
const rawOrigins =
  process.env.CLIENT_ORIGIN ||
  "http://localhost:3000,http://127.0.0.1:3000,http://localhost:5173,http://127.0.0.1:5173";
const allowList = rawOrigins.split(",").map((s) => s.trim());

const corsOptionsDelegate = (origin, cb) => {
  // allow non-browser tools (no Origin) and any origin in allowList
  if (!origin || allowList.includes(origin)) return cb(null, true);
  return cb(new Error(`CORS blocked for origin: ${origin}`));
};

app.use(
  cors({
    origin: corsOptionsDelegate,
    credentials: true,
  })
);

// Preflight
app.options("*", cors());

/* --------------------------------- Health ---------------------------------- */
// expose both to be convenient with different clients
app.get("/api/health", (_req, res) => res.json({ ok: true }));
app.get("/health", (_req, res) => res.json({ ok: true }));

/* --------------------------------- Routes ---------------------------------- */
app.use("/api/user", userRoute);
app.use("/api/attendance", attendanceRoute);
app.use("/api/usermanagement", usermanagementRoute);

// Quick test route
app.get("/api/test", (_req, res) => {
  res.json({ message: "Backend connected successfully!" });
});

/* ------------------------------- 404 + Errors ------------------------------- */
app.use((req, res, _next) => {
  res.status(404).json({ message: `Route not found: ${req.originalUrl}` });
});

// Centralized error handler
app.use((err, _req, res, _next) => {
  const code = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  res.status(code).json({
    message: err.message || "Server error",
  });
});

/* ----------------------------- DB + server up ------------------------------- */
const PORT = process.env.PORT || 8000; // defaults to 8000 per your env
const MONGO_URI = process.env.MONGO_URI;

let server;

const start = async () => {
  try {
    if (!MONGO_URI) throw new Error("Missing MONGO_URI in .env");
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    server = app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Startup error:", err);
    process.exit(1);
  }
};

start();

/* ------------------------------- Graceful stop ------------------------------ */
const shutdown = async (signal) => {
  try {
    console.log(`\n${signal} received: closing server...`);
    if (server) {
      await new Promise((resolve) => server.close(resolve));
      console.log("HTTP server closed.");
    }
    await mongoose.connection.close();
    console.log("Mongo connection closed.");
    process.exit(0);
  } catch (e) {
    console.error("Error during shutdown:", e);
    process.exit(1);
  }
};

["SIGINT", "SIGTERM"].forEach((sig) => process.on(sig, () => shutdown(sig)));
