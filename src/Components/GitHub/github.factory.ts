import Factory from '../../AbstractClasses/factory';
import GithubDal from './github.dal';

class GitHubFactory extends Factory {
  constructor(dal: GithubDal) {
    super(dal);
  }
}

export default GitHubFactory;
