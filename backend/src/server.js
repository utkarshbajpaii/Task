import "dotenv/config";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";

import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/task.routes.js";
import { generalLimiter } from "./middleware/rateLimit.middleware.js";
import { notFound, errorHandler } from "./middleware/error.middleware.js";

const app = express();

// Security & common middleware
app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(morgan(process.env.NODE_ENV === "development" ? "dev" : "combined"));
app.use(generalLimiter);

// Routes
app.get("/", (req, res) => res.json({ status: "ok", service: "task-manager-api" }));
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Error handlers
app.use(notFound);
app.use(errorHandler);

// Start
const PORT = process.env.PORT || 5000;
connectDB(process.env.MONGODB_URI).then(() => {
  app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
});
