import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

// Router contruction
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/About.vue'),
    },
  ],
});

// Navigation guards
router.beforeEach((to, from, next) => {
  console.log('global beforeEach');
  next();
});

export default router;
