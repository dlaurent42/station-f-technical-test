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
    component: () => import('../views/Dashboard.vue'),
  }, {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
  }, {
    path: '/booking',
    name: 'booking',
    component: () => import('../views/Booking.vue'),
  }, {
    path: '/reservations',
    name: 'reservations',
    component: () => import('../views/Reservations.vue'),
  }, {
    path: '*',
    redirect: '/',
  }],
});

// Navigation guards: check if route required authentication
router.beforeEach((to, from, next) => {
  const routesWithoutAuth = ['/login'];
  const routesWithNormalAuth = ['/', '/booking', '/reservations'];
  if (routesWithNormalAuth.includes(to.path) && !store.getters[types.IS_AUTHENTICATED]) next('/login');
  else if (routesWithoutAuth.includes(to.path) && store.getters[types.IS_AUTHENTICATED]) next('/');
  else next();
});

export default router;
