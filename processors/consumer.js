const {_processors} = require("./processers")
const {emailQueue} = require("./configration")


// Jobs Consumers
for (let identity in _processors) {
    emailQueue.process(identity, 5 ,_processors[identity]);  // queue_name.process(function_name, concurrency, function_execute)
};