<template>
  <div class="card-container">
    <div class="content-wrapper">
      <div class="profile-pick-container">
        <img v-bind:class="imageSizeClass" :src="profilePicUrl" alt="user-pic" />
      </div>
      <div class="usernames-container">
        <router-link 
          :to="{'name':'single-user-page', 'params': {'username': username}}"
          class="username">
             {{username}}
        </router-link>
        <div
          class="names"
        >{{firstName}} {{lastName}}</div>
      </div>
    </div>

    <div class="buttons-wrapper" v-if="!currentUser.active">
      <button
        class="btn app-button-primary btn-sm"
        v-on:click="follow(userId)"
      >Follow</button>
    </div>
    <div class="buttons-wrapper" v-else>
      <button
        class="btn app-button-secondary btn-sm"
        v-on:click="unfollow(userId )"
      >Following</button>
    </div>
  </div>
</template>

<script>
import placeholderLink from "../../assets/images/placeholder.png";
import { userService } from "../../infrastructure/userService";

export default {
  name: "people-card",
  data() {
    return {
      placeholder: placeholderLink,
    };
  },
  props: {
    currentUser: {
      type: Object,
      required: true
    }
  },
  computed: {
    userId(){
      return (this.currentUser.followerId || this.currentUser.userId || this.currentUser.id);
    },
    username(){
      return (this.currentUser.username || this.currentUser.followerUsername || this.currentUser.userUsername);
    },
    firstName(){
      return (this.currentUser.firstName || this.currentUser.followerFirstName || this.currentUser.userFirstName);
    },
    lastName(){
      return (this.currentUser.lastName || this.currentUser.lastName || this.currentUser.lastName);
    },
    profilePicUrl() {
      return (
        this.currentUser.profilePicUrl ||
        this.currentUser.userProfilePicUrl ||
        this.currentUser.followerProfilePicUrl ||
        this.placeholder
      );
    },
    imageSizeClass() {
      return this.currentUser.imageClass || '';
    }
  },
  methods: {
    follow(userId) {
      this.$root.$emit("on-follow", userId);
    },
    unfollow(userId) {
      this.$root.$emit("on-unfollow", userId);
    }
  }
};
</script>

<style>
.card-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* flex-wrap: wrap; */

  /* border: 2px solid red; */
  background: rgb(255, 255, 255);
  padding: 0.5rem 1rem;
  border-radius: 5px;
}

.content-wrapper {
  display: flex;
  justify-content: start;
  align-items: center;
  /* border: 2px solid blue; */
  width: 100%;
}

.profile-pick-container {
  flex: 0 0 3rem;
  /* width: 3rem; */
  position: relative;
  overflow: hidden;
  border-radius: 50%;
}

.profile-pick-container:after {
  display: block;
  content: "";
  padding-top: 100%;
}

.profile-pick-container img{
  display: block;
  position: absolute;
  width: 100%;
  height: auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.profile-pick-container img.l  {
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

a.username:hover{
  color: rgb(65, 184, 131);
}


.names {
  color: rgb(53, 73, 94);;
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
