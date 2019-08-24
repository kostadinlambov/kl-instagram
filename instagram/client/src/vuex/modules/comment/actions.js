import Vue from "vue";
import requester from "@/infrastructure/requester";

import {
  CREATE_COMMENT_SUCCESS,
  FETCH_LAST_COMMENT_SUCCESS
} from "./mutationTypes";

export const createComment = (context, data) => {
  const url = "comment/create";
  requester
    .post(url, data)
    .then(res => {

      const comment = res.body.payload;

      context.commit({
        type:CREATE_COMMENT_SUCCESS,
        comment
      });

      context.commit('post/ADD_COMMENT_TO_FOLLOWING_POSTS', comment, {root: true})
      context.dispatch('fetchLastCommentByPostId', data.postId)

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

export const fetchLastCommentByPostId = (context, postId) => {
  const url = 'comment/last/' + postId

  requester
  .get(url)
  .then(res => {
    const comment = res.body.payload;

    context.commit({
      type:FETCH_LAST_COMMENT_SUCCESS,
      comment
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
}

