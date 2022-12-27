import BaseApiError from './BaseApiError';

class ExternalApiError extends BaseApiError {
  private static STATUS_CODE = 502;
  private static MESSAGE_PREFIX = 'Error: Invalid Response from external server - ';

  constructor(message: string, meta?: any) {
    super(ExternalApiError.MESSAGE_PREFIX + message, ExternalApiError.STATUS_CODE, meta);
  }
}

export default ExternalApiError;
