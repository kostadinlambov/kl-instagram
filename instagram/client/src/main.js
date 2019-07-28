import Vue from 'vue';
import App from './App.vue';
import router from './router';
import VueResource from 'vue-resource';
import Vuelidate from 'vuelidate';

// import jQuery from 'jquery';
// import 'popper.js';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
// import './assets/app.css'

// // Assign jQuery to $
// window.$ = window.jQuery = jQuery

Vue.config.productionTip = false

Vue.use(Vuelidate);
Vue.use(VueResource);
Vue.http.options.root = 'http://localhost:8000';

Vue.http.interceptors.push((request, next) => {
  const token = localStorage.getItem('token');

  if(token && token.length && !request.url.endsWith('login') && !request.url.endsWith('register')){
    request.headers.set('Authorization', `Bearer ${token}`)
  }

  // if(request.url.endsWith('login') ){
  //   // alert('GET request was sent.')
  // }else if(request.method === 'POST'){
  //   // alert('POST request was sent.')
  // }

  next((responce) => {
    if(responce.status === 200 && responce.url.endsWith('login')){
      saveToken(responce.body);
      // console.log('responce.status === 200 : You have successfully logged in!')
    }
  });
})

const saveToken = (data) => {
  const token = data.split(' ')[1];
  localStorage.setItem('token', token);
}

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
