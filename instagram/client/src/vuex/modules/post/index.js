import * as actions from "./actions";
import * as getters from "./getters";

import Vue from "vue";

import {
  FETCH_ALL_POSTS,
  POST_CREATE_BEGIN,
  POST_CREATE_SUCCESS,
  FETCH_ALL_FOREIGN_POSTS,
  UPDATE_POSTIMAGE_CLASS,
  RESET_FOREIGN_POSTS_STATE,
  LOADING_FOREIGN_POSTS,
  LOADING_USER_POSTS,
  RESET_POST_STATE,
  RESET_USER_POSTS_STATE
} from "./mutationTypes";

// initial state
const initialState = {
  posts: [],
  foreignPosts: [],
  loadingForeignPosts: false,
  loadingUserPosts: false,
};

const mutations = {
  [FETCH_ALL_POSTS]: (state, payload) => {
    // state.posts = payload.posts;
    state.posts.push(...payload.posts);
  },

  [LOADING_USER_POSTS]: (state, payload) => {
    state.loadingUserPosts = payload.loading;
  },

  [FETCH_ALL_FOREIGN_POSTS]: (state, payload) => {
    // state.foreignPosts = payload.posts;
    state.foreignPosts.push(...payload.posts);
  },

  [LOADING_FOREIGN_POSTS]: (state, payload) => {
    state.loadingForeignPosts = payload.loading;
  },

  [UPDATE_POSTIMAGE_CLASS]: (state, { postId, imageClass, arrType }) => {
    updatePostImageClass(state, postId, imageClass, arrType);
  },

  [POST_CREATE_BEGIN]: state => {
    state.loading = false;
  },

  [POST_CREATE_SUCCESS]: state => {
    state.loading = true;
  },

  [RESET_FOREIGN_POSTS_STATE]: state => {
    state.foreignPosts = [];
  },

  [RESET_USER_POSTS_STATE]: state => {
    state.posts = [];
  },

  [RESET_POST_STATE]: state => {
    state.posts = [];
    state.foreignPosts = [];
    state.loadingForeignPosts = false;
    // for (let f in state) {
    //   Vue.set(state, f, initialState[f]);
    // }
  }
};

const updatePostImageClass = (state, postId, imageClass, arrType) => {
  let newPostArr = [];

  switch (arrType) {
    case "userPosts":
      newPostArr = updateArr(state.posts, postId, imageClass);
      state.posts = [...newPostArr];
      break;
    case "foreignPosts":
      newPostArr = updateArr(state.foreignPosts, postId, imageClass);
      state.foreignPosts = [...newPostArr];
      break;
    default:
      break;
  }
};

const updateArr = (newPostArr, id, imageClass) => {
  return newPostArr.map(post => {
    if (post.id !== id) {
      return post;
    }

    return {
      ...post,
      imageClass
    };
  });
};

export default {
  state: { ...initialState },
  actions,
  getters,
  mutations
};
