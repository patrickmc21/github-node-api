import HttpDal from '../../AbstractClasses/httpDal';
import { BaseApiError } from '../../Types/ApiErrorTypes';
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
   * @property {string} GITHUB_TOKEN Classic GitHub token required to access GitHub API
   * @see https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token#creating-a-personal-access-token-classic
   */
  private static GITHUB_TOKEN = process.env.GITHUB_TOKEN;

  /**
   * @memberof GitHubDal
   * @static
   * @property {string} BASE_GITHUB_HEADERS Headers required on all requests to GitHub REST API
   */
  private static BASE_GITHUB_HEADERS = {
    Accept: 'application/vnd.github+json',
    Authorization: `Bearer ${GitHubDal.GITHUB_TOKEN}`,
    'X-GitHub-Api-Version': '2022-11-28',
  };

  /**
   * @memberof GitHubDal
   * @static
   * @method gitHubApiErrorHandler
   * @description Generic handler for non-successful HTTP response codes
   * @param {number} responseStatus HTTP status code returned from GitHub REST API
   * @throws {BaseApiError} Error with relevant failure information
   */
  private static gitHubApiErrorHandler(responseStatus: number): void {
    let message = 'GitHub API Error:';
    switch (responseStatus) {
      case 301:
        message += ' Moved permanently';
        break;
      case 302:
        message += ' Not Modified';
        break;
      case 403:
        message += ' Forbidden';
        break;
      case 404:
        message += ' Resource not found';
        break;
      case 422:
        message += ' Validation failed, or the endpoint has been spammed.';
        break;
      default:
        message += ' An unexpected error has occured. Please try your request at a later time';
    }
    throw new BaseApiError(message, responseStatus);
  }

  constructor(baseUrl: string) {
    super(baseUrl);
  }

  /**
   * @memberof GitHubDal
   * @async
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
      GitHubDal.gitHubApiErrorHandler(response.status);
    }
  }

  /**
   * @memberof GitHubDal
   * @async
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
      GitHubDal.gitHubApiErrorHandler(response.status);
    }
  }

  /**
   * @memberof GitHubDal
   * @async
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
      GitHubDal.gitHubApiErrorHandler(response.status);
    }
  }

  /**
   * @memberof GitHubDal
   * @method getReferencedItemUrl
   * @description The GitHub REST API will return a GET url for related items. This method can be used to retrieve those items
   * @example
   * const pullRequest = await gitHubDal.getPullRequestsByRepo(owner, repo);
   * const commits = await gitHubDal.getReferencedItemUrl(pullRequest.commits_url);
   * @param {String} url url from reference item
   * @returns {any} the referenced item(s)
   */
  public async getReferencedItemUrl<T>(url: string): Promise<T> {
    const headers = {
      ...GitHubDal.BASE_GITHUB_HEADERS,
    };

    const response = await this.get(url, headers, false);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      GitHubDal.gitHubApiErrorHandler(response.status);
    }
  }
}
