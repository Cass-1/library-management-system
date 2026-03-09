import { Fine } from "@/models/Fine.js";
import { FineService } from "@/services/fineService.js";
import { checkValidation } from "@/util/checkValidation.js";
import { genericRouteErrorHandler } from "@/util/errorHandlers.js";
import { Request, Response } from 'express';
import { body, param, ValidationChain } from "express-validator";
import { ObjectId } from "mongodb";

export class FineController {
    private fineService: FineService

    constructor(fineService: FineService) {
        this.fineService = fineService;
    }

    createFine = async (req: Request<{ user_id: string }, {}, Fine>, res: Response) => {
        try {
            checkValidation(req);
            const fine: Fine = req.body;
            const userId = req.params.user_id;
            const response = await this.fineService.createFine(userId, fine);
            res.status(201).json(response);
        }
        catch (err) {
            genericRouteErrorHandler(err, res);
        }
    }

    deleteFine = async (req: Request, res: Response) => {
        try {
            checkValidation(req);
            const id = req.params.id as string;
            const userId = req.params.user_id as string;
            const response = await this.fineService.deleteFine(userId, id);
            res.status(200).json(response);
        }
        catch (err) {
            genericRouteErrorHandler(err, res);
        }
    }

    getFine = async (req: Request, res: Response) => {
        try {
            checkValidation(req);
            const id = req.params.id as string;
            const userId = req.params.user_id as string;
            const response = await this.fineService.getFine(userId, id);
            if (response === null) {
                throw new Error(`Fine with id ${id} not found`);
            }
            res.status(200).json(response);
        }
        catch (err) {
            genericRouteErrorHandler(err, res);
        }
    }

    getUserFines = async (req: Request<{ user_id: string }, {}, {}>, res: Response<{ fines: Fine[] | undefined }, {}>) => {
        try {
            checkValidation(req);
            const userId = req.params.user_id as string;
            const fines = await this.fineService.getUserFines(userId);
            if (fines === null) {
                throw new Error(`User with id ${userId} not found`);
            }
            res.status(200).json({ fines: fines });
        }
        catch (err) {
            genericRouteErrorHandler(err, res);
        }
    }

    validateCreateFine(): ValidationChain[] {
        return [
            body("_id").customSanitizer((value) => {
                return new ObjectId(value);
            }),
            body("daily_rate").isNumeric(),
            body("book_id").exists(),
            body("book_id").customSanitizer((value) => {
                return new ObjectId(value);
            })
        ]
    }

    validateDeleteFine(): ValidationChain[] {
        return [
            param("user_id").custom((value) => {
                return ObjectId.isValid(value);
            }),
            param("id").custom((value) => {
                return ObjectId.isValid(value);
            })
        ]
    }

    validateGetFine(): ValidationChain[] {
        return [
            param("user_id").custom((value) => {
                return ObjectId.isValid(value);
            }),
            param("id").custom((value) => {
                return ObjectId.isValid(value);
            }),
        ]
    }

    validateGetUserFines(): ValidationChain[] {
        return [
            param("user_id").custom((value) => {
                return ObjectId.isValid(value);
            })
        ]
    }
}