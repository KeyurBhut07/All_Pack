const sendUserEmail = require("../mail/sendAccountCreateMail")

const emailQueueProcessers = async (name,email) => {
    try {
        // sendUserEmail({name,email})
    } catch (error) {
        console.log(error)
    }
}

module.exports = emailQueueProcessers
