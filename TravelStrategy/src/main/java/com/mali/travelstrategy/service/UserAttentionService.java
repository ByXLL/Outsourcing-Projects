package com.mali.travelstrategy.service;

import com.mali.travelstrategy.entity.ApiResult;
import com.mali.travelstrategy.entity.UserAttention;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 * 用户关注表 服务类
 * @author By-mali
 */
public interface UserAttentionService extends IService<UserAttention> {
    /**
     * 添加
     * @param userAttention     关注信息关联实体
     * @return                  响应数据
     */
    ApiResult add(UserAttention userAttention);

    /**
     * 删除
     * @param id        主键
     * @return          响应数据
     */
    ApiResult delete(Integer id);

    /**
     * 查询用户得所有关注用户
     * @param userId        用户id
     * @return              响应数据
     */
    ApiResult findByUserId(Integer userId);

    /**
     * 是否关注
     * @param targetUserId      目标用户id
     * @param sourceUserId      源用户id
     * @return                  响应数据
     */
    ApiResult isWatchUser(Integer targetUserId, Integer sourceUserId);
}
