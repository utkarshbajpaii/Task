import { Router } from "express";
import { login, register } from "../controllers/auth.controller.js";
import { authLimiter } from "../middleware/rateLimit.middleware.js";

const router = Router();

router.post("/register", authLimiter, register);
router.post("/login", authLimiter, login);

export default router;
