import axios from 'axios'
import store from '@/store'

const request = axios.create({
  // baseURL: 'http://toutiao.course.itcast.cn'
  baseURL: 'http://ttapi.research.itcast.cn'
})

// Add a request interceptor
request.interceptors.request.use(function (config) {
  // Do something before request is sent
  // 如果已经登录为用户统一添加token
  const { user } = store.state
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// Add a response interceptor
request.interceptors.response.use(function (response) {
  // Do something with response data
  // 如果响应结果种有data则直接返回data数据
  return response.data.data || response.data
}, function (error) {
  // Do something with response error
  return Promise.reject(error)
})

export default request
