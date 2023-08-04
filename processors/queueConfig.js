const sendUserEmail = require("../mail/sendAccountCreateMail")

const emailQueueProcessers = async (name,email) => {
    try {
        // const chunk = 5;
        // for(let i = 0; i < chunk; i++){
        //     console.log(">>>>>", name)
        // }
        // console.log(name)
        await sendUserEmail({name,email})
    } catch (error) {
        console.log(error)
    }
}

module.exports = emailQueueProcessers
