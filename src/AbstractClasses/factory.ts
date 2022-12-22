import HttpDal from './httpDal';

export default abstract class Factory {
  private dal: HttpDal;

  constructor(dal: HttpDal) {
    this.dal = dal;
  }
}
