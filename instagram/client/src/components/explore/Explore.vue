<template>
  <section class="main-section">
    <div class="container text-center col-md-9 mt-5">
      <div class="status">0 | 0</div>
      <article class="people-article">
        <h1 class="text-center font-weight-bold pt-5">people-article</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus voluptatem aperiam alias ab amet ut odit perferendis. Esse quod similique fugit eaque minus, laudantium modi veritatis! Recusandae neque unde praesentium.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus voluptatem aperiam alias ab amet ut odit perferendis. Esse quod similique fugit eaque minus, laudantium modi veritatis! Recusandae neque unde praesentium.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus voluptatem aperiam alias ab amet ut odit perferendis. Esse quod similique fugit eaque minus, laudantium modi veritatis! Recusandae neque unde praesentium.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus voluptatem aperiam alias ab amet ut odit perferendis. Esse quod similique fugit eaque minus, laudantium modi veritatis! Recusandae neque unde praesentium.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus voluptatem aperiam alias ab amet ut odit perferendis. Esse quod similique fugit eaque minus, laudantium modi veritatis! Recusandae neque unde praesentium.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus voluptatem aperiam alias ab amet ut odit perferendis. Esse quod similique fugit eaque minus, laudantium modi veritatis! Recusandae neque unde praesentium.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus voluptatem aperiam alias ab amet ut odit perferendis. Esse quod similique fugit eaque minus, laudantium modi veritatis! Recusandae neque unde praesentium.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus voluptatem aperiam alias ab amet ut odit perferendis. Esse quod similique fugit eaque minus, laudantium modi veritatis! Recusandae neque unde praesentium.</p>
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
      pageNumber: 0,
      bottom: false,
    };
  },
  computed: {
    ...mapGetters("post", {
      // posts: "getUserPosts",
      posts: "getNotLoggedInUserPosts",
      pagesCount: "getForeignPostPagesCount",
      currentPage: "getCurrentPageForeign",
      loading: "getLoadingForeignPosts",
    }),
    ...mapGetters("auth", {
      loggedInUser: "getLoggedInUserData"
    })
  },

  methods: {
    ...mapActions("post", ["fetchNonLoggedInUserPosts", "resetForeignPostState"]),
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
      if (bottom && !this.loading && this.pagesCount >  this.currentPage + 1) {
        this.scroll();
      }
    }
  },
  beforeDestroy(){
    this.resetForeignPostState();
  }
};
</script>

<style>
#status {
  position: fixed;
  font-size: 24px;
  z-index: 5000;
  color: red;
  margin-top: 5rem;
}
</style>
