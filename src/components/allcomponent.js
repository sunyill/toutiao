import layoutheader from './index/header-index'
import layoutslide from './index/slide-index'
import breadCommon from './common/common_bread' // 全局注册面包屑组件
import 'quill/dist/quill.core.css' // 使用quill富文本
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import imageCover from './publish/cover-image'

import { quillEditor } from 'vue-quill-editor'

export default {
  install (Vue) {
    Vue.component('slide-index', layoutslide)
    Vue.component('header-index', layoutheader)
    Vue.component('breadCommon', breadCommon) // 封装的面包屑组件
    Vue.component('quill-editor', quillEditor)// 全局注册quill
    Vue.component('imagecover', imageCover)
  }
}
