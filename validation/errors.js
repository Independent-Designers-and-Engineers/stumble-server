// Imports

const winston = require('winston');

//Logger Levels

const newLevels = {
    levels: {
        error: 0,
        info: 1
    }
};

//Instantiate loggers
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

//Record when error occured
logger.log('info', 'Request made at %s', new Date(), {});

logger.log('error', 'Error occured at %s', new Date(), {});

module.exports = logger