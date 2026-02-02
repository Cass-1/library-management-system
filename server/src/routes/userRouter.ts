import express, { Router } from "express"
import * as UserController from "@controllers/userController.js"

const router = express.Router();
router.post("/create", UserController.validate("createUser"), UserController.createUser);
router.post("/delete", UserController.validate("deleteUser"), UserController.deleteUser);
router.get("/:id", UserController.validate("getUser"), UserController.getUser);

export default router;