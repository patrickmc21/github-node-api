import { GitHubPullRequest } from '../../../Types/GitHubApi.type';
import gitHubAssembler from '../github.assembler';
import GithubDal from '../github.dal';

describe('GitHub Dal | Integration tests', () => {
  let dal: GithubDal;

  beforeEach(() => {
    dal = gitHubAssembler.getDal();
  });

  describe('#getPullRequestsByRepo()', () => {
    let owner: string;
    let repo: string;

    beforeEach(() => {
      owner = 'patrickmc21';
      repo = 'github-node-api';
    });

    it('Returns all of the open PRs for a given owner and repo', async () => {
      const result = await dal.getPullRequestsByRepo(owner, repo);
      expect(result.length).toBeGreaterThan(0);
    });

    it('Returns an error if an invalid owner or repo is provided', async () => {
      owner = 'fake-owner';
      try {
        const result = await dal.getPullRequestsByRepo(owner, repo);
      } catch (error) {
        expect(error.message).toEqual(
          'GitHub API Error: An unexpected error has occured. Please try your request at a later time'
        );
      }
    });
  });
});
