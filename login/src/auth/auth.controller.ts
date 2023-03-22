// External modules
import { Request, Response } from "express";

// Services
import { UserService } from "../users/user.service";
import { AuthService } from "./auth.service";

// Errors
import { UserAlreadyExistsError } from "../shared/errors/user.error";

// Interfaces
import { UserCreateData } from "../users/interfaces/user-create";

export class AuthController {
    private readonly userService: UserService;
    private readonly authService: AuthService;

    constructor() {
        this.userService = new UserService();
        this.authService = new AuthService();
    }

    async signUp(req: Request, res: Response): Promise<Response> {
        try {
            const userData = req.body as UserCreateData;

            const user = await this.userService.create(userData);

            return res.status(201).json({ status: true, data: user });
        } catch (error) {
            if (error instanceof UserAlreadyExistsError) return res.status(400).json({
                status: false,
                error: { message: error.message }
            });

            return res.status(500);
        }
    }

    async signIn(req: Request, res: Response): Promise<Response> {
        try {
            const { email, password } = req.body;

            const token = await this.authService.authenticateUser({ email, password });

            return res.status(200).json({
                status: true,
                token: { value: token, type: "Bearer" }
            });
        } catch (error: unknown) {
            if (error instanceof UserAlreadyExistsError) return res.status(400).json({
                status: false,
                error: { message: error.message }
            });

            return res.status(500);
        }
    }
}
