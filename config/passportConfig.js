const userModel = require("../model/userModel");
const LocalStrategy = require("passport-local");
const passport = require("passport");
const i18next = require("i18next");

exports.initializingPassport = () => {
  passport.use(
    new LocalStrategy(async(username, password, done) => {
      try {
        const user =  await userModel.findOne({ email:username });
        if (!user)
        { 
          return done({
            err: i18next.t("userNotFound"),
          });
        }
        if (user.password !== password) 
        {
           return done({err : i18next.t('nvalidPassword')});
        }
        return done(null, user)
      } catch (err) {
        return done({err : i18next.t('invalidCredentials')});
      }
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
        const user = await userModel.findById(id)
        done(null, user)
    } catch (error) {
         done(null, false , { message : i18next.t("userNotFound")});
    }
  });
};


exports.isAuthenticated = (err,req,res,next) =>{
  if(req.user){
    return next()
  }
  return {message : "please Login"}
}