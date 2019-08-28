<template>
  <article class="people-article" v-bind:style="wrapperPeople">
    <div class="container col-md-10 wrapper people-container" v-bind:style="wrapperPeople">
      <section class="people-section" v-if="followerModal">
        <div v-for="user in followers" :key="user.followerId">
          <people-card
            v-bind:currentUser="user"
            v-if="user.followerId != loggedInUserId"
            v-on:on-follow="onFollowHandler"
            v-on:on-unfollow="onUnFollowHandler"
          ></people-card>
        </div>
      </section>
      <section class="people-section" v-if="followingModal">
        <div v-for="user in following" :key="user.userId">
          <people-card
            v-bind:currentUser="user"
            v-if="user.userId != loggedInUserId"
            v-on:on-follow="onFollowHandler"
            v-on:on-unfollow="onUnFollowHandler"
          ></people-card>
        </div>
      </section>
      <div class="title-wrapper">
        <div
          class="title"
          v-if="followingCandidates.length && (followingModal ||  followerModal)"
        >Suggestions For You</div>
      </div>
      <section class="people-section" v-if="followingModal ||  followerModal">
        <div v-for="user in followingCandidates" :key="user.id">
          <people-card
            v-bind:currentUser="user"
            v-if="user.id != loggedInUserId"
            v-on:on-follow="onFollowHandler"
            v-on:on-unfollow="onUnFollowHandler"
          ></people-card>
        </div>
      </section>
      <div class="title-wrapper">
        <div class="title" v-if="!followingModal &&  !followerModal">Suggested</div>
      </div>
      <section class="people-section" v-if="!followingModal &&  !followerModal">
        <div v-for="user in users" :key="user.id">
          <people-card
            v-bind:currentUser="user"
            v-if="user.id != loggedInUserId"
            v-on:on-follow="onFollowHandler"
            v-on:on-unfollow="onUnFollowHandler"
          ></people-card>
        </div>
      </section>

      <div v-if="users.length == 0">
          <!-- <div class="title-wrapper">
        <div class="title" v-if="!followingModal &&  !followerModal">Suggested</div>
      </div> -->
        <section class="people-section">
          <div
           class="user-message"
          >You are the first user on Instagram! Invite some friends to us!</div>
        </section>
      </div>
      <!-- <section class="people-section" v-else>
        <div v-for="user in orderByFollowingDesc" :key="user.id">
          <people-card v-bind:currentUser="user" v-if="user.id != loggedInUserId"></people-card>
        </div>
      </section>-->
    </div>
  </article>
</template>

<script>
import { userService } from "@/infrastructure/userService";
import PeopleCard from "./PeopleCard";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "people",

  components: { PeopleCard },

  data() {
    return {
      loggedInUserId: userService.getUserId(),
      orderedByFollowingAscArr: [],
      orderedByFollowingDescArr: []
    };
  },
  props: {
    wrapperPeople: {
      type: Object
    },
    followingModal: {
      type: Boolean
    },
    followerModal: {
      type: Boolean
    }
  },

  computed: {
    ...mapGetters("user", {
      users: "getAllUsers",
      followers: "getFollowers",
      following: "getFollowing",
      followingCandidates: "getFollowingCandidates"
    })
  },

  methods: {
    ...mapActions("user", [
      "fetchAllUsersAction",
      "followUserAction",
      "unFollowUserAction"
    ]),

    onFollowHandler(userId) {
      this.followUserAction(userId);
    },

    onUnFollowHandler(userId) {
      this.unFollowUserAction(userId);
    },

    orderByFollowingAsc() {
      this.orderedByFollowingAscArr = this.users.sort(
        (firstUser, secondUser) => secondUser.active - firstUser.active
      );
    },
    orderByFollowingDesc() {
      this.orderedByFollowingDescArr = this.users.sort(
        (firstUser, secondUser) => firstUser.active - secondUser.active
      );
    }
  },

  mounted() {
    this.orderByFollowingDesc();
  }
};
</script>

<style scoped>
.people-article,
.people-container {
  margin-top: 3rem;
}

.wrapper {
  margin: 0 auto;
  max-width: 600px;
  width: 100%;
}

@media screen and (min-width: 640px) {
  .wrapper {
    padding-top: 60px;
    padding-bottom: 60px;
  }
}

.title-wrapper {
  text-align: left;
  padding-left: 12px;
  padding-right: 12px;
  margin-top: 16px;
  margin-bottom: 12px;
}

.title {
  display: block;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  margin: -6px 0;
  color: #999;
}

.people-section {
  border-radius: 5px;
  background: rgb(255, 255, 255);
}

.user-message {
  font-size: 1.5rem;
  font-weight: 600;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 1rem;
  color: rgb(65, 184, 131);
  background: white;
  border: 1px solid #e6e6e6;
  /* width: 60%; */
  margin: auto;
}
</style>
