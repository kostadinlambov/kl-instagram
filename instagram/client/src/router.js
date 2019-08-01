import Vue from "vue";
import Router from "vue-router";
// import {isAuth} from "./mixins/userService.js"
import { userService } from "./mixins/userService";
import LandingPage from "./views/LandingPage.vue";
import ErrorPage from "./views/ErrorPage.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "landing-page",
      component: LandingPage,
      beforeEnter: (to, from, next) => {
        const isAuth = userService.isAuth();

        if (isAuth) {
          next("/home");
        } else {
          next();
        }
      }
    },
    {
      path: "/about",
      name: "about",

      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/register",
      name: "register-page",
      // route level code-splitting
      // this generates a separate chunk (register.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "register" */ "./components/auth/RegisterPage.vue"),
      beforeEnter: (to, from, next) => {
        const isAuth = userService.isAuth();

        if (isAuth) {
          next("/home");
        } else {
          next();
        }
      }
    },
    {
      path: "/login",
      name: "login-page",
      component: () => import("./components/auth/LoginPage.vue"),
      beforeEnter: (to, from, next) => {
        const isAuth = userService.isAuth();

        if (isAuth) {
          next("/home");
        } else {
          next();
        }
      }
    },
    {
      path: "/home",
      name: "home-page",
      beforeEnter: (to, from, next) => {
        const isAuth = userService.isAuth();

        if (!isAuth) {
          next("/");
        } else {
          next();
        }
      },
      component: () => import("./views/HomePage.vue")
    },
    {
      path: "*",
      name: "error-page",
      component: ErrorPage
    }
  ]
});
