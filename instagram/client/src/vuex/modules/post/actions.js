import Vue from "vue";
import requester from "@/infrastructure/requester";
import { userService } from "@/infrastructure/userService";
import router from "@/router";

import {
  FETCH_ALL_POSTS,
  POST_CREATE_BEGIN,
  POST_CREATE_SUCCESS,
  FETCH_ALL_FOREIGN_POSTS,
  UPDATE_POSTIMAGE_CLASS,
} from "./mutationTypes";

export const fetchNonLoggedInUserPosts = (context,{ loggedInUser, pageNumber }) => {
  const url = "post/notMy/" + loggedInUser + "/" + pageNumber;
  requester
    .get(url)
    .then(res => {
      console.log("Not my own Posts: ", res.body);

      context.commit({
        type: FETCH_ALL_FOREIGN_POSTS,
        posts: res.body
      });

      context.dispatch("updatePostImageClass", {posts:res.body, arrType: 'foreignPosts'});
      
      Vue.$toast.open({
        message: "All non loggedInUser Posts fetched!",
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

export const fetchUserPosts = (context, username) => {
  const url = "post/all/" + username;
  requester
    .get(url)
    .then(res => {
      console.log("User Posts: ", res.body);

      context.commit({
        type: FETCH_ALL_POSTS,
        posts: res.body
      });

      context.dispatch("updatePostImageClass", {posts:res.body, arrType: 'userPosts'});

      Vue.$toast.open({
        message: "All User Posts fetched!",
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

export const updatePostImageClass = (context, {posts, arrType}) => {
  posts.forEach(post => {
    userService.getImageClass(post.imageUrl).then(res => {
      context.commit({
        type: UPDATE_POSTIMAGE_CLASS,
        imageClass: res,
        postId: post.id,
        arrType
      });

      Vue.$toast.open({
        message: "Post Image Class updated!",
        type: "success"
      });
    }).catch(error => {
      Vue.$toast.open({
        message: 'Update Image Class Error!',
        type: "error"
      });
    });
  });
};

export const createPost = (context, data) => {
  const url = "post/create";

  context.commit(POST_CREATE_BEGIN);
  requester
    .post(url, data)
    .then(res => {
      console.log("res => ", res);

      // const id = userService.getUserId();
      // context.dispatch("fetchUserPosts", { id });

      context.commit(POST_CREATE_SUCCESS);

      Vue.$toast.open({
        message: res.body.message,
        type: "success"
      });

      const username = context.rootState.auth.loggedInUser.username;

      router.push("/user/" + username);
    })
    .catch(err => {
      Vue.$toast.open({
        message: err.body.message,
        type: "error"
      });
    });
};

// export const resetState = context => {
//   context.commit({
//     type: RESET_STATE
//   });
// };
