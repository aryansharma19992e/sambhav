const winston = require('winston');

// Create a reusable logger instance
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message, ...meta }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message} ${Object.keys(meta).length ? JSON.stringify(meta) : ''}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
  ],
});

class BaseController {
  constructor() {
    this.logger = logger;
  }

  logInfo(message, meta = {}) {
    this.logger.info(message, meta);
  }

  logError(message, meta = {}) {
    this.logger.error(message, meta);
  }
}

module.exports = BaseController; 