<template>
  <div>
    <div class="card-container">
      <div class="content-wrapper">
        <div class="profile-pick-container">
          <img v-bind:class="comment.imageClass" :src="profilePicUrl" alt="user-pic" />
        </div>
        <div class="usernames-container">
          <router-link
            :to="{'name':'single-user-page', 'params': {'username': comment.creatorUsername}}"
            class="username"
          >{{comment.creatorUsername}}</router-link>
          <span class="comment-text">{{comment.content}}</span>
        </div>
      </div>
    </div>
    <div class="time">{{getTime}}</div>
  </div>
</template>

<script>
import placeholderLink from "@/assets/images/placeholder.png";

export default {
  name: "comment-card",
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  computed: {
    profilePicUrl() {
      return this.comment.creatorProfilePicUrl || placeholderLink;
    },
    getTime() {
      if (!this.comment.time) {
        return;
      }

      const dayTime = this.comment.time.hour <= 12 ? "AM" : "PM";
      const month =
        this.comment.time.month.substring(0, 1) +
        this.comment.time.month.substring(1).toLowerCase();
      const hour =
        this.comment.time.hour < 10
          ? "0" + this.comment.time.hour
          : this.comment.time.hour;
      const minute =
        this.comment.time.minute < 10
          ? "0" + this.comment.time.minute
          : this.comment.time.minute;

      return (
        this.comment.time.dayOfMonth +
        " " +
        month +
        " " +
        hour +
        ":" +
        minute +
        " " +
        dayTime
      );
    }
  }
};
</script>

<style scoped>
.card-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* border: 1px solid #e6e6e6; */
  /* flex-wrap: wrap; */
  background: rgb(255, 255, 255);
  padding: 0.5rem 1rem;
  border-radius: 5px;
  font-size: 0.8rem;
}

.content-wrapper {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
}

.profile-pick-container {
  flex: 0 0 2rem;
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
  margin-left: 10px;
  text-align: left;
}

a.username {
  font-weight: 600;
  color: rgb(65, 184, 131);
  text-decoration: none;
}

a.username:hover {
  color: rgb(53, 73, 94);
}

.comment-text {
  margin-left: 5px;
  word-break: break-all;
}

.time{
  font-size: 0.7rem;
  text-align: right;
  margin-right: 5px;
  border-bottom: 1px solid #e6e6e6;
  font-weight: 500;
  color: #999;

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