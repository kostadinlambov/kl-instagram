<template>
  <router-link class="image-container" to="#">
    <img :class="['gallery-img', currentPost.imageClass ]" :src="imageUrl" alt />
    <div class="img-details">
      <div class="likes-and-comments">
        <div class="likes">
          <i class="fas fa-heart"></i>
          <span>{{currentPost.likeCount}}</span>
          {{currentPost.imageClass}}
          {{currentPost.creatorUsername}}
        </div>
        <div class="comments">
          <i class="fas fa-comments"></i>
          <span>{{currentPost.comments.length}}</span>
        </div>
      </div>
    </div>
  </router-link>
</template>  

<script>
import placeholderLink from "../../assets/images/placeholder.png";
import { userService } from "@/infrastructure/userService";

export default {
  name: "post-card",
  data() {
    return {
      posts: [],
      placeholder: placeholderLink,
      // imageUrl: this.currentPost.imageUrl || this.placeholder,
      imageClass: ""
    };
  },
  props: {
    currentPost: {
      type: Object,
      required: true
    }
  },
  computed: {
    imageUrl() {
      return this.currentPost.imageUrl || this.placeholder;
    }
  },
  methods: {
    // imageSizeClass(imageUrl) {
    //   console.log("imageUrl:", imageUrl);
    //   let img = new Image();
    //   img.src = imageUrl;
    //   console.log("img.width:", img.width);
    //   console.log("img.height:", img.height);
    //   debugger;
    //   const imageClass = userService.getImageSize(imageUrl);
    //   console.log(imageClass);
    //   console.log(this.currentPost.imageUrl);
    //   return userService.getImageSize(imageUrl);
    // },
    // getImgUrl(picUrl) {
    //   console.log(picUrl);
    //   return require(picUrl);
    // }
  },
  created() {
    // userService.getImageClass(this.imageUrl).then(res => {
    //   debugger;
    //   this.imageClass = res;
    //   console.log("res", res);
    // });
  },
  watch: {
    // currentPost(from, to) {
    //   console.log("this.currentPost: ", this.currentPost);
    //   console.log("from: ", from);
    //   console.log("to: ", to);
    //   debugger;
    // }
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
  box-shadow: 0px 0px 12px 2px rgba(65, 184, 131, 0.3);

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
  /* transform: scale(1.1); */
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

.gallery-img.l{
  position: absolute;
  display: block;
  width: auto;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.likes-and-comments {
  width: 100%;
  height: 100%;
  position: absolute;
  content: "";
  background: rgba(65, 184, 131, 0.85);
  /* background: rgba(64, 163, 244, 0.9); */
  opacity: 0;
  transition: all 0.3s ease-in;
  display: flex;
  justify-content: center;
  align-items: center;
}

.likes-and-comments:hover {
  opacity: 1;
  color: white;
}

.likes {
  margin-right: 2rem;
}

.likes > span,
.comments > span {
  margin-left: 8px;
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