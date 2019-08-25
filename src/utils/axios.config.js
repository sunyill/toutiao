import axios from 'axios'
import { Message } from 'element-ui'
import JSONBig from 'json-bigint'
// import { Message } from 'element-ui'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
axios.defaults.transformResponse = [function (data) {
  return data ? JSONBig.parse(data) : {} // 处理大数字
}]
axios.interceptors.request.use(function (config) {
  // 获取用户的本地存储及token
  let userStorage = window.localStorage.getItem('user_data')
  let userToken = userStorage ? JSON.parse(userStorage).token : null
  // 将token注入到请求的参数中
  config.headers.Authorization = `Bearer ${userToken}`
  return config
}, function (err) {
  return Promise.reject(err)
})
// 响应拦截器
axios.interceptors.response.use(function (response) {
  return response.data ? response.data : {}
}, function (err) {
  let resCode = err.response ? err.response.status : ''
  let message = ''
  switch (resCode) {
    case 400:
      message = '请求参数错误'
      break
    case 403:
      message = '用户非实名用户'
      break
    case 404:
      message = '手机号码不正确'
      break
    case 409:
      message = '用户名已存在'
      break
    case 401:
      message = 'token未传或者过期'
      window.localStorage.clear()
      window.location.hash = '#/login'
      break
    case 507:
      message = '服务器数据库异常'
      break
    default:
      message = '未知错误'
      break
  }
  Message({ message, type: 'warning' })
  return new Promise()
})
export default axios
