const {REDIS_PORT,REDIS_URI} = require("../config/redisCredentials")
const Queue = require("bull")

const emailQueue = new Queue('emailQueue',{
    redis : {
        port : REDIS_PORT,
        host : REDIS_URI,
    },
})

console.log("Queue Loading...")

emailQueue.on('completed',(job)=>{
    console.log(`Completed ${job.id}`)
    job.remove()
})
emailQueue.on("failed", (job)=>{
    console.log(`failed ${job.id} ${job.data}`)
});
emailQueue.on("stalled", (job)=>{
    console.log(`stalled ${job.id}`)
});

module.exports = {emailQueue}