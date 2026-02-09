import express, { Router } from "express"
import * as BookController from "@controllers/bookController.js"


const router = express.Router();
//TODO: check this to make sure () are needed
router.post("/", BookController.validateCreateBook(), BookController.createBook);
router.delete("/:id", BookController.validateDeleteBook(), BookController.deleteBook);
router.get("/:id", BookController.validateGetBook(), BookController.getBook);
router.patch("/:id", BookController.validatePatchBook(), BookController.patchBook);

export default router;