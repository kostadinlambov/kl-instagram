<template>
  <article class="user-feed-postcard-article">
    <header>
      <div class="profile-pick-container">
        <img v-bind:class="getProfilePicClass" :src="profilePicUrl" alt="user-pic" />
      </div>
      <div class="post-info-container">
        <div class="username-container">
          <div class="username">
            <router-link
              :to="{name:'single-user-page', params: {'username': post.creatorUsername}}"
              class="header-username"
            >{{post.creatorUsername}}</router-link>
          </div>
          <div class="location">{{post.location}}</div>
        </div>

        <div class="header-button">
          <i class="fas fa-ellipsis-h"></i>
        </div>
      </div>
    </header>
    <div class="post-image-container">
      <div class="image-wrapper">
        <img :src="post.imageUrl" alt v-bind:class="postImageSizeClass" />
      </div>
    </div>
    <div class="footer">
      <div class="icons">
        <div class="left-side-icons">
          <div class="nav-item heart-icon-wrapper">
            <div class="nav-link" @click="likeHandler">
              <i v-if="post.hasUserLikedPost" class="fas fa-heart" :style="hasUserLikedPost"></i>
              <i v-else class="far fa-heart"></i>
            </div>
          </div>
          <div class="nav-item comments-icon-wrapper">
            <router-link :to="{name:'post-details', params: {postId: post.id}}" class="nav-link">
              <i class="far fa-comments"></i>
            </router-link>
          </div>
        </div>
        <div class="right-side-icons">
          <div class="nav-item bookmark-icon-wrapper">
            <router-link to="/account/activity" class="nav-link">
              <i class="far fa-bookmark"></i>
            </router-link>
          </div>
        </div>
      </div>
      <div class="likes-count">{{getLikesCountMessage}}</div>
      <div class="comments-wrapper">
        <div class="caption">
          <router-link
            :to="{name:'single-user-page', params: {username: post.creatorUsername}}"
            class="caption-username"
          >{{post.creatorUsername}}</router-link>
          <span class="caption-text">{{post.caption}}</span>
        </div>
        <div class="count-comments" v-if="lastComment">
          <router-link
            :to="{name:'post-details', params: {postId: post.id}}"
          >View all {{getCommentsCount}} comments</router-link>
        </div>
        <div class="count-comments" v-else>
          <router-link to="#" class>Write the first comment...</router-link>
        </div>
        <div class="comments" v-if="lastComment">
          <div class="comment">
            <router-link
              :to="{name:'single-user-page', params: {username: lastComment.creatorUsername}}"
              class="comment-username"
            >{{lastComment.creatorUsername}}</router-link>
            <span class="comment-text">{{lastComment.content}}</span>
          </div>
        </div>
        <!-- <div class="comments" >
          <router-link
            :to="{name:'single-user-page', params: {username: lastComment.creatorUsername}}"
            class="comment-username"
          >{{lastComment.creatorUsername}}</router-link>
          <span class="comment-text">{{lastComment.content}}</span>
        </div>-->
      </div>
      <div class="time">{{getTime}}</div>
      <section class="add-comment-section">
        <form class="post-form" @submit.prevent="onCommentSubmit">
          <textarea-autosize
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
  </article>
</template>

<script>
import placeholderImg from "@/assets/images/placeholder.png";
import { mapGetters, mapActions } from "vuex";
import { required } from "vuelidate/lib/validators";

export default {
  name: "post-feed-card",
  data() {
    return {
      content: "",
      hasUserLikedPost: {
        color: "red"
      }
    };
  },
  props: {
    post: {
      type: Object,
      required: true
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
    ...mapGetters("comment", {
      getLastComment: "getLastComment"
    }),
    lastComment() {
      return this.getLastComment(this.post.id);
    },
    postImageSizeClass() {
      return this.post.imageClass;
    },
    profilePicUrl() {
      return this.post.creatorProfilePicUrl || placeholderImg;
    },
    getProfilePicClass() {
      return this.post.creatorImageClass || "";
    },
    getCommentsCount() {
      return this.post.comments.length;
    },
    getLikesCountMessage() {
      return this.post.likeCount === 1
        ? "1 like"
        : this.post.likeCount + " likes";
    },
    getTime() {
      if (!this.lastComment.time) {
        return;
      }

      const dayTime = this.lastComment.time.hour <= 12 ? "AM" : "PM";
      const month =
        this.lastComment.time.month.substring(0, 1) +
        this.lastComment.time.month.substring(1).toLowerCase();
      const hour =
        this.lastComment.time.hour < 10
          ? "0" + this.lastComment.time.hour
          : this.lastComment.time.hour;
      const minute =
        this.lastComment.time.minute < 10
          ? "0" + this.lastComment.time.minute
          : this.lastComment.time.minute;

      return (
        this.lastComment.time.dayOfMonth +
        " " +
        month +
        " " +
        hour +
        ":" +
        minute +
        " " +
        dayTime
      );
    }
  },
  methods: {
    ...mapActions("post", ["changePostLikeCount"]),
    ...mapActions("comment", ["createComment", "fetchLastCommentByPostId"]),

    likeHandler() {
      const data = {
        postId: this.post.id,
        userId: this.loggedInUser.id
      };

      this.changePostLikeCount(data);
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
    this.fetchLastCommentByPostId(this.post.id);
  }
};
</script>

<style scoped>
/* UserFeedPostCard */
.user-feed-postcard-article {
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid #e6e6e6;
  margin-bottom: 30px;
  background: white;
}

header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0.5rem 1rem;
  background: white;
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
}

.post-info-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-left: 0.7rem;
}

.username-container {
  text-align: left;
  /* display: flex;
  justify-content: space-between; */
  /* align-items: center; */
  /* width: 100%; */
}

.header-button {
  /* padding-right: 5px; */
}

img {
  /* width: 100%; */
}

.image-wrapper {
  /* flex: 0 0 2.5rem; */
  /* width: 100%; */
  position: relative;
  overflow: hidden;
  /* border-radius: 50%; */
}

.image-wrapper:after {
  display: block;
  content: "";
  padding-top: 80%;
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

.comments-wrapper {
  text-align: left;
  padding: 8px 16px;
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

.caption-text {
  word-break: break-all;
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

.comment-text {
  margin-left: 5px;
  word-break: break-all;
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

@media screen and (max-width: 900px) {
  .user-feed-postcard-article {
    margin-bottom: 10px;
  }
}
</style>