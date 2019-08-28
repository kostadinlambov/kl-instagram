import * as actions from "./actions";
import * as getters from "./getters";
import { userService } from "@/infrastructure/userService";
import Vue from "vue";
import placeholderLink from "@/assets/images/placeholder.png";

import {
  LOGIN_SUCCESS,
  CHANGE_IS_AUTHENTICATED,
  AUTH_RESET_STATE,
  FETCH_LOGGEDIN_USER,
  FETCH_TIMELINE_USER,
  UPDATE_TIMELINE_USER,
  UPDATE_USER_IMAGE_CLASS,
  RESET_AUTH_STATE
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
    profilePicUrl: userService.getProfilePicUrl() || placeholderLink,
    isAdminOrRoot: userService.isAdminOrRoot(),
    bio: "",
    website: "",
    imageClass: ""
  },
  timeLineUser: {
    username: "",
    id: "",
    firstName: "",
    lastName: "",
    role: "",
    profilePicUrl: placeholderLink,
    isAdminOrRoot: "",
    bio: "",
    website: "",
    imageClass: ""
  }
};

const mutations = {
  [CHANGE_IS_AUTHENTICATED]: (state, payload) => {
    state.isLoggedIn = payload.value;
  },

  [LOGIN_SUCCESS]: (state, payload) => {
    state.isLoggedIn = payload.value;
  },

  // [SAVE_LOGGEDIN_USER_DATA]: (state, payload) => {
  //   state.loggedInUser = {...userService.getUserData()};
  // },

  [FETCH_LOGGEDIN_USER]: (state, payload) => {
    state.loggedInUser = { ...payload.user };
    state.loggedInUser.isAdminOrRoot = userService.isAdminOrRoot();
  },

  [FETCH_TIMELINE_USER]: (state, payload) => {
    state.timeLineUser = { ...payload.user };
    state.timeLineUser.isAdminOrRoot =
      payload.user.role === "ROOT" || payload.user.role === "ADMIN";
  },

  [UPDATE_TIMELINE_USER]: (state, payload) => {
    state.timeLineUser = { ...state.timeLineUser, ...payload.user };
    state.timeLineUser.isAdminOrRoot =
      payload.user.role === "ROOT" || payload.user.role === "ADMIN";
  },

  [UPDATE_USER_IMAGE_CLASS]: (state, { id, imageClass, userType }) => {
    updateUserImageClass(state, id, imageClass, userType);
  },

  [AUTH_RESET_STATE]: state => {
    for (let f in state) {
      Vue.set(state, f, initialState[f]);
    }
  },

  [RESET_AUTH_STATE](state) {
    state.isLoggedIn = initialState.isLoggedIn;
    state.loggedInUser = initialState.loggedInUser;
    state.timeLineUser = initialState.timeLineUser;
    // debugger;
    // console.log('initialState: ', initialState)
    // Object.keys(initialState).forEach(key => {

    //   console.log('key: ', key)
    //   debugger;
    //   Object.assign(state[key], initialState[key])
    // })
  }
};

const updateUserImageClass = (state, id, imageClass, userType) => {
  switch (userType) {
    case "loggedInUser":
      state.loggedInUser = { ...state.loggedInUser, imageClass };
      break;
    case "timeLineUser":
      state.timeLineUser = { ...state.timeLineUser, imageClass };
      break;
    default:
      break;
  }
};

export default {
  state: { ...initialState },
  actions,
  getters,
  mutations
};
