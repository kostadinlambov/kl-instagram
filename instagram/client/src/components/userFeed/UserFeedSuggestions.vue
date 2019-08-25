<template>
  <article class="user-feed-article">
    <div class="user-feed-container">
      <div class="user-feed-title-wrapper">
        <div class="user-feed-title">Suggestions for you</div>
        <div class="people-link">
          <router-link class="people-link" to="/people">See All</router-link>
        </div>
      </div>
      <section class="people-section" v-if="followingCandidates.length > 0">
        <div v-for="user in followingCandidates" :key="user.id">
          <people-card
            v-bind:currentUser="user"
            :userNameStyle="{'display': 'none'}"
            v-on:on-follow="onFollowHandler"
            v-on:on-unfollow="onUnFollowHandler"
          ></people-card>
        </div>
      </section>
      <section class="people-section" v-else>
        <div class="user-message">You are following all registered users on Instagram...!</div>
      </section>
    </div>
  </article>
</template>

<script>
import { userService } from "@/infrastructure/userService";
import PeopleCard from "../people/PeopleCard";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "user-feed-suggestions",

  components: { PeopleCard },

  data() {
    return {
      //   loggedInUserId: userService.getUserId(),
      //   orderedByFollowingAscArr: [],
      //   orderedByFollowingDescArr: []
    };
  },
  //   props: {
  //     users: {
  //       type: Object
  //     },
  //   },

  computed: {
    ...mapGetters("user", {
      users: "getAllUsers",
      followers: "getFollowers",
      following: "getFollowing",
      followingCandidates: "getFirstThreeFollowingCandidates"
    })
    // orderByFollowingAsc(){
    //   return this.users.sort((firstUser, secondUser) => secondUser.active - firstUser.active)
    // },
    // orderByFollowingDesc(){
    //   return this.users.sort((firstUser, secondUser) => firstUser.active - secondUser.active)
    // }
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
    },

    addEventListeners() {
      // this.$root.$on("on-follow", this.onFollowHandler);
      // this.$root.$on("on-unfollow", this.onUnFollowHandler);
    }
  },

  // created() {
  //   this.fetchAllUsersAction({ id: this.loggedInUserId });
  // },

  mounted() {
    this.addEventListeners();
    // this.orderByFollowingAsc();
    this.orderByFollowingDesc();
  },

  beforeDestroy() {
    this.$root.$off("on-follow");
    this.$root.$off("on-unfollow");
  }
};
</script>

<style scoped>
.user-feed-container {
  background: white;
  padding: 0.5rem;
  margin-top: 1rem;
  border: 1px solid #e6e6e6;
}

.wrapper {
  margin: 0 auto;
  max-width: 600px;
  width: 100%;
  /* border: 1px solid red; */
}

@media screen and (min-width: 640px) {
  .wrapper {
    /* padding-top: 60px;
    padding-bottom: 60px; */
  }
}

.user-feed-title-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0.8rem;
  border-bottom: 1px solid #efefef;
  /* margin-bottom: 12px; */
}

.user-feed-title {
  display: block;
  /* color: #262626; */
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  /* margin: -6px 0; */
  /* color: rgb(65, 184, 131); */
  color: #999;
}

.people-section {
  border-radius: 5px;
  background: rgb(255, 255, 255);
  margin: 0.2rem;
}

.people-link {
  font-weight: 600;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: 0.5rem;

  /* color: #1e6cb9b6; */
  color: rgb(65, 184, 131);
  text-decoration: none;
}

.user-message {
  font-weight: 600;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 0.5rem;
  color: rgb(65, 184, 131);
}
</style>
