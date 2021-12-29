import request from '../request.js'

// 添加攻略点赞
export function addStat(raidersId,userId) {
  return request({
    method: 'post',
    url: `/raiders-start/add?${raidersId}&userId=${userId}`,
  })
}

// 删除攻略点赞
export function delStat(raidersId,userId) {
  return request({
    method: 'post',
    url: `/raiders-start/delete?${raidersId}&userId=${userId}`,
  })
}
