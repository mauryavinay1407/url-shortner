const asyncHandler=(fun)=>async(req,res,next)=>{
try {
    await fun(req,res,next);
} catch (error) {
    res.status(401).json({
        success:false,
        message:error.message
    })
}
}

module.exports={asyncHandler};