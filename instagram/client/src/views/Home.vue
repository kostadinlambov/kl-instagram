<template>
  <div id="app">
    <Header />
  </div>
</template>

<script>
import Header from "../components/layout/Header"

export default {
  name: 'Home',
  components: {
    Header
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
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>


