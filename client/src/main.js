import Vue from 'vue';

/* Libraries */
import MuseUI from 'muse-ui';
import Helpers from 'muse-ui/lib/Helpers';
import 'muse-ui/dist/muse-ui.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faTrashAlt,
  faTrophy,
  faMedal,
  faAward,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Main vue
import App from './components/App.vue';

// Router
import router from './components/routes';

// Store
import store from './store';

// Mixins
import titleMixin from './mixins/documentTitle';

// Components to be registered
import SectionTitle from './components/ui/utils/SectionTitle.vue';
import FadeIn from './components/ui/transitions/FadeInOut.vue';

Vue.config.productionTip = false;

// Libraries
library.add(faTrashAlt, faTrophy, faMedal, faAward);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('app-fade-in-transition', FadeIn);
Vue.component('app-section-title', SectionTitle);
Vue.use(MuseUI);

// Register components
Vue.use(Helpers);

// Mixins
Vue.mixin(titleMixin);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
