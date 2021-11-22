package com.mali.travelstrategy.service;

import com.mali.travelstrategy.entity.ApiResult;
import com.mali.travelstrategy.entity.RaidersComment;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 * 攻略评论表 服务类
 * @author By-mali
 */
public interface RaidersCommentService extends IService<RaidersComment> {

    /**
     * 添加评论
     * @param raidersComment        评论实体
     * @return                      响应数据
     */
    ApiResult add(RaidersComment raidersComment);

    /**
     * 删除评论
     * @param id    评论id
     * @return      响应数据
     */
    ApiResult delete(Integer id);


    /**
     * 通过攻略id 分页查询评论
     * @param raidersId     攻略id
     * @param page          当前页码
     * @param pageSize      每页大小
     * @return              响应数据
     */
    ApiResult findPagerByRaidersId(Integer raidersId, Integer page, Integer pageSize);
}
