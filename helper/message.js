const statusCode = require("./responseCode")

exports.success = (result,res) =>{
    return res.status(statusCode.success).json({
        status : statusCode.success,
        success : true,
        message : res.message,
        data : result
    })
}

exports.badRequest = (res) =>{
    return res.status(statusCode.badRequest).json({
        status : statusCode.badRequest,
        success : false,
        message : res.message,
    })
}  

exports.unAuthorized = (res) =>{
    return res.status(statusCode.unAuthorized).json({
        status : statusCode.unAuthorized,
        success : false,
        message : res.message,
    })
} 

exports.loginMessageError = (err,res) =>{
    return res.status(statusCode.unAuthorized).json({
        status : statusCode.unAuthorized,
        success : false,
        message : err.err,
        
    })
} 

exports.validationError = (err,res) => {
    return res.status(statusCode.unAuthorized).json({
        status : statusCode.unAuthorized,
        success : false,
        message : err,
    })
}