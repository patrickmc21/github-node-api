import type { FetchMockStatic, MockResponseObject } from 'fetch-mock';
import fetch from 'node-fetch';
import 'fetch-mock-jest';
jest.mock('node-fetch', () => require('fetch-mock-jest').sandbox());
const fetchMock = fetch as unknown as FetchMockStatic;

import gitHubAssembler from '../github.assembler';
import GitHubDal from '../github.dal';
import mockUser from './mocks/user.mock';
import mockRepo from './mocks/repo.mock';
import mockPullRequest from './mocks/pullRequest.mock';

describe('GitHub Dal | Unit tests', () => {
  let dal: GitHubDal;
  const rootUrl = process.env.GITHUB_BASE_URL;

  beforeEach(() => {
    dal = gitHubAssembler.getDal();
    fetchMock.reset();
  });

  afterAll(() => fetchMock.restore);

  describe('#getUser()', () => {
    let username: string;

    beforeEach(() => {
      username = 'patrickmc21';
      fetchMock.get(`${rootUrl}/users/${username}`, { ...mockUser });
    });

    it('Calls fetch with the correct args', async () => {
      const expectedUrl = `${rootUrl}/users/${username}`;
      await dal.getUser(username);
      expect(fetchMock).toHaveFetched(expectedUrl);
    });

    it('Returns the user by provided username', async () => {
      const result = await dal.getUser(username);
      expect(result).toEqual(mockUser);
    });

    it('Returns an error if api responds with a 404', async () => {
      username = 'fake-owner';
      fetchMock.get(`${rootUrl}/users/${username}`, 404);
      try {
        await dal.getUser(username);
        expect('Call resolved successfully').toEqual('Call should error and throw');
      } catch (error) {
        expect(error.message).toEqual('GitHub API Error: Resource not found');
      }
    });

    it('Returns a default error', async () => {
      username = 'fake-owner';
      fetchMock.get(`${rootUrl}/users/${username}`, 500);
      try {
        await dal.getUser(username);
        expect('Call resolved successfully').toEqual('Call should error and throw');
      } catch (error) {
        expect(error.message).toEqual(
          'GitHub API Error: An unexpected error has occured. Please try your request at a later time'
        );
      }
    });
  });

  describe('#getRepo()', () => {
    let owner: string;
    let repo: string;

    beforeEach(() => {
      owner = 'patrickmc21';
      repo = 'github-node-api';
      fetchMock.get(`${rootUrl}/repos/${owner}/${repo}`, { ...mockRepo });
    });

    it('Calls fetch with the correct args', async () => {
      const expectedUrl = `${rootUrl}/repos/${owner}/${repo}`;
      await dal.getRepo(owner, repo);
      expect(fetchMock).toHaveFetched(expectedUrl);
    });

    it('Returns the repo by the given owner and repo name', async () => {
      const result = await dal.getRepo(owner, repo);
      expect(result).toEqual(mockRepo);
    });

    it('Returns an error if Api responds with a 301', async () => {
      repo = 'fake-repo';
      fetchMock.get(`${rootUrl}/repos/${owner}/${repo}`, 301);
      try {
        await dal.getRepo(owner, repo);
        expect('Call resolved successfully').toEqual('Call should error and throw');
      } catch (error) {
        expect(error.message).toEqual('GitHub API Error: Moved permanently');
      }
    });

    it('Returns an error if Api responds with a 403', async () => {
      repo = 'fake-repo';
      fetchMock.get(`${rootUrl}/repos/${owner}/${repo}`, 403);
      try {
        await dal.getRepo(owner, repo);
        expect('Call resolved successfully').toEqual('Call should error and throw');
      } catch (error) {
        expect(error.message).toEqual('GitHub API Error: Forbidden');
      }
    });

    it('Returns an error if Api responds with a 404', async () => {
      repo = 'fake-repo';
      fetchMock.get(`${rootUrl}/repos/${owner}/${repo}`, 404);
      try {
        await dal.getRepo(owner, repo);
        expect('Call resolved successfully').toEqual('Call should error and throw');
      } catch (error) {
        expect(error.message).toEqual('GitHub API Error: Resource not found');
      }
    });

    it('Returns a default error', async () => {
      repo = 'fake-repo';
      fetchMock.get(`${rootUrl}/repos/${owner}/${repo}`, 500);
      try {
        await dal.getRepo(owner, repo);
        expect('Call resolved successfully').toEqual('Call should error and throw');
      } catch (error) {
        expect(error.message).toEqual(
          'GitHub API Error: An unexpected error has occured. Please try your request at a later time'
        );
      }
    });
  });

  describe('#getPullRequestsByRepo()', () => {
    let owner: string;
    let repo: string;

    beforeEach(() => {
      owner = 'patrickmc21';
      repo = 'github-node-api';
      fetchMock.get(`${rootUrl}/repos/${owner}/${repo}/pulls`, { ...mockPullRequest });
    });

    it('Calls fetch with the correct args', async () => {
      const expectedUrl = `${rootUrl}/repos/${owner}/${repo}/pulls`;
      await dal.getPullRequestsByRepo(owner, repo);
      expect(fetchMock).toHaveFetched(expectedUrl);
    });

    it('Returns all of the open PRs for a given owner and repo', async () => {
      const result = await dal.getPullRequestsByRepo(owner, repo);
      expect(result).toEqual(mockPullRequest);
    });

    it('Returns an error if Api responds with a 302', async () => {
      repo = 'fake-repo';
      fetchMock.get(`${rootUrl}/repos/${owner}/${repo}/pulls`, 302);
      try {
        await dal.getPullRequestsByRepo(owner, repo);
        expect('Call resolved successfully').toEqual('Call should error and throw');
      } catch (error) {
        expect(error.message).toEqual('GitHub API Error: Not Modified');
      }
    });

    it('Returns an error if Api responds with a 422', async () => {
      repo = 'fake-repo';
      fetchMock.get(`${rootUrl}/repos/${owner}/${repo}/pulls`, 422);
      try {
        await dal.getPullRequestsByRepo(owner, repo);
        expect('Call resolved successfully').toEqual('Call should error and throw');
      } catch (error) {
        expect(error.message).toEqual('GitHub API Error: Validation failed, or the endpoint has been spammed.');
      }
    });

    it('Returns a default error', async () => {
      repo = 'fake-repo';
      fetchMock.get(`${rootUrl}/repos/${owner}/${repo}/pulls`, 500);
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
