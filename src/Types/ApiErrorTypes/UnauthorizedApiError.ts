import BaseApiError from './BaseApiError';

class UnauthorizedApiError extends BaseApiError {
  private static STATUS_CODE = 401;
  private static BASE_MESSAGE = 'Error: Unauthorized';

  constructor(meta?: any) {
    super(UnauthorizedApiError.BASE_MESSAGE, UnauthorizedApiError.STATUS_CODE, meta);
  }
}

export default UnauthorizedApiError;
