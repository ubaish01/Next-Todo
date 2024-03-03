
export const errorHandler = (res, status = 500, message = "Internal server error") => {
    return res.status(status).json({
        success: false,
        message
    })
}


export const asyncError = (passedFunc) => (req,res)=>{
    return Promise.resolve(passedFunc(req,res)).catch((err)=>{
        return errorHandler(res,500,err.message)
    })
}