<template>
  <div class="text-center app" >
    <Navbar />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import LandingPage from "./views/LandingPage";

export default {
  name: "app",
  components: {
    Navbar,
    Footer
  }
};
</script>

<style>
/* Reset CSS */
html {
  box-sizing: border-box;
  font: 16px/1.5 "Helvetica", sans-serif;
}

body{
  background: red;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

* {
  margin: 0;
  padding: 0;
}

.app {
  display: flex;
  flex-direction: column;
  margin: 0;
  min-height: 100vh;
  /* background: red; */
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
}


</style>
