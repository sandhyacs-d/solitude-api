import { AppError } from "../middleware/appError.js";
import User from "../models/users.js";

export async function registerUser(req,res){
    const {name, email, password} = req.body;

    
    const existingUser = await User.findOne({email});
    
    if(existingUser){
        throw new AppError("User already exists",409);
    }
    
    const user = await User.create({
        name,
        email,
        password 
    })

    return res.status(200).json({
        message : "User successfully registered!"
    })

}