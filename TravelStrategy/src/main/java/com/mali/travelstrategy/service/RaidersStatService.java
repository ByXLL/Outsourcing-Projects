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
     * 添加点赞
     * @param raidersId     攻略id
     * @param userId        用户id
     * @return              响应数据
     */
    ApiResult add(Integer raidersId, Integer userId);

    /**
     * 取消点赞
     * @param raidersId     攻略id
     * @param userId        用户id
     * @return              响应数据
     */
    ApiResult delete(Integer raidersId, Integer userId);
}
