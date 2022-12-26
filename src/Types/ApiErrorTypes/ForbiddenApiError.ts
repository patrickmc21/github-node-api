import BaseApiError from './BaseApiError';

class Forbidden extends BaseApiError {
  private static STATUS_CODE = 403;
  private static BASE_MESSAGE = 'Error: Forbidden';

  constructor(meta?: any) {
    super(Forbidden.BASE_MESSAGE, Forbidden.STATUS_CODE, meta);
  }
}

export default Forbidden;
