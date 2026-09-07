import jwt from "jsonwebtoken";
import { AppError } from "./appError.js";

export function authMiddleware(req,res,next){
    const authHeader = req.headers.authorization;
    
    if(!authHeader){
        throw new AppError("no authHeader available",401);
    }

    const authToken = authHeader.split(" ")[1];

    
     try {
        const decoded = jwt.verify(
            authToken,
            process.env.JWT_SECRET
        );

        req.user = decoded.userId;

        next();

    } catch (error) {
        throw new AppError("Invalid or expired token", 401);
    }

}