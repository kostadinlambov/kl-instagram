<template>
  <article class="mt-5">
    <div class="container col-md-10 wrapper mt-5">
      <div class="title-wrapper">
        <div class="title">Suggested</div>
      </div>
      <section class="people-section">
        <div v-for="user in users" :key="user.id">
          <user-card v-bind:currentUser="user"></user-card>
        </div>
      </section>
    </div>
  </article>
</template>

<script>
import { userRequester } from "@/mixins/requester";
import { userService } from "@/infrastructure/userService";
import UserCard from "./UserCard";

export default {
  name: "user-all",
  components: { UserCard },
  data() {
    return {
      userId: userService.getUserId(),
      users: []
    };
  },
  mixins: [userRequester],
  methods: {
    onPromoteHandler(userToPromoteId) {
      this.userRequester
        .promote({ id: userToPromoteId }, {})
        .then(res => {
          this.changeUserRole(userToPromoteId, "ADMIN");

          this.$toast.open({
            message: res.body.message,
            type: "success"
          });
        })
        .catch(err => {
          this.$toast.open({
            message: err.body.message,
            type: "error"
          });
        });
    },
    onDemoteHandler(userToDemoteId) {
      this.userRequester
        .demote({ id: userToDemoteId }, {})
        .then(res => {
          this.changeUserRole(userToDemoteId, "USER");

          this.$toast.open({
            message: res.body.message,
            type: "success"
          });
        })
        .catch(err => {
          this.$toast.open({
            message: err.body.message,
            type: "error"
          });
        });
    },
    changeUserRole(userId, role) {
      const newUserArr = this.users.map(user => {
        if (user.id !== userId) {
          return user;
        }

        return {
          ...user,
          role
        };
      });

      this.users = [...newUserArr];
    },
    addEventListeners() {
      console.log("addEventListeners");
      this.$root.$on("on-promote", this.onPromoteHandler);
      this.$root.$on("on-demote", this.onDemoteHandler);
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
        this.$toast.open({
          message: body.error.message,
          type: "error"
        });
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
  max-width: 700px;
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
