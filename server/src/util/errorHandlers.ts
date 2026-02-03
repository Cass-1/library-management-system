import { ValidationChainError } from "./customErrors.js";
import { Response } from 'express';
import { MongoServerError } from "mongodb";

export function genericRouteErrorHandler(err: unknown, res: Response) {
    if (err instanceof ValidationChainError) {
        res.status(422).json({
            message: "Validation Chain Error",
            errors: err.errorList
        });
    }
    else if (err instanceof MongoServerError) {
        res.status(400).json({
            message: "Mongodb Server Error",
            error: err
        })
    }
    else if (err instanceof Error) {
        res.status(400).json({ error: err.message })
    }
    console.log(err);
}