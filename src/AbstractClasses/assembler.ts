import Controller from './controller';
import Factory from './factory';
import HttpDal from './httpDal';

export default abstract class Assembler {
  public abstract getController(): Controller;
  public abstract getFactory(): Factory;
  public abstract getDal(): HttpDal;
}
