import HttpDal from '../../AbstractClasses/httpDal';
import { GitHubPullRequest } from '../../Types/GitHubApi.type';

export default class GithubDal extends HttpDal {
  private static GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  constructor(baseUrl: string) {
    super(baseUrl);
  }

  public async getPullRequestsByRepo(owner: string, repo: string): Promise<GitHubPullRequest[]> {
    const url = `/repos/${owner}/${repo}/pulls`;
    const headers = {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${GithubDal.GITHUB_TOKEN}`,
      'X-GitHub-Api-Version': '2022-11-28',
    };

    const response = await this.get(url, headers);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      let message = 'GitHub API Error:';
      switch (response.statusCode) {
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
