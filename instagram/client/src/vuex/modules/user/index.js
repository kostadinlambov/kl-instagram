import * as actions from "./actions";
import * as getters from "./getters";

import {
  FETCH_ALL_USERS,
  FETCH_ALL_USERS_ADMIN,
  PROMOTE_USER,
  DEMOTE_USER,
} from "./mutationTypes";

// initial state
const initialState = {
  usersAdmin: [],
  users: [],
};

const mutations = {
  [FETCH_ALL_USERS]: (state, payload) => {
    state.users = payload.users;
  },
  [FETCH_ALL_USERS_ADMIN]: (state, payload) => {
    state.usersAdmin = payload.users;
  },

  [PROMOTE_USER]: (state, payload) => {
    changeUserRole(payload.userData.id, payload.userData.role, state)
  },

   [DEMOTE_USER]: (state, payload) => {
    changeUserRole(payload.userData.id, payload.userData.role, state)
  },
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
}


export default {
    state: {...initialState},
    actions,
    getters,
    mutations
}