import router from './router'

router.beforeEach(function (to, from, next) {
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
export default router
