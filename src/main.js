import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
import VueMapbox from "vue-mapbox";
import Mapbox from "mapbox-gl";

Vue.config.productionTip = false
Vue.use(VueMapbox, {
  mapboxgl: Mapbox
});
Vue.component('v-icon', Icon)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')