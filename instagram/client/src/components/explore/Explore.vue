<template>
  <section class="main-section">
    <div class="container text-center col-md-9 mt-5">
      <article class="people-article">
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

      <article class="explore-gallery-article">
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
      // posts: "getUserPosts",
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
      users: "getFirstFiveUsers",
    })
  },

  methods: {
    ...mapActions("post", [
      "fetchNonLoggedInUserPosts",
      "resetForeignPostState"
    ]),

    ...mapActions("user", ["followUserAction", "unFollowUserAction"]),

    scroll() {
      // console.log('scroll')
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
      debugger;
      this.followUserAction(userId);
    },

    onUnFollowHandler(userId) {
      debugger;
      this.unFollowUserAction(userId);
    },

    addListeners() {
      window.addEventListener("scroll", () => {
        this.bottom = this.bottomVisible();
      });
      this.scroll();
      debugger;
      // this.$root.$on("on-follow", this.onFollowHandler);
      // this.$root.$on("on-unfollow", this.onUnFollowHandler);
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
    debugger;
    this.resetForeignPostState();
    // this.$root.$off("on-follow");
    // this.$root.$off("on-unfollow");
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
  /* color: #262626; */
  /* color: rgb(53, 73, 94); */
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

  /* color: #1e6cb9b6; */
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

.explore-title{
  display: block;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  margin: -6px 0;
  text-align: left;
  /* color: #262626; */
  /* color: rgb(53, 73, 94); */
  color: #999;
}




</style>
