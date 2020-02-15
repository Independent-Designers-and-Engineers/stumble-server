// Imports

const { winston, createLogger, transports } = require('winston');

//Logger Levels

const newLevels = {
    levels: {
        error: 0,
        http: 1
    },
    colors: {
        error: 'red',
        http: 'black'
    }
};

winston.addColors(customLogger.colors);

logger = winston.createLogger({
    levels: newLevels.levels,
    transports: [
        new transports.Http({
            level: 'http',
            format: winston.format.json()
        }),
        new transports.Http({
            level: 'error',
            format: winston.format.json()
        })
    ]
})

logger.add(new winston.transports.Http(port));

const profiler = logger.startTimer();
setTimeout(function () {
    profiler.done({ message: 'Http request: ' });
}, 1000);

//Logger Updates

logger.profile('test', { level: 'http' });

logger.log({
    level: 'http',
    message: 'Is status code good?',
})

logger.http('Not a 200 request');

logger.log({
    level: 'error',
    message: '400 level error'
})

logger.error('Oh no');