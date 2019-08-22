import layoutheader from './index/header-index'
import layoutslide from './index/slide-index'
import breadCommon from './common/common_bread' // 全局注册面包屑组件

export default {
  install (Vue) {
    Vue.component('slide-index', layoutslide)
    Vue.component('header-index', layoutheader)
    Vue.component('breadCommon', breadCommon)
  }
}
