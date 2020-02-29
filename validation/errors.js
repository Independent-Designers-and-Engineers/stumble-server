// Imports

const winston = require('winston');

// Time variable
var time = new Date();

// Logger Levels

const newLevels = {
    levels: {
        error: 0,
        info: 1
    }
};

// Instantiate loggers
logger = winston.createLogger({
    levels: newLevels.levels,
    transports: [
        new winston.transports.File({
            level: 'info',
            filename: 'requests.log'
        }),
        new winston.transports.File({
            level: 'error',
            filename: 'error.log'
        })
    ]
})

// Record when error occured
logger.info('Request made at ' + time, {});
logger.error('Error occured at ' + time, {});

module.exports = logger