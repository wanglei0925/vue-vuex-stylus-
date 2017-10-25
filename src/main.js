// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import goods from './components/goods/goods'
import ratings from './components/ratings/ratings'
import selling from './components/selling/selling'
import Router from 'vue-router'
import Resource from 'vue-resource'
import './common/stylus/index.styl'
import store from './store'
import food from './components/food/food'
import filters from './common/filter/index.js'
Object.keys(filters).forEach((key) => Vue.filter(key, filters[key]))
// import fastclick from 'fastclick'
// fastclick.attach(document.body)
Vue.use(Router)
Vue.use(Resource)
Vue.config.productionTip = false
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '',
      redirect: '/goods'
    },
    {
      path: '/goods',
      component: goods,
      children: [
        {
          path: '/goods/food',
          component: food
        }
      ]
    },
    {
      path: '/ratings',
      component: ratings
    },
    {
      path: '/selling',
      component: selling
    }
  ]
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
