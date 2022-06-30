import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible' // 引入flexible.js -> 设置根标签字体大小(移动端适配)

import { NavBar, Form, Field, Button, Tabbar, TabbarItem } from 'vant'

Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Button)
Vue.use(Form)
Vue.use(Field)
Vue.use(NavBar)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
