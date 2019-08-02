<template>
  <section class="mt-5">
    <div class="container login-form-content-section pb-4">
      <h1 class="text-center font-weight-bold mt-5">Login</h1>
      <div class="hr-styles" :style="{ 'width': '70%' }"></div>

      <form class="login-form-container" @submit.prevent="onSubmitHandler">
        <div class="form-group text-left">
          <label for="username">Username</label>
          <input
            type="text"
            v-model.trim="$v.username.$model"
            v-bind:class="['form-control', {'error': $v.username.$error}]"
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
            v-bind:class="['form-control', {'error': $v.password.$error}]"
            id="password"
            placeholder="Enter password"
          />
          <small
            v-if="!$v.password.required && $v.password.$dirty"
            id="passwordHelp"
            class="form-text alert alert-danger"
          >Password is required!</small>
        </div>

        <button
          :disabled="$v.$invalid"
          type="submit"
          class="btn btn-lg app-button-primary m-3"
        >Login</button>
      </form>
    </div>
  </section>
</template>

<script>
import { requester } from "../../mixins/requester";
import { required } from "vuelidate/lib/validators";

export default {
  name: "login-page",
  data: function() {
    return {
      username: "",
      password: ""
    };
  },
  mixins: [requester],
  computed: {},

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
          this.$root.$emit("user-login");
          this.$toast.open({
            message: "You have successfully logged in!",
            type: "success"
          });
          this.$router.push("/");
        })
        .catch(err => {
          let message = "Server error!";
          if (err.status === 403) {
            message = "Incorrect email or password!";
          }

          this.$toast.open({
            message,
            type: "error"
          });
        });
    }
  }
};
</script>

<style scoped>
.login-form-content-section input {
  background: #eee;
}

input.error:focus {
  border-color: rgba(229, 103, 23, 0.8);
  box-shadow: 0 1px 1px rgba(229, 103, 23, 0.075) inset,
    0 0 10px rgba(229, 103, 23, 0.8);
  outline: 0 none;
}

input.error {
  border: 1px solid red;
}

.app-button-primary {
  background-color: rgb(53, 73, 94);
  color: white;
}

.app-button-primary:hover {
  background: rgb(65, 184, 131);
  color: #fff;
  border: 1px solid #fff;
  box-shadow: 0 0 14px 1px rgba(0, 0, 0, 0.3);
}

.form-group {
  position: relative;
  margin-bottom: 2.8rem;
}

.alert {
  position: absolute;
  width: 100%;
  padding: 0.5rem 0.75rem;
}

.login-form-content-section {
  width: 30%;
  margin: 5rem auto;
  border-radius: 5px;
  box-shadow: 0 0 14px 1px rgba(0, 0, 0, 0.3);
  background: white;
}

.login-form-container {
  width: 80%;
  margin: auto;
}

h1 {
  margin: 1rem auto;
  padding-top: 2rem;
}

@media screen and (max-width: 1300px) {
  .login-form-content-section {
    /* margin-top: 10rem; */
  }

  .login-form-content-section {
    width: 50%;
  }
}

@media screen and (max-width: 800px) {
  .login-form-content-section {
    margin-top: 5rem;
    width: 100%;
  }
}
</style>
