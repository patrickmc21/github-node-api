import fetch from 'node-fetch';
import { logger } from '../Services/';

/**
 * HttpDal
 * @abstract
 * @class HttpDal
 *
 * @description Abstract data access layer for accessing external APIs via HTTP
 * @example
 * class MyDal extends HttpDal {...};
 */
export default abstract class HttpDal {
  /**
   * @memberof HttpDal
   * @protected
   * @property {string} baseUrl The base url to fetch resources from
   */
  protected baseUrl: string;

  /**
   * @memberof HttpDal
   * @private
   * @property {fetch} fetch The http utility used to access external APIs
   */
  private fetch;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.fetch = fetch;
  }

  /**
   * @memberof HttpDal
   * @protected
   * @async
   * @method get
   * @description A basic get method. Can be used as a base for building more complicated requests
   * @param {string} url The url to fetch the resource from. Can be a full url, or relative path from the base url
   * @param {any} [headers] The headers to add to the request
   * @param {boolean} [useBaseUrl=true] Flag used to determine whether to use HttpDal.baseUrl or not
   * @returns {Promise<any>} the response from the requested resource
   */
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
