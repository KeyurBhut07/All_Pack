const userModel = require("../model/userModel")
const movieModel = require("../model/movieModel")
const message = require('../helper/message');
const sendUserEmail = require("../mail/sendAccountCreateMail");
const {emailQueue} = require("../processors/configration");
const jwt = require("jsonwebtoken")
const createJobs = (jobName, objToProcess, options) => {
    const defaultQueueOpts = { 
        priority: 0, 
        dealy : 5000,
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
        // const token = await jwt.sign({id:result._id},process.env.SECRATE_KEY,{expiresIn : process.env.LOGIN_EXPIRE})
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
        // createJobs("emailQueue",{data})
        console.log('data: ', data);
        res.send({message:"all email are added in queue"})
    } catch (error) {
        console.log(error.message)
    }
}

// Agrigations
exports.movies = async (req, res) => { 
    try {
        // const movie = await movieModel.aggregate([
        //     {$match: { ratings : { $gte : 4.5}}},
        //     { $group: {
        //         _id : '$releaseYear',
        //         avgPrice : {$avg : '$price'},
        //         avgRating : {$avg : '$ratings' },
        //         minPrice : {$min : '$price'},
        //         maxPrice : {$max : '$price'},
        //     }},
        //     {$sort : {minPrice : 1}},
        //     {$match : {maxPrice : {$gt : 60}}}
        // ])

        // const genres = "Action"
        // const movie = await movieModel.aggregate([
        //     {$unwind : '$genres'},
        //     {$group : {
        //         _id : '$genres',
        //         movieCount : {$sum : 1},
        //         movie : {$push : '$name'}
        //     }},
        //     {$addFields : {genres : '$_id'}},
        //     {$project : {_id : 0}},
        //     {$sort : {movieCount : -1}},
        //     {$match : {genres : genres}}
        // ])

        const movie = await movieModel.find({})
        res.status(200).send({
            success:true,
            count : movie.length,
            data : {movie}
        }) 
    } catch (error) {
        console.log(error)
    }
}

