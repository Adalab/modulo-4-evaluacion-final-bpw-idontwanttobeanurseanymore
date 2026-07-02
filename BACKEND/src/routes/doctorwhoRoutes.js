import express from "express";
import * as controller from "../controllers/doctorwhoController.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";

const router = express.Router();

router.get("/search", asyncHandler(controller.search));
router.get("/", asyncHandler(controller.getAll));
router.get("/:type/:id", asyncHandler(controller.getByTypeAndId));

router.post("/:type", asyncHandler(controller.create));
router.put("/:type/:id", asyncHandler(controller.update));
router.delete("/:type/:id", asyncHandler(controller.remove));

export default router;
