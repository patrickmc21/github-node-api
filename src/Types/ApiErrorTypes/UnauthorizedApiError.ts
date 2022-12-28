import BaseApiError from './BaseApiError';

/**
 * UnauthorizedApiError
 * @class UnauthorizedApiError
 * @extends BaseApiError
 *
 * @example
 * throw new UnauthorizedApiError();
 *
 * @description An error to be used for handling an unauthorized user. Default status code of 401
 */
class UnauthorizedApiError extends BaseApiError {
  /**
   * @memberof UnauthorizedApiError
   * @private
   * @static
   * @property {number} STATUS_CODE the default status code
   */
  private static STATUS_CODE = 401;

  /**
   * @memberof UnauthorizedApiError
   * @private
   * @static
   * @property {string} BASE_MESSAGE the default error message
   */
  private static BASE_MESSAGE = 'Error: Unauthorized';

  constructor(meta?: any) {
    super(UnauthorizedApiError.BASE_MESSAGE, UnauthorizedApiError.STATUS_CODE, meta);
  }
}

export default UnauthorizedApiError;
