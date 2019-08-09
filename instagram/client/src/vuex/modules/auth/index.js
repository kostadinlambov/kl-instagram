import * as actions from "./actions";
import * as getters from "./getters";
import { userService } from "@/infrastructure/userService";

import {
  LOGIN_SUCCESS,
  CHANGE_IS_AUTHENTICATED
} from "./mutationTypes";

// initial state
const initialState = {
  isLoggedIn: userService.isAuth()
};

const mutations = {
  [CHANGE_IS_AUTHENTICATED]: (state, payload) => {
    state.isLoggedIn = payload.value;
  },
  [LOGIN_SUCCESS]: (state, payload) => {
    state.isLoggedIn = payload.value;
  }
};

export default {
    state: {...initialState},
    actions,
    getters,
    mutations
}