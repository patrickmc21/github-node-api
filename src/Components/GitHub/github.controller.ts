import Controller from '../../AbstractClasses/controller';
import { BaseApiError, ExternalApiError, InternalApiError, NotFoundApiError } from '../../Types/ApiErrorTypes';
import { GitHubPullRequestFormatted } from '../../Types/GitHubPullRequest.type';
import GitHubFactory from './github.factory';

class GitHubController extends Controller {
  protected factory: GitHubFactory;
  constructor(factory: GitHubFactory) {
    super(factory);
  }

  public async validateUser(user: string): Promise<true> {
    try {
      await this.factory.getUser(user);
      return true;
    } catch (error) {
      if (error instanceof BaseApiError && error.status === 404) {
        throw new NotFoundApiError({ ...error });
      }

      throw error;
    }
  }

  public async validateRepo(owner: string, repo: string): Promise<true> {
    try {
      await this.factory.getRepo(owner, repo);
      return true;
    } catch (error) {
      if (error instanceof BaseApiError && error.status === 404) {
        throw new NotFoundApiError({ ...error });
      }

      throw error;
    }
  }

  public async getOpenPullRequestsByRepo(owner: string, repo: string): Promise<GitHubPullRequestFormatted[]> {
    try {
      await Promise.all([this.validateUser(owner), this.validateRepo(owner, repo)]);
      return this.factory.getOpenPullRequestsByRepo(owner, repo);
    } catch (error) {
      if (error instanceof BaseApiError) {
        switch (true) {
          case error instanceof NotFoundApiError:
          case error instanceof ExternalApiError:
          case error instanceof InternalApiError:
            throw error;
          default:
            if (error.message.includes('GitHub API Error:')) {
              throw new ExternalApiError(error.message, error);
            }

            throw new InternalApiError(error.message, error);
        }
      }

      throw new InternalApiError(error.message);
    }
  }
}

export default GitHubController;
