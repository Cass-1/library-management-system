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

function validateCreateUser(): ValidationChain[] {
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
}
function validateDeleteUser(): ValidationChain[] {
    return [
        param("id").custom((value) => {
            return ObjectId.isValid(value);
        })
    ]
}
function validateGetUser(): ValidationChain[] {
    return [
        param("id").custom((value) => {
            return ObjectId.isValid(value);
        })
    ]
}
function validatePatchUser(): ValidationChain[] {
    return [
        // FIXME: this probably needs to be better bc ids are of type ObjectId not string
        param("id").custom((value) => {
            return ObjectId.isValid(value);
        })
    ]
}

export {
    createUser,
    deleteUser,
    getUser,
    patchUser,
    validateCreateUser,
    validateDeleteUser,
    validateGetUser,
    validatePatchUser
}