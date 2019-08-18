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
          next("/");
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
          next("/");
        } else {
          next();
        }
      }
    },
    {
      path: "/home",
      name: "user-feed-page",
      beforeEnter: (to, from, next) => {
        const isAuth = userService.isAuth();

        if (!isAuth) {
          next("/");
        } else {
          next();
        }
      },
      component: () => import("./components/userFeed/UserFeedPage.vue"),
    },
    {
      path: "/people",
      name: "all-users-page",
      component: () => import("./components/people/People.vue"),
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
      component: () => import("./components/explore/Explore.vue"),
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
      path: "/admin/all",
      name: "user-all",
      component: () => import("./components/userAll/UserAllPage.vue"),
      beforeEnter: (to, from, next) => {
        const isAuth = userService.isAuth();
        const role = userService.getRole();

        if (!isAuth || (role !== "ROOT" && role !== "ADMIN")) {
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
      },
      // children: [
      //   { path: 'all',   component: () => import("./components/user/FollowerModal.vue")}
      //  ]
    },
    {
      path: "/account/activity",
      name: "activity",
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
      path: "/account/edit",
      name: "edit-profile",
      component: () => import("./components/account/EditProfilePage.vue"),
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
      path: "/account/delete/:id",
      name: "delete-user",
      component: () => import("./components/account/DeleteUserPage.vue"),
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
      path: "/post/create",
      name: "post-create",
      component: () => import("./components/post/CreatePostPage.vue"),
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
    },

    // {
    //   path: "/user",
    //   name: "user-page",
    //   component: ErrorPage,
    //   beforeEnter: (to, from, next) => {
    //     const isAuth = userService.isAuth();

    //     if (!isAuth) {
    //       next("/");
    //     } else {
    //       next();
    //     }
    //   },
    //   children: [
    //    { path: 'all',   component: () => import("./components/userAll/UserAllPage.vue")}
    //   ]
     
    // },
    
  ]
});
