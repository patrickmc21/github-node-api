import Assembler from '../../AbstractClasses/assembler';
import GitHubController from './github.controller';
import GithubDal from './github.dal';
import GitHubFactory from './github.factory';

class GitHubAssembler extends Assembler {
  private controller: GitHubController;
  private dal: GithubDal;
  private factory: GitHubFactory;

  public getController(): GitHubController {
    if (this.controller) return this.controller;

    const factory = this.getFactory();
    const controller = new GitHubController(factory);
    this.controller = controller;
    return controller;
  }
  public getFactory(): GitHubFactory {
    if (this.factory) return this.factory;

    const dal = this.getDal();
    const factory = new GitHubFactory(dal);
    this.factory = factory;
    return factory;
  }

  public getDal(): GithubDal {
    if (this.dal) return this.dal;

    const baseUrl = 'https://api.github.com';
    const dal = new GithubDal(baseUrl);
    this.dal = dal;
    return dal;
  }
}

export default new GitHubAssembler();
