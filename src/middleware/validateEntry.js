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