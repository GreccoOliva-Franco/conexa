export class CustomError extends Error {
    protected readonly internalCode: string;
    public readonly name: string;

    constructor({ message, internalCode, name }: ICustomError) {
        super(message);
        this.name = name;
        this.internalCode = internalCode;
    }
}

export interface ICustomError {
    message: string;
    name: string;
    internalCode: string;
}