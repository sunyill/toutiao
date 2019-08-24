import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/login'
import Home from './views/home'
import Main from './views/home/main'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'

    }, {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [{
        path: '',
        component: Main
      }, {
        path: '/index/comment',
        component: () => import('./views/comment')
      }, {
        path: '/index/material',
        component: () => import('./views/material')
      }, {
        path: '/index/articles',
        component: () => import('./views/article')
      }, {
        path: '/index/publish',
        component: () => import('./views/public')
      }]
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
