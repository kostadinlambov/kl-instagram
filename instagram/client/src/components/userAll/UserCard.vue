<template>
  <div class="card-container">
    <div class="content-wrapper">
      <div class="profile-pick-container">
        <img :class="imageSizeClass" :src="profilePicUrl" alt="user-pic" />
      </div>
      <div class="usernames-container">
        <!-- <div class="username">{{currentUser.username}}</div> -->
        <router-link 
          :to="{'name':'single-user-page', 'params': {'username': currentUser.username}}"
          class="username">
             {{currentUser.username}}
        </router-link>
      </div>
    </div>

    <div class="buttons-wrapper">
     
      <button v-if="showButtons(currentUser.id, currentUser.role)" class="btn app-button-primary btn-sm" v-on:click="promote(currentUser.id)">Promote</button>
      <button v-if="showButtons(currentUser.id, currentUser.role)" class="btn app-button-primary btn-sm" v-on:click="demote(currentUser.id)">Demote</button>
     <div class="user-role">{{currentUser.role}}</div>
    </div>
  </div>
</template>

<script>
import defaultProfilePic from "@/assets/images/placeholder.png";
import { userService } from "@/infrastructure/userService";
import placeholderLink from "../../assets/images/placeholder.png";

export default {
  name: "user-card",
  data() {
    return {
      loggedInUserId: userService.getUserId(),
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
    profilePicUrl(){
      return this.currentUser.profilePicUrl || this.placeholder;
    },
    imageSizeClass(){
      return this.currentUser.imageClass || '';
    }
  },
  methods: {
    promote(userId) {
      this.$root.$emit("on-promote", userId);
    },
    
    demote(userId) {
      this.$root.$emit("on-demote", userId);
    },

    showButtons(userId, role){
      if(userId === this.loggedInUserId || role === "ROOT"){
        return false;
      }

      return true;
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

a.username {
  font-weight: 600;
  color: #262626;
  text-decoration: none;
}

a.username:hover{
  color: rgb(65, 184, 131);
}

.names {
  color: rgb(181, 181, 181);
}

.buttons-wrapper {
  flex: 0 0 40%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  margin-right: 5px;
}

.buttons-wrapper button {
  margin-left: 15px;
}

.user-role {
  width: 50px;
  /* margin-left: 10px; */
  margin:  auto 20px;
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

@media screen and (max-width: 900px) {
}

@media screen and (max-width: 690px) {
}

@media screen and (max-width: 400px) {
  .wrapper{
    padding: 2px;
  }

  .card-container {
    padding: 0.5rem 0.2rem;
    /* flex-direction: column; */
    
  }
  .usernames-container {
    margin-left: 5px;
  }

  .buttons-wrapper button {
    margin-left: 3px;
  }

  .button-wrapper{
    margin-right: 0px;
  }

  .user-role {
    /* margin-left: 3px; */
       width: 43px;
    margin: auto 0 auto 7px;
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
