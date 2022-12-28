import BaseApiError from './BaseApiError';

/**
 * ForbiddenApiError
 * @class ForbiddenApiError
 * @extends BaseApiError
 *
 * @example
 * throw new ForbiddenApiError();
 *
 * @description An error to be used for authentication errors. Has default status and message
 */
class ForbiddenApiError extends BaseApiError {
  /**
   * @memberof ForbiddenApiError
   * @private
   * @static
   * @property {number} STATUS_CODE default status code to be used
   */
  private static STATUS_CODE = 403;

  /**
   * @memberof ForbiddenApiError
   * @private
   * @static
   * @property {string} BASE_MESSAGE default error message to be used
   */
  private static BASE_MESSAGE = 'Error: Forbidden';

  constructor(meta?: any) {
    super(ForbiddenApiError.BASE_MESSAGE, ForbiddenApiError.STATUS_CODE, meta);
  }
}

export default ForbiddenApiError;
