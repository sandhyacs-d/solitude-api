export function errorHandler(err,req,res,next){
    if(err.name === "CastError"){
        return res.status(400).json({
            success :false,
            message : err.message
        })
    }

    if(err.name === "ValidationError"){
        return res.status(400).json({
            success : false,
            message : err.message
        })
    }
    return res.status(500).json({
        success : false,
        message : err.message
    })
}