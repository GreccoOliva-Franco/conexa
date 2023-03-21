import { CustomError, ICustomError } from "./custom.error";

const codePrefix = "E001-";

export class AuthInvalidCredentialsError extends CustomError {
    constructor() {
        const errorData = {
            message: "Invalid credentials",
            name: "AuthCredentialError",
            internalCode: codePrefix + "001"
        } as ICustomError;

        super(errorData);
    }
}