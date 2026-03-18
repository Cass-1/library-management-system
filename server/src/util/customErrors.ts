import { ValidationError } from "express-validator";

export class ValidationChainError extends Error {
    constructor(public errorList: ValidationError[], message?: string) {
        super(message);
        this.name = "ValidationChainError";
        Object.setPrototypeOf(this, ValidationChainError.prototype);
    }
}

export class DatabaseConnectionError extends Error {
    constructor(message?: string) {
        super(message);
        this.name = "DatabaseConnectionError";
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }
}