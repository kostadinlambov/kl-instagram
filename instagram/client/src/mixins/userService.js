export const userService = {
  data() {
      return {
        userResource: {}
      }
  },
  created() {
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

    this.userResource = this.$resource("", {}, userActions)
  }
};
