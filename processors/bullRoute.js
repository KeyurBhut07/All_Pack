const { createBullBoard } = require('bull-board')
const { BullAdapter } = require('bull-board/bullAdapter')
const { emailQueue } = require('./configration')

const { router } = new createBullBoard([
    new BullAdapter(emailQueue)
])

module.exports = { bullRoute: router }