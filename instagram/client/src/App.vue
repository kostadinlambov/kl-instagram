<template>
  <div class="container text-center" id="app ">
    <Navbar />
    <router-view/>
  </div>
</template>

<script>
import Navbar from './components/layout/Navbar';
import LandingPage from './views/LandingPage';

export default {
  name: "app",
  components: {
    Navbar,
  }
}
</script>

<style>
/* Reset CSS */
html {
    box-sizing: border-box;
    font: 16px/1.5 "Helvetica", sans-serif;
}

*,
*:before,
*:after {
    box-sizing: inherit
}

* {
    margin: 0;
    padding: 0;
}

#app {
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
}
</style>
