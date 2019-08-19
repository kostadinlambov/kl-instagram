import Vue from "vue";
import router from "@/router";
import requester from "@/infrastructure/requester";

import {
  CHANGE_IS_AUTHENTICATED,
  AUTH_RESET_STATE,
  FETCH_LOGGEDIN_USER,
  FETCH_TIMELINE_USER,
  UPDATE_TIMELINE_USER,
} from "./mutationTypes";
import { RESET_STATE_GLOBAL } from "../../mutationTypes";
import { userService } from '@/infrastructure/userService';

export const registerAction = (context, payload) => {
  const url = "user/register";

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
      context.dispatch('user/fetchAllUsersAction', {id} , {root: true});

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
  const url = "user/details/id/" + payload.id;
  requester
    .get(url)
    .then(res => {
      context.commit({
        type: FETCH_LOGGEDIN_USER,
        user: res.body
      });
    })
    .catch(err => {
      Vue.$toast.open({
        message: err.body.message,
        type: "error"
      });
    });
}

export const fetchTimeLineUser = (context, payload) => {
  const url = "user/details/username/" + payload.username;
  requester
    .get(url)
    .then(res => {
      context.commit({
        type: FETCH_TIMELINE_USER,
        user: res.body
      });
    })
    .catch(err => {
      Vue.$toast.open({
        message: err.body.message,
        type: "error"
      });
    });
}

export const updateUser = (context, data) => {
  const loggedInUserId = context.rootState.auth.loggedInUser.id;
  const username = context.state.timeLineUser.username;
  const url = "user/update/"+ loggedInUserId;

  requester.put(url, data)
  .then(res => {
    context.commit({
      type: UPDATE_TIMELINE_USER,
      user: res.body
    })

    router.push("/user/" + username);

     Vue.$toast.open({
        message: res.body.message,
        type: "success"
      });
  }).catch(err => {
    Vue.$toast.open({
      message: err.body.message,
      type: "error"
    });
  });
}

