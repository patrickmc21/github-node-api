import BaseApiError from './BaseApiError';

class ForbiddenApiError extends BaseApiError {
  private static STATUS_CODE = 403;
  private static BASE_MESSAGE = 'Error: Forbidden';

  constructor(meta?: any) {
    super(ForbiddenApiError.BASE_MESSAGE, ForbiddenApiError.STATUS_CODE, meta);
  }
}

export default ForbiddenApiError;
