import { CustomError, ICustomError } from "./custom.error";

const codePrefix = "E000-";

export class UserAlreadyExistsError extends CustomError {
    constructor() {
        const errorData = {
            message: "User already exists",
            name: "UserAlreadyExistsError",
            internalCode: codePrefix + "001"
        } satisfies ICustomError;

        super(errorData);
    }
}

export class UserNotFoundError extends CustomError {
    constructor() {
        const errorData = {
            message: "User not found",
            name: "UserNotFoundError",
            internalCode: "E000-002"
        } satisfies ICustomError;

        super(errorData);
    }
}