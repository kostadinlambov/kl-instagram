import Vue from "vue";
import requester from "@/infrastructure/requester";

import {
  FETCH_ALL_USERS_ADMIN,
  FETCH_ALL_USERS,
  PROMOTE_USER,
  DEMOTE_USER
} from "./mutationTypes";

export const fetchAllUsersAdminAction = (context, payload) => {
  const url = "users/admin/all/" + payload.id;
  requester
    .get(url)
    .then(res => {
      context.commit({
        type: FETCH_ALL_USERS_ADMIN,
        users: res.body
      });
    })
    .catch(err => {
      console.log(err)
      Vue.$toast.open({
        message: err.body.message,
        type: "error"
      });
    });
};

export const fetchAllUsersAction = (context, payload) => {
  const url = "users/notFollowers/" + payload.id;
  requester
    .get(url)
    .then(res => {
      context.commit({
        type: FETCH_ALL_USERS,
        users: res.body
      });
    })
    .catch(err => {
      Vue.$toast.open({
        message: err.body.message,
        type: "error"
      });
    });
};

export const promoteUserAction = (context, userToPromoteId) => {
  const url = "users/promote?id=" + userToPromoteId;
  requester
    .post(url, {})
    .then(res => {
      const data = {
        id: userToPromoteId,
        role: "ADMIN"
      };

      context.commit({
        type: PROMOTE_USER,
        userData: data
      });

      Vue.$toast.open({
        message: res.body.message,
        type: "success"
      });
    })
    .catch(err => {
      Vue.$toast.open({
        message: err.body.message,
        type: "error"
      });
    });
};

export const demoteUserAction = (context, userToDemoteId) => {
  const url = "users/demote?id=" + userToDemoteId;
  requester
    .post(url, {})
    .then(res => {
      const data = {
        id: userToDemoteId,
        role: "USER"
      };

      context.commit({
        type: DEMOTE_USER,
        userData: data
      });

      Vue.$toast.open({
        message: res.body.message,
        type: "success"
      });
    })
    .catch(err => {
      Vue.$toast.open({
        message: err.body.message,
        type: "error"
      });
    });
};
