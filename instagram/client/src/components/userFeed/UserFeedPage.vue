<template>
  <main class="main-container container col-md-9">
    <section class="main-section" v-if="posts.length > 0">
      <post-feed-card v-for="post in posts" v-bind:key="post.id" v-bind:post="post"></post-feed-card>
    </section>
     <section class="main-section" v-else>
       <div class="user-message">
          You don't follow any user on Instagram or the users that you follow haven't posted anything yet!
        </div>
    </section>
    <section class="aside-section">
      <user-feed-user-card v-bind:user="loggedInUser"> </user-feed-user-card>
      <user-feed-suggestions> </user-feed-suggestions>
    </section>
  </main>
</template>

<script>
import PostFeedCard from "./PostFeedCard";
import UserFeedUserCard from "./UserFeedUserCard";
import People from '../people/People';
import UserFeedSuggestions from './UserFeedSuggestions'
import { mapGetters, mapActions } from "vuex";

export default {
  name: "user-feed-page",
  components: {
    PostFeedCard, UserFeedUserCard, People, UserFeedSuggestions
  },
  data() {
    return {
      pageNumber: 0,
      bottom: false
    };
  },
  computed: {
    ...mapGetters("post", {
      posts: "getFollowingPosts",
      pagesCount: "getFollowingPostsPagesCount",
      currentPage: "getCurrentPageFollowingPosts",
      loading: "getLoadingFollowingPosts"
    }),
    ...mapGetters("auth", {
      loggedInUser: "getLoggedInUserData"
    })
  },
  methods: {
    ...mapActions("post", ["fetchFollowingPosts", "resetFollowingPostState"]),
    onBlurTextarea() {},
    scroll() {
      const data = {
        loggedInUser: this.loggedInUser.id,
        pageNumber: this.pageNumber
      };
      this.fetchFollowingPosts(data);

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
    window.addEventListener("scroll", () => {
      this.bottom = this.bottomVisible();
    });
    this.scroll();
  },
  watch: {
    bottom(bottom) {
      if (bottom && !this.loading && this.pagesCount > this.currentPage + 1) {
        this.scroll();
      }
    }
  },
  beforeDestroy() {
    this.resetFollowingPostState();
  }
};
</script>

<style scoped>
.main-container {
  max-width: 935px;
  display: flex;
  flex-grow: 1;
  flex-flow: row nowrap;
  margin: 5rem auto 0;
  padding-top: 60px;
  /* width: 100%; */
  position: relative;
}

.main-section {
  margin-right: 30px;
  max-width: 543px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex-shrink: 0;
  margin: 0;
  padding: 0;
}
.aside-section {
  max-width: 372px;
  /* position: absolute; */
  /* right: 0; */
  width: 100%;
  /* margin: auto; */
  margin-left:2rem;
}

.user-message{
  font-size: 1.5rem;
  font-weight: 600;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 1rem;
  color: rgb(65, 184, 131);
  background: white;
  border: 1px solid #e6e6e6;
}

@media  screen and (max-width: 900px){
  .main-container{
    display: flex;
    flex-direction: column-reverse;
    justify-content: center;
    align-items: center;
  }

  .main-section {
    margin:auto;
  }

  .aside-section {
    margin:0 auto 2rem;;
  }

}

</style>




