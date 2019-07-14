<template>
  <div>
    <div class="container text-center start-page-margin">
      <div class="jumbotron bg-light text-dark text-center mb-0 mt-5 mx-auto jumbo-wrapper">
        <h2 class="h1 h1-responsive">Welcome to Instagram!</h2>
        <div class="hr-styles"></div>
        <hr class="hr-styles" />
        <p className="lead message" >Please <router-link className="text-info" exact to="/login">Login</router-link> or <router-link className="text-info" exact to="/register">Register</router-link> if you don't have an account.</p>
        <hr class="hr-styles" />
        <p class="lead">
          <router-link class="btn App-button-primary btn-lg m-3" to="/login" role="button">Login</router-link>
          <router-link class="btn App-button-primary btn-lg m-3" to="/register" role="button">Register</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LandingPage",
  components: {}
};
</script>

<style scoped>
.hr-styles {
  width: 70%;
  margin: 1.5rem auto;
}

.message{
    margin-bottom: 1.5rem;
    font-weight: 600;
}

.jumbo-wrapper {
  background-color: rgba(238, 238, 238, 0.95) !important;
  background: url('../assets/images/SoftUniFoundation_Logo.png');
  background-repeat: none;
  background-size: cover;
  /* background-position: center; */
  background-blend-mode: color;
  box-shadow: 0 0 14px 1px rgba(0, 0, 0, 0.3);
}

@media screen and (max-width: 1300px) {
  .start-page-margin {
    margin-top: 8rem;
  }
}

@media screen and (max-width: 800px) {
  .start-page-margin {
    margin-top: 5rem;
    width: 100%;
  }
}
</style>


