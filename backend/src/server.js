import "dotenv/config";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/task.routes.js";
import { generalLimiter } from "./middleware/rateLimit.middleware.js";
import { notFound, errorHandler } from "./middleware/error.middleware.js";

const app = express();

// Security & common middleware
// FIX: Configure Helmet to allow connections to the API
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      "connect-src": ["'self'", "https://task-7-iftq.onrender.com"],
    },
  },
}));
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(morgan(process.env.NODE_ENV === "development" ? "dev" : "combined"));
app.use(generalLimiter);

// Routes
app.get("/api/status", (req, res) => res.json({ status: "ok", service: "task-manager-api" }));
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Serve frontend
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "../../frontend/build")));

// For all other routes, serve index.html (React)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/build", "index.html"));
});

// Error handlers
app.use(notFound);
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
connectDB(process.env.MONGODB_URI).then(() => {
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});