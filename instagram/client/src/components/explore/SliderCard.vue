<template>
  <section class="card-container">
    <div class="slider-image-wrapper">
      <div class="slider-image-container">
        <img :class="imageSizeClass" :src="profilePicUrl" alt="user-pic" />
      </div>
    </div>

    <div class="username-container">
      <router-link
        :to="{'name':'single-user-page', 'params': {'username': user.username}}"
        class="username"
      >{{user.username}}
      </router-link>
    </div>
    <div class="button-container">
      <div class="buttons-wrapper" v-if="!user.active">
        <button class="btn app-button-primary btn-sm" v-on:click="follow(user.id)">Follow</button>
      </div>
      <div class="buttons-wrapper" v-else>
        <button class="btn app-button-secondary btn-sm" v-on:click="unfollow(user.id)">Following</button>
      </div>
    </div>
  </section>
</template>


<script>
import placeholderLink from "@/assets/images/placeholder.png";

export default {
  name: "slider-card",
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  computed: {
    imageSizeClass() {
      return this.user.imageClass || "";
    },
    profilePicUrl(){
      return  this.user.profilePicUrl || placeholderLink;
    }
  },
  methods: {
    follow(userId) {
      debugger;
      this.$emit("follow", userId);
    },
    unfollow(userId) {
      debugger;
      this.$emit("unfollow", userId);
    }
  }
};
</script>

<style scoped>
.card-container {
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-left: 24px;
  width: 176px;
  padding: 1rem 0.5rem;
}

.slider-image-wrapper {
  /* flex: 1 1 3rem; */
  width: 4rem;
  /* position: relative;
  overflow: hidden;
  border-radius: 50%; */
}

.slider-image-container {
  /* flex: 0 0 3rem; */
  /* width: 3rem; */
  width: 100%;
  position: relative;
  overflow: hidden;
  border-radius: 50%;
}

.slider-image-container:after {
  display: block;
  content: "";
  padding-top: 100%;
}

.slider-image-container img {
  display: block;
  position: absolute;
  width: 100%;
  height: auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.slider-image-container img.l {
  display: block;
  position: absolute;
  width: auto;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.username-container {
  margin-top: 16px;
  margin-bottom: 32px;
}

a.username {
  font-weight: 600;
  color: #262626;
  text-decoration: none;
}

a.username:hover{
  color: rgb(65, 184, 131);
}

.app-button-primary {
  background-color: rgb(53, 73, 94);
  color: white;
}

.app-button-primary:hover {
  background: rgb(65, 184, 131);
  color: #fff;
  border: 1px solid #fff;
  box-shadow: 0 0 14px 1px rgba(0, 0, 0, 0.3);
}

.app-button-secondary {
  background: rgb(65, 184, 131);
  color: white;
}

.app-button-secondary:hover {
  background: rgb(53, 73, 94);
  color: #fff;
  border: 1px solid #fff;
  box-shadow: 0 0 14px 1px rgba(0, 0, 0, 0.3);
}
</style>