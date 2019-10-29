import axios from 'axios'
import local from '@/utils/local'
import router from '../router'

axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// 设置请求头
// if (local.getUser()) {
//   axios.defaults.headers.Authorization = `Bearer ${local.getUser().token}`
// }
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 1.获取token
  const user = local.getUser() || {}
  // 2.头部设置token
  config.headers.Authorization = `Bearer ${user.token}`
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(res => res, err => {
  console.log(err)

  if (err.response.status === 401) {
    return router.push('/login')
  }
  // 对响应错误做点什么
  return Promise.reject(err)
})

export default axios
