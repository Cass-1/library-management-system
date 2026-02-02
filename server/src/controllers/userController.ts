import { User } from "@models/User.js";
import { Request, Response } from 'express';
import { body, param, ValidationChain } from "express-validator";
import { genericRouteErrorHandler } from "@/util/errorHandlers.js";
import { checkValidation } from "@/util/checkValidation.js";
import { DataAccessLayer } from "@/database/DataAccessLayer.js";

export class UserController {
    #dataAccessLayer: DataAccessLayer;

    public constructor(dal: DataAccessLayer) {
        this.#dataAccessLayer = dal;
        console.log("controller constructed")
    }

    CreateUser = async (req: Request<{}, {}, User>, res: Response) => {
        try {
            checkValidation(req);
            const user: User = req.body;
            const response = await this.#dataAccessLayer.CreateUser(user);
            res.status(201).json(response);
        }
        catch (err) {
            genericRouteErrorHandler(err, res);
        }
    }

    DeleteUser = async (req: Request, res: Response) => {
        try {
            checkValidation(req);
            const id = req.body.id;
            const response = await this.#dataAccessLayer.DeleteUser(id);
            res.status(200).json(response);
        }
        catch (err) {
            genericRouteErrorHandler(err, res);
        }
    }

    GetUser = async (req: Request, res: Response) => {
        try {
            checkValidation(req);
            // FIXME: make this casting better
            const id = req.params.id as unknown as undefined;
            const response = await this.#dataAccessLayer.GetUser(id);
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
    Validate = (method: string): ValidationChain[] => {
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
}