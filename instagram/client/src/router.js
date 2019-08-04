import Vue from "vue";
import Router from "vue-router";
import { userService } from "./infrastructure/userService";
import ErrorPage from "@/components/common/ErrorPage.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "landing-page",
      component: () => import("./components/common/LandingPage.vue"),
      // beforeEnter: (to, from, next) => {
      //   const isAuth = userService.isAuth();

      //   if (isAuth) {
      //     next("/home");
      //   } else {
      //     next();
      //   }
      // }
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
      component: () => import("./components/user/UserFeedPage.vue"),
    },
    {
      path: "/people",
      name: "single-user-page",
      component: () => import("./components/user/UserAllPage.vue"),
      beforeEnter: (to, from, next) => {
        const isAuth = userService.isAuth();

        if (!isAuth) {
          next("/");
        } else {
          next();
        }
      }
    },
    {
      path: "/explore",
      name: "explore",
      component: () => import("./components/user/Explore.vue"),
      beforeEnter: (to, from, next) => {
        const isAuth = userService.isAuth();

        if (!isAuth) {
          next("/");
        } else {
          next();
        }
      }
    },
    {
      path: "/user/:username",
      name: "single-user-page",
      component: () => import("./components/user/UserHomePage.vue"),
      beforeEnter: (to, from, next) => {
        const isAuth = userService.isAuth();

        if (!isAuth) {
          next("/");
        } else {
          next();
        }
      }
    },
    {
      path: "/account/activity",
      name: "single-user-page",
      component: () => import("./components/account/Activity.vue"),
      beforeEnter: (to, from, next) => {
        const isAuth = userService.isAuth();

        if (!isAuth) {
          next("/");
        } else {
          next();
        }
      }
    },
    {
      path: "*",
      name: "error-page",
      component: ErrorPage
    }
    
    // {
    //   path: "/user",
    //   name: "user-page",
    //   component: UserPage,
    //   beforeEnter: (to, from, next) => {
    //     const isAuth = userService.isAuth();

    //     if (!isAuth) {
    //       next("/");
    //     } else {
    //       next();
    //     }
    //   },
    //   children: [
    //    { path: 'all',   component: () => import("./components/user/UserAllPage.vue")}
    //   ]
     
    // },
  ]
});
