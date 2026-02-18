import { BookController } from "@/controllers/bookController.js";
import express, { Router } from "express"

export class BookRouter {
    public Router: Router;
    private bookController: BookController;
    constructor(bookController: BookController) {
        this.Router = express.Router();
        this.bookController = bookController;
        this.Router.post("/", this.bookController.validateCreateBook(), this.bookController.createBook);
        this.Router.delete("/:id", this.bookController.validateDeleteBook(), this.bookController.deleteBook);
        this.Router.get("/:id", this.bookController.validateGetBook(), this.bookController.getBook);
        this.Router.patch("/:id", this.bookController.validatePatchBook(), this.bookController.patchBook);
        //TODO: add routes
        // router.post("/checkoutBook/:id");
        // router.post("/returnBook/:id");
    }
}