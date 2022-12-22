import HttpDal from '../../AbstractClasses/httpDal';
import { GitHubPullRequest } from '../../Types/GitHubApi.type';

export default class GithubDal extends HttpDal {
  private static GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  constructor(baseUrl: string) {
    super(baseUrl);
  }

  public async getPullReqestsByRepo(owner: string, repo: string): Promise<GitHubPullRequest[] | null> {
    const url = `/repos/${owner}/${repo}/pulls`;
    const headers = {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${GithubDal.GITHUB_TOKEN}`,
      'X-GitHub-Api-Version': '2022-11-28',
    };

    const response = await this.get(url, headers);
    // some error handling?
    const data = await response.json();
    return data.length > 0 ? data : null;
  }
}
