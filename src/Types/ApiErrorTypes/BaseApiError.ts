/**
 * BaseApiError
 * @class BaseApiError
 * @extends Error
 *
 * @example
 * throw new BaseApiError('An exception has occurred', 500);
 *
 * @description A base error class used for handling exceptions
 */
class BaseApiError extends Error {
  /**
   * @memberof BaseApiError
   * @public
   * @property {string} message The error message
   */
  public message: string;

  /**
   * @memberof BaseApiError
   * @public
   * @property {number} status The HTTP response status
   */
  public status: number;

  /**
   * @memberof BaseApiError
   * @public
   * @property {any} [metadata] Metadata to attach to the error
   */
  public metadata?: any;

  constructor(message: string, status: number, meta?: any) {
    super();
    this.message = message;
    this.status = status;
    this.metadata = meta;
  }
}

export default BaseApiError;
