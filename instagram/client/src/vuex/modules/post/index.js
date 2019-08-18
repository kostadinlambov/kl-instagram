import * as actions from "./actions";
import * as getters from "./getters";

import Vue from 'vue';

import {
  FETCH_ALL_POSTS,
  POST_CREATE_BEGIN,
  POST_CREATE_SUCCESS,

} from "./mutationTypes";

// initial state
const initialState = {
  posts: [],
  loading: false,
};

const mutations = {
  [FETCH_ALL_POSTS]: (state, payload) => {
    state.posts = payload.posts;
  },

  [POST_CREATE_BEGIN]: (state) => {
    state.loading = false;
  },
  
  [POST_CREATE_SUCCESS]: (state) => {
    state.loading = true;
  },

  // [RESET_STATE]: (state) => {
  //   for (let f in state) {
  //     Vue.set(state, f, initialState[f]);
  //   }
  // },
};

export default {
  state: { ...initialState },
  actions,
  getters,
  mutations
};
