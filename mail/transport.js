const nodemailer = require('nodemailer')
 
var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.nodemailerport,
      pass: process.env.nodemailerpassword
    }
});

// checking connection 
transport.verify((error,success)=>{
    if(error)
    {
        console.log("Error in connection" + error)
    }
    else
    {
        console.log("Mail Server Is Running...!")
    }
})

module.exports = transport