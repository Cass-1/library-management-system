import { RequestService } from "@/services/requestService.js";
import { checkValidation } from "@/util/checkValidation.js";
import { genericRouteErrorHandler } from "@/util/errorHandlers.js";
import { Request, Response } from "express";
import { body, param, ValidationChain } from "express-validator";
import { ObjectId } from "mongodb";

export class RequestController {
    private repository: RequestService;

    constructor(requestService: RequestService) {
        this.repository = requestService;
    }

    createRequest = async (req: Request<{}, {}, Object>, res: Response) => {
        try {
            checkValidation(req);
            const request = req.body;
            const response = await this.repository.createRequest(request as any);
            res.status(201).json(response);
        }
        catch (err) {
            genericRouteErrorHandler(err, res);
        }
    }

    deleteRequest = async (req: Request, res: Response) => {
        try {
            checkValidation(req);
            const id = req.params.request_id as string;
            const response = await this.repository.deleteRequest(id);
            res.status(200).json(response);
        }
        catch (err) {
            genericRouteErrorHandler(err, res);
        }
    }

    getRequest = async (req: Request, res: Response) => {
        try {
            checkValidation(req);
            const id = req.params.request_id as string;
            const response = await this.repository.getRequest(id);
            if (response === null) {
                throw new Error(`Request with id ${id} not found`);
            }
            res.status(200).json(response);
        }
        catch (err) {
            genericRouteErrorHandler(err, res);
        }
    }

    getAllBookRequests = async (req: Request, res: Response) => {
        try {
            checkValidation(req);
            const id = req.params.book_id as string;
            const response = await this.repository.getAllBookRequests(id);
            if (response === null) {
                throw new Error(`Request with id ${id} not found`);
            }
            res.status(200).json(response);
        }
        catch (err) {
            genericRouteErrorHandler(err, res);
        }
    }

    deleteAllBookRequests = async (req: Request, res: Response) => {
        try {
            checkValidation(req);
            const id = req.params.book_id as string;
            const response = await this.repository.deleteAllBookRequests(id);
            if (response === null) {
                throw new Error(`Request with id ${id} not found`);
            }
            res.status(200).json(response);
        }
        catch (err) {
            genericRouteErrorHandler(err, res);
        }
    }

    validateCreateRequest(): ValidationChain[] {
        return [
            param("book_id").custom((value) => {
                return ObjectId.isValid(value);
            }),
            body("_id").customSanitizer((value) => {
                return new ObjectId(value);
            }),
            body("userId").exists(),
            //TODO: figure out how to get the date check to work
            body("requestDate").exists(),
            body("reservationEndDate").exists(),
            body("scid").isString(),
            body("active").isBoolean(),
        ]
    }
    validateDeleteRequest(): ValidationChain[] {
        return [
            param("book_id").custom((value) => {
                return ObjectId.isValid(value);
            }),
            param("request_id").custom((value) => {
                return ObjectId.isValid(value);
            })
        ]
    }

    validateGetRequest(): ValidationChain[] {
        return [
            param("book_id").custom((value) => {
                return ObjectId.isValid(value);
            }),
            param("request_id").custom((value) => {
                return ObjectId.isValid(value);
            })
        ]
    }

    validateDeleteAllBookRequests(): ValidationChain[] {
        return [
            param("book_id").custom((value) => {
                return ObjectId.isValid(value);
            })
        ]
    }
    validateGetAllBookRequests(): ValidationChain[] {
        return [
            param("book_id").custom((value) => {
                return ObjectId.isValid(value);
            })
        ]
    }
}

