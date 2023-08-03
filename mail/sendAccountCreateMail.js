const path = require('path');
const ejs  = require('ejs');
const transport = require("../mail/transport")

const sendUserEmail = async ({name,email}) =>{
    const templatePath = path.join(__dirname,    "../views/AccountCreated.ejs")
    const data = await ejs.renderFile(templatePath , {name})
    const mainOption = {
        from : 'Keyur Bhut',
        to : email,
        subject : 'Account Activated',
        html : data
    }
    await transport.sendMail(mainOption)
}


module.exports = sendUserEmail