// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import registrationRoutes from "./routes/registrationRoutes.js";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();

const allowedOrigins = [
  "https://eventify-3tec.vercel.app",
  "http://localhost:5173",
  "http://localhost:3000",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Body parser
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/registrations", registrationRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({ ok: true, message: "Eventify API running" });
});

// Connect to MongoDB
connectDB();

// Export for Vercel
export default app;
