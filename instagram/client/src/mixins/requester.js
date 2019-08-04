import Vue from 'vue';

Vue.http.options.root = 'http://localhost:8000';

export const requester = {
    data() {
      return {
        userRequester: {}
      };
    },
    created() {
      // vue-resource
      const userActions = {
        registerUser: {
          method: "post",
          url: "users/register"
        },
        loginUser: {
          method: "post",
          url: "login"
        }
      };
  
      this.userRequester = this.$resource("", {}, userActions);
    }
  };
  