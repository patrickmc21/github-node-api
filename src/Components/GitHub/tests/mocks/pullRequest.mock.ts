import { GitHubPullRequest } from '../../../../Types/GitHubApi.type';
import mockCommit from './commit.mock';
import mockLabel from './label.mock';
import mockMilestone from './milestone.mock';
import mockTeam from './team.mock';
import mockUser from './user.mock';

const mockPullRequest: GitHubPullRequest = {
  url: 'mock-url',
  id: 1,
  node_id: 'node-id',
  html_url: 'html-url',
  diff_url: 'diff-url',
  patch_url: 'patch-url',
  issue_url: 'issue-url',
  commits_url: 'commits-url',
  review_comments_url: 'review-comments-url',
  review_comment_url: 'review-comment-url',
  comments_url: 'comments-url',
  statuses_url: 'statuses-url',
  number: 2,
  state: 'open',
  locked: false,
  title: 'title',
  user: mockUser,
  body: 'body',
  labels: [mockLabel],
  milestone: mockMilestone,
  active_lock_reason: 'active-lock-reason',
  created_at: Date.now().toLocaleString(),
  updated_at: Date.now().toLocaleString(),
  closed_at: Date.now().toLocaleString(),
  merged_at: null,
  merge_commit_sha: null,
  assignee: mockUser,
  assignees: [mockUser],
  requested_teams: [mockTeam],
  head: mockCommit,
  base: mockCommit,
  author_association: 'author-association',
  auto_merge: null,
  draft: false,
};

export default mockPullRequest;
