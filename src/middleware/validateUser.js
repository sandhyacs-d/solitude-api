import  { AppError } from "../middleware/appError.js";

export function validateUser(req,res,next){
    const {name, email, password} = req.body;

     if(name === undefined ){
        throw new AppError("name is required",400);
    }

    if(typeof name !== "string"){
        throw new AppError("name must be a string",400);
    }

    if(name.trim() === ""){
        throw new AppError("name cannot be empty",400);
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(email === undefined){
        throw new AppError("email is required",400);
    }

    if(typeof email !== "string"){
        throw new AppError("email must be a string",400);
    }

    if(email.trim() === ""){
        throw new AppError("email cannot be empty",400);
    }

    if(!emailRegex.test(email.trim())){
        throw new AppError("invalid email format",400);
    }

    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

    if(password === undefined){
        throw new AppError("password is required",400);
    }

    if(typeof password !== "string"){
        throw new AppError("password must be a string",400);
    }

    if( password.trim() === ""){
        throw new AppError("password cannot be empty",400);
    }
    
    if(!passwordPattern.test(password)){
        throw new AppError("invalid password format",400);
    }
    

    next();
}

export function validateLogin(req,res,next){
    const {email, password} = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(email === undefined){
        throw new AppError("email is required",400);
    }

    if(typeof email !== "string"){
        throw new AppError("email must be a string",400);
    }

    if(email.trim() === ""){
        throw new AppError("email cannot be empty",400);
    }

    if(!emailRegex.test(email.trim())){
        throw new AppError("invalid email format",400);
    }

    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

    if(password === undefined){
        throw new AppError("password is required",400);
    }

    if(typeof password !== "string"){
        throw new AppError("password must be a string",400);
    }

     if( password.trim() === ""){
        throw new AppError("password cannot be empty",400);
    }

    if(!passwordPattern.test(password)){
        throw new AppError("invalid password format",400);
    }

    next();
}


export function validatePasswordChange(req,res,next){
    const {currentPassword ,newPassword} = req.body;


    if (currentPassword === undefined) {
        throw new AppError("current password is required", 400);
    }

    if (typeof currentPassword !== "string") {
        throw new AppError("current password must be a string", 400);
    }

    if (currentPassword.trim() === "") {
        throw new AppError("current password cannot be empty", 400);
    }

    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;


    if(newPassword === undefined){
        throw new AppError("password is required",400);
    }

    if(typeof newPassword  !== "string"){
        throw new AppError("password must be a string",400);
    }

     if( newPassword.trim() === ""){
        throw new AppError("password cannot be empty",400);
    }
    
    if(!passwordPattern.test(newPassword )){
        throw new AppError("invalid password format",400);
    }

    const allowedFields = ["currentPassword","newPassword"];

    const isOnlyAllowedField = Object.keys(req.body).every(field => allowedFields.includes(field));

    if(!isOnlyAllowedField){
        throw new AppError("invalid field request",400);
    }


    next();
}

export function validateProfileUpdate(req,res,next){
    const {name, email} = req.body;
    
    if(name !== undefined){

        if(typeof name !== "string"){
            throw  new AppError("Name must be a string",400);
        }

        if(name.trim()===""){
            throw new AppError("name cannot be empty",400);
        }
    }

    if(email !== undefined){
         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

         if(typeof email !== "string"){
        throw new AppError("email must be a string",400);
    }

    if(email.trim()===""){
        throw new AppError("email cannot be empty",400);
    }

    if(!emailRegex.test(email.trim())){
        throw new AppError("invalid email format",400);
    }
    }

    next();
}