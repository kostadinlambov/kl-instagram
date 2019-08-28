<template>
  <main class="mt-5">
    <div class="container text-center col-md-9 pt-5">
      <header class="user-homepage-header">
        <div class="card-container">
          <div class="content-wrapper">
            <div class="profile-pick-container">
              <img :class="getTimeLineUser.imageClass" :src="profilePicUrl" alt="user-pic" />
            </div>
            <section class="user-info-wrapper">
              <div class="username-wrapper">
                <h1 class="username">{{getTimeLineUser.username}}</h1>
                <div v-if="getTimeLineUser.id === loggedInUser.id">
                  <router-link class="btn home-page-btn" to="/post/create">Create Post</router-link>
                </div>
                <div v-if="getTimeLineUser.id === loggedInUser.id || loggedInUser.isAdminOrRoot">
                  <router-link class="btn home-page-btn" to="/account/edit">Edit Profile</router-link>
                </div>
                <!-- <div v-if="getTimeLineUser.id === loggedInUser.id">
                  <router-link class="btn home-page-btn" to="/account/settings">Settings</router-link>
                </div>-->
              </div>
              <ul class="follower-info">
                <li>
                  <span class="post-count">{{postCount}} post</span>
                </li>
                <li>
                  <div
                    class="follower-link"
                    data-toggle="modal"
                    data-target="#follower-modal"
                    v-on:click="isFollowerModal(true)"
                  >{{followersCount}} follower</div>
                  <!-- <router-link class="follower-link" to="/followers"  data-toggle="modal" data-target="#testleModalId">1 follower</router-link> -->
                </li>
                <li>
                  <div
                    class="follower-link"
                    data-toggle="modal"
                    data-target="#follower-modal"
                    v-on:click="isFollowingModal(true)"
                  >{{followingCount}} following</div>
                </li>
              </ul>

              <div class="bio-info">
                <h2 class="names">{{getTimeLineUser.firstName}} {{getTimeLineUser.lastName}}</h2>
                <span class="bio">{{getTimeLineUser.bio}}</span>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  :href="webpageUrl"
                  class="webpage-link"
                >{{getTimeLineUser.website}}</a>
              </div>
            </section>
          </div>
        </div>
      </header>
      <div class="gallery-navbar-wrapper">
        <router-link class="title-link align-middle active" to="#">
          <i class="fas fa-border-all"></i>
          <span class="bookmark-icon-span">POSTS</span>
        </router-link>
        <div class="title-link bookmark-wrapper">
          <i class="far fa-bookmark"></i>
          <span class="bookmark-icon-span">SAVED</span>
        </div>
      </div>

      <PostGallery v-if="postCount > 0" :posts="posts" />
      <div class="user-message" v-else>
        Start capturing and sharing your moments. Share your first photo!
      </div>
    </div>
    <!-- <li class="nav-item">
      <router-link to="#" class="nav-link" data-toggle="modal" data-target="#testleModalId">Modal</router-link>
    </li>-->

    <follower-modal :followingModal="followingModal" :followerModal="followerModal"></follower-modal>
  </main>
</template>
<script>
import { userService } from "@/infrastructure/userService";
import { mapGetters, mapActions } from "vuex";
import { debuglog } from "util";
import placeholderLink from "@/assets/images/placeholder.png";
import FollowerModal from "./FollowerModal";
import PostGallery from "../postGallery/PostGallery";

export default {
  name: "user-home-page",
  components: {
    FollowerModal,
    PostGallery
  },
  data() {
    return {
      username: this.$route.params.username,
      userId: userService.getUserId(),
      placeholderLink,
      followingModal: false,
      followerModal: false,
      pageNumber: 0,
      bottom: false
    };
  },
  computed: {
    ...mapGetters("auth", {
      loggedInUser: "getLoggedInUserData",
      getTimeLineUser: "getTimeLineUserData"
    }),
    ...mapGetters("user", {
      followingCount: "getFollowingCount",
      followersCount: "getFollowersCount",
      followingCandidates: "getFollowingCandidates"
    }),
    ...mapGetters("post", {
      posts: "getUserPosts",
      postCount: "getPostCount",
      pagesCount: "getUserPostPagesCount",
      currentPage: "getCurrentPageUser",
      loading: "getLoadingUserPosts"
    }),
    webpageUrl() {
      return "//" + this.getTimeLineUser.website;
    },
    profilePicUrl() {
      return this.getTimeLineUser.profilePicUrl || this.placeholderLink;
    },
    imageSizeClass() {
      return this.getTimeLineUser.imageClass || "";
    }
  },
  methods: {
    ...mapActions("post", ["fetchUserPosts", "resetUserPostState"]),
    ...mapActions("user", [
      "fetchFollowers",
      "fetchFollowing",
      "fetchAllFollowingCandidates"
    ]),
    ...mapActions("auth", ["fetchTimeLineUser"]),

    isFollowingModal(value) {
      this.followingModal = value;
      this.followerModal = false;
    },
    isFollowerModal(value) {
      this.followerModal = value;
      this.followingModal = false;
    },
    scroll() {
      const data = {
        username: this.username,
        pageNumber: this.pageNumber
      };

      this.fetchUserPosts(data);

      this.pageNumber = this.pageNumber + 1;

      if (this.bottomVisible) {
        this.scroll;
      }
    },
    bottomVisible() {
      const scrollY = window.scrollY;
      const visible = document.documentElement.clientHeight;
      const pageHeight = document.documentElement.scrollHeight;
      const bottomOfPage = visible + scrollY >= pageHeight;
      return bottomOfPage || pageHeight < visible;
    }
  },
  created() {
    this.fetchFollowers(this.username);
    this.fetchFollowing(this.username);
    // this.fetchAllFollowingCandidates(this.username);
    this.fetchTimeLineUser({ username: this.username });

    window.addEventListener("scroll", () => {
      this.bottom = this.bottomVisible();
    });
    this.scroll();
  },
  watch: {
    $route(to, from) {
      this.resetUserPostState();

      this.username = to.params.username;

      this.fetchTimeLineUser({ username: this.username });
      this.fetchFollowers(this.username);
      this.fetchFollowing(this.username);
      //  this.fetchAllFollowingCandidates(this.username);

      this.pageNumber = 0;

      const data = {
        username: this.username,
        pageNumber: this.pageNumber
      };

      this.fetchUserPosts(data);
      this.pageNumber++;
    },

    bottom(bottom) {
      if (bottom && !this.loading && this.pagesCount > this.currentPage + 1) {
        this.scroll();
      }
    }
  },

  beforeDestroy() {
    this.resetUserPostState();
  }
};
</script>

<style scoped>
/*############ HomePage Header #######################*/
.user-homepage-header {
  margin-bottom: 44px;
}

.card-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* flex-wrap: wrap; */

  /* border: 2px solid red; */
  background: rgb(255, 255, 255);
  padding: 0.5rem 1rem;
  border-radius: 5px;

  /* flex-grow: 1; */
  margin: 0 auto 30px;
  max-width: 935px;
  width: 100%;
  padding: 40px 20px;
}

.content-wrapper {
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 1rem 0;
  /* border: 2px solid blue; */
}

.profile-pick-container {
  flex: 0 0 9rem;
  /* width: 3rem; */
  position: relative;
  overflow: hidden;
  border-radius: 50%;
  margin: 0 3rem auto 3rem;
  /* border: 1px solid red; */
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

.user-info-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

.username-wrapper {
  text-align: left;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 1.2rem;
}

h1.username {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 300;
  font-size: 28px;
  line-height: 36px;
  margin: -5px 1rem -6px 0;
  padding: 0;
}

.home-page-btn {
  margin-left: 1rem;
  margin-right: 0.5rem;
  padding: 0.275rem 0.55rem;
  background-color: transparent;
  border: 1px solid #dbdbdb;
  color: #262626;
  white-space: nowrap;
}

.home-page-btn:hover {
  background: rgb(65, 184, 131);
  color: #fff;
  border: 1px solid #fff;
  box-shadow: 0 0 14px 1px rgba(0, 0, 0, 0.3);
}

ul.follower-info {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 1.2rem;
}

ul.follower-info li {
  list-style: none;
  margin-right: 2.2rem;
}

.follower-link,
span.post-count {
  text-decoration: none;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  white-space: nowrap;
  cursor: pointer;
}

span.post-count {
  cursor: auto;
}

.follower-link:hover {
  color: rgb(65, 184, 131);
}

.bio-info {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  font-size: 16px;
  line-height: 24px;
  word-wrap: break-word;
  color: #212529;
}

.names {
  font: inherit;
  display: inline;
  font-weight: 600;
  padding: 0;
  margin: 0;
  white-space: nowrap;
  color: #262626;
}

span.bio {
  margin: 0;
  padding: 0;
  border: 0;
  font: inherit;
  vertical-align: baseline;
  text-align: left;
}

.webpage-link {
  font-weight: 600;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  /* color: #1e6cb9b6; */
  color: rgb(65, 184, 131);
  text-decoration: none;
}

/*############ gallery-navbar-wrapper #######################*/
.gallery-navbar-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #efefef;
  /* border-top: 1px solid red; */
  padding-top: 0.2rem;
}

.gallery-title {
  margin-right: 60px;
  list-style-type: none;
}

.title-link {
  height: 52px;
  border-top: 1px solid #262626;
  padding: 1rem 0;
  margin-right: 4rem;
  color: #999;
  text-decoration: none;
}

.title-link:hover {
  color: rgb(65, 184, 131);
  border-top: 1px solid rgb(65, 184, 131);
  cursor: pointer;
}

.bookmark-icon-span {
  margin-left: 5px;
}

/* .bookmark-wrapper:hover{

} */

a.active {
  color: rgb(65, 184, 131);
  border-top: 1px solid rgb(65, 184, 131);
  font-weight: 600;
  pointer-events: none;
  cursor: default;
}

/* a.active:hover{
  cursor: pointer;
  color:  rgb(53, 73, 94);
} */

/*############ picture gallery grid #######################*/
.gallery-container {
  max-width: 935px;
  width: 100%;
  padding: 40px 0 0;
  margin: auto;
}

.gallery-wrapper {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 32%);
  gap: 1rem;
  justify-content: space-around;
  align-content: stretch;
}

.user-message {
  font-size: 1.5rem;
  font-weight: 600;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 1rem;
  color: rgb(65, 184, 131);
  background: white;
  border: 1px solid #e6e6e6;
  width: 60%;
  margin: auto;
}

@media screen and (max-width: 900px) {
}

@media screen and (max-width: 690px) {
}

@media screen and (max-width: 400px) {
  .card-container {
    /* flex-direction: column;
    flex-wrap: wrap; */
  }

  .content-wrapper {
    flex-direction: column;
  }

  .username-wrapper {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: auto;
  }

  h1.username,
  .home-page-btn {
    margin: 0.3rem 0;
  }

  .gallery-wrapper {
    /* justify-content: space-around;
    align-content: space-around;
    gap: 0.3rem; */
  }
}

@media screen and (max-width: 350px) {
}
</style>
