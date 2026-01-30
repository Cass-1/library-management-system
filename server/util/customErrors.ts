import { ValidationError } from "express-validator";

export class ValidationChainError extends Error {
    constructor(public errorList: ValidationError[], message?: string) {
        super(message);
        this.name = "ValidationChainError";
        Object.setPrototypeOf(this, ValidationChainError.prototype);
    }
}