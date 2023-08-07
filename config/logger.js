const winston = require("winston");

const myFormat = winston.format.combine(
  winston.format.colorize({
    all: true, 
    colors: {
      debug: 'blue',
      info: 'green', 
      warn: 'yellow',
      error: 'red'
    }
  }),
  winston.format.timestamp({ format: 'DD-MM-YY HH:mm:ss' }),
  winston.format.printf(({ timestamp, level, message }) => {
    return `[${timestamp}] [${level}] ${message}`;
  })
);

const logger = winston.createLogger({
    transports: [
      new winston.transports.Console({
        level: "info",
        format: myFormat,
      }),
      new winston.transports.Console({
        level: "error",
        format: winston.format.combine(winston.format.json()),
      }),
    ],
});
  
  module.exports = logger;

