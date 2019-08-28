import Vue from "vue";
import requester from "@/infrastructure/requester";
import { userService } from "@/infrastructure/userService";
import placeholderLink from "@/assets/images/placeholder.png";

import {
  CREATE_COMMENT_SUCCESS,
  FETCH_LAST_COMMENT_SUCCESS,
  FETCH_ALL_COMMENTS,
  UPDATE_COMMENT_CREATOR_IMAGE_CLASS,
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

      const comments = [comment];

      context.dispatch("updateUserImageClass", {comments:comments, arrType: 'commentsCreator'});

      // Vue.$toast.open({
      //   message: res.body.message,
      //   type: "success"
      // });

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

    // Vue.$toast.open({
    //   message: res.body.message,
    //   type: "success"
    // });

  })
  .catch(err => {
    // Vue.$toast.open({
    //   message: err.body.message,
    //   type: "error"
    // });
  });
}

export const fetchComments = (context, postId) => {
  const url = 'comment/all/' + postId

  requester
  .get(url)
  .then(res => {

    context.dispatch("updateUserImageClass", {comments:res.body, arrType: 'commentsCreator'});


    context.commit({
      type: FETCH_ALL_COMMENTS,
      comments: res.body
    });

  })
  .catch(err => {
    Vue.$toast.open({
      message: 'Failure comment fetch!',
      type: "error"
    });
  });
}

export const updateUserImageClass = (context, {comments, arrType}) => {
  comments.forEach(comment => {

    const profilePicUrl = comment.creatorProfilePicUrl || placeholderLink ;
    const id = comment.id 

    userService.getImageClass(profilePicUrl).then(res => {
      context.commit({
        type: UPDATE_COMMENT_CREATOR_IMAGE_CLASS,
        imageClass: res,
        id: id,
        arrType
      });

      // Vue.$toast.open({
      //   message: "User Image Class updated!",
      //   type: "success"
      // });
    }).catch(error => {
      Vue.$toast.open({
        message: 'Update User Image Class Error!  => ' + arrType,
        type: "error"
      });
    });
  });
};

