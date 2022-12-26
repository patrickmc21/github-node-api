import { instance, mock, verify, when } from 'ts-mockito';

import GitHubFactory from '../github.factory';
import GitHubDal from '../github.dal';
import mockUser from './mocks/user.mock';
import mockRepo from './mocks/repo.mock';
import mockPullRequest from './mocks/pullRequest.mock';
import mockFormattedPullRequest from './mocks/formattedPullRequest.mock';
import mockCommit from './mocks/commit.mock';

describe('GitHubFactory | Unit Tests', () => {
  let factory: GitHubFactory;
  let dal: GitHubDal;

  beforeEach(() => {
    dal = mock(GitHubDal);
    factory = new GitHubFactory(instance(dal));
  });

  describe('#getUser()', () => {
    let user: string;
    beforeEach(() => {
      user = mockUser.login;
      when(dal.getUser(user)).thenResolve(mockUser);
    });

    it('Calls dal.getUser() with correct args', async () => {
      await factory.getUser(user);
      verify(dal.getUser(user)).once();
    });

    it('Returns the owner object by provided owner name', async () => {
      const result = await factory.getUser(user);
      expect(result).toEqual(mockUser);
    });
  });

  describe('#getRepo()', () => {
    let owner: string;
    let repo: string;
    beforeEach(() => {
      owner = mockUser.login;
      repo = mockRepo.name;
      when(dal.getRepo(owner, repo)).thenResolve(mockRepo);
    });

    it('Calls dal.getRepo() with correct args', async () => {
      await factory.getRepo(owner, repo);
      verify(dal.getRepo(owner, repo)).once();
    });

    it('Returns the repo object by provided owner and repo name', async () => {
      const result = await factory.getRepo(owner, repo);
      expect(result).toEqual(mockRepo);
    });
  });

  describe('#getOpenPullRequestsByRepo()', () => {
    let owner: string;
    let repo: string;
    beforeEach(() => {
      owner = mockUser.login;
      repo = mockRepo.name;
      when(dal.getPullRequestsByRepo(owner, repo)).thenResolve([
        { ...mockPullRequest },
        { ...mockPullRequest, state: 'closed' },
      ]);
      when(dal.getReferencedItemUrl(mockPullRequest.commits_url)).thenResolve([
        { ...mockCommit },
        { ...mockCommit },
        { ...mockCommit },
      ]);
    });

    it('Calls dal.getPullRequestsByRepo() with correct args', async () => {
      await factory.getOpenPullRequestsByRepo(owner, repo);
      verify(dal.getPullRequestsByRepo(owner, repo)).once();
    });

    it('Calls dal.getReferencedItemUrl() with correct args for every retrieved open PR', async () => {
      await factory.getOpenPullRequestsByRepo(owner, repo);
      verify(dal.getReferencedItemUrl(mockPullRequest.commits_url)).once();
    });

    it('Returns the array of PRs by provided owner and repo name', async () => {
      const result = await factory.getOpenPullRequestsByRepo(owner, repo);
      expect(result).toEqual(mockFormattedPullRequest);
    });
  });
});
