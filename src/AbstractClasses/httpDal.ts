import fetch from 'node-fetch';

export default abstract class HttpDal {
  protected baseUrl: string;
  private fetch;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.fetch = fetch;
  }

  protected get(url: string, headers?: any, useBaseUrl: boolean = true): Promise<any> {
    return this.fetch(`${useBaseUrl ? this.baseUrl : ''}${url}`, {
      method: 'get',
      ...(headers && { headers }),
    });
  }
}
