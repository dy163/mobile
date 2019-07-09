/**
 * 用户的相关的接口
 * 建议把一个一个接口封装成函数 可以重用
 */
import request from '@/utils/request'

export const login = ({ mobile, code }) => request({
  method: 'POST',
  url: '/app/v1_0/authorizations',
  data: {
    mobile,
    code
  }
})
