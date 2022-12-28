import Factory from './factory';

/**
 * Controller
 * @abstract
 * @class Controller
 *
 * @example
 * class MyController extends Controller {...};
 */
export default abstract class Controller {
  /**
   * @memberof Controller
   * @protected
   * @property {Factory} factory
   */
  protected factory: Factory;

  constructor(factory: Factory) {
    this.factory = factory;
  }
}
