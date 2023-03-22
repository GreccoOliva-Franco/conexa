// External modules
import { Router } from "express";

// Middlewares
import { authenticateWithBearerToken } from "../shared/middlewares/bearer.middleware";

// Controllers
import { UserController } from "./user.controller";

const router = Router();

router.use(authenticateWithBearerToken());

// router callbacks instanciate a new controller instance each time because I did not use any dependency injection library

router.get("/", async (req, res) => await new UserController().find(req, res));

export default router;