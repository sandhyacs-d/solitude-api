import { AppError } from "./appError.js";

export function validatePost(req,res,next){
    const {title,content,tags} = req.body;


    if(title === undefined){
        throw new AppError("Title is required",400);
    }

    if(typeof(title) !== "string"){
         throw new AppError("Title must be a string",400);
    }

    if(title.trim()===""){
         throw new AppError("Title cannot be empty",400);
    }


    if(content === undefined ){
        throw new AppError("content is required",400);
    }

    if(typeof(content) !== "string"){
        throw new AppError("content must be a string",400);
    }

    if(content.trim()===""){
         throw new AppError("content cannot be empty",400);
    }

    if(tags !== undefined){
    if(!Array.isArray(tags)){
         throw new AppError("tags must be an array",400);
    }

    if(tags.some(tag => typeof tag !== "string")){
        throw new AppError("tags must be a string",400);
    }

    }

    const allowedFields = ["title","content","mood","tags"];

    const isOnlyAllowedField = Object.keys(req.body).every(field => allowedFields.includes(field));

    if(!isOnlyAllowedField){
        throw new AppError("Invalid field request",400);
    }

    next();
}

export function validatePatch(req,res,next){
    const {title, content,tags} = req.body;

    if(title !== undefined){

        if(typeof(title) !== "string"){
         throw new AppError("Title must be a string",400);
        }

         if(title.trim()===""){
         throw new AppError("Title cannot be empty",400);
         }
    }

    if(content !== undefined){
        if(typeof(content) !== "string"){
            throw new AppError("content must be a string",400);
         }

    if(content.trim()===""){
         throw new AppError("content cannot be empty",400);
    }
    }

    if(tags !== undefined){
    if(!Array.isArray(tags)){
         throw new AppError("tags must be an array",400);
    }

    if(tags.some(tag => typeof tag !== "string")){
        throw new AppError("Each tag must be a string",400);
    }

    }


    const allowedFields = ["title","content","mood","tags"];

    const isOnlyAllowedField = Object.keys(req.body).every(field => allowedFields.includes(field));

    if(!isOnlyAllowedField){
        throw new AppError("Invalid field request",400);
    }

    next();
}

export  function validateEntryQuery(req,res,next){
    const {page =1 , limit=10, sort, mood, tag, fields, search} = req.query;

    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    if(!Number.isInteger(pageNumber)){
        throw new AppError("page number must be an integer",400);
    }

    if(pageNumber <= 0){
        throw new AppError("page number must be greated than 0",400);
    }

    if(!Number.isInteger(limitNumber)){
        throw new AppError("limit must be an integer",400);
    }

     if(limitNumber <= 0){
        throw new AppError("limit number must be greated than 0",400);
    }

     if(limitNumber > 100){
        throw new AppError("limit must be under 100",400);
    }

    if (sort !== undefined && sort !== "newest" && sort !== "oldest") {
        throw new AppError("sort must be newest or oldest", 400);
    }

    const validMoods = [
    "happy",
    "sad",
    "calm",
    "angry",
    "anxious",
    "excited",
    "neutral"
    ];

    if (mood !== undefined && !validMoods.includes(mood)) {
        throw new AppError("invalid mood", 400);
    }

    if (tag !== undefined && (typeof tag !== "string" || tag.trim() === "" || tag.length > 30)) {
        throw new AppError("Tag invalid", 400);
    }



    const fieldAllowed = [
    "title",
    "content",
    "mood",
    "tags",
    "createdAt",
    "updatedAt"
    ];

    if (fields !== undefined) {
        const selectedFields = fields.split(",");

    for (const field of selectedFields) {
        if (!fieldAllowed.includes(field)) {
            throw new AppError("invalid field", 400);
        }
    }
    }

    if (search !== undefined) {
    if (typeof search !== "string" || search.trim() === "") {
        throw new AppError("search must be a non-empty string", 400);
    }

    if (search.length > 100) {
        throw new AppError("search must not exceed 100 characters", 400);
    }
}

    req.pagination = {
        page : pageNumber,
       limit : limitNumber
    }
    
    next();
}