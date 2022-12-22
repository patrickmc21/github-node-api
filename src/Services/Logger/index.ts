import * as winston from 'winston';

/**
 * Logger
 *
 * @class Logger
 *
 * @example
 * const logger = new Logger();
 * logger.info("your log message");
 *
 * @see https://github.com/winstonjs/winston
 *
 */
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
                error: 'bold red',
              },
            }),
            winston.format.timestamp(),
            winston.format.printf((info) => `${info.timestamp} [${info.level}]: ${info.message}`)
          ),
        }),
      ],
    });
  }

  /**
   * @memberof Logger
   * @method info
   * @description Logs a message to the console with severity "info"
   * @param {string} message message to log
   */
  public info(message: string): void {
    this.loggingUtility.info(message);
  }

  /**
   * @memberof Logger
   * @method warn
   * @description Logs a message to the console with severity "warn"
   * @param {string} message message to log
   */
  public warn(message: string): void {
    this.loggingUtility.warn(message);
  }

  /**
   * @memberof Logger
   * @method error
   * @description Logs a message to the console with severity "error"
   * @param {string} message message to log
   * @param {any} [meta] Additional metadata to attach to the log
   */
  public error(message: string, meta?: unknown): void {
    this.loggingUtility.error(message, meta);
  }
}

export default new Logger();
