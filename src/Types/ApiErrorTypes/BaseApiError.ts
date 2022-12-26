class BaseApiError {
  public message: string;
  public status: number;
  public metadata?: any;

  constructor(message: string, status: number, meta?: any) {
    this.message = message;
    this.status = status;
    this.metadata = meta;
  }
}

export default BaseApiError;
