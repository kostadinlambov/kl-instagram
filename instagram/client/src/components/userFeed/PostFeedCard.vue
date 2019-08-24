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
            <router-link to="/account/activity" class="nav-link">
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
      <div class="comments-wrapper">
        <div class="caption">
          <router-link
            :to="{name:'single-user-page', params: {'username': 'pesho'}}"
            class="caption-username"
          >username</router-link>
          <span class="caption-text">My first Post</span>
        </div>
        <div class="count-comments" v-if="getCommentsCount">
          <router-link to="#" class>View all {{getCommentsCount}} comments</router-link>
        </div>
        <div class="count-comments" else>
          <router-link to="#" class>Write the first comment...</router-link>
        </div>
        <div class="comments">
          <div class="comment">
            <router-link
              :to="{name:'single-user-page', params: {'username': 'pesho'}}"
              class="comment-username"
            >comment-username</router-link>
            <span class="comment-text">My first Comment</span>
          </div>
        </div>
      </div>
      <div class="time">{{getTime}}</div>
      <section class="add-comment-section">
        <form class="post-form">
          <textarea-autosize
            class="post-textarea"
            placeholder="Add a comment..."
            ref="someName"
            v-model="areaContent"
            :min-height="10"
            :max-height="80"
            @blur.native="onBlurTextarea"
          ></textarea-autosize>
          <!-- :style="{height: '10px'}" -->

          <button disabled class="btn app-button-secondary btn-sm">Post</button>
        </form>
      </section>
    </div>
  </article>
</template>

<script>
import placeholderImg from "@/assets/images/placeholder.png";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "post-feed-card",
  data() {
    return {
      areaContent: "",
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
  computed: {
    ...mapGetters("auth", {
      loggedInUser: "getLoggedInUserData"
    }),
    imageSizeClass() {
      return "l";
      //   return this.currentUser.imageClass || '';
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
    getTime() {
      const dayTime = this.post.time.hour <= 12 ? "AM" : "PM";
      const month =
        this.post.time.month.substring(0, 1) +
        this.post.time.month.substring(1).toLowerCase();
      const hour =
        this.post.time.hour < 10
          ? "0" + this.post.time.hour
          : this.post.time.hour;
      const minute =
        this.post.time.minute < 10
          ? "0" + this.post.time.minute
          : this.post.time.minute;

      return (
        this.post.time.dayOfMonth +
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

    likeHandler() {
      debugger;
      const data = {
        postId: this.post.id,
        userId: this.loggedInUser.id
      };

      this.changePostLikeCount(data);
    }
  }
};
</script>

<style  scoped>
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
}

.left-side-icons {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.comments-wrapper {
  text-align: left;
  padding: 0 16px;
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

@media screen and (max-width: 900px) {
  .user-feed-postcard-article {
    margin-bottom: 10px;
  }
}
</style>