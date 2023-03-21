// External modules
import jwt from "jsonwebtoken";

// Repositories
import { UserRepository } from "../users/user.repository";

// Interfaces
import { AuthCredentials, AuthToken, AuthTokenPayload } from "./interfaces/auth.interface";

// Errors
import { AuthInvalidCredentialsError } from "../shared/errors/auth.error";
import { UserNotFoundError } from "../shared/errors/user.error";

export class AuthService {
    private readonly userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async authenticateUser({ email, password }: AuthCredentials): Promise<AuthToken> {
        const user = await this.userRepository.findByEmailWithPassword(email);

        if (!user) throw new UserNotFoundError();

        const isValidPassword = user.password === password; // TODO: use bcrypt to compare passwords

        if (!isValidPassword) throw new AuthInvalidCredentialsError();

        const payload = { _id: user._id, email: user.email } satisfies AuthTokenPayload;
        const secret = process.env.JWT_SECRET! satisfies jwt.Secret;
        const options = { expiresIn: process.env.JWT_EXPIRE_TIME } satisfies jwt.SignOptions;
        const token = jwt.sign(payload, secret, options);

        return token;
    }
}