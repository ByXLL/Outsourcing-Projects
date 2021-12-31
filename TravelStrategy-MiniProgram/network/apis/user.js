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

// 获取用户信息
export function getUserInfoByUserId(userId) {
  return request({
    url: `/user/findById?id=${userId}`,
  })
}



