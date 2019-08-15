<template>
  <router-link class="image-container" to="#">
    <img class="gallery-img l" :src="currentPost.imageUrl" alt />
  </router-link>
</template>  

<script>
import Img from "../../assets/images/placeholder.png";

export default {
  name: "post-card",
  data() {
    return {
      posts: []
    };
  },
  props: {
    currentPost: {
      type: Object,
      required: true,
      // default: function() {
      //   return { message: "hello" };
      // }
    }
  },
  methods: {
    getImgUrl(picUrl) {
      console.log(picUrl);
      return require(picUrl);
    }
  }
};
</script>

<style scoped>

/*############ picture gallery grid #######################*/
/* .gallery-container {
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
} */

.image-container {
  /* width: 280px;
  height: 280px; */
  /* width: 280px; */
  height: 100%;
  width: 100%;
  overflow: hidden;

  margin: auto;
  position: relative;

  transition: transform 1.5s;
}

.image-container:after {
  display: block;
  content: "";
  padding-top: 100%;
}

.image-container:hover {
  transform: scale(1.1);
  box-shadow: 0px 0px 12px 2px rgba(65, 184, 131, 0.8);
}

img.gallery-img {
  display: block;
  position: absolute;
  width: 100%;
  height: auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  /* transition: transform 1.5s; */
}

.gallery-img.l {
  position: absolute;
  display: block;
  width: auto;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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