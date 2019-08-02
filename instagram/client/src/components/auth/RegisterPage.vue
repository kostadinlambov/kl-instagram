<template>
  <section class="mt-5 w-40">
    <div class="container register-form-content-section pb-4">
      <h1 class="text-center font-weight-bold mt-5">Register</h1>
      <div class="hr-styles" :style="{ 'width': '70%' }"></div>

      <form @submit.prevent="onSubmitHandler">
        <div class="section-container">
          <section class="left-section">
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
              <small
                v-else-if="$v.username.$error"
                id="usernameHelp"
                class="form-text alert alert-danger"
              >Username must be between 4 and 16 characters long!</small>
            </div>

            <div class="form-group text-left">
              <label for="firstName">First Name</label>
              <input
                type="text"
                v-model.trim="$v.firstName.$model"
                v-bind:class="['form-control', {'error': $v.firstName.$error}]"
                id="firstName"
                aria-describedby="firstNameHelp"
                placeholder="Enter first name"
              />
              <small
                v-if="!$v.firstName.required && $v.firstName.$dirty"
                id="firstNameHelp"
                class="form-text alert alert-danger"
              >Firstname is required!</small>
              <small
                v-else-if="$v.firstName.$error"
                id="firstNameHelp"
                class="form-text alert alert-danger"
              >First Name must start with a capital letter and contain only letters!</small>
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
              <small
                v-else-if="$v.password.$error"
                id="passwordHelp"
                class="form-text alert alert-danger"
              >Password must be between 4 and 16 characters long and contains only letters and digits!</small>
            </div>
          </section>

          <section class="right-section">
            <div class="form-group text-left">
              <label for="email">Email Address</label>
              <input
                type="email"
                v-model.trim="$v.email.$model"
                v-bind:class="['form-control', {'error': $v.email.$error}]"
                id="email"
                aria-describedby="emailHelp"
                placeholder="Enter email"
              />
              <small
                v-if="!$v.email.required && $v.email.$dirty"
                id="emailHelp"
                class="form-text alert alert-danger"
              >Emai is required!</small>
              <small
                v-else-if="$v.email.$error"
                id="emailHelp"
                class="form-text alert alert-danger"
              >Invalid e-mail address!</small>
            </div>

            <div class="form-group text-left">
              <label for="lastName">Last Name</label>
              <input
                type="text"
                v-model.trim="$v.lastName.$model"
                v-bind:class="['form-control', {'error': $v.lastName.$error}]"
                id="lastName"
                aria-describedby="lastNameHelp"
                placeholder="Enter last name"
              />
              <small
                v-if="!$v.lastName.required && $v.lastName.$dirty"
                id="lastNameHelp"
                class="form-text alert alert-danger"
              >LastName is required!</small>
              <small
                v-else-if="$v.lastName.$error"
                id="lastNameHelp"
                class="form-text alert alert-danger"
              >Last Name must start with a capital letter and contain only letters!</small>
            </div>
            <div class="form-group text-left">
              <label for="confirmPassword">Confirm Password</label>
              <input
                type="password"
                v-model.trim="$v.confirmPassword.$model"
                v-bind:class="['form-control', {'error': $v.confirmPassword.$error}]"
                id="confirmPassword"
                placeholder="Confirm your password"
                aria-describedby="confirmPasswordHelp"
              />
              <small
                v-if="!$v.confirmPassword.sameAsPassword && $v.confirmPassword.$dirty"
                id="confirmPasswordHelp"
                class="form-text alert alert-danger"
              >Passwords must be identical!</small>
            </div>
          </section>
        </div>
        <button
          :disabled="$v.$invalid"
          type="submit"
          class="btn app-button-primary btn-lg m-3"
        >Register</button>
      </form>
    </div>
  </section>
</template>

<script>
import { userService } from "../../mixins/userService";
import {
  required,
  email,
  minLength,
  maxLength,
  between,
  sameAs,
  helpers
} from "vuelidate/lib/validators";

const firstLastNameRegex = /^[A-Z]([a-zA-Z]+)?$/;
const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

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
  validations: {
    username: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(16)
    },
    email: {
      required,
      emailRegex: value => emailRegex.test(value)
    },
    firstName: {
      required,
      firstNameRegex: value => firstLastNameRegex.test(value)
    },
    lastName: {
      required,
      lastNameRegex: value => firstLastNameRegex.test(value)
    },
    password: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(16)
    },
    confirmPassword: {
      sameAsPassword: sameAs("password")
    }
  },
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
          this.$router.push("/login");
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
  margin-bottom: 3.8rem;
}

.alert {
  position: absolute;
  width: 100%;
  padding: 0.5rem 0.75rem;
}

.register-form-content-section input {
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

.register-form-content-section {
  width: 80%;
  margin: 5rem auto;
  border-radius: 5px;
  box-shadow: 0 0 14px 1px rgba(0, 0, 0, 0.3);
  background: white;
}

h1 {
  margin: 1rem auto;
  padding-top: 2rem;
}


@media  screen and (max-width: 1300px){
   .register-form-content-section{
        margin-top: 10rem;
     }
 }

 @media  screen and (max-width: 800px){
     .register-form-content-section{
        margin-top: 5rem;
        width: 100%;
     }
 }
</style>
