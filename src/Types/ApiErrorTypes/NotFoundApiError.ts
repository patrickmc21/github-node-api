import BaseApiError from './BaseApiError';

/**
 * NotFoundApiError
 * @class NotFoundApiError
 * @extends BaseApiError
 *
 * @example
 * throw new NotFoundApiError();
 *
 * @description An error to be used when a requested resource cannot be found. Default status code of 404
 */
class NotFoundApiError extends BaseApiError {
  /**
   * @memberof NotFoundApiError
   * @private
   * @static
   * @property {number} STATUS_CODE default status code
   */
  private static STATUS_CODE = 404;

  /**
   * @memberof NotFoundApiError
   * @private
   * @static
   * @property {string} BASE_MESSAGE default message
   */
  private static BASE_MESSAGE = 'Error: Resource Not Found';

  constructor(meta?: any) {
    super(NotFoundApiError.BASE_MESSAGE, NotFoundApiError.STATUS_CODE, meta);
  }
}

export default NotFoundApiError;
