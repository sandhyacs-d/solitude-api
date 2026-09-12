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

export async function getCurrentUser(req,res){

    const user = await User.findById(req.user).select("-password");

    return res.status(200).json(user);

}

export async function updateCurrentUser(req,res){
    const {name, email} = req.body;
    
    const updateCurrentData = {};

    if(name !== undefined){
        updateCurrentData.name = name;
    }

    if(email !== undefined){
        updateCurrentData.email = email;
        
        const existingUser = await User.findOne({email,
            _id : { $ne : req.user} });

        if(existingUser){
            throw new AppError("email already exists",400);
        }
    }

    if(Object.keys(updateCurrentData).length === 0){
        throw new AppError("No field to update",400);
    }

    const user = await User.findOneAndUpdate({ _id : req.user}, updateCurrentData, {returnDocument :"after"}).select("-password");

    if(!user){
        throw new AppError("no user available",404);
    }

    return res.status(200).json(user);



}