import HttpDal from './httpDal';

export default abstract class Factory {
  protected dal: HttpDal;

  constructor(dal: HttpDal) {
    this.dal = dal;
  }
}
