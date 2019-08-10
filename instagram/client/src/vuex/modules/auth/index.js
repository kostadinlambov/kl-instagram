import * as actions from "./actions";
import * as getters from "./getters";
import { userService } from "@/infrastructure/userService";
import Vue from 'vue';

import {
  LOGIN_SUCCESS,
  CHANGE_IS_AUTHENTICATED,
  SAVE_LOGGEDIN_USER_DATA,
  AUTH_RESET_STATE,
} from "./mutationTypes";

// initial state
const initialState = {
  isLoggedIn: userService.isAuth(),
  loggedInUser: {
    username: userService.getUsername(),
    id: userService.getUserId(),
    firstName: userService.getFirstName(),
    lastName: userService.getLastName(),
    role: userService.getRole(),
    getProfilePicUrl: userService.getProfilePicUrl(),
    isAdminOrRoot: userService.isAdminOrRoot(),
  }
};

const mutations = {
  [CHANGE_IS_AUTHENTICATED]: (state, payload) => {
    state.isLoggedIn = payload.value;
  },

  [LOGIN_SUCCESS]: (state, payload) => {
    state.isLoggedIn = payload.value;
  },

  [SAVE_LOGGEDIN_USER_DATA]: (state) => {
    state.loggedInUser = {...userService.getUserData()};
  },

  [AUTH_RESET_STATE]: (state) => {
    for (let f in state) {
      Vue.set(state, f, initialState[f]);
    }
  },

  // [RESET_STATE](state) {
  //   debugger;
  //   console.log('initialState: ', initialState)
  //   Object.keys(initialState).forEach(key => {

  //     console.log('key: ', key)
  //     debugger;
  //     Object.assign(state[key], initialState[key])
  //   })
  // }
};

export default {
    state: {...initialState},
    actions,
    getters,
    mutations
}