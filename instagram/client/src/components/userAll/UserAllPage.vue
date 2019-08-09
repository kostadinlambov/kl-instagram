<template>
  <article class="mt-5">
    <div class="container col-md-10 wrapper mt-5">
      <div class="title-wrapper">
        <div class="title">All Users</div>
      </div>
      <section class="people-section">
        <div v-for="user in usersAdmin" :key="user.id">
          <user-card v-bind:currentUser="user"></user-card>
        </div>
      </section>
    </div>
  </article>
</template>

<script>
import { userService } from "@/infrastructure/userService";
import UserCard from "./UserCard";
import { mapState, mapActions } from "vuex";

export default {
  name: "user-all",

  components: { UserCard },

  data() {
    return {
      userId: userService.getUserId(),
      users: []
    };
  },

  computed: {
    ...mapState("user", ["usersAdmin"])
  },
  methods: {
    ...mapActions("user", [ "fetchAllUsersAdminAction", "promoteUserAction", "demoteUserAction"]),

    onPromoteHandler(userToPromoteId) {
      this.promoteUserAction(userToPromoteId);
    },

    onDemoteHandler(userToDemoteId) {
      this.demoteUserAction(userToDemoteId);
    },
 
    addEventListeners() {
      this.$root.$on("on-promote", this.onPromoteHandler);
      this.$root.$on("on-demote", this.onDemoteHandler);
    }
  },

  created() {
    this.fetchAllUsersAdminAction({ id: this.userId });
  },

  mounted() {
    this.addEventListeners();
  },

  beforeDestroy() {
    this.$root.$off("on-promote");
    this.$root.$off("on-demote");
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
