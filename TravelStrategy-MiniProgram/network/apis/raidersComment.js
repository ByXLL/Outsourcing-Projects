import request from '../request.js'

// 添加攻略评论
export function addAttractions(data) {
  return request({
    method: 'post',
    url: `/raiders-comment/add`,
    data
  })
}
// 通过攻略id获取攻略评论
export function getRaidersCommentById(query) {
  return request({
    url: `/raiders-comment/find`,
    data: {...query}
  })
}
