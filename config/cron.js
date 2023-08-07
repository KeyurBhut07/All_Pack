const cron = require('cron').CronJob;

var job = new cron(
    " 0 9 * * * * ",
    () =>{
        console.log("Good Morning");
    },
    null,
    true,
    process.env.timeZone
)