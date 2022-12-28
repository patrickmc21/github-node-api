import BaseApiError from './BaseApiError';

/**
 * ExternalApiError
 * @class ExternalApiError
 * @extends BaseApiError
 *
 * @example
 * throw new ExternalApiError('An exception has occurred');
 *
 * @description An error to be used for external errors, such as an error returned from an external API. Uses 502 response code.
 */
class ExternalApiError extends BaseApiError {
  /**
   * @memberof ExternalApiError
   * @private
   * @static
   * @property {number} STATUS_CODE the status code to be used for this Error class
   */
  private static STATUS_CODE = 502;

  /**
   * @memberof ExternalApiError
   * @private
   * @static
   * @property {string} MESSAGE_PREFIX The string to add as a prefix to the supplied message string
   */
  private static MESSAGE_PREFIX = 'Error: Invalid Response from external server - ';

  constructor(message: string, meta?: any) {
    super(ExternalApiError.MESSAGE_PREFIX + message, ExternalApiError.STATUS_CODE, meta);
  }
}

export default ExternalApiError;
