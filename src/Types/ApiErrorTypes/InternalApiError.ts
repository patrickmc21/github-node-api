import BaseApiError from './BaseApiError';

/**
 * InternalApiError
 * @class InternalApiError
 * @extends BaseApiError
 *
 * @example
 * throw new InternalApiError('An exception has occurred');
 *
 * @description An error class to be used for handling internal server errors. Defaults to 500 status code
 */
class InternalApiError extends BaseApiError {
  /**
   * @memberof InternalApiError
   * @private
   * @static
   * @property {number} STATUS_CODE the default status code
   */
  private static STATUS_CODE = 500;

  /**
   * @memberof InternalApiError
   * @private
   * @static
   * @property {string} MESSAGE_PREFIX A string to be added as a prefix to the supplied error message
   */
  private static MESSAGE_PREFIX = 'Error: Internal Server Error - ';

  constructor(message: string, meta?: any) {
    super(InternalApiError.MESSAGE_PREFIX + message, InternalApiError.STATUS_CODE, meta);
  }
}

export default InternalApiError;
