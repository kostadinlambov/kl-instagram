import Vue from "vue";
import requester from "@/infrastructure/requester";
import router from "@/router";


import {
  FETCH_ALL_USERS_ADMIN,
  FETCH_ALL_USERS,
  PROMOTE_USER,
  DEMOTE_USER,
  FOLLOW_USER_SUCCESS,
  UNFOLLOW_USER_SUCCESS,
  FETCH_ALL_FOLLOWERS,
  FETCH_ALL_FOLLOWING,
  DELETE_USER_SUCCESS,
  RESET_STATE
} from "./mutationTypes";

export const fetchAllUsersAdminAction = (context, payload) => {
  const url = "user/admin/all/" + payload.id;
  requester
    .get(url)
    .then(res => {
      context.commit({
        type: FETCH_ALL_USERS_ADMIN,
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

export const fetchAllUsersAction = (context, payload) => {
  const url = "user/notFollowers/" + payload.id;
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
  const url = "user/promote?id=" + userToPromoteId;
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
  const url = "user/demote?id=" + userToDemoteId;
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

export const followUserAction = (context, userToFollowId) => {
  const url = "follower/follow";
  const loggedInUserId = context.rootState.auth.loggedInUser.id;
  const requestBody = { loggedInUserId, userToFollowId };

  requester
    .post(url, requestBody)
    .then(res => {
      context.commit({
        type: FOLLOW_USER_SUCCESS,
        userToFollowId
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

export const unFollowUserAction = (context, userToUnFollowId) => {
  const url = "follower/unFollow";
  const loggedInUserId = context.rootState.auth.loggedInUser.id;
  const requestBody = { loggedInUserId, userToUnFollowId };

  requester
    .post(url, requestBody)
    .then(res => {
      context.commit({
        type: UNFOLLOW_USER_SUCCESS,
        userToUnFollowId
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

export const fetchUserPosts = (context, userId) => {
  const url = "post/all/" + userId;
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

export const fetchFollowers = (context, username) => {
  const url = "follower/getFollowers/" + username;
  requester
    .get(url)
    .then(res => {
      context.commit({
        type: FETCH_ALL_FOLLOWERS,
        followers: res.body
      });
    })
    .catch(err => {
      Vue.$toast.open({
        message: err.body.message,
        type: "error"
      });
    });
};

export const fetchFollowing = (context, username) => {
  const url = "follower/getFollowing/" + username;
  requester
    .get(url)
    .then(res => {
      context.commit({
        type: FETCH_ALL_FOLLOWING,
        following: res.body
      });
    })
    .catch(err => {
      Vue.$toast.open({
        message: err.body.message,
        type: "error"
      });
    });
};

export const deleteUser = (context, userId) => {
  const loggedInUserId = context.rootState.auth.loggedInUser.id;
  const url = "user/delete/" + userId;
  debugger;

  requester
    .delete(url, { })
    .then(res => {
      debugger;
      context.commit({
        type: DELETE_USER_SUCCESS,
        userId
      });

     
      router.push("/");
      debugger;
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

export const resetState = context => {
  context.commit({
    type: RESET_STATE
  });
};
