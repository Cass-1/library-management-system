import { Book } from "@/models/Book.js";
import { BookService } from "@/services/bookService.js";
import { checkValidation } from "@/util/checkValidation.js";
import { genericRouteErrorHandler } from "@/util/errorHandlers.js";
import { Request, Response } from 'express';
import { body, param, ValidationChain } from "express-validator";
import { ObjectId } from "mongodb";

export class BookController {
    private bookService: BookService;

    constructor(bookService: BookService) {
        this.bookService = bookService;
    }

    createBook = async (req: Request<{}, {}, Book>, res: Response) => {
        try {
            checkValidation(req);
            const book: Book = req.body;
            const response = await this.bookService.createBook(book);
            res.status(201).json(response);
        }
        catch (err) {
            genericRouteErrorHandler(err, res);
        }
    }

    deleteBook = async (req: Request, res: Response) => {
        try {
            checkValidation(req);
            const id = req.params.id as string;
            const response = await this.bookService.deleteBook(id);
            res.status(200).json(response);
        }
        catch (err) {
            genericRouteErrorHandler(err, res);
        }
    }

    getBook = async (req: Request, res: Response) => {
        try {
            checkValidation(req);
            const id = req.params.id as string;
            const response = await this.bookService.getBook(id);
            if (response === null) {
                throw new Error(`Book with id ${id} not found`);
            }
            res.status(200).json(response);
        }
        catch (err) {
            genericRouteErrorHandler(err, res);
        }
    }

    patchBook = async (req: Request, res: Response) => {
        try {
            checkValidation(req);
            const id = req.params.id as string;
            const response = await this.bookService.patchBook(id, req.body);
            res.status(200).json(response);
        }
        catch (err) {
            genericRouteErrorHandler(err, res);
        }
    }

    validateCreateBook(): ValidationChain[] {
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
    validateDeleteBook(): ValidationChain[] {
        return [
            param("id").custom((value) => {
                return ObjectId.isValid(value);
            })
        ]
    }
    validateGetBook(): ValidationChain[] {
        return [
            param("id").custom((value) => {
                return ObjectId.isValid(value);
            })
        ]
    }
    validatePatchBook(): ValidationChain[] {
        return [
            param("id").custom((value) => {
                return ObjectId.isValid(value);
            })
        ]
    }
}