<template>
  <div>
    <input type="checkbox" name="main-nav-toggle" id="main-nav-toggle" />
    <header class="site-header">
      <section class="navbar-section">
        <div class="navbar-wrapper">
          <nav class="navbar navbar-expand-lg">
            <router-link to="/" class="navbar-brand insta-icon-container">
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
              <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                  <router-link to="/home" class="nav-link">
                    Home
                    <span class="sr-only">(current)</span>
                  </router-link>
                </li>
                <!-- <li class="nav-item">
                  <router-link to="/about" class="nav-link" href="#"><i class="far fa-heart">About</i></router-link>
                </li>-->
              </ul>

              <ul class="navbar-nav" v-if="isAuth">
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
                <template v-if="!isAuth">
                  <li class="nav-item">
                    <router-link to="/login" class="nav-link">Login</router-link>
                  </li>
                  <li class="nav-item">
                    <router-link to="/register" class="nav-link">Register</router-link>
                  </li>
                </template>
                <template v-if="isAuth">
                  <li class="nav-item" >
                    <router-link to="/user/generalFeed" class="nav-link">
                      <i class="far fa-compass"></i>
                    </router-link>
                  </li>
                  <li class="nav-item">
                    <router-link to="/user/activities" class="nav-link">
                      <i class="fas fa-heart"></i>
                    </router-link>
                  </li>
                  <li class="nav-item">
                    <router-link to="/user/profile" class="nav-link" data-toggle="modal" data-target="#testleModalId">
                      <i class="fas fa-user-alt"></i>
                    </router-link>
                  </li>
                   <!-- <li class="nav-item" >
                    <router-link to="/user/profile" class="nav-link">
                      <i class="fas fa-user-alt"></i>
                    </router-link>
                  </li> -->
                  <li class="nav-item" v-on:click="onClickAuth">
                    <router-link class="nav-link" to="/login">
                      <span @click="logout">Logout</span>
                    </router-link>
                  </li>
                </template>
              </ul>
            </div>
          </nav>
        </div>
      </section>
    </header>
      <Modal />
  </div>
</template>

<script>
import { userService } from "../../infrastructure/userService";
import Modal from '@/components/user/Modal';

export default {
  name: "Navbar",
  components: {
    Modal
  },
  data() {
    return {
      isAuth: userService.isAuth(),
      showContent: ""
    };
  },
  computed: { },
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
      this.isAuth = userService.isAuth();
    }
  },
  created() {
    this.$root.$on("user-login", this.onClickAuth);

    // if (!this.isAuth) {
    //   this.isAuth = userService.isAuth();
    // }
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
  padding: 0.5rem 0.25rem;
  /* color: rgb(192, 192, 192); */
}

a:hover {
  /* text-decoration: underline; */
  color: white;
}

.nav-link,
.navbar-brand {
  /* color: white; */
  color: rgb(192, 192, 192);
}

/* .fa-instagram{
  border-right: 1px solid red;
  padding-right: 1rem;
} */

.insta-icon-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* .fa-instagram:hover {
  text-decoration: none;
} */

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


