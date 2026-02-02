import { User } from "@models/User.js";
import { mongoDB, userCollection } from "../util/db.js";
import { Request, Response } from 'express';
import { body, param, ValidationChain, validationResult } from "express-validator";
import { genericRouteErrorHandler } from "@/util/errorHandlers.js";
import { checkValidation } from "@/util/checkValidation.js";
import { ObjectId } from "mongodb";

export async function createUser(req: Request<{}, {}, User>, res: Response) {
    try {
        checkValidation(req);
        const user: User = req.body;
        const response = await userCollection.insertOne(user);
        res.status(201).json(response);
    }
    catch (err) {
        genericRouteErrorHandler(err, res);
    }
}

export async function deleteUser(req: Request, res: Response) {
    try {
        checkValidation(req);
        const id = req.body.id;
        const response = await userCollection.deleteOne({ _id: id });
        res.status(200).json(response);
    }
    catch (err) {
        genericRouteErrorHandler(err, res);
    }
}

export async function getUser(req: Request, res: Response) {
    try {
        checkValidation(req);
        // FIXME: make this casting better
        const id = req.params.id as unknown as undefined;
        const response = await userCollection.findOne({ _id: id });
        if (response === null) {
            throw new Error(`User with id ${id} not found`);
        }
        res.status(200).json(response);
    }
    catch (err) {
        genericRouteErrorHandler(err, res);
    }
}

// middleware used by user router
// https://www.freecodecamp.org/news/how-to-make-input-validation-simple-and-clean-in-your-express-js-app-ea9b5ff5a8a7/
// TODO: improve the validation here
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
        case "deleteUser":
            return [
                body("id").exists()
            ]
        case "getUser":
            return [
                param("id").exists()
            ]
        default:
            return []
    }
}
