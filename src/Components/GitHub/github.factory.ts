import Factory from '../../AbstractClasses/factory';
import { GitHubCommit, GitHubRepo, GitHubUser } from '../../Types/GitHubApi.type';
import { GitHubPullRequestFormatted } from '../../Types/GitHubPullRequest.type';
import GitHubDal from './github.dal';

class GitHubFactory extends Factory {
  protected dal: GitHubDal;
  constructor(dal: GitHubDal) {
    super(dal);
  }

  async getUser(username: string): Promise<GitHubUser> {
    const user = await this.dal.getUser(username);
    return user;
  }

  async getRepo(owner: string, repo: string): Promise<GitHubRepo> {
    const repository = await this.dal.getRepo(owner, repo);
    return repository;
  }

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
