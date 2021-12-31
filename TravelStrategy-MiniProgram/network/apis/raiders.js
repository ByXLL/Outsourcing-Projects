import request from '../request.js'

// 添加攻略
export function addRaiders(data) {
  return request({
    method: 'post',
    url: `/raiders/add`,
    data
  })
}

// 删除攻略
export function delRaiders(id) {
  return request({
    method: 'post',
    url: `/raiders/del?id=${id}`,
  })
}

// 编辑攻略
export function updateRaiders(data) {
  return request({
    method: 'post',
    url: `/raiders/update`,
    data
  })
}

// 通过id攻略信息
export function getRaidersById(id) {
  return request({
    url: `/raiders/findById?id=${id}`
  })
}

// 通过id获取攻略信息和用户点赞信息
export function getRaidersByIdAndStat(id, userId) {
  return request({
    url: `/raiders/findDetailById?id=${id}&userId=${userId}`
  })
}

// 通过用户id获取攻略信息列表
export function getRaidersByUserId(userId) {
  return request({
    url: `/raiders/findByUserId?userId=${userId}`
  })
}

// 条件查询攻略列表
export function  getRaidersByParam(data) {
  return request({
    method: 'post',
    url: `/raiders/search`,
    data
  })
}

// 分页条件查询攻略列表
export function getRaidersByParamPager(pageIndex,pageSize,data) {
  return request({
    method: 'post',
    url: `/raiders/searchByPager?page=${pageIndex}&pageSize=${pageSize}`,
    data
  })
}
