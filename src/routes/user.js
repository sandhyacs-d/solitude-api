import express from "express";
import { registerUser } from "../controllers/usersController.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { validateUser } from "../middleware/validateUser.js";

const router = express.Router();

router.post("/",validateUser,asyncHandler(registerUser));

export default router;
