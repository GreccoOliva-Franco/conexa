// External modules
import { Router } from 'express';

// Controllers
import { AuthController } from './auth.controller';

const router = Router();

// ! DISCLAIMER: router callbacks instanciate a new controller instance each time because I did not use any dependency injection library

router.post("/sign-up", async (req, res) => await new AuthController().signUp(req, res)); // TODO: add request validation middleware

router.post("/sign-in", async (req, res) => await new AuthController().signIn(req, res)); // TODO: add request validation middleware

export default router;