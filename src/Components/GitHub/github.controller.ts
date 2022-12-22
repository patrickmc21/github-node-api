import Controller from '../../AbstractClasses/controller';
import GitHubFactory from './github.factory';

class GitHubController extends Controller {
  constructor(factory: GitHubFactory) {
    super(factory);
  }
}

export default GitHubController;
