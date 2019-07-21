import Vue from "vue";
import Router from "vue-router";
import LandingPage from "./views/LandingPage.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "landing-page",
      component: LandingPage
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/register",
      name: "register-page",
      component: () => import("./components/auth/RegisterPage.vue")
    },
    {
      path: "/login",
      name: "login-page",
      component: () => import("./components/auth/LoginPage.vue")
    }
  ]
});
