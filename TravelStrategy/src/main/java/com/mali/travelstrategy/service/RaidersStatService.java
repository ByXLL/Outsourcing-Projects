package com.mali.travelstrategy.service;

import com.mali.travelstrategy.entity.ApiResult;
import com.mali.travelstrategy.entity.RaidersStat;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 * 攻略点赞表 服务类
 * @author By-mali
 */
public interface RaidersStatService extends IService<RaidersStat> {
    /**
     * 编辑攻略点赞 点赞/取消点赞
     * @param raidersId     攻略id
     * @param userId        用户id
     * @return              响应数据
     */
    ApiResult editRaidersStat(Integer raidersId, Integer userId);

    /**
     * 获取点赞列表
     * @param raidersId     攻略id
     * @return              响应数据
     */
    ApiResult getList(Integer raidersId);
}
