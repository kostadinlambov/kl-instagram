import Vue from 'vue';
import App from './App.vue';
import router from './router';
import VueResource from 'vue-resource';
import Vuelidate from 'vuelidate';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/index.css';
import interceptors from '@/plugins/interceptorPlugin';
// import './assets/app.css'

Vue.config.productionTip = false

Vue.use(Vuelidate);
Vue.use(VueResource);
Vue.use(interceptors);
Vue.use(VueToast, {
  duration: 3000,
  dismissable: true,
  position: 'top-right',
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
