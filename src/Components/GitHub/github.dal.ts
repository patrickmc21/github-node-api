import HttpDal from '../../AbstractClasses/httpDal';
import { GitHubPullRequest, GitHubRepo, GitHubUser } from '../../Types/GitHubApi.type';

export default class GithubDal extends HttpDal {
  private static GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  private static BASE_GITHUB_HEADERS = {
    Accept: 'application/vnd.github+json',
    Authorization: `Bearer ${GithubDal.GITHUB_TOKEN}`,
    'X-GitHub-Api-Version': '2022-11-28',
  };
  constructor(baseUrl: string) {
    super(baseUrl);
  }

  public async getUser(username: string): Promise<GitHubUser> {
    const url = `/users/${username}`;
    const headers = {
      ...GithubDal.BASE_GITHUB_HEADERS,
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

  public async getRepo(owner: string, repo: string): Promise<GitHubRepo> {
    const url = `/repos/${owner}/${repo}`;
    const headers = {
      ...GithubDal.BASE_GITHUB_HEADERS,
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

  public async getPullRequestsByRepo(owner: string, repo: string): Promise<GitHubPullRequest[]> {
    const url = `/repos/${owner}/${repo}/pulls`;
    const headers = {
      ...GithubDal.BASE_GITHUB_HEADERS,
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
