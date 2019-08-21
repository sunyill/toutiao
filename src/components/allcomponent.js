import layoutheader from './index/header-index'
import layoutslide from './index/slide-index'

export default {
  install (Vue) {
    Vue.component('slide-index', layoutslide)
    Vue.component('header-index', layoutheader)
  }
}
