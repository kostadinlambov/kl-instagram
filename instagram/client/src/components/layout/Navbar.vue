<template>
  <div>
    <input type="checkbox" name="main-nav-toggle" id="main-nav-toggle" />
    <header class="site-header">
      <section class="navbar-section">
        <div class="navbar-wrapper">
          <nav class="navbar navbar-expand-lg">
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

            <label id="toggle" for="main-nav-toggle" :style="{ 'marginBottom': '0' }">
              <span>Menu</span>
            </label>

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
  </div>
</template>

<script>
import { userService } from "../../infrastructure/userService";

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
      this.$toast.open({
        message: "You have successfully logged out!",
        type: "info"
      });
      return;
    },
    onClickAuth() {
      this.isAuth = localStorage.getItem("token") != null;
    }
  },
  created() {
    this.$root.$on("user-login", this.onClickAuth);

    if (!this.isAuth) {
      this.isAuth = localStorage.getItem("token") != null;
    }
  }
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

/* CSS Hamburger */
#main-nav-toggle {
  display: none;
}

#toggle span {
  display: none;
}

#toggle:before {
  font-family: "Font Awesome 5 Free";
  content: "\f0c9";
  display: block;
  font-weight: 900;
}

@media screen and (max-width: 1300px) {
  nav.nav-main {
    width: 100%;
    margin: auto;
  }

  header .nav-searchbar-container {
    justify-content: space-around;
    margin-top: 1rem;
  }
}

@media screen and (max-width: 800px) {
  header .nav-searchbar-container {
    justify-content: flex-start;
    margin-top: 0;
  }
  nav.nav-main {
    display: none;
  }

  nav.nav-main ul.nav-ul {
    flex-direction: column;
  }

  header .navbar-wrapper {
    width: 100%;
    padding: 1rem 1rem;
  }

  #main-nav-toggle:checked + header nav.nav-main {
    display: flex;
    /* // display: block; */
    justify-content: space-between;
    text-align: center;
    margin: auto;
    flex: 1 0 100%;
  }

  header .navbar-wrapper,
  header ul.nav-ul {
    margin: auto;
  }

  #main-nav-toggle:checked + header #toggle:before {
    font-family: "Font Awesome 5 Free";
    content: "\f00d";
    display: block;
    font-weight: 900;
  }

  #main-nav-toggle:checked + header .navbar-wrapper {
    padding-bottom: 0;
  }

  header p.site-logo {
    padding-right: 1.5rem;
  }
}

@media screen and (min-width: 800px) {
  #toggle {
    display: none;
  }
}
</style>


