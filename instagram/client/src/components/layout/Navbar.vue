<template>
  <div>
    <input type="checkbox" name="main-nav-toggle" id="main-nav-toggle" />
    <header class="site-header">
      <section class="navbar-section">
        <div class="navbar-wrapper">
          <nav class="navbar navbar-expand-lg">
            <router-link to="/home" class="navbar-brand insta-icon-container">
              <i class="fab fa-instagram"></i>
              <div class="vertical-line"></div>
              <div>Instagram</div>
            </router-link>
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
              <ul class="navbar-nav mr-auto"></ul>
              <ul class="navbar-nav" v-if="isLoggedIn">
                <!-- <form class="form-inline my-2 my-lg-0">
                  <input
                    class="form-control mr-sm-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                  />
                  <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>-->
              </ul>

              <ul class="navbar-nav ml-auto">
                <template v-if="!isLoggedIn">
                  <li class="nav-item">
                    <router-link to="/login" class="nav-link">Login</router-link>
                  </li>
                  <li class="nav-item">
                    <router-link to="/register" class="nav-link">Register</router-link>
                  </li>
                </template>
                <template v-if="isLoggedIn">
                  <li class="nav-item">
                    <router-link to="/explore" class="nav-link">
                      <i class="far fa-compass"></i>
                    </router-link>
                  </li>
                  <li class="nav-item">
                    <router-link to="/people" class="nav-link">
                      <i class="fas fa-heart"></i>
                    </router-link>
                  </li>
                  <li class="nav-item">
                    <router-link
                      :to="{name:'single-user-page', params: {'username': loggedInUserData.username}}"
                      class="nav-link"
                    >
                      <i class="fas fa-user-alt"></i>
                    </router-link>
                  </li>

                  <li class="nav-item custom-dropdown">
                    <div class="btn-group">
                      <div
                        class="nav-link custom-dropdown-button dropdown-toggle"
                        data-toggle="dropdown"
                      >
                        <i class="fas fa-ellipsis-v"></i>
                      </div>
                      <div class="dropdown-menu dropdown-menu-right">
                        <router-link
                          v-if="isLoggedInUserAdminOrRoot"
                          to="/admin/all"
                          class="dropdown-item custom-dropdown-items"
                        >All Users</router-link>
                        <div v-on:click="logout">
                          <router-link
                            class="dropdown-item custom-dropdown-items"
                            to="/login"
                          >Logout</router-link>
                        </div>

                        <!-- <router-link to="/account/activity" class="dropdown-item custom-dropdown-items">
                            Activity
                            <i class="fas fa-heart">Activity</i>
                        </router-link>-->
                      </div>
                    </div>
                  </li>
                </template>
              </ul>
            </div>
          </nav>
        </div>
      </section>
    </header>
  </div>
</template>

<script>
import { userService } from "@/infrastructure/userService";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Navbar",
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters("auth", {
      isLoggedIn: "getIsLoggedIn",
      loggedInUserData: "getLoggedInUserData"
    }),
    isLoggedInUserAdminOrRoot() {
      return (
        this.loggedInUserData.role === "ROOT" ||
        this.loggedInUserData.role === "ADMIN"
      );
    }
  },
  methods: {
    ...mapActions("auth", ["logoutAction"]),

    logout() {
      this.logoutAction();
    }
  }
};
</script>

<style scoped>
.dropdown-toggle::after {
  display: none;
}
.custom-dropdown-button {
  color: rgb(192, 192, 192);
}
.custom-dropdown-button:hover {
  color: white;
}

.custom-dropdown-items {
  text-align: center;
}

.custom-dropdown-items:hover {
  color: rgb(65, 184, 131);
}

.fa-ellipsis-v:hover {
  cursor: pointer;
}

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
  width: 65%;
  margin: auto;
}

li {
  padding: 0.5rem 0.25rem;
}

a:hover {
  color: white;
}

.nav-link,
.navbar-brand {
  color: rgb(192, 192, 192);
}

.insta-icon-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.vertical-line {
  background-color: rgb(192, 192, 192);
  height: 28px;
  margin: 0 16px;
  width: 1px;
}

.fa-compass,
.fa-heart,
.fa-user-alt {
  font-size: 1.25rem;
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


