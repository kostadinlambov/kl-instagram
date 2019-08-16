import Vue from "vue";
import requester from "@/infrastructure/requester";

import {
  FETCH_ALL_POSTS
} from "./mutationTypes";

export const fetchUserPosts = (context, userId) => {
  const url = "post/all/" + userId;
  requester
    .get(url)
    .then(res => {
      console.log('User Posts: ', res.body)
      
      context.commit({
        type: FETCH_ALL_POSTS,
        posts: res.body
      });

      Vue.$toast.open({
        message: 'All User Posts fetched!',
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
