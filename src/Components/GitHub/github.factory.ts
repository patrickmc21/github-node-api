import Factory from '../../AbstractClasses/factory';
import GitHubDal from './github.dal';

class GitHubFactory extends Factory {
  constructor(dal: GitHubDal) {
    super(dal);
  }
}

export default GitHubFactory;
