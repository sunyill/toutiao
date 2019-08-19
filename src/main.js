import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 引入样式布局
import './styles/index.less'
import ElementUi from 'element-ui' // 引入UI
import 'element-ui/lib/theme-chalk/index.css' // 引入样式"
Vue.config.productionTip = false

Vue.use(ElementUi)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
