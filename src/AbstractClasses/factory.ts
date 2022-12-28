import HttpDal from './httpDal';

/**
 * Factory
 * @abstract
 * @class Factory
 *
 * @example
 * class MyFactory extends Factory {...}
 */
export default abstract class Factory {
  /**
   * @memberof Factory
   * @protected
   * @property {HtttpDal} dal
   */
  protected dal: HttpDal;

  constructor(dal: HttpDal) {
    this.dal = dal;
  }
}
