const emailQueueProcessers = require("./queueConfig")
module.exports = {
    _processors : {
        emailQueue: async ({data}) => {
            const {name,email} = data
            await emailQueueProcessers({name,email})
        }
    }
}