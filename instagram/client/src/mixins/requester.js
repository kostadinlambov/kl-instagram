export const requester = {
    data() {
      return {
        userResource: {}
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
  
      this.userResource = this.$resource("", {}, userActions);
    }
  };
  