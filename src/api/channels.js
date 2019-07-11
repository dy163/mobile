/**
 * 封装关于频道接口的文件
 */
import request from '@/utils/request'
// 获取首页频道的列表
// 已登录是返回用户的列表
// 未登录返回的推挤频道列表
export const getUserChannels = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/channels'
  })
}

export const getArticles = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/articles'
  })
}
