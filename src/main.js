import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import i18n from './i18n'
import store from "./store/index";

Vue.use(VueResource);

new Vue({
  store,
  i18n,
  el: '#app',
  render: h => h(App)
})
