import {AppError} from "../middleware/appError.js";
import User from "../models/users.js";
import { hashPassword,
    verifyPassword
 } from "../utils/password.js";
 import { createToken } from "../utils/jwt.js";


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

    const user = await User.findOne({email});

    if(!user){
        throw new AppError("Invalid email or password",401);
    }

    const isPasswordValid = await verifyPassword(password,user.password);

    if(!isPasswordValid){
        throw new AppError("Invalid email or password",401);
    }

    const token = createToken(user._id);

    return res.status(200).json({
        message : "login successful",
        user : user.name,
        token
    })
}