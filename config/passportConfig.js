const userModel = require("../model/userModel");
const LocalStrategy = require("passport-local");
const passport = require("passport");

exports.initializingPassport = () => {
  passport.use(
    new LocalStrategy(async(username, password, cb) => {
      try {
        const user =  await userModel.findOne({ email:username });
        if (!user)
        { 
          return cb({err : "User not found"}); 
        }
        if (user.password !== password) 
        {
           return cb({err : "Invalid Password"});
        }
        return cb(null, user)
      } catch (err) {
        return cb({err : "Invalid Credentials"});
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
         done(null, false , { message : "User not found"});
    }
  });
};


exports.isAuthenticated = (err,req,res,next) =>{
  if(req.user){
    return next()
  }
  return {message : "please Login"}
}