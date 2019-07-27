import Vue from 'vue';
import App from './App.vue';
import router from './router';
import VueResource from 'vue-resource';

import jQuery from 'jquery';
import 'popper.js';
import 'bootstrap';
import './assets/app.css'


// Assign jQuery to $
window.$ = window.jQuery = jQuery

Vue.config.productionTip = false

Vue.use(VueResource);
Vue.http.options.root = 'http://localhost:8000';

Vue.http.interceptors.push((request, next) => {
  if(request.method === 'GET'){
    alert('GET request was sent.')
  }else if(request.method === 'POST'){
    alert('POST request was sent.')
  }

  next((responce) => {
    if(responce.status === 200){
      alert('responce.status === 200 : User registered successfully!')
    }
    // if(responce.method === 'GET' && responce.status === 200) {
    //   alert('Fetched data successfully!');
    // }else if(responce.method === 'POST' && responce.status === 200){
    //   alert('User registered successfully!')
    // }
  });
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
