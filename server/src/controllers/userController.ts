import { User } from "@models/User.js";
import { Request, Response } from 'express';
import { body, param, ValidationChain } from "express-validator";
import { genericRouteErrorHandler } from "@/util/errorHandlers.js";
import { checkValidation } from "@/util/checkValidation.js";
import * as userService from "@/services/userService.js"

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
        const id: any = req.params.id;
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
        const id: any = req.params.id;
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
        const id: any = req.params.id;
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
                // FIXME: this probably needs to be better bc ids are of type ObjectId not string
                param("id").isInt()
            ]
        case "getUser":
            return [
                // FIXME: this probably needs to be better bc ids are of type ObjectId not string
                param("id").isInt()
            ]
        case "patchUser":
            return [
                // FIXME: this probably needs to be better bc ids are of type ObjectId not string
                param("id").isInt()
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