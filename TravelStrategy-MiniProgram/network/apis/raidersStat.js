import request from '../request.js'

// 编辑攻略点赞 点赞/取消点赞
export function editRaidersStat(raidersId,userId) {
  return request({
    method: 'post',
    url: `/raiders-start/editRaidersStat?raidersId=${raidersId}&userId=${userId}`,
  })
}


// 获取攻略点赞列表
export function getStatList(raidersId) {
  return request({
    url: `/raiders-start/getList?raidersId=${raidersId}`,
  })
}

