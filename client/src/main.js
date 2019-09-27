import Vue from 'vue';
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './App.vue';
import router from './routes';
import store from './store';

Vue.config.productionTip = false;

library.add(faTrashAlt);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(MuseUI);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
