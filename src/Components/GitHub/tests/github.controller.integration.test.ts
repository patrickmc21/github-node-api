import GitHubController from '../github.controller';
import gitHubAssembler from '../github.assembler';
import { NotFoundApiError } from '../../../Types/ApiErrorTypes';

describe('GitHubController | Integration Tests', () => {
  let controller: GitHubController;

  beforeEach(() => {
    controller = gitHubAssembler.getController();
  });

  describe('#validateUser()', () => {
    let user: string;
    beforeEach(() => {
      user = 'patrickmc21';
    });

    it('Returns true if the provided user exists in GitHub', async () => {
      const result = await controller.validateUser(user);
      expect(result).toEqual(true);
    });

    it('Throws a NotFoundApiError if the provided user does not exist in GitHub', async () => {
      try {
        await controller.validateUser('fake-owner');
        expect('Call resolved successfully').toEqual('Call should error and throw');
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundApiError);
      }
    });
  });

  describe('#validateRepo()', () => {
    let owner: string;
    let repo: string;
    beforeEach(() => {
      owner = 'patrickmc21';
      repo = 'github-node-api';
    });

    it('Returns true if the provided repo exists in GitHub', async () => {
      const result = await controller.validateRepo(owner, repo);
      expect(result).toEqual(true);
    });

    it('Throws a NotFoundApiError if the provided repo does not exist in GitHub', async () => {
      try {
        await controller.validateRepo(owner, 'fake-repo');
        expect('Call resolved successfully').toEqual('Call should error and throw');
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundApiError);
      }
    });
  });

  describe('#getOpenPullRequestsByRepo()', () => {
    let owner: string;
    let repo: string;
    beforeEach(() => {
      owner = 'patrickmc21';
      repo = 'github-node-api';
    });

    it('Returns all open pull requests by repo', async () => {
      const result = await controller.getOpenPullRequestsByRepo(owner, repo);
      expect(result).toBeInstanceOf(Array);
    });

    it('Throws errors', async () => {
      try {
        await controller.getOpenPullRequestsByRepo(owner, 'some-other-repo');
        expect('Call resolved successfully').toEqual('Call should error and throw');
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundApiError);
      }
    });
  });
});
