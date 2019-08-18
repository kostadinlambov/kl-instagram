<template>
  <div class="container mt-5 text-center">
    <template v-if="!isLoggedIn">
      <div class="container text-center start-page-margin pt-5">
        <div
          class="jumbotron bg-light text-dark text-center mb-0 mx-auto mt-5 jumbo-wrapper"
          :style="'boxShadow : 0 0 14px 1px rgba(0, 0, 0, 0.3)'"
        >
          <h2 class="h1 h1-responsive">Welcome to Instagram!</h2>
          <div class="hr-styles"></div>
          <p class="lead message">
            Please
            <router-link class="text-info" to="/login">Login</router-link>or
            <router-link class="text-info" to="/register">Register</router-link>if you don't have an account.
          </p>
          <hr class="hr-styles" />
          <p class="lead">
            <router-link class="btn app-button-primary btn-lg m-3" to="/login" role="button">Login</router-link>
            <router-link
              class="btn app-button-primary btn-lg m-3"
              to="/register"
              tag="button"
            >Register</router-link>
          </p>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="container text-center start-page-margin pt-5">
        <div
          class="jumbotron bg-light text-dark text-center mb-0 mx-auto mt-5 jumbo-wrapper"
          :style="'boxShadow : 0 0 14px 1px rgba(0, 0, 0, 0.3)'"
        >
          <h3 class="md-display-5 h3 h3-responsive mb-3">Hello {{loggedInUserData.username}}!</h3>
          <div class="hr-styles"></div>
          <h2 class="h1 h1-responsive">Welcome to Instagram!</h2>
          <div class="hr-styles"></div>
          <p class="lead">
            <router-link class="btn app-button-primary btn-lg m-3" to="/home" role="button">Home</router-link>
            <router-link
              class="btn app-button-primary btn-lg m-3"
              to="/explore"
              role="button"
            >Explore</router-link>
            <router-link class="btn app-button-primary btn-lg m-3" to="/people" role="button">People</router-link>
            <router-link
              class="btn app-button-primary btn-lg m-3"
              :to="{name:'single-user-page', params: {'username': loggedInUserData.username}}"
              role="button"
            >Profile</router-link>
            <router-link
              v-if="loggedInUserData.isAdminOrRoot"
              class="btn app-button-primary btn-lg m-3"
              to="/admin/all"
              role="button"
            >All Users</router-link>
          </p>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { userService } from "@/infrastructure/userService";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "landing-page",
  components: {},
  data() {
    return {
      loggedInUserId: userService.getUserId()
    };
  },
  computed: {
    ...mapGetters("auth", {
      isLoggedIn: "getIsLoggedIn",
      loggedInUserData: "getLoggedInUserData"
    })
  },
  methods: {
    ...mapActions("user", ["fetchAllUsersAction"])
  },

  created() {
    if (this.getIsLoggedIn) {
      this.fetchAllUsersAction({ id: this.loggedInUserId });
    }
  }
};
</script>

<style scoped>
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

.hr-styles {
  width: 70%;
  margin: 1.5rem auto;
}

.message {
  margin-bottom: 1.5rem;
  font-weight: 600;
}

.jumbo-wrapper {
  background-color: rgba(238, 238, 238, 0.95) !important;
  background: url("./../../assets/images/SoftUniFoundation_Logo.png");
  background-repeat: none;
  background-size: cover;
  /* background-position: center; */
  background-blend-mode: color;
  box-shadow: 0 0 14px 1px rgba(0, 0, 0, 0.3);
}

@media screen and (max-width: 1300px) {
  .start-page-margin {
    /* margin-top: 8rem; */
  }
}

@media screen and (max-width: 800px) {
  .start-page-margin {
    margin-top: 5rem;
    width: 100%;
  }
}
</style>


