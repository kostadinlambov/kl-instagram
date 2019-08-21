<template>
  <section class="main-section">
    <div class="container text-center col-md-9 mt-5">
      <article class="people-article">
        <h1 class="text-center font-weight-bold pt-5">people-article</h1>
      </article>

      <article class="explore-gallery-article">
        <h1 class="text-center font-weight-bold pt-5">explore-gallery-article</h1>
        <PostGallery :posts="posts" />
      </article>
    </div>
  </section>
</template>

<script>
import PostGallery from "../postGallery/PostGallery";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "explore",
  components: {
    PostGallery
  },
  data: function() {
    return {
      pageNumber: 0
    };
  },
  computed: {
    ...mapGetters("post", {
      // posts: "getUserPosts",
      posts: 'getNotLoggedInUserPosts'
    }),
    ...mapGetters("auth", {
      loggedInUser: "getLoggedInUserData"
    })
  },

  methods: {
    ...mapActions("post", ["fetchNonLoggedInUserPosts"])
  },

  created() {
    const data = {
      loggedInUser: this.loggedInUser.id,
      pageNumber: this.pageNumber,
    };

    this.fetchNonLoggedInUserPosts(data);
  }
};
</script>

<style>
</style>
