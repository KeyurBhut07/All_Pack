const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name : {
        type : String,
    },
    email : {
        type : String,
    },
    age : {
        type : Number,
    },
    nationality: {
        type: String,
    },
    password : {
        type : String,
    },
    profileId:{
        type : mongoose.Types.ObjectId,
        ref : "file"
    },
    skills : [
        {
            skill : {type : String},
            certificates : {type : String}
        }
    ],
    hobby : {
        type : Array
    }

})

const userModel = new mongoose.model("User",userSchema)

module.exports = userModel