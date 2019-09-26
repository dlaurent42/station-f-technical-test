import Vue from 'vue';
import Router from 'vue-router';
import store from '../store'; // eslint-disable-line
import * as types from '../store/types/user';

Vue.use(Router);

// Router contruction
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: '/',
    name: 'dashboard',
    component: () => import('./Dashboard/Dashboard.vue'),
  }, {
    path: '/login',
    name: 'login',
    component: () => import('./Login/Login.vue'),
  }, {
    path: '/booking',
    name: 'booking',
    component: () => import('./Booking/Booking.vue'),
  }, {
    path: '/reservations',
    name: 'reservations',
    component: () => import('./Reservations/Reservations.vue'),
  }, {
    path: '*',
    redirect: '/',
  }],
});

// Navigation guards: check if route required authentication
router.beforeEach((to, from, next) => {
  // Define routes auth
  const routesWithoutAuth = ['/login'];
  const routesWithNormalAuth = ['/', '/booking', '/reservations'];

  // Try autologin if user wants to access route which requires auth without beeing authd
  if (routesWithNormalAuth.includes(to.path) && !store.getters[types.IS_AUTHENTICATED]) {
    store.dispatch(types.ACTION_AUTOLOGIN).then(res => next((res) ? true : '/login'));
  } else if (routesWithoutAuth.includes(to.path) && store.getters[types.IS_AUTHENTICATED]) next('/');
  else next();
});

export default router;
