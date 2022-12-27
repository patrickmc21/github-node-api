import Controller from '../../AbstractClasses/controller';
import { BaseApiError, NotFoundApiError } from '../../Types/ApiErrorTypes';
import GitHubFactory from './github.factory';

class GitHubController extends Controller {
  protected factory: GitHubFactory;
  constructor(factory: GitHubFactory) {
    super(factory);
  }

  public async validateUser(user: string): Promise<true> {
    try {
      const res = await this.factory.getUser(user);
      return true;
    } catch (error) {
      if (error instanceof BaseApiError && error.status === 404) {
        throw new NotFoundApiError({ ...error });
      }

      throw error;
    }
  }
  public async validateRepo(owner: string, repo: string): Promise<void> {}
  public async getOpenPullRequestsByRepo(owner: string, repo: string): Promise<void> {}
}

export default GitHubController;
