<template>
  <section class="pt-3 w-40">
    <div class="container login-form-content-section pb-4">
      <h1 class="text-center font-weight-bold mt-4">Login</h1>

      <form @submit.prevent="onSubmitHandler">
        <div class="form-group text-left">
          <label for="username">Username</label>
          <input
            type="text"
            v-model="username"
            class="form-control"
            id="username"
            aria-describedby="usernameHelp"
            placeholder="Enter username"
          />
          <small
            id="usernameHelp"
            class="form-text text-muted"
          >We'll never share your username with anyone else.</small>
        </div>
        <div>{{username}}</div>
        <div class="form-group text-left">
          <label for="password">Password</label>
          <input
            type="password"
            v-model="password"
            class="form-control"
            id="password"
            placeholder="Enter password"
          />
        </div>
        <div>{{password}}</div>

        <button :disabled="!isEnabled" type="submit" class="btn btn-primary btn-lg m-3">Submit</button>
      </form>

      <!-- <div class="text-center">
        <button
          disabled="{!isEnabled}"
          type="submit"
          class="btn App-button-primary btn-lg m-3"
      >Login</button>-->
    </div>
  </section>
</template>

<script>
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
  methods: {
    onSubmitHandler() {
      if (!this.isEnabled) {
        console.log("not enabled");
        return;
      }


      const data = {username: this.username, password: this.password}

      console.log('data: ', data);

      fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
      .then(response => response.json)
      .then(data => {
          console.log(data)
      });
    }
  }
};
</script>

<style>
.w-40 {
  width: 30%;
  margin: auto;
}
</style>
