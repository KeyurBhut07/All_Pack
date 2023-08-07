require("dotenv").config()
require("./config/mongooseConnect")
const express = require("express")
const app = express()
const passport = require("passport")
const expressSession = require("express-session")
require("./mail/transport")
require("./processors/consumer")
const { bullRoute } = require("./processors/bullRoute")
const cron = require("./config/cron")
const moment = require("moment")
const morgan = require("morgan")
const logger = require("./config/logger")

// Rate limit configuration and code 
// const rateLimit = require("express-rate-limit")

// const limiter = rateLimit({
//   windowMS : 10 * 60 *1000, // 10 minutes
//   max : 5,
//   message : "Too Many Requests, Please Wait For 10 Minutes . Aftter You Are Enabled To Continue"
// })
// app.use(limiter)


app.use(express.json())
app.use(expressSession({
    secret: 'secret',
    resave : false,
    saveUninitialized: false,
}))
app.use(passport.initialize())
app.use(passport.session())
app.use("/queue", bullRoute)

const i18n = require("i18next");
const backend = require("i18next-fs-backend");
const middleware = require("i18next-http-middleware");

i18n
  .use(backend)
  .use(middleware.LanguageDetector)
  .init({
    fallbackLng: "eng",
    backend: {
      loadPath: "./localiz/{{lng}}/translate.json",
    },
  });

app.use(middleware.handle(i18n));

// cron schedule package
// cron

// // Moment JS package 
// console.log(moment().format("dddd Do MMM YYYY , hh:mm:ss a"))
// console.log(moment().format('LTS'))

// // morgan package
// app.use(morgan('dev'))

app.use("", require("./router/userRouter"))


app.listen(process.env.PORT , ()=>{
    logger.info("server listening on http://localhost:5000")
})