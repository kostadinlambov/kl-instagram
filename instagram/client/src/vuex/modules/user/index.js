import * as actions from "./actions";
import * as getters from "./getters";

import Vue from 'vue';

import {
  FETCH_ALL_USERS,
  FETCH_ALL_USERS_ADMIN,
  PROMOTE_USER,
  DEMOTE_USER,
  RESET_STATE,
  FOLLOW_USER_SUCCESS,
  UNFOLLOW_USER_SUCCESS,
  GET_ALL_FOLLOWERS
} from "./mutationTypes";

// initial state
const initialState = {
  usersAdmin: [],
  users: [],
  followers: [],
};

const mutations = {
  [FETCH_ALL_USERS]: (state, payload) => {
    state.users = payload.users;
  },
  
  [FETCH_ALL_USERS_ADMIN]: (state, payload) => {
    state.usersAdmin = payload.users;
  },

  [GET_ALL_FOLLOWERS]: (state, payload) => {
    state.followers = payload.followers;
  },

  [PROMOTE_USER]: (state, payload) => {
    changeUserRole(payload.userData.id, payload.userData.role, state);
  },

  [DEMOTE_USER]: (state, payload) => {
    changeUserRole(payload.userData.id, payload.userData.role, state);
  },

  [FOLLOW_USER_SUCCESS] : (state, payload) => {
    updateUsersArr(state, payload.userToFollowId, true);
  },

  [UNFOLLOW_USER_SUCCESS] : (state, payload) => {
    updateUsersArr(state, payload.userToUnFollowId, false);
  },

  [RESET_STATE]: (state) => {
    for (let f in state) {
      Vue.set(state, f, initialState[f]);
    }
  },
};

const updateUsersArr = (state, userId, active) => {
  const newUserArr = state.users.map(user => {
    if (user.id !== userId) {
      return user;
    }

    return {
      ...user,
      active
    };

  })
    state.users = [...newUserArr]
}

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
