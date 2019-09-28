import Vue from 'vue';
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faTrashAlt,
  faTrophy,
  faMedal,
  faAward,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './App.vue';
import router from './routes';
import store from './store';
import titleMixin from './mixins/documentTitle';

Vue.config.productionTip = false;

// Libraries
library.add(faTrashAlt, faTrophy, faMedal, faAward);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.use(MuseUI);

// Mixins
Vue.mixin(titleMixin);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
