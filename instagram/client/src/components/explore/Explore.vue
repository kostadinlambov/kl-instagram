<template>
  <section class="main-section">
    <div class="container text-center col-md-9 mt-5">
      <article class="people-article" v-if="users.length > 0">
        <div class="header">
          <div class="header-title">Discover People</div>
          <div class="people-link">
            <router-link class="people-link" to="/people">See All</router-link>
          </div>
        </div>
        <div class="slider-container">
          <people-slider
            v-bind:users="users"
            v-on:follow="onFollowHandler"
            v-on:unfollow="onUnFollowHandler"
          ></people-slider>
        </div>
      </article>
      <article class="people-article" v-else>
        <div class="user-message">You are the first user on Instagram! Invite some friends to us!</div>
      </article>
      <article class="explore-gallery-article" v-if="users.length > 0">
        <div class="explore-title">Explore</div>
        <PostGallery :posts="posts" />
      </article>
    </div>
  </section>
</template>

<script>
import PostGallery from "../postGallery/PostGallery";
import PeopleSlider from "./PeopleSlider";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "explore",
  components: {
    PostGallery,
    PeopleSlider
  },
  data: function() {
    return {
      pageNumber: 0,
      bottom: false
    };
  },
  computed: {
    ...mapGetters("post", {
      posts: "getNotLoggedInUserPosts",
      pagesCount: "getForeignPostPagesCount",
      currentPage: "getCurrentPageForeign",
      loading: "getLoadingForeignPosts"
    }),
    ...mapGetters("auth", {
      loggedInUser: "getLoggedInUserData"
    }),
    ...mapGetters("user", {
      usersAll: "getAllUsers",
      users: "getFirstFiveUsers"
    })
  },

  methods: {
    ...mapActions("post", [
      "fetchNonLoggedInUserPosts",
      "resetForeignPostState"
    ]),

    ...mapActions("user", ["followUserAction", "unFollowUserAction"]),

    scroll() {
      const data = {
        loggedInUser: this.loggedInUser.id,
        pageNumber: this.pageNumber
      };

      this.fetchNonLoggedInUserPosts(data);

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
    },

    onFollowHandler(userId) {
      this.followUserAction(userId);
    },

    onUnFollowHandler(userId) {
      this.unFollowUserAction(userId);
    },

    addListeners() {
      window.addEventListener("scroll", () => {
        this.bottom = this.bottomVisible();
      });
      this.scroll();
    }
  },

  created() {
    this.addListeners();
  },
  watch: {
    bottom(bottom) {
      if (bottom && !this.loading && this.pagesCount > this.currentPage + 1) {
        this.scroll();
      }
    }
  },
  beforeDestroy() {
    this.resetForeignPostState();
  }
};
</script>

<style scoped>
.main-section {
  margin-top: 5rem;
}

.people-article {
  max-width: 935px;
  width: 100%;
  padding: 40px 0 0;
  margin: auto;
  margin-bottom: 60px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.header-title {
  display: block;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  margin: -6px 0;
  color: #999;
}

a.people-link {
  text-decoration: none;
}

.people-link {
  font-weight: 600;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  color: rgb(65, 184, 131);
  text-decoration: none;
}

.explore-gallery-article {
  display: block;
  max-width: 935px;
  width: 100%;
  padding: 40px 0 0;
  margin: auto;
}

.explore-title {
  display: block;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  margin: -6px 0;
  text-align: left;
  color: #999;
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

</style>
