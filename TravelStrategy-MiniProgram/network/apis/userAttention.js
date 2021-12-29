import request from '../request.js'

// 添加用户关注
export function addUserAttention(data) {
  return request({
    method: 'post',
    url: `/user-attention/add`,
    data
  })
}

// 删除用户关注
export function delRaiders(id) {
  return request({
    method: 'post',
    url: `/user-attention/del?id=${id}`,
  })
}

// 获取用户关注
export function getByUserId(uerId) {
  return request({
    url: `/user-attention/findByUserId?uerId=${uerId}`,
  })
}

// 是否关注该用户
export function isWatchUser(targetUserId,sourceUserId) {
  return request({
    url: `/user-attention/findByUserId?targetUserId=${targetUserId}&sourceUserId=${sourceUserId}`,
  })
}