import { GitHubPullRequestFormatted } from '../../../../Types/GitHubPullRequest.type';
import mockPullRequest from './pullRequest.mock';

const formattedPullRequest: GitHubPullRequestFormatted = {
  id: mockPullRequest.id,
  number: mockPullRequest.number,
  title: mockPullRequest.title,
  author: mockPullRequest.user.login,
  commit_count: 3,
};

export default formattedPullRequest;
