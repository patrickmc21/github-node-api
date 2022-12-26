import Controller from './controller';
import Factory from './factory';
import HttpDal from './httpDal';

export default abstract class Assembler {
  public abstract getController(): Controller;
  protected abstract getFactory(): Factory;
  protected abstract getDal(): HttpDal;
}
