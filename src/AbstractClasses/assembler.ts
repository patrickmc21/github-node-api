import Controller from './controller';
import Factory from './factory';
import HttpDal from './httpDal';

/**
 * Assembler
 * @abstract
 * @class Assembler
 *
 * @example
 * class MyAssembler extends Assembler {
 *    getController() {...}
 * }
 */
export default abstract class Assembler {
  /**
   * @memberof Assembler
   * @public
   * @method getController
   * @description Returns the controller for a given component. Public interface of the assembler
   * @returns {Controller}
   */
  public abstract getController(): Controller;

  /**
   * @memberof Assembler
   * @public
   * @method getFactory
   * @description Returns the factory for a given component.
   * @returns {Factory}
   */
  protected abstract getFactory(): Factory;

  /**
   * @memberof Assembler
   * @public
   * @method getDal
   * @description Returns the data access layer for a given component.
   * @returns {HttpDal}
   */
  protected abstract getDal(): HttpDal;
}
