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
/**
 * 拉黑作者
 */
export const addBlacklists = (userId) => {
  return request({
    method: 'POST',
    url: '/app/v1_0/user/blacklists',
    data: {
      target: userId
    }
  })
}

/**
 * 关注用户
 */
export const followUser = userId => {
  return request({
    method: 'POST',
    url: '/app/v1_0/user/followings',
    data: {
      target: userId
    }
  })
}

/**
 * 取消关注用户
 */
export const unFollowUser = userId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/followings/${userId}`
  })
}

/**
 * 获取用户自己信息
 */
export const getMeInfo = () => {
  return request({
    method: 'GET',
    url: `/app/v1_0/user`
  })
}

/**
 * 获取用于编辑的用户信息
 */
export const getUserProfile = () => {
  return request({
    method: 'GET',
    url: `/app/v1_0/user/profile`
  })
}
