import Factory from './factory';

export default abstract class Controller {
  protected factory: Factory;

  constructor(factory: Factory) {
    this.factory = factory;
  }
}
