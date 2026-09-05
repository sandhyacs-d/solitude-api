import {AppError} from "../middleware/appError.js";
import User from "../models/users.js";
import { hashPassword } from "../utils/password.js";


export async function registerUser(req,res){
    const {name, email, password} = req.body;

    
    const existingUser = await User.findOne({email});
    
    if(existingUser){
        throw new AppError("User already exists",409);
    }

    const hashedPassword = await hashPassword(password);
    
    await User.create({
        name,
        email,
        password : hashedPassword
    })

    return res.status(201).json({
        message : "User successfully registered!"
    })

}