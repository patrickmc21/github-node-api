import HttpDal from '../../AbstractClasses/httpDal';
import { GitHubPullRequest, GitHubRepo, GitHubUser } from '../../Types/GitHubApi.type';

/**
 * GitHubDal
 *
 * @class GitHubDal
 *
 * @extends HttpDal
 *
 * @example
 * const gitHubDal = new GitHubDal(process.env.GITHUB_BASE_URL);
 * gitHubDal.getUser('myUserName');
 *
 * @description Data Access Layer for GitHub REST API, using cURL rather than oktokit implementation
 *
 * @see https://docs.github.com/en/rest/quickstart?apiVersion=2022-11-28&tool=curl
 */
export default class GitHubDal extends HttpDal {
  /**
   * @memberof GitHubDal
   * @static
   * @property GITHUB_TOKEN
   * @description Classic GitHub token required to access GitHub API
   * @see https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token#creating-a-personal-access-token-classic
   */
  private static GITHUB_TOKEN = process.env.GITHUB_TOKEN;

  /**
   * @memberof GitHubDal
   * @static
   * @property BASE_GITHUB_HEADERS
   * @description Headers required on all requests to GitHub REST API
   */
  private static BASE_GITHUB_HEADERS = {
    Accept: 'application/vnd.github+json',
    Authorization: `Bearer ${GitHubDal.GITHUB_TOKEN}`,
    'X-GitHub-Api-Version': '2022-11-28',
  };

  /**
   * @memberof GitHubDal
   * @method constructor
   * @param baseUrl Base GitHub REST API url
   */
  constructor(baseUrl: string) {
    super(baseUrl);
  }

  /**
   * @memberof GitHubDal
   * @method getUser
   * @description Retrieves a user object by given username
   * @param {string} username
   * @returns {Promise<GitHubUser>} retrieved user by username
   * @throws {Error} Throws error if GitHub REST API returns a 404 response, or if !response.ok
   */
  public async getUser(username: string): Promise<GitHubUser> {
    const url = `/users/${username}`;
    const headers = {
      ...GitHubDal.BASE_GITHUB_HEADERS,
    };

    const response = await this.get(url, headers);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      let message = 'GitHub API Error:';
      switch (response.status) {
        case 404:
          message += ' Resource not found';
          break;
        default:
          message += ' An unexpected error has occured. Please try your request at a later time';
      }
      throw new Error(message);
    }
  }

  /**
   * @memberof GitHubDal
   * @method getRepo
   * @description Retrieves a repo object by owner and repo names
   * @param {string} owner Owner of the repository
   * @param {string} repo name of repository
   * @returns {Promise<GitHubRepo>} retrieved repo
   * @throws {Error} Throws error if GitHub REST API returns a 301, 403, 404 response, or if !response.ok
   */
  public async getRepo(owner: string, repo: string): Promise<GitHubRepo> {
    const url = `/repos/${owner}/${repo}`;
    const headers = {
      ...GitHubDal.BASE_GITHUB_HEADERS,
    };

    const response = await this.get(url, headers);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      let message = 'GitHub API Error:';
      switch (response.status) {
        case 301:
          message += ' Moved permanently';
          break;
        case 403:
          message += ' Forbidden';
          break;
        case 404:
          message += ' Resource not found';
          break;
        default:
          message += ' An unexpected error has occured. Please try your request at a later time';
      }
      throw new Error(message);
    }
  }

  /**
   * @memberof GitHubDal
   * @method getPullRequestByRepo
   * @description Retrieves all pull requests associated with the supplied owner and repo names
   * @param {string} owner Owner of the repository
   * @param {string} repo name of repository
   * @returns {Promise<GitHubPullRequest[]>} retrieved repo
   * @throws {Error} Throws error if GitHub REST API returns a 302, 422, or if !response.ok
   */
  public async getPullRequestsByRepo(owner: string, repo: string): Promise<GitHubPullRequest[]> {
    const url = `/repos/${owner}/${repo}/pulls`;
    const headers = {
      ...GitHubDal.BASE_GITHUB_HEADERS,
    };

    const response = await this.get(url, headers);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      let message = 'GitHub API Error:';
      switch (response.status) {
        case 302:
          message += ' Not Modified';
          break;
        case 422:
          message += ' Validation failed, or the endpoint has been spammed.';
          break;
        default:
          message += ' An unexpected error has occured. Please try your request at a later time';
      }
      throw new Error(message);
    }
  }
}
