const express = require("express")
const router = express.Router()
const userController = require("../controllers/userControllers")
const passport = require("passport")
const { initializingPassport } = require("../config/passportConfig")
const message = require("../helper/message")
const validation = require("../config/joiValidation")
const user = require("../validation/userValidation")

initializingPassport()

router.post("/register", validation(user) , userController.register)

router.post("/login" ,passport.authenticate('local'),(err, req, res, next) =>{
    return message.loginMessageError(err,res)}, userController.login)

// login routes with JWT

router.post("/sendemailtouser" , userController.sendemailtouser)

// Agrigations
router.get("/movies" , userController.movies)


module.exports = router