import Vue from 'vue'
import App from './App.vue'
import router from './permission'
// 引入样式布局
import './styles/index.less'
import ElementUi from 'element-ui' // 引入UI
import 'element-ui/lib/theme-chalk/index.css' // 引入样式"
import axios from './utils/axios.config'
import Component from './components/allcomponent' // 引入的是自定义的插件
Vue.prototype.$http = axios
Vue.use(ElementUi)
Vue.use(Component)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
