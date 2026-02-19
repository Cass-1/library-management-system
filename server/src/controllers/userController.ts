import { User } from "@models/User.js";
import { Request, Response } from 'express';
import { body, param, ValidationChain } from "express-validator";
import { genericRouteErrorHandler } from "@/util/errorHandlers.js";
import { checkValidation } from "@/util/checkValidation.js";
import { ObjectId } from "mongodb";
import { UserService } from "@/services/userService.js";

export class UserController {
    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    createUser = async (req: Request<{}, {}, User>, res: Response) => {
        try {
            checkValidation(req);
            const user: User = req.body;
            const response = await this.userService.createUser(user);
            res.status(201).json(response);
        }
        catch (err) {
            genericRouteErrorHandler(err, res);
        }
    }

    deleteUser = async (req: Request, res: Response) => {
        try {
            checkValidation(req);
            const id = req.params.id as string;
            const response = await this.userService.deleteUser(id);
            res.status(200).json(response);
        }
        catch (err) {
            genericRouteErrorHandler(err, res);
        }
    }

    getUser = async (req: Request, res: Response) => {
        try {
            checkValidation(req);
            const id = req.params.id as string;
            const response = await this.userService.getUser(id);
            if (response === null) {
                throw new Error(`User with id ${id} not found`);
            }
            res.status(200).json(response);
        }
        catch (err) {
            genericRouteErrorHandler(err, res);
        }
    }

    patchUser = async (req: Request, res: Response) => {
        try {
            checkValidation(req);
            const id = req.params.id as string;
            const response = await this.userService.patchUser(id, req.body);
            res.status(200).json(response);
        }
        catch (err) {
            genericRouteErrorHandler(err, res);
        }
    }

    validateCreateUser(): ValidationChain[] {
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
    validateDeleteUser(): ValidationChain[] {
        return [
            param("id").custom((value) => {
                return ObjectId.isValid(value);
            })
        ]
    }
    validateGetUser(): ValidationChain[] {
        return [
            param("id").custom((value) => {
                return ObjectId.isValid(value);
            })
        ]
    }
    validatePatchUser(): ValidationChain[] {
        return [
            // FIXME: this probably needs to be better bc ids are of type ObjectId not string
            param("id").custom((value) => {
                return ObjectId.isValid(value);
            })
        ]
    }
}