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
  FETCH_FOLLOWING_POSTS,
  CHANGE_POST_LIKE_SUCCESS,
  ADD_COMMENT_TO_FOLLOWING_POSTS,
  FETCH_POST_DETAILS
} from "./mutationTypes";

// initial state
const initialState = {
  posts: [],
  loadingUserPosts: false,
  foreignPosts: [],
  loadingForeignPosts: false,
  followingPosts: [],
  loadingFollowingPosts: false,
  currentPost: {
    id: '',
    caption: '',
    imageUrl: '',
    imageWidth: 0,
    imageHeight: 0,
    location: '',
    privattime: '',
    creatorId: '',
    creatorUsername: '',
    creatorFirstName: '',
    creatorLastName: '',
    creatorProfilePicUrl: '',
    creatorImageWidth: '',
    creatorImageHeight: '',
    likeCount: 0,
    hasUserLikedPost: '',
    comments: [],
  }
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

  [FETCH_POST_DETAILS]: (state, payload) => {
    state.currentPost = { ...state.currentPost, ...payload.post };
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

  [CHANGE_POST_LIKE_SUCCESS]: (state, postId, change) => {
    changePostLikeCount(state, postId, change);
  },

  [ADD_COMMENT_TO_FOLLOWING_POSTS]: (state, comment) => {
    const postId = comment.postId;

    const newArr = state.followingPosts.map(post => {
      if (post.id != postId) {
        return post;
      }

      const comments = [...post.comments, comment];

      return {
        ...post,
        comments
      };
    });

    state.followingPosts = [...newArr];
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

const changePostLikeCount = (state, { postId, change }) => {
  let newPostArr = [];
  newPostArr = updatePostCount(state.posts, postId, change);
  state.posts = [...newPostArr];

  newPostArr = updatePostCount(state.foreignPosts, postId, change);
  state.foreignPosts = [...newPostArr];

  newPostArr = updatePostCount(state.followingPosts, postId, change);
  state.followingPosts = [...newPostArr];

  newPostArr = updatePostCount([state.currentPost], postId, change);
  state.currentPost = [...newPostArr][0];
};

const updatePostCount = (newPostArr, postId, change) => {
  return newPostArr.map(post => {
    if (post.id !== postId) {
      return post;
    }
    let likeCount = post.likeCount;
    let hasUserLikedPost = post.hasUserLikedPost;

    if (change === "add") {
      likeCount++;
      hasUserLikedPost = true;
    } else {
      likeCount--;
      hasUserLikedPost = false;
    }

    return {
      ...post,
      likeCount,
      hasUserLikedPost
    };
  });
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
