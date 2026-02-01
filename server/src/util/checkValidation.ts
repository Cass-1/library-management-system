import { Request } from "express";
import { validationResult } from "express-validator";
import { ValidationChainError } from "./customErrors.js";

// used for every route handler to check validation from express-validator
export function checkValidation(req: Request) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new ValidationChainError(errors.array());
    }
}