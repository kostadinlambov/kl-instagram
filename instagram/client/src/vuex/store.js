import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import * as Cookies from "js-cookie";

import auth from "./modules/auth";
import user from "./modules/user";
import { RESET_STATE_GLOBAL } from "./mutationTypes";

Vue.use(Vuex);

// initial State
let initialState = {
  auth: { ...auth.state },
  user: { ...user.state }
};

export const store = new Vuex.Store({
  plugins: [
    createPersistedState({
      getState: key => Cookies.getJSON(key),
      setState: (key, state) =>
        Cookies.set(key, state, { expires: 3, secure: true })
    })
  ],

  modules: {
    auth: {
      namespaced: true,
      state: auth.state,
      ...auth
    },
    user: {
      namespaced: true,
      state: user.state,
      ...user
    }
  },

  actions: {
    resetState(context) {
      context.commit({
        type: RESET_STATE_GLOBAL
      });
    }
  },

  mutations: {
    [RESET_STATE_GLOBAL]: state => {
 
      const propertiesKeys = Object.keys(state);
      propertiesKeys.forEach(key => {
        for (let currentProp in state[key]) {
          state[key][currentProp] = initialState[key][currentProp];
          //   Vue.set(state[key][currentProp], currentProp, initialState[key][currentProp]);
        }
        // for (let f in state[key]) {
        //   Vue.set(state[key], f, initialState[key][f]);
        // }
      });
    }
  }

  // [RESET_STATE]: state => {
  //   // Object.keys(initialState).forEach(key => {
  //   //   Object.assign(state[key], initialState[key])
  //   // })

  //   state.usersAdmin = [];
  //   state.users = [];
  // },
});
