import winston from "winston";

const allowedTransports = [];

allowedTransports.push(new winston.transports.Console({
    format: winston.format.combine(
        winston.format.colorize({all:true}),
        winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
    )
}));


const logger = winston.createLogger({
    
    format: winston.format.combine(
        winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
        winston.format.printf((log) => `${log.timestamp} - [${log.level.toUpperCase()}]: ${log.message}`)
    ),

    transports: allowedTransports
})

export default logger;