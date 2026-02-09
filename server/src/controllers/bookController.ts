import { Book } from "@/models/Book.js";
import { checkValidation } from "@/util/checkValidation.js";
import { genericRouteErrorHandler } from "@/util/errorHandlers.js";
import { Request, Response } from 'express';
import { body, param, ValidationChain } from "express-validator";
import { ObjectId } from "mongodb";
import * as bookService from "@services/bookService.js"

async function createBook(req: Request<{}, {}, Book>, res: Response) {
    try {
        checkValidation(req);
        const book: Book = req.body;
        const response = await bookService.createBook(book);
        res.status(201).json(response);
    }
    catch (err) {
        genericRouteErrorHandler(err, res);
    }
}

async function deleteBook(req: Request, res: Response) {
    try {
        checkValidation(req);
        const id = req.params.id as string;
        const response = await bookService.deleteBook(id);
        res.status(200).json(response);
    }
    catch (err) {
        genericRouteErrorHandler(err, res);
    }
}

async function getBook(req: Request, res: Response) {
    try {
        checkValidation(req);
        const id = req.params.id as string;
        const response = await bookService.getBook(id);
        if (response === null) {
            throw new Error(`Book with id ${id} not found`);
        }
        res.status(200).json(response);
    }
    catch (err) {
        genericRouteErrorHandler(err, res);
    }
}

async function patchBook(req: Request, res: Response) {
    try {
        checkValidation(req);
        const id = req.params.id as string;
        const response = await bookService.patchBook(id, req.body);
        res.status(200).json(response);
    }
    catch (err) {
        genericRouteErrorHandler(err, res);
    }
}

function validateCreateBook(): ValidationChain[] {
    return [
        body("_id").exists(),
        body("_id").customSanitizer((value) => {
            return new ObjectId(value);
        }),
        body("isbn").exists(),
        body("title").exists(),
        body("author").exists(),
        body("genre").exists(),
        body("format").exists(),
        body("publisher").exists(),
        body("sc_id").exists(),
        body("available").exists(),
    ]
}
function validateDeleteBook(): ValidationChain[] {
    return [
        param("id").custom((value) => {
            return ObjectId.isValid(value);
        })
    ]
}
function validateGetBook(): ValidationChain[] {
    return [
        param("id").custom((value) => {
            return ObjectId.isValid(value);
        })
    ]
}
function validatePatchBook(): ValidationChain[] {
    return [
        param("id").custom((value) => {
            return ObjectId.isValid(value);
        })
    ]
}

export {
    createBook,
    deleteBook,
    getBook,
    patchBook,
    validateCreateBook,
    validateDeleteBook,
    validateGetBook,
    validatePatchBook
}