<template>
  <article class="mt-5">
    <div class="container col-md-10 wrapper mt-5">
      <div class="title-wrapper">
        <div class="title">Suggested</div>
      </div>
      <section class="people-section">
        <div v-for="user in users" :key="user.id">
          <people-card v-bind:currentUser="user"></people-card>
          <!-- <div>{{user.firstName}} - {{user.lastName}} - {{user.role}}</div> -->
        </div>
      </section>
      <!-- <h1 class="text-center font-weight-bold mt-5">All Users</h1> -->
    </div>
  </article>
</template>

<script>
import { userRequester } from "@/mixins/requester";
import { userService } from "@/infrastructure/userService";
import PeopleCard from "./PeopleCard";

export default {
  name: "people",
  components: { PeopleCard },
  data() {
    return {
      userId: userService.getUserId(),
      users: []
    };
  },
  mixins: [userRequester],
  methods: {
    onFollowHandler(userId) {
      console.log("onFollowHandler userId: ", userId);
    },
    addEventListeners() {
      console.log("addEventListeners");
      this.$root.$on("on-follow", this.onFollowHandler);
    }
  },
  created() {
    this.userRequester
      .getAllUsers({ id: this.userId })
      .then(res => {
        console.log(res);
        this.users = res.body;
      })
      .catch(err => {
        console.log(err);
      });
  },
  mounted() {
    this.addEventListeners();
  }
};
</script>

<style>
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
