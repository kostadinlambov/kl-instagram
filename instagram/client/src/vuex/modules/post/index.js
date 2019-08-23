import * as actions from "./actions";
import * as getters from "./getters";

import {
  FETCH_ALL_POSTS,
  POST_CREATE_BEGIN,
  POST_CREATE_SUCCESS,
  FETCH_ALL_FOREIGN_POSTS,
  UPDATE_POSTIMAGE_CLASS,
  RESET_FOREIGN_POSTS_STATE,
  LOADING_FOREIGN_POSTS,
  LOADING_USER_POSTS,
  LOADING_FOLLOWING_POSTS,
  RESET_POST_STATE,
  RESET_USER_POSTS_STATE,
  RESET_FOLLOWING_POSTS_STATE,
  UPDATE_CREATOR_IMAGE_CLASS,
  FETCH_FOLLOWING_POSTS
} from "./mutationTypes";

// initial state
const initialState = {
  posts: [],
  loadingUserPosts: false,
  foreignPosts: [],
  loadingForeignPosts: false,
  followingPosts: [],
  loadingFollowingPosts: false
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

 [FETCH_FOLLOWING_POSTS]: (state, payload) => {
    state.followingPosts.push(...payload.posts);
  },

  [LOADING_FOLLOWING_POSTS]: (state, payload) => {
    state.loadingFollowingPosts = payload.loading;
  },

  [UPDATE_POSTIMAGE_CLASS]: (state, { postId, imageClass, arrType }) => {
    updatePostImageClass(state, postId, imageClass, arrType);
  },

  [UPDATE_CREATOR_IMAGE_CLASS]: (state, { id, imageClass, arrType }) => {
    updateCreatorImageClass(state, id, imageClass, arrType);
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

  [RESET_FOLLOWING_POSTS_STATE]: state => {
    state.followingPosts = [];
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
    case "followingPosts":
      newPostArr = updateArr(state.followingPosts, postId, imageClass);
      state.followingPosts = [...newPostArr];
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

const updateCreatorImageClass = (state, postId, imageClass, arrType) => {
  let newPostArr = [];

  switch (arrType) {
    case "followingPosts":
      newPostArr = updateCreatorArr(state.followingPosts, postId, imageClass);
      state.followingPosts = [...newPostArr];
      break;
    default:
      break;
  }
};

const updateCreatorArr = (newPostArr, id, creatorImageClass) => {
  return newPostArr.map(post => {
    if (post.id !== id) {
      return post;
    }

    return {
      ...post,
      creatorImageClass
    };
  });
};

export default {
  state: { ...initialState },
  actions,
  getters,
  mutations
};
