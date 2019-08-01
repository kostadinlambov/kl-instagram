<template>
  <header class="site-header">
    <section class="navbar-section">
      <div class="navbar-wrapper">
        <nav class="navbar navbar-expand-lg">
          <!-- <nav class="navbar navbar-expand-lg navbar-light bg-light"> -->
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
      </div>
    </section>
  </header>
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
      console.log("this.isAuth before: ", this.isAuth);
      this.isAuth = localStorage.getItem("token") != null;
      console.log("this.isAuth after: ", this.isAuth);
    }
  },
  created() {
    this.$root.$on("user-login", this.onClickAuth);

    if (!this.isAuth) {
      this.isAuth = localStorage.getItem("token") != null;
    }
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
.navbar-section {
  /* background: rgb(65, 184, 131); */
  background: rgb(53, 73, 94);
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.navbar-wrapper {
  width: 80%;
  margin: auto;
  /* display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap; */
}

li {
  padding: 0.5rem 0;
  /* color: rgb(192, 192, 192); */
}

a:hover {
  text-decoration: underline;
  color: white;
}

.nav-link,
.navbar-brand {
  /* color: white; */
  color: rgb(192, 192, 192);
}
</style>


