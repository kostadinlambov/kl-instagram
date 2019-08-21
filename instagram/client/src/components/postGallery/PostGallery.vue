<template>
  <div class="gallery-container">
    <ul class="gallery-wrapper">
      <post-card v-for="post in posts" v-bind:key="post.id" v-bind:currentPost="post"></post-card>
    </ul>
  </div>
</template>

<script>
import PostCard from "./PostCard";

export default {
  name: "post-gallery",
  components: { PostCard },
  props: {
      posts: {
          type: Array,
          required: true,
      }
  }
};
</script>

<style scoped>
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

@media screen and (max-width: 900px) {
}

@media screen and (max-width: 690px) {
}

@media screen and (max-width: 400px) {
  .gallery-wrapper {
    /* justify-content: space-around;
    align-content: space-around;
    gap: 0.3rem; */
  }
}

@media screen and (max-width: 350px) {
}
</style>
