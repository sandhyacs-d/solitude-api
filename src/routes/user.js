import express from "express";
import { loginUser, registerUser, getCurrentUser, updateCurrentUser, changePassword } from "../controllers/usersController.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { validateUser,validateLogin,validateProfileUpdate, validatePasswordChange } from "../middleware/validateUser.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import rateLimit from "express-rate-limit";

const router = express.Router();

const loginLimit = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    message: {
        success: false,
        message: "Too many login attempts. Please try again later."
    }
});

router.post("/",validateUser,asyncHandler(registerUser));
router.post("/login",loginLimit,validateLogin,asyncHandler(loginUser));
router.get("/me",authMiddleware,asyncHandler(getCurrentUser));
router.patch("/me",authMiddleware,validateProfileUpdate,asyncHandler(updateCurrentUser));
router.patch("/me/password",authMiddleware,validatePasswordChange, asyncHandler(changePassword));

export default router;
