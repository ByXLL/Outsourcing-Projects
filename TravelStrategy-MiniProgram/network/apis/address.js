import request from '../request.js'

// 获取地址订单列表
export function getAddressList(data) {
  return request({
    url: `/system/address/list`,
    data
  })
}
// 通过id获取地址信息
export function getAddressById(id) {
  return request({
    url: `/address/getAddressById?id=${id}`
  })
}
// 通过id删除地址
export function delAddressById(id) {
  return request({
    method: 'delete',
    url: `/system/address/delete/${id}`
  })
}
// 更新 || 新增 地址信息
export function addAddress(data) {
  return request({
    method: 'post',
    url: `/system/address/add?userId=${data.userId}`,
    data
  })
}


// 更新地址信息
export function updataAddress(data) {
  return request({
    method: 'post',
    url: `/system/address/edit`,
    data
  })
}
