import express from "express";
import { registerUser } from "../controllers/usersController.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

const router = express.Router();

router.post("/",asyncHandler(registerUser));

export default router;
