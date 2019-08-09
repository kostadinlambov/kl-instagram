import Vue from "vue";
import router from "@/router";
import requester from "@/infrastructure/requester";

import { CHANGE_IS_AUTHENTICATED } from "./mutationTypes";

export const registerAction = (context, payload) => {
  const url = 'users/register'

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

  localStorage.clear();
  router.push("/login");

  Vue.$toast.open({
    message: "You have successfully logged out!",
    type: "info"
  });
};
