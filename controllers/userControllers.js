const userModel = require("../model/userModel")
const message = require('../helper/message');

exports.register = async (req,res) =>{
    try {
        const {email,} = req.body
        const findEmail = await userModel.findOne({email})
        if(findEmail)
        {
           res.message = "Email already registered"
           return message.badRequest(res)
        }
        const result = await new userModel(req.body).save();
        res.message = "Successfully registered"
        message.success(result,res)
    } catch (error) {
        console.log(error.message)
    }
}


exports.login = async (req, res) => {
    try {
        const result = req.user
        res.message = "Login Successful"
        message.success(result,res)
    } catch (error) {
        console.log(error.message)
    }
}

