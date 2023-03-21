// External modules
import { Router } from "express";

// Routes
import authRoutes from "./auth/auth.routes";
import userRoutes from "./users/user.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);

export default router;