<template>
  <section class="pt-3 w-40">
    <div class="container login-form-content-section pb-4">
      <h1 class="text-center font-weight-bold mt-4">Register</h1>
      <h2>{{username}}</h2>

      <form @submit.prevent="onSubmitHandler">
        <div class="section-container">
          <section class="left-section">
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

            <div class="form-group text-left">
              <label for="firstName">First Name</label>
              <input
                type="text"
                v-model="firstName"
                class="form-control"
                id="firstName"
                aria-describedby="firstNameHelp"
                placeholder="Enter first name"
              />
              <small
                id="firstNameHelp"
                class="form-text text-muted"
              >We'll never share your firstName with anyone else.</small>
            </div>
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
          </section>

          <section class="right-section">
            <div class="form-group text-left">
              <label for="email">Email Address</label>
              <input
                type="email"
                v-model="email"
                class="form-control"
                id="email"
                aria-describedby="emailHelp"
                placeholder="Enter email"
              />
              <small
                id="emailHelp"
                class="form-text text-muted"
              >We'll never share your email with anyone else.</small>
            </div>

            <div class="form-group text-left">
              <label for="lastName">Last Name</label>
              <input
                type="text"
                v-model="lastName"
                class="form-control"
                id="lastName"
                aria-describedby="lastNameHelp"
                placeholder="Enter last name"
              />
              <small
                id="lastNameHelp"
                class="form-text text-muted"
              >We'll never share your lastName with anyone else.</small>
            </div>
            <div class="form-group text-left">
              <label for="confirmPassword">Confirm Password</label>
              <input
                type="password"
                v-model="confirmPassword"
                class="form-control"
                id="confirmPassword"
                placeholder="Confirm your password"
              />
            </div>
          </section>
        </div>
        <button :disabled="!isEnabled" type="submit" class="btn btn-primary btn-lg m-3">Submit</button>
      </form>
    </div>
  </section>
</template>
<script>
import { userService } from "../../mixins/userService";

export default {
  name: "register-page",
  data: function() {
    return {
      username: "",
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: ""
    };
  },
  computed: {
    isEnabled() {
      return (
        this.username &&
        this.password &&
        this.email &&
        this.firstName &&
        this.lastName &&
        this.confirmPassword
      );
    }
  },
  mixins: [userService],
  methods: {
    onSubmitHandler() {
      if (!this.isEnabled) {
        console.log("not enabled");
        return;
      }

      const userData = {
        username: this.username,
        password: this.password,
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
        confirmPassword: this.confirmPassword
      };

      this.userResource
        .registerUser(userData)
        .then(res => {
          console.log("res => ", res);
        })
        .catch(err => {
          console.log("err =>", err);
        });
    }
  }
};
</script>

<style scoped>
.section-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.left-section,
.right-section {
  flex: 0 1 36%;
  margin: 0 2rem;
}
</style>
