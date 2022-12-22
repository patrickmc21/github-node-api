import * as winston from "winston";

class Logger {
  public loggingUtility: winston.Logger;

  constructor() {
    this.loggingUtility = winston.createLogger({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize({
              all: true,
              colors: {
                info: 'blue',
                warn: 'yellow',
                error: 'bold red'
              }
            }),
            winston.format.timestamp(),
            winston.format.printf(info => `${info.timestamp} [${info.level}]: ${info.message}`),
          )
        })
      ]
    });
  }

  public info(message: string): void {
    this.loggingUtility.info(message);
  }

  public warn(message: string): void {
    this.loggingUtility.warn(message);
  }

  public error(message: string, meta?: unknown): void {
    this.loggingUtility.error(message, meta);
  }
}

export default new Logger();
