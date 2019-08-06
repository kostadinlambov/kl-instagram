<template>
  <div class="text-center app">
    <Navbar />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

export default {
  name: "app",
  components: {
    Navbar,
    Footer
  },
};
</script>

<style>
@import url("https://use.fontawesome.com/releases/v5.4.2/css/all.css");

/* Reset CSS */
html {
  box-sizing: border-box;
  /* font: 16px/1.5 "Helvetica", sans-serif; */
}

body {
  background: #eee;
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
  background: rgb(250, 250, 250);
  /* background: #eee; */
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
}

:root {
  --font-size-initial: 12px;
  --font-size-lv2: 14px;
  --font-size-lv3: 16px;
  --font-size-lv4: 18px;
  --spacing-site: 2rem;
  --color-text-main: #000;
  --default-box-shadow: 0 0 14px 1px rgba(0, 0, 0, 0.4);
  --blue-box-shadow: 0px 0px 12px 2px rgba(64, 163, 244, 0.8);
}

html {
  font: var(--font-size-initial, 12px) / 1.5 -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol";
}

@media screen and (min-width: 500px) {
  html {
    font-size: var(--font-size-lv2, 14px);
  }
}

@media screen and (min-width: 700px) {
  html {
    font-size: var(--font-size-lv3, 16px);
  }
}

@media screen and (min-width: 1600px) {
  html {
    font-size: var(--font-size-lv4, 18px);
  }
}

body,
table,
th,
td,
form,
input,
textarea,
option,
select {
  font: inherit;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  line-height: 1.2;
  padding-bottom: 0.5em;
}

/* @each $heading, $size in $headings {
	#{$heading} { font-size: $size; }
} */

h5,
h6 {
  font-weight: bold;
}

ol {
  padding-bottom: 1.5em;
}

ol {
  padding-left: 2em;
}

li {
  list-style-position: inside;
}

a {
  text-decoration: none;
  /* color: rgb(192, 192, 192); */
}

/* a:hover {
	color: white;
} */

/* background: rgb(65, 184, 131); */
/* background: rgb(53, 73, 94); */

.app-link {
  color: #61dafb;
}

.app-center {
  text-align: center;
  margin-top: 5rem;
}

.app-footer {
  text-align: center;
}

.app-primary-color {
  color: rgb(53, 73, 94);
}

.app-secondary-color {
  color: rgb(65, 184, 131);
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

.app-button-secondary {
  background: rgb(65, 184, 131);
  color: white;
}

.app-button-secondary:hover {
  background: rgb(53, 73, 94);
  color: #fff;
  border: 1px solid #fff;
  box-shadow: 0 0 14px 1px rgba(0, 0, 0, 0.3);
}

/* .text-info{
  color:white;
} */

/* Forms CSS */

.hr-styles {
  margin: 1rem auto 1.5rem auto;
  border: 0;
  border-top: 1px solid rgb(224, 224, 224);
  width: 70%;
  /* margin: auto; */
}
</style>
