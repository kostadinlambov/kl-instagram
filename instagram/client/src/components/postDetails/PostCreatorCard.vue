<template>
  <div class="card-container">
    <div class="content-wrapper">
      <div class="profile-pick-container">
        <img v-bind:class="post.imageClass" :src="profilePicUrl" alt="user-pic" />
      </div>
      <div class="usernames-container">
        <router-link
          :to="{'name':'single-user-page', 'params': {'username': post.creatorUsername}}"
          class="username"
        >{{post.creatorUsername}}</router-link>
        <div class="names">{{post.location}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import placeholderLink from "@/assets/images/placeholder.png";


export default {
  name: "post-creator-card",
  computed: {
    profilePicUrl(){
      return this.post.creatorProfilePicUrl || placeholderLink;
    }
  },
  props: {
    post: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
.card-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #e6e6e6;
  background: rgb(255, 255, 255);
  padding: 0.5rem 1rem;
  border-radius: 5px;
}

.content-wrapper {
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;
}

.profile-pick-container {
  flex: 0 0 3rem;
  /* width: 3rem; */
  position: relative;
  overflow: hidden;
  border-radius: 50%;
  box-shadow: 0px 0px 12px 2px rgba(65, 184, 131, 0.5);
}

.profile-pick-container:after {
  display: block;
  content: "";
  padding-top: 100%;
}

.profile-pick-container img.l {
  display: block;
  position: absolute;
  width: 100%;
  height: auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.profile-pick-container img {
  display: block;
  position: absolute;
  width: auto;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.usernames-container {
  margin-left: 20px;
  text-align: left;
}

a.username {
  font-weight: 600;
  color: #262626;
  text-decoration: none;
}

a.username:hover {
  color: rgb(65, 184, 131);
}

.names {
  color: rgb(53, 73, 94);
}

.buttons-wrapper {
  flex: 0 1 50%;
  display: flex;
  justify-content: flex-end;
  margin-right: 5px;
}

.buttons-wrapper button {
  margin-left: 10px;
}

.user-role {
  margin-left: 10px;
  margin: auto;
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
@media screen and (max-width: 900px) {
}

@media screen and (max-width: 690px) {
}

@media screen and (max-width: 400px) {
  .card-container {
    padding: 0.5rem 0.5rem;
    /* flex-direction: column; */
  }
  .usernames-container {
    margin-left: 5px;
  }

  .buttons-wrapper button {
    margin-left: 3px;
  }

  .user-role {
    margin-left: 3px;
  }
}

@media screen and (max-width: 350px) {
  .card-container {
    padding: 0.5rem 0.5rem;
  }
  .usernames-container {
    margin-left: 5px;
  }

  .buttons-wrapper button {
    margin-left: 1px;
  }

  .user-role {
    margin-left: 1px;
  }
}
</style>