const userModel = require("../model/userModel")
const message = require('../helper/message');
const sendUserEmail = require("../mail/sendAccountCreateMail");
const {REDIS_PORT,REDIS_URI} = require("../config/redisCredentials")
const {emailQueue} = require("../processors/configration");
const createJobs = (jobName, objToProcess, options) => {
    const defaultQueueOpts = { 
        priority: 0, 
        attempts: 3, 
        removeOnComplete: true,
        removeOnFail: true
    };
    emailQueue.add(jobName, objToProcess, options ?? defaultQueueOpts)  // Add jobs in the sample Queue.
}

exports.register = async (req,res) =>{
    try {
        const {email,name} = req.body
        const findEmail = await userModel.findOne({email})
        if(findEmail)
        {
            res.message = req.t('failRegister');
            return message.badRequest(res);
        }
        const result = await new userModel(req.body).save();
        res.message = req.t('successRegister');
        message.success(result,res)
        // sendUserEmail({name,email})
    } catch (error) {
        console.log(error.message)
    }
}


exports.login = async (req, res) => {
    try {
        const result = req.user
        res.message = req.t('loginSuccess');
        message.success(result,res)
    } catch (error) {
        console.log(error.message)
    }
}

exports.sendemailtouser = async (req,res) => {
    try {
        let data = await userModel.find({});
        data.forEach((user, index) => {
            createJobs("emailQueue",user)
        })
        res.send({message:"all email are added in queue"})
    } catch (error) {
        console.log(error.message)
    }
}