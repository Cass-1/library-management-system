import express, { Router } from "express"
import * as BookController from "@controllers/bookController.js"


const router = express.Router();
router.post("/", BookController.validateCreateBook(), BookController.createBook);
router.delete("/:id", BookController.validateDeleteBook(), BookController.deleteBook);
router.get("/:id", BookController.validateGetBook(), BookController.getBook);
router.patch("/:id", BookController.validatePatchBook(), BookController.patchBook);

//TODO: add routes
// router.post("/checkoutBook/:id");
// router.post("/returnBook/:id");
export default router;