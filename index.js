require("dotenv").config()
require("./config/mongooseConnect")
const express = require("express")
const app = express()
const passport = require("passport")
const expressSession = require("express-session")


app.use(express.json())
app.use(expressSession({
    secret: 'secret',
    resave : false,
    saveUninitialized: false,
}))
app.use(passport.initialize())
app.use(passport.session())

app.use("", require("./router/userRouter"))


app.listen(process.env.PORT , ()=>{
    console.log("server listening on http://localhost:5000")
})