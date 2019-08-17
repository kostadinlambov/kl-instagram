import * as actions from "./actions";
import * as getters from "./getters";

import Vue from "vue";

import {
  FETCH_ALL_USERS,
  FETCH_ALL_USERS_ADMIN,
  PROMOTE_USER,
  DEMOTE_USER,
  RESET_STATE,
  FOLLOW_USER_SUCCESS,
  UNFOLLOW_USER_SUCCESS,
  FETCH_ALL_FOLLOWERS,
  FETCH_ALL_FOLLOWING
} from "./mutationTypes";

// initial state
const initialState = {
  usersAdmin: [],
  users: [],
  followers: [],
  following: [],
  followingCandidates: []
};

const mutations = {
  [FETCH_ALL_USERS]: (state, payload) => {
    state.users = payload.users;
    debugger;
    setFollowingCandidates(state);
  },

  [FETCH_ALL_USERS_ADMIN]: (state, payload) => {
    state.usersAdmin = payload.users;
  },

  [FETCH_ALL_FOLLOWERS]: (state, payload) => {
    state.followers = payload.followers;
    setIsActiveProperty(state);
  },

  [FETCH_ALL_FOLLOWING]: (state, payload) => {
    state.following = payload.following;
  },

  [PROMOTE_USER]: (state, payload) => {
    changeUserRole(payload.userData.id, payload.userData.role, state);
  },

  [DEMOTE_USER]: (state, payload) => {
    changeUserRole(payload.userData.id, payload.userData.role, state);
  },

  [FOLLOW_USER_SUCCESS]: (state, payload) => {
    updateUsersArr(state, payload.userToFollowId, true);
    updateFollowingArr(state, payload.userToFollowId, true);
    updateFollowersArr(state, payload.userToFollowId, true);
    updateFollowingCandidates(state, payload.userToFollowId, true);
  },

  [UNFOLLOW_USER_SUCCESS]: (state, payload) => {
    updateUsersArr(state, payload.userToUnFollowId, false);
    updateFollowingArr(state, payload.userToUnFollowId, false);
    updateFollowersArr(state, payload.userToUnFollowId, false);
    updateFollowingCandidates(state, payload.userToUnFollowId, false);
  },

  [RESET_STATE]: state => {
    for (let f in state) {
      Vue.set(state, f, initialState[f]);
    }
  }
};

const setFollowingCandidates = state => {
  const newArr = state.users.filter(user => !user.active);

  state.followingCandidates = [...newArr];
};

const updateFollowingCandidates = (state, userId, active) => {
  const newArr = state.followingCandidates.map(user => {
    if (user.id !== userId) {
      return user;
    }

    return {
      ...user,
      active
    };
  });

  state.followingCandidates = [...newArr];
};

const setIsActiveProperty = state => {
  const newArr = state.followers.map(follower => {
    state.users.forEach(user => {
      if (user.id != follower.followerId) {
        return;
      }
      follower.active = user.active;
    });

    return {
      ...follower
    };
  });

  state.followers = [...newArr];
};

const updateUsersArr = (state, userId, active) => {
  const newArr = state.users.map(user => {
    if (user.id !== userId) {
      return user;
    }

    return {
      ...user,
      active
    };
  });

  state.users = [...newArr];
};

const updateFollowingArr = (state, userId, active) => {
  const newArr = state.following.map(user => {
    if (user.userId !== userId) {
      return user;
    }

    return {
      ...user,
      active
    };
  });

  state.following = [...newArr];
};

const updateFollowersArr = (state, userId, active) => {
  const newArr = state.followers.map(user => {
    if (user.followerId !== userId) {
      return user;
    }

    return {
      ...user,
      active
    };
  });

  state.followers = [...newArr];
};

const changeUserRole = (userId, role, state) => {
  const newUserArr = state.usersAdmin.map(user => {
    if (user.id !== userId) {
      return user;
    }

    return {
      ...user,
      role
    };
  });

  state.usersAdmin = [...newUserArr];
};

export default {
  state: { ...initialState },
  actions,
  getters,
  mutations
};
