import router from './router'
import nprogress from 'nprogress' // 引入文件
import 'nprogress/nprogress.css' // 引入样式
router.beforeEach(function (to, from, next) {
  nprogress.start()
  if (to.path.startsWith('/home')) {
    let userRes = window.localStorage.getItem('user_data')
    if (userRes) {
      let userInfo = JSON.parse(userRes)
      if (userInfo && userInfo.token) {
        next()
      } else {
        next('/login')
      }
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

router.afterEach(function (to, from, next) {
  nprogress.done()
})
export default router
