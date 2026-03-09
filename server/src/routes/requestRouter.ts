import { RequestController } from "@/controllers/requestController.js";
import express, { Router } from "express"

const router = express.Router();

export class RequestRouter {
    public Router: Router;
    private requestController: RequestController;
    constructor(requestController: RequestController) {
        this.requestController = requestController;
        this.Router = express.Router();
        this.Router.post("/:book_id", this.requestController.validateCreateRequest(), this.requestController.createRequest);
        this.Router.delete("/:book_id/:request_id", this.requestController.validateDeleteRequest(), this.requestController.deleteRequest);
        this.Router.get("/:book_id/:request_id", this.requestController.validateGetRequest(), this.requestController.getRequest);

        this.Router.get("/:book_id", this.requestController.validateGetAllBookRequests(), this.requestController.getAllBookRequests);
        this.Router.delete("/:book_id", this.requestController.validateDeleteAllBookRequests(), this.requestController.deleteAllBookRequests);
    }
}