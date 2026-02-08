import { User } from "@models/User.js";
import { Request, Response } from 'express';
import { body, param, ValidationChain } from "express-validator";
import { genericRouteErrorHandler } from "@/util/errorHandlers.js";
import { checkValidation } from "@/util/checkValidation.js";
import * as userService from "@/services/userService.js"
import { ObjectId } from "mongodb";

async function createUser(req: Request<{}, {}, User>, res: Response) {
    try {
        checkValidation(req);
        const user: User = req.body;
        const response = await userService.createUser(user);
        res.status(201).json(response);
    }
    catch (err) {
        genericRouteErrorHandler(err, res);
    }
}

async function deleteUser(req: Request, res: Response) {
    try {
        checkValidation(req);
        const id = req.params.id as string;
        const response = await userService.deleteUser(id);
        res.status(200).json(response);
    }
    catch (err) {
        genericRouteErrorHandler(err, res);
    }
}

async function getUser(req: Request, res: Response) {
    try {
        checkValidation(req);
        const id = req.params.id as string;
        const response = await userService.getUser(id);
        if (response === null) {
            throw new Error(`User with id ${id} not found`);
        }
        res.status(200).json(response);
    }
    catch (err) {
        genericRouteErrorHandler(err, res);
    }
}

async function patchUser(req: Request, res: Response) {
    try {
        checkValidation(req);
        const id = req.params.id as string;
        const response = await userService.patchUser(id, req.body);
        res.status(200).json(response);
    }
    catch (err) {
        genericRouteErrorHandler(err, res);
    }
}

// middleware used by user router
// https://www.freecodecamp.org/news/how-to-make-input-validation-simple-and-clean-in-your-express-js-app-ea9b5ff5a8a7/
function validate(method: string): ValidationChain[] {
    switch (method) {
        case "createUser":
            // TODO: improve the validation here
            return [
                body("_id").customSanitizer((value) => {
                    return new ObjectId(value);
                }),
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
                param("id").custom((value) => {
                    return ObjectId.isValid(value);
                })
            ]
        case "getUser":
            return [
                param("id").custom((value) => {
                    return ObjectId.isValid(value);
                })
            ]
        case "patchUser":
            return [
                // FIXME: this probably needs to be better bc ids are of type ObjectId not string
                param("id").custom((value) => {
                    return ObjectId.isValid(value);
                })
            ]
        default:
            return []
    }
}

export {
    createUser,
    deleteUser,
    getUser,
    patchUser,
    validate
}