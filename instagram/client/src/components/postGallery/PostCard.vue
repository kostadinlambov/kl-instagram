<template>
    <router-link
      class="image-container"
      :to="{name:'post-details', params: {postId: currentPost.id}}"
    >
      <img :class="['gallery-img', currentPost.imageClass ]" :src="imageUrl" alt />
      <div class="img-details">
        <div class="likes-and-comments">
          <div class="likes">
            <i class="fas fa-heart"></i>
            <span>{{currentPost.likeCount}}</span>
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
  components: {
  },
  data() {
    return {
      posts: [],
      placeholder: placeholderLink,
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
      return this.currentPost.imageUrl || placeholder;
    }
  },
};
</script>

<style scoped>
/*############ picture gallery grid #######################*/

.image-container {
  height: 100%;
  width: 100%;
  overflow: hidden;
  box-shadow: 0px 0px 12px 2px rgba(65, 184, 131, 0.3);

  margin: auto;
  position: relative;

  transition: transform 1.5s;
}

a.image-container:hover {
  cursor: pointer;
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

.gallery-img.l {
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