import BaseApiError from './BaseApiError';

class NotFoundApiError extends BaseApiError {
  private static STATUS_CODE = 404;
  private static BASE_MESSAGE = 'Error: Resource Not Found';

  constructor(meta?: any) {
    super(NotFoundApiError.BASE_MESSAGE, NotFoundApiError.STATUS_CODE, meta);
  }
}

export default NotFoundApiError;
