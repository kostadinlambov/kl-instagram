<template>
  <main class="mt-5">
    <div class="container text-center col-md-9 pt-5">
      <header class="user-homepage-header">
        <div class="card-container">
          <div class="content-wrapper">
            <div class="profile-pick-container">
              <img class="l" :src="profilePicUrl" alt="user-pic" />
            </div>
            <section class="user-info-wrapper">
              <div class="username-wrapper">
                <h1 class="username">{{loggedInUser.username}}</h1>
                <div>
                  <router-link class="btn home-page-btn" to="/accounts/edit">Edit Profile</router-link>
                </div>
                <div>
                  <router-link class="btn home-page-btn" to="/accounts/settings">Settings</router-link>
                </div>
              </div>
              <ul class="follower-info">
                <li>
                  <span class="post-count">1 post</span>
                </li>
                <li>
                  <router-link class="follower-link" to="/followers">1 follower</router-link>
                </li>
                <li>
                  <router-link class="follower-link" to="/followers">8 following</router-link>
                </li>
              </ul>

              <div class="bio-info">
                <h2 class="names">{{loggedInUser.firstName}} {{loggedInUser.lastName}}</h2>
                <span class="bio">{{loggedInUser.bio}}</span>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  :href="webpageUrl"
                  class="webpage-link"
                >{{loggedInUser.website}}</a>
              </div>
            </section>
          </div>
        </div>
      </header>
      <div class="gallery-navbar-wrapper">
        <router-link class="title-link align-middle" to="#">
          <i class="fas fa-border-all"></i>
          <span class="bookmark-icon-span">POSTS</span>
        </router-link>
        <router-link class="title-link" to="#">
          <i class="far fa-bookmark"></i>
          <span class="bookmark-icon-span">SAVED</span>
        </router-link>
      </div>
      <div class="gallery-container">
        <ul class="gallery-wrapper">
          <post-card v-for="post in posts" v-bind:key="post.id" v-bind:currentPost="post"></post-card>
        </ul>
      </div>
    </div>
  </main>
</template>
<script>
import { userService } from "../../infrastructure/userService";
import PostCard from "./PostCard";
import { mapGetters, mapActions } from "vuex";
import { debuglog } from "util";
import placeholderLink from "../../assets/images/placeholder.png";

export default {
  name: "user-home-page",
  data() {
    return {
      username: this.$route.params.username,
      userId: userService.getUserId(),
      placeholderLink
    };
  },
  components: {
    PostCard
  },
  computed: {
    ...mapGetters("auth", {
      loggedInUser: "getLoggedInUserData"
    }),
    ...mapGetters("post", {
      posts: "getUserPosts"
    }),
    webpageUrl() {
      return "//" + this.loggedInUser.website;
    },
    profilePicUrl() {
      return this.loggedInUser.profilePicUrl || this.placeholderLink;
    }
  },
  methods: {
    ...mapActions("post", ["fetchUserPosts"])
  },

  created() {
    this.fetchUserPosts(this.userId);
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

  color: #1e6cb9b6;
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
}

.bookmark-icon-span {
  margin-left: 5px;
}

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

/* .image-container { */

/* height: 100%;
  width: 100%;
  overflow: hidden;

  margin: auto;
  position: relative;

  transition: transform 1.5s;
} */

/* .image-container:after {
  display: block;
  content: "";
  padding-top: 100%;
}

.image-container:hover {
  transform: scale(1.1);
  box-shadow: 0px 0px 12px 2px rgba(65, 184, 131, 0.8);
} */

/* img.gallery-img {
  display: block;
  position: absolute;
  width: 100%;
  height: auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  /* transition: transform 1.5s; */
/* } */

/* .gallery-img.l {
  position: absolute;
  display: block;
  width: auto;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
} */

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
