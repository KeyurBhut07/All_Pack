const emailQueueProcessers = require("./queueConfig")
module.exports = {
    _processors : {
        emailQueue: async ({data}) => {
            const {name,email} = data
            console.log(name)
            // await emailQueueProcessers({name,email})
        }
    }
}