const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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


userSchema.pre('save', async function (next) {
    const user = this
    user.password = await bcrypt.hash(user.password, 10)
    next()
})

const userModel = new mongoose.model("User",userSchema)

module.exports = userModel