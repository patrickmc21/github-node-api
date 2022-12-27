import { GitHubCommit } from '../../../../Types/GitHubApi.type';
import mockRepo from './repo.mock';
import mockUser from './user.mock';

const mockCommit: GitHubCommit = {
  label: 'label',
  ref: 'ref',
  sha: 'sha',
  user: mockUser,
  repo: mockRepo,
};

export default mockCommit;
