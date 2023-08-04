const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    name : {
        type : String,
    },
    description : {
        type : String,
    },
    duration : {
        type : Number,
    },
    rating: {
        type: Number,
    },
    totalRating : {
        type: Number,
    },
    releaseYear : {
        type: Number,
    },
    releaseDate : {
        type: Date,
    },
    createdAt : {
        type : Date,
        default : Date.now()
    },
    genres :{
        type : [String]
    },
    directors : {
        type : String
    },
    coverImage : {
        type : String
    },
    actors : {
        type : [String]
    },
    price : {
        type : Number
    }
},{
    toJSON : {virtuals : true},
    toObject : {virtuals : true}
})

movieSchema.virtual('duratioInHours').get(function() {
    return (this.duration / 60).toFixed()
})

const movieModel = new mongoose.model("movies",movieSchema)

module.exports = movieModel