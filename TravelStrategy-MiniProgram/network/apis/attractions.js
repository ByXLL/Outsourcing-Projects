import request from '../request.js'

// 获取景点列表
export function getAttractionsList(data) {
  return request({
    url: `/attractions/findPagerByParam`,
    data
  })
}
// 通过id景点信息
export function getAttractionById(id) {
  return request({
    url: `/attractions/findById?id=${id}`
  })
}
