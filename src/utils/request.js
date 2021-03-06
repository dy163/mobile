import axios from 'axios'
import store from '@/store'
import JSONbig from 'json-bigint'
import router from '@/router'

const refreshTokenRequest = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn'
})

const request = axios.create({
  // baseURL: 'http://toutiao.course.itcast.cn'
  baseURL: 'http://ttapi.research.itcast.cn'
})
/**
 * 处理后端返回数据中超出范围js安全的整数范围
 */
request.defaults.transformResponse = [function (data) {
  try {
    // 如果是 json 格式字符串，那就转换并返回给后续使用
    return JSONbig.parse(data)
  } catch (err) {
    // 报错就意味着 data 不是 json 格式字符串，这里就直接原样返回给后续使用
    return data
  }
}]

// Add a request interceptor (响应拦截器)
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
  // Do something with response data 这里是响应连接成功的拦截器
  // 如果响应结果种有data则直接返回data数据
  // 如果响应结果中对象中没有 data , 则不做任何处理.直接返回这个数据
  return response.data.data || response.data
}, async error => {
  console.log('请求失败,进入响应拦截器了')
  // 如果状态吗是401
  if (error.response && error.response.status === 401) {
  // 如果没有refresh-token 着直接跳转到登录页
    const { user } = store.state
    // 如果没有链user没有就直接跳到登录页
    if (!user) {
      return router.push({ name: 'login' })
    }

    // 如果有refresh_token 发送请求重新获得新的token
    // 注意这个请求不要使用request请求 否则会进入
    try {
      const res = await refreshTokenRequest({
        method: 'PUT',
        url: '/app/v1_0/authorizations',
        headers: {
          Authorization: `Bearer ${user.refresh_token}`
        }
      })
      console.log(res)
      // 刷新用户成功了   将新的用户保存到store中
      // user.token = data.token  // 不要这么写
      store.commit('setUser', {
        token: res.data.data.token, // 重新获取的访问 token
        refresh_token: user.refresh_token // 原来的刷新 token
      })
      // 吧源来的那个因为401错误的请求发送出去
      return request(error.config)
      // request 用来发送我们那些正常的业务请求
      // error.config 是本次的请求的配置对象,里面有具体的config
    } catch (err) {
      // 刷新用户失败了
      router.push({ name: 'login' })
    }
  }
  // Do something with response error /// 这里是响应失败的拦截器401进入这里
  return Promise.reject(error)
})

export default request
