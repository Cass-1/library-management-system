import { BookRequest, SCID } from "@/models/BookRequest.js";
import { checkValidation } from "@/util/checkValidation.js";
import { genericRouteErrorHandler } from "@/util/errorHandlers.js";
import { Request, Response } from "express";
import * as requestService from "@services/requestService.js"
import { body, param, ValidationChain } from "express-validator";
import { ObjectId } from "mongodb";

async function createRequest(req: Request<{}, {}, Object>, res: Response) {
    try {
        checkValidation(req);
        const request = req.body;
        const response = await requestService.createRequest(request as any);
        res.status(201).json(response);
    }
    catch (err) {
        genericRouteErrorHandler(err, res);
    }
}

async function deleteRequest(req: Request, res: Response) {
    try {
        checkValidation(req);
        const id = req.params.request_id as string;
        const response = await requestService.deleteRequest(id);
        res.status(200).json(response);
    }
    catch (err) {
        genericRouteErrorHandler(err, res);
    }
}

async function getRequest(req: Request, res: Response) {
    try {
        checkValidation(req);
        const id = req.params.request_id as string;
        const response = await requestService.getRequest(id);
        if (response === null) {
            throw new Error(`Request with id ${id} not found`);
        }
        res.status(200).json(response);
    }
    catch (err) {
        genericRouteErrorHandler(err, res);
    }
}

function validateCreateRequest(): ValidationChain[] {
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
        body("scid").exists(),
        body("scid").customSanitizer((value) => {
            if (value !== undefined) {
                return (value as SCID).Id;
            }
            return undefined;
        }),
        body("active").isBoolean(),
    ]
}
function validateDeleteRequest(): ValidationChain[] {
    return [
        param("book_id").custom((value) => {
            return ObjectId.isValid(value);
        }),
        param("request_id").custom((value) => {
            return ObjectId.isValid(value);
        })
    ]
}
function validateGetRequest(): ValidationChain[] {
    return [
        param("book_id").custom((value) => {
            return ObjectId.isValid(value);
        }),
        param("request_id").custom((value) => {
            return ObjectId.isValid(value);
        })
    ]
}

export {
    createRequest,
    deleteRequest,
    getRequest,
    validateCreateRequest,
    validateDeleteRequest,
    validateGetRequest,
}