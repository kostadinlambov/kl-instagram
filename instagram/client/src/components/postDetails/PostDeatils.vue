<template>
  <div class="post-container">
    <article class="post-article">
      <section class="image-section">
        <div class="post-image-container">
          <div class="image-wrapper">
            <img :src="post.imageUrl" alt v-bind:class="postImageSizeClass" />
          </div>
        </div>
      </section>
      <section class="comments-section">
        <post-creator-card v-bind:post="post"></post-creator-card>
        <!-- <user-feed-user-card v-bind:user="user"></user-feed-user-card> -->
        <div class="footer">
          <div class="content-wrapper">
            <div class="comments-wrapper">
              <comment-card v-bind:comment="getPostCreatorObj"></comment-card>
              <comment-card
                v-for="comment in comments"
                v-bind:key="comment.id"
                v-bind:comment="comment"
              ></comment-card>
            </div>
          </div>

          <div class="icons">
            <div class="left-side-icons">
              <div class="nav-item heart-icon-wrapper">
                <div class="nav-link" @click="likeHandler">
                  <i v-if="post.hasUserLikedPost" class="fas fa-heart" :style="hasUserLikedPost"></i>
                  <i v-else class="far fa-heart"></i>
                </div>
              </div>
              <div class="nav-item comments-icon-wrapper">
                <label for="post-textarea"  class="nav-link comment-label">
                  <i class="far fa-comments"></i>
                </label>
              </div>
            </div>
            <div class="right-side-icons">
              <div class="nav-link bookmark-icon-wrapper" @click="bookmarkHandler">
                <i class="far fa-bookmark"></i>
              </div>
            </div>
          </div>
          <div class="likes-count">{{getLikesCountMessage}}</div>

          <section class="add-comment-section">
            <form class="post-form" @submit.prevent="onCommentSubmit">
              <textarea-autosize
                id="post-textarea"
                class="post-textarea"
                placeholder="Add a comment..."
                ref="someName"
                v-model.trim="$v.content.$model"
                :min-height="10"
                :max-height="80"
              ></textarea-autosize>

              <button :disabled="$v.$invalid" class="btn app-button-secondary btn-sm">Post</button>
            </form>
          </section>
        </div>
      </section>
    </article>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { required } from "vuelidate/lib/validators";
import UserFeedUserCard from "../userFeed/UserFeedUserCard";
import CommentCard from "./CommentCard";
import PostCreatorCard from "./PostCreatorCard";
import { postService } from "../../infrastructure/postService";
import placeholderImg from "../../assets/images/placeholder.png";

export default {
  name: "post-details",
  components: { UserFeedUserCard, CommentCard, PostCreatorCard },
  data() {
    return {
      postId: this.$route.params.postId || this.postIdFromModal,
      content: "",
      hasUserLikedPost: {
        color: "red"
      }
    };
  },
  props: {
    postIdFromModal: {
      type: String
    }
  },
  validations: {
    content: {
      required
    }
  },
  computed: {
    ...mapGetters("auth", {
      loggedInUser: "getLoggedInUserData"
    }),
    ...mapGetters("post", {
      post: "getCurrentPost"
    }),
    ...mapGetters("user", {
      user: "getCurrentPostUser"
    }),
    ...mapGetters("comment", {
      getLastComment: "getLastComment",
      comments: "getComments"
    }),
    postImageSizeClass() {
      const width = this.post.imageWidth;
      const height = this.post.imageHeight;
      return postService.getPostImageClass(width, height) || "";
    },
    profilePicUrl() {
      return this.post.creatorProfilePicUrl || placeholderImg;
    },
    getLikesCountMessage() {
      return this.post.likeCount === 1
        ? "1 like"
        : this.post.likeCount + " likes";
    },
    getPostCreatorObj() {
      const content = this.post.caption;
      const imageClass = this.postImageSizeClass;
      const creatorProfilePicUrl = this.profilePicUrl;
      return { ...this.post, imageClass, content, creatorProfilePicUrl };
    }
  },
  methods: {
    ...mapActions("post", ["fetchPostDetails", "changePostLikeCount"]),
    ...mapActions("user", ["fetchUserDetails"]),
    ...mapActions("comment", ["createComment", "fetchComments"]),

    likeHandler() {
      const data = {
        postId: this.post.id,
        userId: this.loggedInUser.id
      };

      this.changePostLikeCount(data);
    },
    bookmarkHandler() {
      const data = {
        postId: this.post.id,
        userId: this.loggedInUser.id
      };

      // this.bookmarkPost(data);
    },
    onCommentSubmit(event) {
      const data = {
        content: this.content,
        postId: this.post.id,
        loggedInUserId: this.loggedInUser.id
      };
      this.createComment(data);
      this.content = "";
    }
  },
  created() {
    const data = {
      postId: this.postId,
      loggedInUserId: this.loggedInUser.id
    };
    this.fetchPostDetails(data);
    this.fetchUserDetails(this.postId);
    this.fetchComments(this.postId);
  }
};
</script>

<style scoped>
.post-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.post-article {
  max-width: 835px;
  height: 600px;
  pointer-events: auto;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  margin: auto;
}

.image-section {
  height: 100%;
  /* height: 600px; */
  width: 600px;
  /* flex: 1 1 70%; */
  /* margin-right: 335px; */
}

.comments-section {
  /* min-height: 450px; */
  /* height: 600px; */
  height: 100%;
  width: 335px;
  /* flex: 0 0 30%; */
  /* flex: 1 1 50%; */
  /* margin-right: 335px; */
}

.comments-wrapper {
  display: flex;
  flex-direction: column;
  height: 305px;
  width: 100%;
  overflow: auto;
  border: 1px solid #e6e6e6;

}

.profile-pick-container {
  flex: 0 0 2.5rem;
  /* width: 3rem; */
  position: relative;
  overflow: hidden;
  border-radius: 50%;
  background: white;
  box-shadow: 0px 0px 12px 2px rgba(65, 184, 131, 0.5);
}

.profile-pick-container:after {
  display: block;
  content: "";
  padding-top: 100%;
}

.profile-pick-container img {
  display: block;
  position: absolute;
  width: 100%;
  height: auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.profile-pick-container img.l {
  display: block;
  position: absolute;
  width: auto;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.post-image-container {
  background: white;
  border: 1px solid #e6e6e6;
  /* width: 100%; */
}

img {
  /* width: 100%; */
}

.image-wrapper {
  /* flex: 0 0 2.5rem; */
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  /* border-radius: 50%; */
}

.image-wrapper:after {
  display: block;
  content: "";
  padding-top: 100%;
}

.image-wrapper img {
  display: block;
  position: absolute;
  width: 100%;
  height: auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.image-wrapper img.l {
  display: block;
  position: absolute;
  width: auto;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.footer {
  /* border: 1px solid #999; */
  background: white;
}

.icons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.5rem;
  /* border-bottom: 1px solid #efefef; */
}

.left-side-icons {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

i.fa-heart,
i.fa-comments,
i.fa-bookmark {
  color: black;
}

i.fa-comments:hover,
i.fa-bookmark:hover,
i.fa-heart:hover {
  color: rgb(65, 184, 131);
  cursor: pointer;
}

a.caption-username,
a.comment-username,
a.header-username {
  color: #262626;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  /* padding-left: 5px; */
  margin-right: 5px;
  text-decoration: none;
}

a.caption-username:hover,
a.comment-username:hover,
a.header-username:hover {
  color: rgb(65, 184, 131);
}

.comment-label{
  margin-bottom: 0;
}

.count-comments {
  margin-bottom: 8px;
}

.count-comments > a {
  color: #999 !important;
  font-weight: 500 !important;
  font-size: 14px;
  text-decoration: none;
}

.likes-count {
  margin-bottom: 8px;
  text-align: left;
  display: block;
  padding: 0rem 1rem;
  color: #999 !important;
  font-weight: 500 !important;
  font-size: 14px;
  text-decoration: none;
}

.time {
  color: #999 !important;
  font-weight: 500 !important;
  text-align: left;
  margin: 0 16px 8px;
  font-size: 14px;
}

.add-comment-section {
  /* border: 1px solid #e6e6e6; */
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 16px;
  text-align: left;

  border-top: 1px solid #efefef;
  color: #999;
  flex-shrink: 0;
  font-size: 14px;
  line-height: 18px;
  min-height: 56px;

  position: relative;
  background: white;
}

.post-form {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

textarea {
  color: #262626;
  font-size: inherit;
  /* height: 18px; */
  border: none;
  outline: none;
  padding: 0;
  resize: none;
  width: 95%;
  padding: 0.8rem 0.3rem;
  /* max-height: 80px; */
}

.app-button-primary {
  background-color: rgb(53, 73, 94);
  color: white;
}

.app-button-primary:hover {
  background: rgb(65, 184, 131);
  color: #fff;
  border: 1px solid #fff;
  box-shadow: 0 0 14px 1px rgba(0, 0, 0, 0.3);
}

.app-button-secondary {
  background: rgb(65, 184, 131);
  color: white;
}

.app-button-secondary:hover {
  background: rgb(53, 73, 94);
  color: #fff;
  border: 1px solid #fff;
  box-shadow: 0 0 14px 1px rgba(0, 0, 0, 0.3);
}

textarea-autosize {
  height: 18px;
}

@media screen and (max-width: 1600px) {
  .comments-wrapper {
    height: 320px;
  }
}

@media screen and (max-width: 900px) {
  .user-feed-postcard-article {
    margin-bottom: 10px;
  }

  .comments-section {
    display: none;
  }
}
</style>