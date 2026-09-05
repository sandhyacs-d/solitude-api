import express from "express";
import { loginUser, registerUser } from "../controllers/usersController.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { validateUser } from "../middleware/validateUser.js";
import { validateLogin } from "../middleware/validateUser.js";

const router = express.Router();

router.post("/",validateUser,asyncHandler(registerUser));
router.post("/login",validateLogin,asyncHandler(loginUser));

export default router;
