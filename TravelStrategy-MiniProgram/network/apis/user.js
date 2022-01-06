import request from '../request.js'

// 用户登录
export function login(data) {
  return request({
    method: 'post',
    url: `/user/login`,
    data
  })
}

// 用户注册
export function register(data) {
  return request({
    method: 'post',
    url: `/user/add`,
    data
  })
}

// 用户编辑
export function updateUser(data) {
  return request({
    method: 'post',
    url: `/user/update`,
    data
  })
}

// 修改密码
export function editPassword(data) {
  return request({
    method: 'post',
    url: `/user/editPassword`,
    data
  })
}

// 获取用户信息
export function getUserInfoByUserId(userId) {
  return request({
    url: `/user/findById?id=${userId}`,
  })
}

// 获取用户收藏/关注/粉丝信息
export function findUserStar(userId) {
  return request({
    url: `/user/findUserStar?id=${userId}`,
  })
}


