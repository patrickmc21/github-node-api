import Factory from './factory';

export default abstract class Controller {
  private factory: Factory;

  constructor(factory: Factory) {
    this.factory = factory;
  }
}
