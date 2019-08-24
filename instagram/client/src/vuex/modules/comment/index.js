import * as actions from "./actions";
import * as getters from "./getters";

import {
  CREATE_COMMENT_SUCCESS,
  RESET_COMMENT_STATE,
  FETCH_LAST_COMMENT_SUCCESS
} from "./mutationTypes";

// initial state
const initialState = {
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

  [RESET_COMMENT_STATE]: state => {
    state.createdComment = initialState.createdComment;
  }
};

export default {
  state: { ...initialState },
  actions,
  getters,
  mutations
};
