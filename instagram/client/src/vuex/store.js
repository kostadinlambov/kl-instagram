import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import * as Cookies from "js-cookie";

import auth from './modules/auth';
import user from './modules/user';

Vue.use(Vuex);

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
  }
});
