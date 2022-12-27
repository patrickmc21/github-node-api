import fetch from 'node-fetch';
import { logger } from '../Services/';

export default abstract class HttpDal {
  protected baseUrl: string;
  private fetch;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.fetch = fetch;
  }

  protected get(url: string, headers?: any, useBaseUrl: boolean = true): Promise<any> {
    const resourceUrl = `${useBaseUrl ? this.baseUrl : ''}${url}`;
    logger.info(`Fetching external resource: GET ${resourceUrl}`);
    return this.fetch(resourceUrl, {
      method: 'get',
      ...(headers && { headers }),
    }).then((response) => {
      if (!response.ok) logger.warn(`GET ${resourceUrl} - External resource sent invalid response: ${response.status}`);
      else logger.info(`GET ${resourceUrl} - External resource responded successfully: ${response.status}`);
      return response;
    });
  }
}
