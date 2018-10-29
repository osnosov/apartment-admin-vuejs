import Vue from 'vue';
import Router from 'vue-router';

const routerOptions = [
  {
    path: '*',
    meta: { public: true },
    redirect: { path: '/404' },
  },
  {
    path: '/',
    meta: { public: false },
    name: 'home',
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/login',
    meta: { public: true },
    name: 'login',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/signup',
    meta: { public: true },
    name: 'signup',
    component: () => import('@/views/Signup.vue'),
  },
  {
    path: '/profile',
    meta: { public: false },
    name: 'profile',
    component: () => import('@/views/Profile.vue'),
  },
  {
    path: '/404',
    meta: { public: true },
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue'),
  },
  {
    path: '/403',
    meta: { public: true },
    name: 'AccessDenied',
    component: () => import('@/views/Deny.vue'),
  },
  {
    path: '/500',
    meta: { public: true },
    name: 'ServerError',
    component: () => import('@/views/Error.vue'),
  },
];

Vue.use(Router);

export default new Router({
  mode: 'history',
  linkActiveClass: 'active',
  base: process.env.BASE_URL,
  routes: routerOptions,
});
