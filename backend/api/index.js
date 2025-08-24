// api/index.js
import vercelExpress from "vercel-express";
import app from "../server.js";
import connectDB from "../config/db.js";

// Connect DB once per cold start
await connectDB();

export default vercelExpress(app);
