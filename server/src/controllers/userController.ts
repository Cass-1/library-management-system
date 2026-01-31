import { User } from "@models/User.js";
import { userCollection } from "../util/db.js";
import { Request, Response } from 'express';
import { body, ValidationChain, validationResult } from "express-validator";
import { ValidationChainError } from "../util/customErrors.js"

export async function createUser(req: Request<{}, {}, User>, res: Response) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new ValidationChainError(errors.array());
        }
        const user: User = req.body;
        const response = await userCollection.insertOne(user);
        res.status(201).json(response);
    }
    catch (err) {
        if (err instanceof ValidationChainError) {
            res.status(422).json({ errors: err.errorList });
        }
        else if (err instanceof Error) {
            res.status(400).json({ error: err.message })
        }
        console.log(err);
    }
}

// middleware
// https://www.freecodecamp.org/news/how-to-make-input-validation-simple-and-clean-in-your-express-js-app-ea9b5ff5a8a7/
export function validate(method: string): ValidationChain[] {
    switch (method) {
        case "createUser":
            return [
                body("role").exists(),
                body("name").exists(),
                body("age").exists(),
                body("enrollment_date").exists(),
                body("fines").exists(),
                body("books").exists(),
                body("email").exists()
            ]
        default:
            return []
    }
}
