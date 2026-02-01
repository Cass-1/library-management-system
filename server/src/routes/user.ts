import express from "express"
import * as UserController from "../controllers/userController.js"
const router = express.Router();

router.get("/delete", (req, res) => {

});

router.post("/create", UserController.validate("createUser"), UserController.createUser);
router.post("/delete", UserController.validate("deleteUser"), UserController.deleteUser);

export default router;