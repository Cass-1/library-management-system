import { Fine } from "@/models/Fine.js";
import { checkValidation } from "@/util/checkValidation.js";
import { genericRouteErrorHandler } from "@/util/errorHandlers.js";
import { Request, Response } from 'express';
import { body, param, ValidationChain } from "express-validator";
import { ObjectId } from "mongodb";
import * as fineService from "@services/fineService.js"

export async function createFine(req: Request<{ user_id: string }, {}, Fine>, res: Response) {
    try {
        checkValidation(req);
        const fine: Fine = req.body;
        const userId = req.params.user_id;
        const response = await fineService.createFine(userId, fine);
        res.status(201).json(response);
    }
    catch (err) {
        genericRouteErrorHandler(err, res);
    }
}

export async function deleteFine(req: Request, res: Response) {
    try {
        checkValidation(req);
        const id = req.params.id as string;
        const userId = req.params.user_id as string;
        const response = await fineService.deleteFine(userId, id);
        res.status(200).json(response);
    }
    catch (err) {
        genericRouteErrorHandler(err, res);
    }
}

export async function getFine(req: Request, res: Response) {
    try {
        checkValidation(req);
        const id = req.params.id as string;
        const userId = req.params.user_id as string;
        const response = await fineService.getFine(userId, id);
        if (response === null) {
            throw new Error(`Fine with id ${id} not found`);
        }
        res.status(200).json(response);
    }
    catch (err) {
        genericRouteErrorHandler(err, res);
    }
}

export async function getUserFines(req: Request<{ user_id: string }, {}, {}>, res: Response<{ fines: Fine[] | undefined }, {}>) {
    try {
        checkValidation(req);
        const userId = req.params.user_id as string;
        const fines = await fineService.getUserFines(userId);
        if (fines === null) {
            throw new Error(`User with id ${userId} not found`);
        }
        res.status(200).json({ fines: fines });
    }
    catch (err) {
        genericRouteErrorHandler(err, res);
    }
}

export function validateCreateFine(): ValidationChain[] {
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
export function validateDeleteFine(): ValidationChain[] {
    return [
        param("user_id").custom((value) => {
            return ObjectId.isValid(value);
        }),
        param("id").custom((value) => {
            return ObjectId.isValid(value);
        })
    ]
}
export function validateGetFine(): ValidationChain[] {
    return [
        param("user_id").custom((value) => {
            return ObjectId.isValid(value);
        }),
        param("id").custom((value) => {
            return ObjectId.isValid(value);
        }),
    ]
}
export function validateGetUserFines(): ValidationChain[] {
    return [
        param("user_id").custom((value) => {
            return ObjectId.isValid(value);
        })
    ]
}