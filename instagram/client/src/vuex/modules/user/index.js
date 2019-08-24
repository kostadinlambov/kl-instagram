import * as actions from "./actions";
import * as getters from "./getters";

import Vue from "vue";

import {
  FETCH_ALL_USERS,
  FETCH_ALL_USERS_ADMIN,
  PROMOTE_USER,
  DEMOTE_USER,
  RESET_USER_STATE,
  FOLLOW_USER_SUCCESS,
  UNFOLLOW_USER_SUCCESS,
  FETCH_ALL_FOLLOWERS,
  FETCH_ALL_FOLLOWING,
  DELETE_USER_SUCCESS,
  UPDATE_USER_IMAGE_CLASS,
  FETCH_ALL_FOLLOWING_CANDIDATES
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
    setFollowingCandidates(state);
  },

  [FETCH_ALL_USERS_ADMIN]: (state, payload) => {
    state.usersAdmin = payload.users;
  },

  [DELETE_USER_SUCCESS]: (state, payload) => {
    const userId = payload.userId;

    const newUsersAdminArr = state.usersAdmin.filter(
      user => user.id !== userId
    );
    const newUsersArr = state.users.filter(user => user.id !== userId);

    state.usersAdmin = newUsersAdminArr;
    state.users = newUsersArr;
  },

  [FETCH_ALL_FOLLOWERS]: (state, payload) => {
    state.followers = payload.followers;
    setIsActiveProperty(state);
    // setFollowingCandidates(state):
  },

  [FETCH_ALL_FOLLOWING]: (state, payload) => {
    state.following = payload.following;
  },

  [FETCH_ALL_FOLLOWING_CANDIDATES]: (state, payload) => {
    state.followingCandidates = payload.users;
  },

  [UPDATE_USER_IMAGE_CLASS]: (state, { id, imageClass, arrType }) => {
    updateUserImageClass(state, id, imageClass, arrType);
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

  [RESET_USER_STATE]: state => {
    state.usersAdmin= [];
    state.users=  [];
    state.followers=  [];
    state.following= [];
    state.followingCandidates=  [];
    // for (let f in state) {
    //   Vue.set(state, f, initialState[f]);
    // }
  }
};

const updateUserImageClass = (state, id, imageClass, arrType) => {
  let newUserArr = [];

  // debugger;

  switch (arrType) {
    case "allUsersAdmin":
      newUserArr = updateArr(state.usersAdmin, id, imageClass);
      state.usersAdmin = [...newUserArr];
      break;
    case "allUsers":
      newUserArr = updateArr(state.users, id, imageClass);
      state.users = [...newUserArr];
      break;
    case "followers":
      newUserArr = updateArr(state.followers, id, imageClass);
      state.followers = [...newUserArr];
      break;
    case "following":
      newUserArr = updateArr(state.following, id, imageClass);
      state.following = [...newUserArr];
      break;
    case "followingCandidates":
      newUserArr = updateArr(state.followingCandidates, id, imageClass);
      state.followingCandidates = [...newUserArr];
      break;
    default:
      break;
  }
};

const updateArr = (newUserArr, id, imageClass) => {
  return newUserArr.map(user => {
    if (user.id !== id) {
      return user;
    }

    return {
      ...user,
      imageClass
    };
  });
};

const setFollowingCandidates = state => {
  const newArr = state.users.filter(user => !user.active);

  state.followingCandidates = [...newArr];
  // debugger;
  // const newArr = [];
  // state.users.map(candidate => {
  //   debugger;
  //   state.followers.forEach(follower => {
  //     debugger;
  //     if (follower.followerId === candidate.id || candidate.active) {
  //       return;
  //     }

  //     newArr.push({...candidate})

  //     debugger;
  //     // return { ...candidate };
  //   });
  // });

  // state.followingCandidates = [...newArr];
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
