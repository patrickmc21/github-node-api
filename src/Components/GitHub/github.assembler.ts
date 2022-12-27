import Assembler from '../../AbstractClasses/assembler';
import GitHubController from './github.controller';
import GitHubDal from './github.dal';
import GitHubFactory from './github.factory';

/**
 * GitHub Assembler
 *
 * @class GitHubAssembler
 *
 * @extends Assembler
 *
 * @example
 * import gitHubAssembler from "../gitHub.assembler";
 * const gitHubController = gitHubAssembler.getController();
 *
 * @description Assembler class responsible for building the GitHub component.
 * Includes a controller, factory, and http DAL
 */
class GitHubAssembler extends Assembler {
  /**
   * @private
   * @property {GitHubController} controller singleton instance of controller class
   */
  private controller: GitHubController;

  /**
   * @private
   * @property {GitHubDal} dal singleton instance of DAL class
   */
  private dal: GitHubDal;

  /**
   * @private
   * @property {GitHubFactory} factory singleton instance of factory class
   */
  private factory: GitHubFactory;

  /**
   * @public
   * @memberof GitHubAssembler
   * @method getController
   * @description Returns the GitHub Controller singleton instance. Entrypoint of the component.
   * @returns {GitHubController}
   */
  public getController(): GitHubController {
    if (this.controller) return this.controller;

    const factory = this.getFactory();
    const controller = new GitHubController(factory);
    this.controller = controller;
    return controller;
  }

  /**
   * @protected
   * @memberof GitHubAssembler
   * @method getFactory
   * @description Returns the GitHub Factory singleton instance
   * @returns {GitHubFactory}
   */
  protected getFactory(): GitHubFactory {
    if (this.factory) return this.factory;

    const dal = this.getDal();
    const factory = new GitHubFactory(dal);
    this.factory = factory;
    return factory;
  }

  /**
   * @protected
   * @memberof GitHubAssembler
   * @method getDal
   * @description Returns the GitHub DAL singleton instance
   * @returns {GitHubDal}
   */
  protected getDal(): GitHubDal {
    if (this.dal) return this.dal;

    const baseUrl = process.env.GITHUB_BASE_URL;
    const dal = new GitHubDal(baseUrl);
    this.dal = dal;
    return dal;
  }
}

export default new GitHubAssembler();
