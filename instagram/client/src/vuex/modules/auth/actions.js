import Vue from "vue";
import router from "@/router";
import requester from "@/infrastructure/requester";

import {
  CHANGE_IS_AUTHENTICATED,
  AUTH_RESET_STATE,
  FETCH_LOGGEDIN_USER
} from "./mutationTypes";
import { RESET_STATE_GLOBAL } from "../../mutationTypes";
import { userService } from '@/infrastructure/userService';

export const registerAction = (context, payload) => {
  const url = "users/register";

  requester
    .post(url, payload)
    .then(res => {
      console.log("res => ", res);

      Vue.$toast.open({
        message: res.body.message,
        type: "success"
      });

      router.push("/login");
    })
    .catch(err => {
      let message = "Server error!";
      if (err.status === 400) {
        message = err.body.message;
      }

      Vue.$toast.open({
        message,
        type: "error"
      });
    });
};

export const loginAction = (context, payload) => {
  requester
    .post("login", payload)
    .then(res => {
      console.log("res => ", res);

      const id = userService.getUserId();
      context.dispatch('fetchLoggedInUser',{id});

      context.commit({
        type: CHANGE_IS_AUTHENTICATED,
        value: true
      });

      Vue.$toast.open({
        message: "You have successfully logged in!",
        type: "success"
      });

      router.push("/");
    })
    .catch(err => {
      let message = "Server error!";

      if (err.status === 403) {
        message = "Incorrect email or password!";
      }

      Vue.$toast.open({
        message,
        type: "error"
      });
    });
};

export const logoutAction = context => {
  context.commit({
    type: CHANGE_IS_AUTHENTICATED,
    value: false
  });

  context.commit(RESET_STATE_GLOBAL, null, { root: true });

  localStorage.clear();
  router.push("/login");

  Vue.$toast.open({
    message: "You have successfully logged out!",
    type: "info"
  });
};

export const resetState = context => {
  context.commit({
    type: AUTH_RESET_STATE
  });
};

export const fetchLoggedInUser = (context, payload) => {
  const url = "user/details/" + payload.id;
  requester
    .get(url)
    .then(res => {
      context.commit({
        type: FETCH_LOGGEDIN_USER,
        users: res.body
      });
    })
    .catch(err => {
      Vue.$toast.open({
        message: err.body.message,
        type: "error"
      });
    });
}

