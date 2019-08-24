export const getAllUsersAdmin = state => state.usersAdmin;

export const getAllUsers = state => state.users;

export const getFirstFiveUsers = state => state.users.slice(0, 5);

export const getFollowers = state => state.followers;

export const getFollowersCount = state => state.followers.length;

export const getFollowing = state => state.following;

export const getFollowingCount = state => state.users.filter(user => user.active).length;

export const getFollowingCandidates = state => state.followingCandidates;

export const getFirstThreeFollowingCandidates = state => state.followingCandidates.slice(0, 3);
