import winston from 'winston'

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
}

const level = () => {
    const env = process.env.NODE_ENV || 'development'
    const isDevelopment = env === 'development'
    return isDevelopment ? 'debug' : 'warn'
}

const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white',
}

/**
 * Tell winston that you want to link the colors
 * defined above to the severity levels.
 */
winston.addColors(colors)

// Chose the aspect of your log customizing the log format.
const format = winston.format.combine(
    // Add the message timestamp with the preferred format
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    /**
     * Tell Winston that the logs must be colored but
     * we bypass this global formatting colorize because generates
     * wrong output characters in file. Add in transports
     */
    // winston.format.colorize({all: true}),
    // Define the format of the message showing the timestamp, the level and the message
    winston.format.printf(
        info => `${info.timestamp} ${info.level}: ${info.message}`
    )
)

const transports = [
    // Allow the use the console to print the messages
    new winston.transports.Console({
        format: winston.format.combine(
            // Integration to format. Tell Winston that the console logs must be colored
            winston.format.colorize({ all: true })
        ),
    }),
    // Allow to print all the error level messages inside the error.log file
    new winston.transports.File({
        filename: 'logs/error.log',
        level: 'error',
    }),
    /**
     * Allow to print all the error message inside the all.log file
     * (also the error log that are also printed inside the error.log(
     */
    new winston.transports.File({ filename: 'logs/all.log' }),
]


const Logger = winston.createLogger({
    level: level(),
    levels,
    format,
    transports,
})

export default Logger