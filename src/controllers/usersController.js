import {AppError} from "../middleware/appError.js";
import User from "../models/users.js";
import { hashPassword } from "../utils/password.js";
import bcrypt from "bcrypt";


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

export async function loginUser(req,res){
    const {email, password} = req.body;

    const existingUser = await User.findOne({email})
    
    if(!existingUser){
        throw new AppError("Invalid email or password",401);
    }


    const isMatch = await bcrypt.compare(password, existingUser.password);

    if(!isMatch){
        throw new AppError("Invalid email or password",401);
    }
    
    return res.status(200).json({
        message :"Login successful",
        user : existingUser.name
    })

}