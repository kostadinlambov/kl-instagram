<template>
  <div class="card-container">
    <div class="content-wrapper">
      <div class="profile-pick-container">
        <img src="@/assets/images/placeholder.png" alt="user-pic" />
      </div>
      <div class="usernames-container">
        <div class="username">{{currentUser.username}}</div>
        <div class="names">{{currentUser.firstName}} {{currentUser.lastName}}</div>
      </div>
    </div>

    <div class="buttons-wrapper">
      <button class="btn app-button-primary btn-sm" v-on:click="follow(currentUser.id)">Follow</button>
    </div>
  </div>
</template>

<script>
import defaultProfilePic from "@/assets/images/placeholder.png";

export default {
  name: "people-card",
  data() {
    return {};
  },
  props: {
    currentUser: {
      type: Object,
      required: true
    }
  },
  methods: {
    follow(userId) {
      this.$root.$emit("on-follow", userId);
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

.profile-pick-container img {
  display: block;
  position: absolute;
  width: 100%;
  height: auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.profile-pick-container img.l {
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

.username {
  font-weight: 600;
}

.names {
  color: rgb(181, 181, 181);
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
