import jwt from "jsonwebtoken";
import { AppError } from "./appError.js";

export function authMiddleware(req,res,next){
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

        req.user = decoded.userId;

        next();

    } catch (error) {
        throw new AppError("Invalid or expired token", 401);
    }

}