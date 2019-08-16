import * as actions from "./actions";
import * as getters from "./getters";

import Vue from 'vue';

import {
  FETCH_ALL_POSTS
} from "./mutationTypes";

// initial state
const initialState = {
  posts: []
};

const mutations = {
  [FETCH_ALL_POSTS]: (state, payload) => {
    state.posts = payload.posts;
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
