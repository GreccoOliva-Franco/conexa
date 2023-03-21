// External modules
import { Router } from "express";

// Routes
import userRoutes from "./users/user.routes";

const router = Router();

router.use("/users", userRoutes);

export default router;