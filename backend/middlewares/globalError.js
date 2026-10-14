export default function globalError(err,req,res,next){
    return res.status(err.statusCode || 500).json({
        success:err.success,
        code:err.statusCode,
        message:err.message || "Internal Server Error",
        stack:err.stack
    })
}