const message = require("../helper/message")
const  validation = (validator) => {
    return async (req,res,next) => {
        try {
                req.body = await validator.validateAsync(req.body)
                next()
        } catch (error) {
             return message.validationError(error.message,res)
        }
    }
}

module.exports = validation