<template>
  <section class="pt-3 w-40">
    <div class="container login-form-content-section pb-4">
      <h1 class="text-center font-weight-bold mt-4">Login</h1>

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

        <button :disabled="$v.$invalid" type="submit" class="btn btn-primary btn-lg m-3">Submit</button>
      </form>
    </div>
  </section>
</template>

<script>
import { required } from "vuelidate/lib/validators";

export default {
  name: "login-page",
  data: function() {
    return {
      username: "",
      password: ""
    };
  },
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
        console.log("not enabled");
        return;
      }

      const data = { username: this.username, password: this.password };

      console.log("data: ", data);

      fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
        });
    }
  }
};
</script>

<style scoped>
.w-40 {
  width: 30%;
  margin: auto;
}
</style>
