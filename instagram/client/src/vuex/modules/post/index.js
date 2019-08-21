import * as actions from "./actions";
import * as getters from "./getters";

import Vue from "vue";

import {
  FETCH_ALL_POSTS,
  POST_CREATE_BEGIN,
  POST_CREATE_SUCCESS,
  FETCH_ALL_FOREIGN_POSTS,
  UPDATE_POSTIMAGE_CLASS
} from "./mutationTypes";

// initial state
const initialState = {
  posts: [],
  foreignPosts: [],
  loading: false
};

const mutations = {
  [FETCH_ALL_POSTS]: (state, payload) => {
    state.posts = payload.posts;
  },

  [FETCH_ALL_FOREIGN_POSTS]: (state, payload) => {
    state.foreignPosts = payload.posts;
  },

  [UPDATE_POSTIMAGE_CLASS]: (state, { postId, imageClass, arrType }) => {
    updatePostImageClass(state, postId, imageClass, arrType);
  },

  [POST_CREATE_BEGIN]: state => {
    state.loading = false;
  },

  [POST_CREATE_SUCCESS]: state => {
    state.loading = true;
  }

  // [RESET_STATE]: (state) => {
  //   for (let f in state) {
  //     Vue.set(state, f, initialState[f]);
  //   }
  // },
};

// const updatePostImageClass = (state, postId, imageClass, arrType) => {
//   if (arrType === "userPosts") {
//     const newPostArr = state.posts.map(post => {
//       if (post.id !== postId) {
//         return post;
//       }

//       return {
//         ...post,
//         imageClass
//       };
//     });

//     state.posts = [...newPostArr];
//   } else if (arrType === "foreignPosts") {
//     const newPostArr = state.foreignPosts.map(post => {
//       if (post.id !== postId) {
//         return post;
//       }

//       return {
//         ...post,
//         imageClass
//       };
//     });

//     state.foreignPosts = [...newPostArr];
//   }
// };

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
}

export default {
  state: { ...initialState },
  actions,
  getters,
  mutations
};
