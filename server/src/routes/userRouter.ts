import { UserController } from "@/controllers/userController.js";
import express, { Router } from "express"
export class UserRouter {
    public Router: Router;
    private userController: UserController;
    constructor(userController: UserController) {
        this.Router = express.Router();
        this.userController = userController;
        this.Router.post("/", this.userController.validateCreateUser(), this.userController.createUser);
        this.Router.delete("/:id", this.userController.validateDeleteUser(), this.userController.deleteUser);
        this.Router.get("/:id", this.userController.validateGetUser(), this.userController.getUser);
        this.Router.patch("/:id", this.userController.validatePatchUser(), this.userController.patchUser);
    }
}

