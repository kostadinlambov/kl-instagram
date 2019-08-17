export const getAllUsersAdmin = state => state.usersAdmin;

export const getAllUsers = state => state.users;

export const getFollowingCount = state =>
  state.users.filter(user => user.active === true).length;

export const getFollowersCount = state => state.followers.length;

export const getFollowers = state => state.followers;

export const getFollowing = state => state.following;

export const getFollowingCandidates = state => state.followingCandidates;
