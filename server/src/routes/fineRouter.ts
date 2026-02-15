import express, { Router } from "express"
import * as FineController from "@controllers/fineController.js"


const router = express.Router();
router.get("/:user_id", FineController.validateGetUserFines(), FineController.getUserFines);
router.post("/:user_id", FineController.validateCreateFine(), FineController.createFine);
router.delete("/:user_id/:id", FineController.validateDeleteFine(), FineController.deleteFine);
router.get("/:user_id/:id", FineController.validateGetFine(), FineController.getFine);

export default router;