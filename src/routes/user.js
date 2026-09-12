import express from "express";
import { loginUser, registerUser, getCurrentUser, updateCurrentUser } from "../controllers/usersController.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { validateUser } from "../middleware/validateUser.js";
import { validateLogin } from "../middleware/validateUser.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/",validateUser,asyncHandler(registerUser));
router.post("/login",validateLogin,asyncHandler(loginUser));
router.get("/me",authMiddleware,asyncHandler(getCurrentUser));
router.patch("/me",authMiddleware,asyncHandler(updateCurrentUser));

export default router;
