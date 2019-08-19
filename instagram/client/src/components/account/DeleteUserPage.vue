<template>
  <main class="mt-5 pb-5">
    <div class="container text-center col-md-8 mt-5">
      <!-- <h1>Delete User</h1> -->
      <h1
        class="text-center font-weight-bold alert alert-danger delete-user-header col-md-9"
      >Are you sure you want to delete this User?</h1>

      <div class="section-wrapper">
        <section class="aside-section">
          <ul>
            <li>
              <router-link
                class="aside-links"
                :to="{name:'edit-profile', params: {'id': timeLineUser.id}}"
              >Edit Profile</router-link>
            </li>
            <li>
              <router-link class="aside-links active" to="#">Delete User</router-link>
            </li>
            <li>
              <a class="aside-links cancel" @click="$router.go(-1)">Cancel</a>
            </li>
            <!-- <li>Cancel</li> -->
          </ul>
        </section>

        <section class="main-section">
          <form @submit.prevent="onSubmitHandler" class="form-container">
            <div class="form-group text-right">
              <label for="firstName">First Name</label>
              <input
                disabled
                type="text"
                id="firstName"
                v-model.trim="$v.user.firstName.$model"
                v-bind:class="['form-control', {'error': $v.user.firstName.error}]"
              />
              <small
                v-if="!$v.user.firstName.required && $v.user.firstName.$dirty"
                id="firstNameHelp"
                class="form-text alert alert-danger"
              >Firstname is required!</small>
              <small
                v-else-if="$v.user.firstName.$error"
                id="firstNameHelp"
                class="form-text alert alert-danger"
              >First Name must start with a capital letter and contain only letters!</small>
            </div>

            <div class="form-group text-right">
              <label for="lastName">Last Name</label>
              <input
                disabled
                type="text"
                id="lastName"
                v-model.trim="$v.user.lastName.$model"
                v-bind:class="['form-control', {'error': $v.user.lastName.error}]"
              />
              <small
                v-if="!$v.user.lastName.required && $v.user.lastName.$dirty"
                id="lastNameHelp"
                class="form-text alert alert-danger"
              >LastNameis required!</small>
              <small
                v-else-if="$v.user.lastName.$error"
                id="lastNameHelp"
                class="form-text alert alert-danger"
              >First Name must start with a capital letter and contain only letters!</small>
            </div>

            <div class="form-group text-right">
              <label for="website">Website</label>
              <input
                disabled
                type="text"
                id="website"
                v-model.trim="$v.user.website.$model"
                v-bind:class="['form-control', {'error': $v.user.website.error}]"
              />
            </div>
            <small
              v-if="$v.user.website.$error"
              id="firstNameHelp"
              class="form-text alert alert-danger"
            >Website address must be less than 250 characters!</small>

            <div class="form-group text-right">
              <label for="bio">Bio</label>
              <textarea
                disabled
                rows="3"
                id="bio"
                v-model.trim="$v.user.bio.$model"
                v-bind:class="['form-control', {'error': $v.user.bio.error}]"
              />
              <small
                v-if="$v.user.bio.$error"
                id="firstNameHelp"
                class="form-text alert alert-danger"
              >Bio must be less than 1500 characters!</small>
            </div>

            <div class="form-group text-right">
              <label for="email">Email Address</label>
              <input
                disabled
                type="email"
                v-model.trim="$v.user.email.$model"
                v-bind:class="['form-control', {'error': $v.user.email.$error}]"
                id="email"
                aria-describedby="emailHelp"
                placeholder="Enter email"
              />
              <small
                v-if="!$v.user.email.required && $v.user.email.$dirty"
                id="emailHelp"
                class="form-text alert alert-danger"
              >Emai is required!</small>
              <small
                v-else-if="$v.user.email.$error"
                id="emailHelp"
                class="form-text alert alert-danger"
              >Invalid e-mail address!</small>
            </div>

            <div class="form-group text-right">
              <label for="profilePicUrl">Profile Pic Url</label>
              <input
                disabled
                type="text"
                id="profilePicUrl"
                v-model.trim="$v.user.profilePicUrl.$model"
                v-bind:class="['form-control', {'error': $v.user.profilePicUrl.error}]"
              />
              <small
                v-if="!$v.user.profilePicUrl.required && $v.user.profilePicUrl.$dirty"
                id="profilePicUrlHelp"
                class="form-text alert alert-danger"
              >ProfilePicUrl is required!</small>
            </div>

            <div class="button-wrapper">
              <button  type="submit" class="btn app-button-primary btn-lg m-3">Delete</button>
            </div>
          </form>
        </section>
      </div>
    </div>
  </main>
</template>

<script>
import { required, minLength, maxLength } from "vuelidate/lib/validators";
import { mapGetters, mapActions } from "vuex";

const firstLastNameRegex = /^[A-Z]([a-zA-Z]+)?$/;
const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

export default {
  name: "delete-user",
  data: function() {
    return {
      user: {}
    };
  },
  computed: {
    ...mapGetters("auth", {
      loggedInUser: "getLoggedInUserData",
      timeLineUser: "getTimeLineUserData",
    })
  },
  validations: {
    user: {
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
      website: {
        maxLength: maxLength(250)
      },
      bio: {
        maxLength: maxLength(1500)
      },
      profilePicUrl: {
        required
      }
    }
  },
  methods: {
     ...mapActions("user", {
      deleteUser: "deleteUser",
    }),
    onSubmitHandler() {

      console.log("user: ", this.user);
      debugger;

      this.deleteUser(this.timeLineUser.id)

    }
  },
  created() {
    this.user = { ...this.timeLineUser };
  }
};
</script>

<style scoped>
.section-wrapper {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background: white;
  box-shadow: 0 0 14px 1px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
}

.aside-section {
  flex: 1 0 15%;
  /* padding: 1rem 0; */
}
.main-section {
  flex: 0 0 83%;
  box-shadow: -15px 0 8px -8px rgba(0, 0, 0, 0.3);
  padding-top: 2rem;
  padding-right: 2rem;
}

.form-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.form-group {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;

  /* margin-bottom: 0; */
}

label {
    white-space: nowrap;
  flex: 0 0 20%;
  padding-right: 0.8rem;
  margin-bottom: 0;
  padding-top: 0.5rem;
  color: #262626;
  /* font-size: 16px; */
  font-weight: 600;
  line-height: 18px;
}

li {
  list-style-type: none;
  text-align: left;
  /* padding-left: 0.5rem; */
  padding: 1rem 0;

  /* border-bottom: 1px solid red; */
  box-shadow: 0 0 14px 1px rgba(0, 0, 0, 0.15);
}

li > a {
  padding: 1rem;
}

a.aside-links {
  text-decoration: none;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  white-space: nowrap;
  cursor: pointer;
}

a.aside-links:hover {
  color: rgb(65, 184, 131);
}

a.active {
  color: #262626;
  border-left: 2px solid transparent;
  border-left-color: #262626;
  font-weight: 600;
  pointer-events: none;
  cursor: default;
}

h1.delete-user-header {
  margin: 1rem auto;
  font-size: 1.8rem;
}
</style>