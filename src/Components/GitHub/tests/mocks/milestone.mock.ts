import { GitHubMilestone } from '../../../../Types/GitHubApi.type';
import mockUser from './user.mock';

const mockMilestone: GitHubMilestone = {
  url: 'url',
  html_url: 'html-url',
  labels_url: 'labels-url',
  id: 2,
  node_id: 'node-id',
  number: 1,
  state: 'state',
  title: 'title',
  description: 'description',
  creator: mockUser,
  open_issues: true,
  closed_issues: true,
  created_at: Date.now().toLocaleString(),
  updated_at: Date.now().toLocaleString(),
  closed_at: Date.now().toLocaleString(),
  due_on: Date.now().toLocaleString(),
};

export default mockMilestone;
