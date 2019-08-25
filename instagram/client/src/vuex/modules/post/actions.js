import Vue from "vue";
import requester from "@/infrastructure/requester";
import { userService } from "@/infrastructure/userService";
import { postService } from "@/infrastructure/postService";
import router from "@/router";
import placeholderLink from "@/assets/images/placeholder.png";

import {
  FETCH_ALL_POSTS,
  POST_CREATE_BEGIN,
  POST_CREATE_SUCCESS,
  FETCH_ALL_FOREIGN_POSTS,
  UPDATE_POSTIMAGE_CLASS,
  FETCH_FOLLOWING_POSTS,
  LOADING_FOREIGN_POSTS,
  LOADING_USER_POSTS,
  LOADING_FOLLOWING_POSTS,
  RESET_USER_POSTS_STATE,
  RESET_FOREIGN_POSTS_STATE,
  RESET_FOLLOWING_POSTS_STATE,
  UPDATE_CREATOR_IMAGE_CLASS,
  CHANGE_POST_LIKE_SUCCESS,
  FETCH_POST_DETAILS,

} from "./mutationTypes";

export const fetchNonLoggedInUserPosts = (context,{ loggedInUser, pageNumber }) => {
  context.commit({
    type: LOADING_FOREIGN_POSTS,
    loading: true
  });

  const url = "post/notMy/" + loggedInUser + "/" + pageNumber;
  requester
    .get(url)
    .then(res => {
      context.commit({
        type: FETCH_ALL_FOREIGN_POSTS,
        posts: res.body
      });

      context.dispatch("updatePostImageClass", {
        posts: res.body,
        arrType: "foreignPosts"
      });

      context.commit({
        type: LOADING_FOREIGN_POSTS,
        loading: false
      });

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

export const fetchUserPosts = (context, {username, pageNumber}) => {
  context.commit({
    type: LOADING_USER_POSTS,
    loading: true
  });

  const url = "post/all/" + username + "/" + pageNumber;
  requester
    .get(url)
    .then(res => {
      context.commit({
        type: FETCH_ALL_POSTS,
        posts: res.body
      });

      context.commit({
        type: LOADING_USER_POSTS,
        loading: false
      });

      context.dispatch("updatePostImageClass", {
        posts: res.body,
        arrType: "userPosts"
      });

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

export const fetchFollowingPosts = (context, {loggedInUser, pageNumber}) => {
  context.commit({
    type: LOADING_FOLLOWING_POSTS,
    loading: true
  });

  const url = "post/following/" + loggedInUser + "/" + pageNumber;
  requester
    .get(url)
    .then(res => {
      context.commit({
        type: FETCH_FOLLOWING_POSTS,
        posts: res.body
      });

      context.commit({
        type: LOADING_FOLLOWING_POSTS,
        loading: false
      });

      context.dispatch("updatePostImageClass", {
        posts: res.body,
        arrType: "followingPosts"
      });

      context.dispatch("updateCreatorImageClass", {
        posts: res.body,
        arrType: "followingPosts"
      });

      Vue.$toast.open({
        message: "All Following Posts fetched!",
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

export const updatePostImageClass = (context, { posts, arrType }) => {
  posts.forEach(post => {
        const imageClass = postService.getPostImageClass(post.imageWidth, post.imageHeight);
   
        context.commit({
          type: UPDATE_POSTIMAGE_CLASS,
          imageClass: imageClass,
          postId: post.id,
          arrType
        });

        Vue.$toast.open({
          message: "Post Image Class updated!",
          type: "success"
        });
      })
      
};

export const updateCreatorImageClass = (context, {posts, arrType}) => {
  posts.forEach(post => {

    const profilePicUrl =  post.creatorProfilePicUrl || placeholderLink ;
    const id = post.id 
    userService.getImageClass(profilePicUrl).then(res => {
      context.commit({
        type: UPDATE_CREATOR_IMAGE_CLASS,
        imageClass: res,
        id: id,
        arrType
      });

      Vue.$toast.open({
        message: "Post Creator Image Class updated!",
        type: "success"
      });
    }).catch(error => {
      Vue.$toast.open({
        message: 'Update User Image Class Error!  => ' + arrType,
        type: "error"
      });
    });
  });
};

// export const updatePostImageClass = (context, { posts, arrType }) => {
//   posts.forEach(post => {
//     userService
//       .getImageClass(post.imageUrl)
//       .then(res => {
//         context.commit({
//           type: UPDATE_POSTIMAGE_CLASS,
//           imageClass: res,
//           postId: post.id,
//           arrType
//         });

//         Vue.$toast.open({
//           message: "Post Image Class updated!",
//           type: "success"
//         });
//       })
//       .catch(error => {
//         Vue.$toast.open({
//           message: "Update Image Class Error!",
//           type: "error"
//         });
//       });
//   });
// };

export const createPost = (context, data) => {
  const url = "post/create";

  context.commit(POST_CREATE_BEGIN);
  requester
    .post(url, data)
    .then(res => {
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

export const resetForeignPostState = context => {
  context.commit(RESET_FOREIGN_POSTS_STATE);
};

export const resetUserPostState = context => {
  context.commit(RESET_USER_POSTS_STATE);
};

export const resetFollowingPostState = context => {
  context.commit(RESET_FOLLOWING_POSTS_STATE);
};

export const changePostLikeCount = (context, data) => {
  const url = "like/changePostLike";

  requester
    .post(url, data)
    .then(res => {
      context.commit({
        type: CHANGE_POST_LIKE_SUCCESS,
        postId: data.postId,
        change: res.body.payload
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

export const fetchPostDetails = (context, {postId, loggedInUserId}) => {
  const url = "post/details/" + postId + '/' + loggedInUserId;
  requester
    .get(url)
    .then(res => {
      context.commit({
        type: FETCH_POST_DETAILS,
        post: res.body.payload
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

// export const resetState = context => {
//   context.commit({
//     type: RESET_STATE
//   });
// };
