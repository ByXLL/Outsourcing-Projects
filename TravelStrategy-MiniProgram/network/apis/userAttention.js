import request from '../request.js'

// 编辑用户关注 添加关注/取消关注
export function editUserAttention(data) {
  return request({
    method: 'post',
    url: `/user-attention/editUserAttention`,
    data
  })
}


// 获取用户关注
export function getAttentionByUserId(userId) {
  return request({
    url: `/user-attention/findByUserId?uerId=${userId}`,
  })
}

// 是否关注该用户
export function isWatchUser(targetUserId,sourceUserId) {
  return request({
    url: `/user-attention/isWatchUser?targetUserId=${targetUserId}&sourceUserId=${sourceUserId}`,
  })
}