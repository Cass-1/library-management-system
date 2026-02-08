import express, { Router } from "express"
import * as UserController from "@controllers/userController.js"

const router = express.Router();
//TODO: check this to make sure () are needed
router.post("/", UserController.validateCreateUser(), UserController.createUser);
router.delete("/:id", UserController.validateDeleteUser(), UserController.deleteUser);
router.get("/:id", UserController.validateGetUser(), UserController.getUser);
router.patch("/:id", UserController.validatePatchUser(), UserController.patchUser);

export default router;
