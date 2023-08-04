require("dotenv").config()
require("./config/mongooseConnect")
const express = require("express")
const app = express()
const passport = require("passport")
const expressSession = require("express-session")
require("./mail/transport")
require("./processors/consumer")


app.use(express.json())
app.use(expressSession({
    secret: 'secret',
    resave : false,
    saveUninitialized: false,
}))
app.use(passport.initialize())
app.use(passport.session())

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

app.use("", require("./router/userRouter"))


app.listen(process.env.PORT , ()=>{
    console.log("server listening on http://localhost:5000")
})