"use strict";

const winston = require("winston");
const config = require("config");
const os = require("os");

const loggerConfig = config.get("logger") 

const logger = winston.createLogger({
  transports: [
    new winston.transports.File({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf((log) => JSON.stringify(log))
      ),
      ...loggerConfig.file,
    }),
  ],
  exitOnError: false,
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        winston.format.printf(
          (log) =>
            `${log.timestamp} - ${log.level} (on ${os.hostname}) : ${log.message}`
        )
      ),
      ...loggerConfig.console,
    })
  );
}

module.exports = logger