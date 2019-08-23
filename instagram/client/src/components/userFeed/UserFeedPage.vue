<template>
  <main class="main-container container col-md-9">
    <section class="main-section">
      <h2 class>Main Section</h2>
      <user-feed-card v-for="post in posts" v-bind:key="post.id" v-bind:post="post"></user-feed-card>
    </section>
    <section class="aside-section">
      <h2 class>Aside Section</h2>
    </section>
  </main>
</template>

<script>
import UserFeedCard from "./UserFeedCard";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "user-feed-page",
  components: {
    UserFeedCard
  },
  data() {
    return {
    
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
  },
  methods: {
    ...mapActions("post", [
      "fetchNonLoggedInUserPosts",
      "resetForeignPostState"
    ]),
    onBlurTextarea() {}
  },
  created(){
     const data = {
        loggedInUser: this.loggedInUser.id,
        pageNumber: 0
      };
    this.fetchNonLoggedInUserPosts(data);
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
  width: 100%;
  position: relative;
}

.main-section {
  margin-right: 20px;
  max-width: 610px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex-shrink: 0;
  margin: 0;
  padding: 0;
}
.aside-section {
  max-width: 305px;
  position: absolute;
  right: 0;
  width: 100%;
}


</style>




