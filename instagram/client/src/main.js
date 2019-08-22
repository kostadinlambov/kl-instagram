import Vue from 'vue';
import App from './App.vue';
import router from './router';
import VueResource from 'vue-resource';
import Vuelidate from 'vuelidate';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/index.css';
import interceptors from '@/plugins/interceptorPlugin';
import { store } from './vuex/store';
import infiniteScroll from 'vue-infinite-scroll'

Vue.config.productionTip = false;

Vue.use(Vuelidate);
Vue.use(VueResource);
Vue.use(interceptors);
Vue.use(infiniteScroll)

Vue.use(VueToast, {
  duration: 3000,
  dismissable: true,
  position: 'top-right',
});

Vue.http.options.root = "http://localhost:8000";

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
