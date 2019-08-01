<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <router-link to="/" class="navbar-brand">Instagram</router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <router-link to="/home" class="nav-link">
            Home
            <span class="sr-only">(current)</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/about" class="nav-link" href="#">About</router-link>
        </li>
        <form class="form-inline my-2 my-lg-0">
          <input
            class="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
        <!-- <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Dropdown
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#">Something else here</a>
        </div>
        </li>-->
      </ul>
      <ul class="navbar-nav ml-auto">
        <li class="nav-item" v-if="!isAuth">
          <router-link to="/login" class="nav-link">Login</router-link>
        </li>
        <li class="nav-item" v-if="!isAuth">
          <router-link to="/register" class="nav-link">Register</router-link>
        </li>
        <li class="nav-item" v-if="isAuth" v-on:click="onClickAuth">
          <router-link class="nav-link" to="/login">
            <span @click="logout">Logout</span>
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { userService } from "../../mixins/userService";

export default {
  name: "Navbar",
  data() {
    return {
      isAuth: "",
      showContent: ""
    };
  },
  computed: {},
  methods: {
    logout() {
      localStorage.clear();
      // this.$router.push('/login')
      return;
    },
    onClickAuth() {
      this.isAuth = localStorage.getItem("token") != null;
    }
  },
  created() {
    this.$root.$on("user-login", this.onClickAuth);
  },
  // watch: {
  //   isAuth: function(newValue, oldValue) {
  //     console.log("newValue", newValue);
  //     console.log("oldValue", oldValue);
  //   }
  // }
};
</script>

<style scoped>
</style>


