<template>
  <article class="people-article" v-bind:style="wrapperPeople">
    <div class="container col-md-10 wrapper people-container" v-bind:style="wrapperPeople">
      <div class="title-wrapper">
        <div class="title">Suggested</div>
      </div>
      <section class="people-section" v-if="followingModal">
        <div v-for="user in orderByFollowingAsc" :key="user.id">
          <people-card v-bind:currentUser="user" v-if="user.id != loggedInUserId"></people-card>
          <!-- <div>{{user.firstName}} - {{user.lastName}} - {{user.role}}</div> -->
        </div>
      </section>
      <section class="people-section" v-else>
        <div v-for="user in orderByFollowingDesc" :key="user.id">
          <people-card v-bind:currentUser="user" v-if="user.id != loggedInUserId"></people-card>
          <!-- <div>{{user.firstName}} - {{user.lastName}} - {{user.role}}</div> -->
        </div>
      </section>
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
    }
  },

  computed: {
    ...mapGetters("user", {
      users: "getAllUsers"
    }),
    orderByFollowingAsc(){
      return this.users.sort((firstUser, secondUser) => secondUser.active - firstUser.active)
    },
    orderByFollowingDesc(){
      return this.users.sort((firstUser, secondUser) => firstUser.active - secondUser.active)
    }
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

    // orderByFollowingAsc() {
    //   this.orderedByFollowingAscArr = this.users.sort(
    //     (firstUser, secondUser) => secondUser.active - firstUser.active
    //   );
    // },
    // orderByFollowingDesc() {
    //   this.orderedByFollowingDescArr = this.users.sort(
    //     (firstUser, secondUser) => firstUser.active - secondUser.active
    //   );
    // },

    addEventListeners() {
      this.$root.$on("on-follow", this.onFollowHandler);
      this.$root.$on("on-unfollow", this.onUnFollowHandler);
    }
  },

  created() {
    this.fetchAllUsersAction({ id: this.loggedInUserId });
    
  },

  mounted() {
    this.addEventListeners();
    // this.orderByFollowingAsc();
    // this.orderByFollowingDesc();
  },

  beforeDestroy() {
    this.$root.$off("on-follow");
    this.$root.$off("on-unfollow");
  }
};
</script>

<style>
.people-article,
.people-container {
  margin-top: 3rem;
}

.wrapper {
  margin: 0 auto;
  max-width: 600px;
  width: 100%;
  /* border: 1px solid red; */
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
  color: #262626;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  margin: -6px 0;
}

.people-section {
  border-radius: 5px;
  background: rgb(255, 255, 255);
}
</style>
