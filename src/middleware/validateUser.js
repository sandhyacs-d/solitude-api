import { AppError } from "./middleware/appError.js";

export function validateUser(req,res,next){
    const {name, email, password} = req.body;

     if(name === undefined || name === ""){
        throw new AppError("name is required",400);
    }

    if(typeof name !== "string"){
        throw new AppError("name must be a string",400);
    }


    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(email === undefined ||email === ""){
        throw new AppError("email is required",400);
    }

    if(typeof email !== "string"){
        throw new AppError("email must be a string",400);
    }

    if(!emailRegex.test(email)){
        throw new AppError("invalid email format",400);
    }

    const passworPattern = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

    if(password === undefined || password === ""){
        throw new AppError("password is required",400);
    }

    if(typeof password !== "string"){
        throw new AppError("password must be a string",400);
    }
    
    if(!passworPattern.test(password)){
        throw new AppError("invalid password format",400);
    }
    

    next();
}
