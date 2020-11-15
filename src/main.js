import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import i18n from './i18n'

Vue.use(VueResource);

new Vue({
  el: '#app',
  i18n,
  render: h => h(App)
})
