import BaseApiError from './BaseApiError';

class InternalApiError extends BaseApiError {
  private static STATUS_CODE = 500;
  private static MESSAGE_PREFIX = 'Error: Internal Server Error - ';

  constructor(message: string, meta?: any) {
    super(InternalApiError.MESSAGE_PREFIX + message, InternalApiError.STATUS_CODE, meta);
  }
}

export default InternalApiError;
