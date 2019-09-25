import Vue from 'vue';
import Router from 'vue-router';

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
  }],
});

// Navigation guards
router.beforeEach((to, from, next) => {
  console.log('global beforeEach', from, to); // eslint-disable-line
  next();
});

export default router;
