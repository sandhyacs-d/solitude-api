import express from "express";
import { loginUser, registerUser, getCurrentUser, updateCurrentUser, changePassword } from "../controllers/usersController.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { validateUser,validateLogin, validateNewPassword, validateProfileUpdate } from "../middleware/validateUser.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/",validateUser,asyncHandler(registerUser));
router.post("/login",validateLogin,asyncHandler(loginUser));
router.get("/me",authMiddleware,asyncHandler(getCurrentUser));
router.patch("/me",authMiddleware,validateProfileUpdate,asyncHandler(updateCurrentUser));
router.patch("/me/password",authMiddleware,validateNewPassword, asyncHandler(changePassword));

export default router;
