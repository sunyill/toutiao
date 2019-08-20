import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 引入样式布局
import './styles/index.less'
import ElementUi from 'element-ui' // 引入UI
import 'element-ui/lib/theme-chalk/index.css' // 引入样式"
import axios from 'axios'

axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
Vue.prototype.$http = axios
Vue.use(ElementUi)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
