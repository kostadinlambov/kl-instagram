import Vue from "vue";

Vue.http.options.root = "http://localhost:8000";

export const authRequester = {
  data() {
    return {
      authRequester: {}
    };
  },
  created() {
    // vue-resource
    const authActions = {
      registerUser: {
        method: "post",
        url: "users/register"
      },
      loginUser: {
        method: "post",
        url: "login"
      }
    };

    this.authRequester = this.$resource("", {}, authActions);
  }
};

export const userRequester = {
  data() {
    return {
      userRequester: {}
    };
  },
  created() {
    // vue-resource
    const userActions = {
      getAllUsers: {
        method: "get",
        url: "users/all{/id}" 
      },
      getAllUsersAdmin: {
        method: "get",
        url: "users/admin/all{/id}" 
      },
      promote: {
        method: "post",
        url: "users/promote"
      },
      demote: {
        method: "post",
        url: "users/demote"
      }
    };

    this.userRequester = this.$resource("", {}, userActions);
  }
};
