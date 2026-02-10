import express from "express"
import * as RequestController from "@controllers/requestController.js"


const router = express.Router();

router.post("/:book_id", RequestController.validateCreateRequest(), RequestController.createRequest);
router.delete("/:book_id/:request_id", RequestController.validateDeleteRequest(), RequestController.deleteRequest);
router.get("/:book_id/:request_id", RequestController.validateGetRequest(), RequestController.getRequest);

router.get("/:book_id", RequestController.validateGetAllBookRequests(), RequestController.getAllBookRequests);
export default router;