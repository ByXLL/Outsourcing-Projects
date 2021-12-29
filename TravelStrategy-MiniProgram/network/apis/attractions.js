import request from '../request.js'

// 获取景点列表
export function getAttractionsList(page,pageSize,data) {
  return request({
    method: 'post',
    url: `/attractions/findPagerByParam?page=${page}&pageSize=${pageSize}`,
    data
  })
}
// 通过id景点信息
export function getAttractionById(id) {
  return request({
    url: `/attractions/findById?id=${id}`
  })
}
