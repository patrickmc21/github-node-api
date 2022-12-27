import { instance, mock, verify, when } from 'ts-mockito';

import GitHubController from '../github.controller';
import GitHubFactory from '../github.factory';
import { ExternalApiError, InternalApiError, NotFoundApiError } from '../../../Types/ApiErrorTypes';
import mockUser from './mocks/user.mock';
import mockRepo from './mocks/repo.mock';
import mockPullRequest from './mocks/pullRequest.mock';
import mockFormattedPullRequest from './mocks/formattedPullRequest.mock';
import mockCommit from './mocks/commit.mock';
import BaseApiError from '../../../Types/ApiErrorTypes/BaseApiError';

describe('GitHubController | Unit Tests', () => {
  let controller: GitHubController;
  let factory: GitHubFactory;

  beforeEach(() => {
    factory = mock(GitHubFactory);
    controller = new GitHubController(instance(factory));
  });

  describe('#validateUser()', () => {
    let user: string;
    beforeEach(() => {
      user = mockUser.login;
      when(factory.getUser(user)).thenResolve(mockUser);
    });

    it('Calls factory.getUser() with correct args', async () => {
      await controller.validateUser(user);
      verify(factory.getUser(user)).once();
    });

    it('Returns true if the provided user exists in GitHub', async () => {
      const result = await controller.validateUser(user);
      expect(result).toEqual(true);
    });

    it('Throws a NotFoundApiError if the provided user does not exist in GitHub', async () => {
      when(factory.getUser('fake-owner')).thenReject(new BaseApiError('GitHub API Error: Resource not found', 404));
      try {
        await controller.validateUser('fake-owner');
        expect('Call resolved successfully').toEqual('Call should error and throw');
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundApiError);
      }
    });

    it('Throws an error if an exception occurs', async () => {
      when(factory.getUser('fake-owner')).thenReject(new Error('Exception'));
      try {
        await controller.validateUser('fake-owner');
        expect('Call resolved successfully').toEqual('Call should error and throw');
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });

  describe('#validateRepo()', () => {
    let owner: string;
    let repo: string;
    beforeEach(() => {
      owner = mockUser.login;
      repo = mockRepo.name;
      when(factory.getRepo(owner, repo)).thenResolve(mockRepo);
    });

    it('Calls factory.getRepo() with correct args', async () => {
      await controller.validateRepo(owner, repo);
      verify(factory.getRepo(owner, repo)).once();
    });

    it('Returns true if the provided repo exists in GitHub', async () => {
      const result = await controller.validateRepo(owner, repo);
      expect(result).toEqual(true);
    });

    it('Throws a NotFoundApiError if the provided repo does not exist in GitHub', async () => {
      when(factory.getRepo(owner, 'fake-repo')).thenThrow(
        new BaseApiError('GitHub API Error: Resource not found', 404)
      );
      try {
        await controller.validateRepo(owner, 'fake-repo');
        expect('Call resolved successfully').toEqual('Call should error and throw');
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundApiError);
      }
    });

    it('Throws n error if the an exception occurs', async () => {
      when(factory.getRepo(owner, 'fake-repo')).thenThrow(new Error('GitHub API Error: Resource not found'));
      try {
        await controller.validateRepo(owner, 'fake-repo');
        expect('Call resolved successfully').toEqual('Call should error and throw');
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });

  describe('#getOpenPullRequestsByRepo()', () => {
    let owner: string;
    let repo: string;
    beforeEach(() => {
      owner = mockUser.login;
      repo = mockRepo.name;
      when(factory.getOpenPullRequestsByRepo(owner, repo)).thenResolve([mockFormattedPullRequest]);
    });
    it('Validates the user', async () => {
      const spy = jest.spyOn(controller, 'validateUser');
      await controller.getOpenPullRequestsByRepo(owner, repo);
      expect(spy).toHaveBeenCalledWith(owner);
    });

    it('Validates the repo', async () => {
      const spy = jest.spyOn(controller, 'validateRepo');
      await controller.getOpenPullRequestsByRepo(owner, repo);
      expect(spy).toHaveBeenCalledWith(owner, repo);
    });

    it('Calls factory.getOpenPullRequestsByRepo() with correct args', async () => {
      await controller.getOpenPullRequestsByRepo(owner, repo);
      verify(factory.getOpenPullRequestsByRepo(owner, repo)).once();
    });

    it('Returns all open pull requests by repo', async () => {
      const result = await controller.getOpenPullRequestsByRepo(owner, repo);
      expect(result).toEqual([mockFormattedPullRequest]);
    });

    it('Returns an empty array if the given repo does not have open PRs', async () => {
      when(factory.getOpenPullRequestsByRepo(owner, 'some-other-repo')).thenResolve([]);
      const result = await controller.getOpenPullRequestsByRepo(owner, 'some-other-repo');
      expect(result).toEqual([]);
    });

    it('Converts intances of BaseApiError to ExternalApiErrors', async () => {
      when(factory.getOpenPullRequestsByRepo(owner, 'some-other-repo')).thenThrow(
        new BaseApiError('GitHub API Error: Validation failed, or the endpoint has been spammed.', 422)
      );
      try {
        await controller.getOpenPullRequestsByRepo(owner, 'some-other-repo');
        expect('Call resolved successfully').toEqual('Call should error and throw');
      } catch (error) {
        expect(error).toBeInstanceOf(ExternalApiError);
        expect(error.message).toEqual(
          'Error: Internal Server Error - GitHub API Error: Validation failed, or the endpoint has been spammed.'
        );
        expect(error.meta).toEqual({ status: 422 });
      }
    });

    it('Throws InternalApiError for any undhandled exceptions', async () => {
      when(factory.getOpenPullRequestsByRepo(owner, 'some-other-repo')).thenThrow(
        new Error('An exception has occured')
      );
      try {
        await controller.getOpenPullRequestsByRepo(owner, 'some-other-repo');
        expect('Call resolved successfully').toEqual('Call should error and throw');
      } catch (error) {
        expect(error).toBeInstanceOf(InternalApiError);
        expect(error.message).toEqual('Error: Internal Server Error - An exception has occured');
      }
    });
  });
});
