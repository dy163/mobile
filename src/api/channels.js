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

/**
 * 获取所有频道列表
 */
export const getAllChannels = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/channels'
  })
}
/**
 * 用户指定删除列表
 */
export const deleteUserChannel = channelId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/channels/${channelId}`
  })
}
/**
 * 批量修改用户频道列表（部分覆盖）
 */
export const updateUserChannel = channels => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/channels',
    data: {
      channels
    }
  })
}
/**
 * 批量修改用户频道列表（重置式）
 */
// export const addUserChannel = () => {
//   return request({
//     method: 'PUT',
//     url: '/app/v1_0/user/channels'
//   })
// }
/**
 * 用户指定增加列表
 */
// export const addUserChannel = () => {
//   return request({
//     method: 'POST',
//     url: '/app/v1_0/user/channels'
//   })
// }
