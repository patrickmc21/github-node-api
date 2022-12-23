/**
 * GitHubPullRequest
 * @type GitHubPullRequest
 * @alias GitHubPullRequest
 */
export type GitHubPullRequest = {
  url: string;
  id: number;
  node_id: string;
  html_url: string;
  diff_url: string;
  patch_url: string;
  issue_url: string;
  commits_url: string;
  review_comments_url: string;
  review_comment_url: string;
  comments_url: string;
  statuses_url: string;
  number: number;
  state: string;
  locked: boolean;
  title: string;
  user: GitHubUser;
  body: string;
  labels: GitHubLabel[];
  milestone: GitHubMilestone;
  active_lock_reason: string;
  created_at: string;
  updated_at: string;
  closed_at: string;
  merged_at: string;
  merge_commit_sha: string;
  assignee: GitHubUser;
  assignees: GitHubUser[];
  requested_teams: GitHubTeam[];
  head: GitHubCommit;
  base: GitHubCommit;
  author_association: string;
  auto_merge: null;
  draft: boolean;
};

/**
 * GitHubUser
 * @type GitHubUser
 * @alias GitHubUser
 */
export type GitHubUser = {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: 'User';
  site_admin: boolean;
};

/**
 * GitHubLabel
 * @type GitHubLabel
 * @alias GitHubLabel
 */
export type GitHubLabel = {
  id: number;
  node_id: string;
  url: string;
  name: string;
  description: string;
  color: string;
  default: boolean;
};

/**
 * GitHubMilestone
 * @type GitHubMilestone
 * @alias GitHubMilestone
 */
export type GitHubMilestone = {
  url: string;
  html_url: string;
  labels_url: string;
  id: number;
  node_id: string;
  number: number;
  state: string;
  title: string;
  description: string;
  creator: GitHubUser;
  open_issues: boolean;
  closed_issues: boolean;
  created_at: string;
  updated_at: string;
  closed_at: string;
  due_on: string;
};

/**
 * GitHubTeam
 * @type GitHubTeam
 * @alias GitHubTeam
 */
export type GitHubTeam = {
  id: number;
  node_id: string;
  url: string;
  html_url: string;
  name: string;
  slug: string;
  description: string;
  privacy: string;
  permission: string;
  members_url: string;
  repositories_url: string;
  parent: null;
};

/**
 * GitHubCommit
 * @type GitHubCommit
 * @alias GitHubCommit
 */
export type GitHubCommit = {
  label: string;
  ref: string;
  sha: string;
  user: GitHubUser;
  repo: GitHubRepo;
};

/**
 * GitHubRepo
 * @type GitHubRepo
 * @alias GitHubRepo
 */
export type GitHubRepo = {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  owner: GitHubUser;
  private: boolean;
  html_url: string;
  description: string;
  fork: boolean;
  url: string;
  archive_url: string;
  assignees_url: string;
  blobs_url: string;
  branches_url: string;
  collaborators_url: string;
  comments_url: string;
  commits_url: string;
  compare_url: string;
  contents_url: string;
  contributors_url: string;
  deployments_url: string;
  downloads_url: string;
  events_url: string;
  forks_url: string;
  git_commits_url: string;
  git_refs_url: string;
  git_tags_url: string;
  git_url: string;
  issue_comment_url: string;
  issue_events_url: string;
  issues_url: string;
  keys_url: string;
  labels_url: string;
  languages_url: string;
  merges_url: string;
  milestones_url: string;
  notifications_url: string;
  pulls_url: string;
  releases_url: string;
  ssh_url: string;
  stargazers_url: string;
  statuses_url: string;
  subscribers_url: string;
  subscription_url: string;
  tags_url: string;
  teams_url: string;
  trees_url: string;
  clone_url: string;
  mirror_url: string;
  hooks_url: string;
  svn_url: string;
  homepage: string;
  language: null;
  forks_count: number;
  stargazers_count: number;
  watchers_count: number;
  size: number;
  default_branch: string;
  open_issues_count: number;
  is_template: boolean;
  topics: string[];
  has_issues: boolean;
  has_projects: boolean;
  has_wiki: boolean;
  has_pages: boolean;
  has_downloads: boolean;
  archived: boolean;
  disabled: boolean;
  visibility: string;
  pushed_at: string;
  created_at: string;
  updated_at: string;
  permissions: {
    admin: boolean;
    push: boolean;
    pull: boolean;
  };
  allow_rebase_merge: boolean;
  template_repository: null;
  temp_clone_token: string;
  allow_squash_merge: boolean;
  allow_auto_merge: boolean;
  delete_branch_on_merge: boolean;
  allow_merge_commit: boolean;
  subscribers_count: number;
  network_count: number;
  license: {
    key: string;
    name: string;
    url: string;
    spdx_id: string;
    node_id: string;
    html_url: string;
  };
  forks: number;
  open_issues: number;
  watchers: number;
};
