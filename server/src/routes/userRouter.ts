import express, { Router } from "express"
import { UserController } from "@/controllers/userController.js";

export function userRouter(controller: UserController): Router {
    const router = express.Router();
    router.post("/create", controller.Validate("createUser"), controller.CreateUser);
    router.post("/delete", controller.Validate("deleteUser"), controller.DeleteUser);
    router.get("/:id", controller.Validate("getUser"), controller.GetUser);
    return router;
}