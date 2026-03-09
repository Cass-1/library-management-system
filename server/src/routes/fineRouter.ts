import { FineController } from "@/controllers/fineController.js";
import express, { Router } from "express"
export class FineRouter {
    public Router: Router;
    private fineController: FineController;
    constructor(fineController: FineController) {
        this.fineController = fineController;
        this.Router = express.Router();
        this.Router.get("/:user_id", this.fineController.validateGetUserFines(), this.fineController.getUserFines);
        this.Router.post("/:user_id", this.fineController.validateCreateFine(), this.fineController.createFine);
        this.Router.delete("/:user_id/:id", this.fineController.validateDeleteFine(), this.fineController.deleteFine);
        this.Router.get("/:user_id/:id", this.fineController.validateGetFine(), this.fineController.getFine);
    }

}