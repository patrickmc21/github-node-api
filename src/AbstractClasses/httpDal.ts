import fetch from 'node-fetch';

export default abstract class HttpDal {
  protected baseUrl: string;
  private fetch;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.fetch = fetch;
  }

  protected get(url: string, headers?: any): Promise<any> {
    return this.fetch(`${this.baseUrl}${url}`, {
      method: 'get',
      ...(headers && { headers }),
    });
  }

  protected post(url: string, body: any, headers?: any): Promise<any> {
    return this.fetch(`${this.baseUrl}${url}`, {
      method: 'post',
      body,
      ...(headers && { headers }),
    });
  }

  protected put(url: string, body: any, headers?: any): Promise<any> {
    return this.fetch(`${this.baseUrl}${url}`, {
      method: 'put',
      body,
      ...(headers && { headers }),
    });
  }
}
