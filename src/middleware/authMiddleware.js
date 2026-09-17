import jwt from "jsonwebtoken";
import { AppError } from "./appError.js";
import User from "../models/users.js";

export async function authMiddleware(req,res,next){
    const authHeader = req.headers.authorization;
    
     if (!authHeader) {
        throw new AppError("authHeader not available", 401);
    }

    const [scheme, token] = authHeader.split(" ");

    if(scheme !== "Bearer" || !token){
        throw new AppError("Invalid authorization header",401);
    }
    
     try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        const user = await User.findById(decoded.userId).select("changePasswordAt");

        if(!user){
            throw new AppError("User not found",401);
        }

        if(
            user.changePasswordAt &&
            decoded.iat < Math.floor(user.changePasswordAt.getTime() /1000)
        ){
            throw new AppError("Token invalid after password change",401);
        }

        req.user = decoded.userId;

        next();

    } catch (error) {
        if (error instanceof AppError) {
            throw error;
    }
        throw new AppError("Invalid or expired token", 401);
    }

}