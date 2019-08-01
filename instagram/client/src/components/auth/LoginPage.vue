<template>
  <section class=" w-40 mt-5">
    <div class="container login-form-content-section pb-4">
      <h1 class="text-center font-weight-bold mt-5">Login</h1>

      <form @submit.prevent="onSubmitHandler">
        <div class="form-group text-left">
          <label for="username">Username</label>
          <input
            type="text"
            v-model.trim="$v.username.$model"
            class="form-control"
            id="username"
            aria-describedby="usernameHelp"
            placeholder="Enter username"
          />
          <small
            v-if="!$v.username.required && $v.username.$dirty"
            id="usernameHelp"
            class="form-text alert alert-danger"
          >Username is required!</small>
        </div>

        <div class="form-group text-left">
          <label for="password">Password</label>
          <input
            type="password"
            v-model.trim="$v.password.$model"
            class="form-control"
            id="password"
            placeholder="Enter password"
          />
          <small
            v-if="!$v.password.required && $v.password.$dirty"
            id="passwordHelp"
            class="form-text alert alert-danger"
          >Password is required!</small>
        </div>

        <button :disabled="$v.$invalid" type="submit" class="btn btn-lg app-button-primary m-3">Login</button>
      </form>
    </div>
  </section>
</template>

<script>
import { userService } from "../../mixins/userService";
import { required } from "vuelidate/lib/validators";

export default {
  name: "login-page",
  data: function() {
    return {
      username: "",
      password: ""
    };
  },
  mixins: [userService],
  computed: {
    isEnabled() {
      return this.username && this.password;
    }
  },

  validations: {
    username: {
      required
    },
    password: {
      required
    }
  },

  methods: {
    onSubmitHandler() {
      if (this.$v.$invalid) {
        console.log("Submit not enabled");
        return;
      }

      const userData = { username: this.username, password: this.password };

      console.log("userData: ", userData);

      this.userResource
        .loginUser(userData)
        .then(res => {
          console.log("res => ", res);
          this.$root.$emit('user-login');
          this.$router.push('/');
        })
        .catch(err => {
          console.log("err =>", err);
        }); 
    }
  }
};
</script>

<style scoped>
.w-40 {
  width: 20%;
  margin: 0 auto;
}

.app-button-primary{
  background-color:rgb(53, 73, 94);
  color:white;
}

.app-button-primary:hover{
  background: rgb(65, 184, 131);
  color:#fff;
  border: 1px solid #fff;
  box-shadow: 0 0 14px 1px rgba(0,0,0,.3)
}
</style>
