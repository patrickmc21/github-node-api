import Controller from '../../AbstractClasses/controller';
import { BaseApiError, ExternalApiError, InternalApiError, NotFoundApiError } from '../../Types/ApiErrorTypes';
import { GitHubPullRequestFormatted } from '../../Types/GitHubPullRequest.type';
import GitHubFactory from './github.factory';

/**
 * GitHubController
 *
 * @class GitHubController
 *
 * @extends Controller
 *
 * @example
 * const gitHubController = new GitHubController(gitHubFactory);
 * gitHubController.validateUser('myUserName');
 *
 * @description Controller layer for GitHub REST API component
 */
class GitHubController extends Controller {
  /**
   * @memberof GitHubController
   * @protected
   * @property {GitHubFactory} factory factory layer for controller
   */
  protected factory: GitHubFactory;

  constructor(factory: GitHubFactory) {
    super(factory);
  }

  /**
   * @memberof GitHubController
   * @async
   * @method validateUser
   * @description Validates a given user name.
   * @param {string} user username to validate
   * @returns {Promise<true>} Returns true if user exists in GitHub
   * @throws {NotFoundApiError}
   */
  public async validateUser(user: string): Promise<true> {
    try {
      await this.factory.getUser(user);
      return true;
    } catch (error) {
      if (error instanceof BaseApiError && error.status === 404) {
        throw new NotFoundApiError({ ...error });
      }

      throw error;
    }
  }

  /**
   * @memberof GitHubController
   * @async
   * @method validateRepo
   * @description Validates a given repo exists by name
   * @param {string} owner github user who owns the repository
   * @param {string} repo name of the repository
   * @returns {Promise<true>} Returns true if repo exists in GitHub
   * @throws {NotFoundApiError}
   */
  public async validateRepo(owner: string, repo: string): Promise<true> {
    try {
      await this.factory.getRepo(owner, repo);
      return true;
    } catch (error) {
      if (error instanceof BaseApiError && error.status === 404) {
        throw new NotFoundApiError({ ...error });
      }

      throw error;
    }
  }

  /**
   * @memberof GitHubController
   * @async
   * @method getOpenPullRequestsByRepo
   * @description Gets all open pull requests associated with a github repo
   * @param {string} owner github user who owns the repository
   * @param {string} repo name of the github repository
   * @returns {Promise<GitHubPullRequestFormatted[]>} Array of pull requests associated with a repo
   * @throws {NotFoundApiError | ExternalApiError | InternalApiError}
   */
  public async getOpenPullRequestsByRepo(owner: string, repo: string): Promise<GitHubPullRequestFormatted[]> {
    try {
      await Promise.all([this.validateUser(owner), this.validateRepo(owner, repo)]);
      return this.factory.getOpenPullRequestsByRepo(owner, repo);
    } catch (error) {
      if (error instanceof BaseApiError) {
        switch (true) {
          case error instanceof NotFoundApiError:
          case error instanceof ExternalApiError:
          case error instanceof InternalApiError:
            throw error;
          default:
            if (error.message.includes('GitHub API Error:')) {
              throw new ExternalApiError(error.message, error);
            }

            throw new InternalApiError(error.message, error);
        }
      }

      throw new InternalApiError(error.message);
    }
  }
}

export default GitHubController;
