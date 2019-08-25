import * as actions from "./actions";
import * as getters from "./getters";

import {
  CREATE_COMMENT_SUCCESS,
  RESET_COMMENT_STATE,
  FETCH_LAST_COMMENT_SUCCESS,
  FETCH_ALL_COMMENTS,
  UPDATE_COMMENT_CREATOR_IMAGE_CLASS,
} from "./mutationTypes";

// initial state
const initialState = {
  comments: [],
  createdComment: {
    id: "",
    postId: "",
    content: "",
    creatorId: "",
    creatorUsername: "",
    creatorProfilePicUrl: "",
    creatorImageWidth: "",
    creatorImageHeight: "",
    time: null
  },
  lastPostComment: {
    id: "",
    postId: "",
    content: "",
    creatorId: "",
    creatorUsername: "",
    creatorProfilePicUrl: "",
    creatorImageWidth: "",
    creatorImageHeight: "",
    time: null
  },
  lastComments: []
};

const mutations = {
  [CREATE_COMMENT_SUCCESS]: (state, payload) => {
    state.createdComment = { ...state.createdComment, ...payload.comment };
    state.comments = [...state.comments, state.createdComment]
  },
  
  [FETCH_ALL_COMMENTS]: (state, payload) => {
    state.comments = payload.comments;
  },

  [FETCH_LAST_COMMENT_SUCCESS]: (state, payload) => {
    let comment = payload.comment;

    if (!comment) {
      return;
      // comment = initialState.lastPostComment;
    }

    const postId = comment.postId;

    const hasLastComment = state.lastComments.filter(
      comment => comment.postId === postId
    ).length;

    if (hasLastComment == 0) {
      state.lastComments = [...state.lastComments, comment];
    } else {
      const newArr = state.lastComments.map(currentComment => {
        if (currentComment.postId == postId) {
          return comment;
        }

        return currentComment;
      });

      state.lastComments = [...newArr];
    }
  },

  [UPDATE_COMMENT_CREATOR_IMAGE_CLASS]: (state, { id, imageClass, arrType }) => {
    updateCommentCreatorImageClass(state, id, imageClass, arrType);
  },

  [RESET_COMMENT_STATE]: state => {
    state.createdComment = initialState.createdComment;
  }
};

const updateCommentCreatorImageClass = (state, id, imageClass, arrType) => {
  let newCommentsArr = [];

  switch (arrType) {
    case "commentsCreator":
      newCommentsArr = updateArr(state.comments, id, imageClass);
      state.comments = [...newCommentsArr];
      break;
    default:
      break;
  }
};

const updateArr = (newCommentsArr, id, imageClass) => {
  return newCommentsArr.map(comment => {
    if (comment.id !== id) {
      return comment;
    }

    return {
      ...comment,
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
