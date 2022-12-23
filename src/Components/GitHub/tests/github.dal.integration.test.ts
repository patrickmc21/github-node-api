import gitHubAssembler from '../github.assembler';
import GitHubDal from '../github.dal';

describe('GitHub Dal | Integration tests', () => {
  let dal: GitHubDal;

  beforeEach(() => {
    dal = gitHubAssembler.getDal();
  });

  describe('#getUser()', () => {
    let username: string;

    beforeEach(() => {
      username = 'patrickmc21';
    });

    it('Returns the user by provided username', async () => {
      const result = await dal.getUser(username);
      expect(result).toBeInstanceOf(Object);
    });

    it('Returns an error if provided username does not exist', async () => {
      username = 'fake-owner';
      try {
        await dal.getUser(username);
        expect('Call resolved successfully').toEqual('Call should error and throw');
      } catch (error) {
        expect(error.message).toEqual('GitHub API Error: Resource not found');
      }
    });
  });

  describe('#getRepo()', () => {
    let owner: string;
    let repo: string;

    beforeEach(() => {
      owner = 'patrickmc21';
      repo = 'github-node-api';
    });

    it('Returns the repo by the given owner and repo name', async () => {
      const result = await dal.getRepo(owner, repo);
      expect(result).toBeInstanceOf(Object);
    });

    it('Returns an error if an invalid owner or repo is provided', async () => {
      repo = 'fake-repo';
      try {
        await dal.getRepo(owner, repo);
        expect('Call resolved successfully').toEqual('Call should error and throw');
      } catch (error) {
        expect(error.message).toEqual('GitHub API Error: Resource not found');
      }
    });
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
        await dal.getPullRequestsByRepo(owner, repo);
        expect('Call resolved successfully').toEqual('Call should error and throw');
      } catch (error) {
        expect(error.message).toEqual(
          'GitHub API Error: An unexpected error has occured. Please try your request at a later time'
        );
      }
    });
  });
});
