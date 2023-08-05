const emailQueueProcessers = require("./queueConfig")
module.exports = {
    _processors : {
        emailQueue: async ({data}) => {
            setTimeout(() => {
                const {name,email} = data
                console.log(name)
            }, 5000);
            // await emailQueueProcessers({name,email})
        }
    }
}