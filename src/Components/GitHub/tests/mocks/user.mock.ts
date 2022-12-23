import { GitHubUser } from '../../../../Types/GitHubApi.type';

const mockUser: GitHubUser = {
  login: 'user-login',
  id: 22,
  node_id: 'user-node-id',
  avatar_url: 'avatar-url',
  gravatar_id: 'gravatar-id',
  url: 'user-url',
  html_url: 'html-url',
  followers_url: 'followers-url',
  following_url: 'following-url',
  gists_url: 'gists-url',
  starred_url: 'starred-url',
  subscriptions_url: 'subscriptions-url',
  organizations_url: 'organizations-url',
  repos_url: 'repos-url',
  events_url: 'events-url',
  received_events_url: 'received-events-url',
  type: 'User',
  site_admin: false,
};

export default mockUser;
