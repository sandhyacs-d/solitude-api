import { AppError } from "./appError.js";

export function validatePost(req,res,next){
    const {title,content} = req.body;
    
    if(!title){
        return res.status(400).json({
            success : false,
            message : "title is missing"
        })
    }

    if(typeof(title) !== "string"){
        return res.status(400).json({
            success : false,
            message : "title must be a string"
        })
    }

    if(!content){
         return res.status(400).json({
            success : false,
            message : "content is missing"
        })
    }

    if(typeof(content) !== "string"){
        return res.status(400).json({
            success : false,
            message : "content must be a string"
        })
    }

    next();
}

export function validatePatch(req,res,next){
    const {title, content} = req.body;

    if(title !== undefined){
        if(typeof(title) !== "string"){
            return res.status(400).json({
                success : false,
                message : "title must be a string"
            })
        }
    }

    if(content !== undefined){
        if(typeof(content) !== "string"){
             return res.status(400).json({
                success : false,
                message : "content must be a string"
        })
        }
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