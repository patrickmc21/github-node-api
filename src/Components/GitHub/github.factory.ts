import Factory from '../../AbstractClasses/factory';
import { GitHubCommit, GitHubRepo, GitHubUser } from '../../Types/GitHubApi.type';
import { GitHubPullRequestFormatted } from '../../Types/GitHubPullRequest.type';
import GitHubDal from './github.dal';

/**
 * GitHubFactory
 *
 * @class GitHubFactory
 * @extends Factory
 *
 * @example
 * const gitHubFactory = new GitHubFactory(gitHubDal);
 * gitHubFactory.getUser('myUserName');
 *
 * @description Factory layer for GitHub REST API
 */
class GitHubFactory extends Factory {
  /**
   * @memberof GitHubFactory
   * @protected
   * @property {GitHubDal} dal Data Access Layer for factory
   */
  protected dal: GitHubDal;

  constructor(dal: GitHubDal) {
    super(dal);
  }

  /**
   * @memberof GitHubFactory
   * @async
   * @method getUser
   * @description Retrieves a user object by given username
   * @param {string} username
   * @returns {Promise<GitHubUser>}
   */
  async getUser(username: string): Promise<GitHubUser> {
    const user = await this.dal.getUser(username);
    return user;
  }

  /**
   * @memberof GitHubFactory
   * @async
   * @method getRepo
   * @description Retrieves a repo object by given owner and repo name
   * @param {string} owner owner of the GitHub repository
   * @param {string} repo name of repository
   * @returns {Promise<GitHubRepo>}
   */
  async getRepo(owner: string, repo: string): Promise<GitHubRepo> {
    const repository = await this.dal.getRepo(owner, repo);
    return repository;
  }

  /**
   * @memberof GitHubFactory
   * @async
   * @method getOpenPullRequestsByRepo
   * @description Retrieves all open pull requests by provided repo name
   * @param {string} owner owner of the GitHub repository
   * @param {string} repo name of the GitHub repository
   * @returns {Promise<GitHubPullRequestFormatted[]>} array of all open pull requests
   */
  async getOpenPullRequestsByRepo(owner: string, repo: string): Promise<GitHubPullRequestFormatted[]> {
    const pullRequests = await this.dal.getPullRequestsByRepo(owner, repo);
    const pullRequestPromises: Promise<GitHubPullRequestFormatted>[] = pullRequests
      .filter((pr) => pr.state === 'open')
      .map(async (pr) => {
        const commits = await this.dal.getReferencedItemUrl<GitHubCommit[]>(pr.commits_url);

        return {
          id: pr.id,
          number: pr.number,
          title: pr.title,
          author: pr.user.login,
          commit_count: commits.length,
        };
      });

    return Promise.all(pullRequestPromises);
  }
}

export default GitHubFactory;
