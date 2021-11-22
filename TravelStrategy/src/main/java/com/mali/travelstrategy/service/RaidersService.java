package com.mali.travelstrategy.service;

import com.mali.travelstrategy.dto.RaidersParam;
import com.mali.travelstrategy.entity.ApiResult;
import com.mali.travelstrategy.entity.Raiders;
import com.baomidou.mybatisplus.extension.service.IService;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * 攻略表 服务类
 * @author By-mali
 */
public interface RaidersService extends IService<Raiders> {
    /**
     * 添加攻略
     * @param raiders       攻略实体
     * @return              响应数据
     */
    ApiResult add(Raiders raiders);

    /**
     * 删除攻略
     * @param id        攻略id
     * @return          响应数据
     */
    ApiResult delete(Integer id);

    /**
     * 编辑攻略
     * @param raiders       攻略实体
     * @return              响应数据
     */
    ApiResult update(Raiders raiders);

    /**
     * 通过id查询
     * @param id        攻略id
     * @return          响应数据
     */
    ApiResult findById(Integer id);

    /**
     * 通过id查询详情
     * @param id        攻略id
     * @param userId    用户id
     * @return          响应数据
     */
    ApiResult findDetailById(Integer id,  Integer userId);

    /**
     * 通过用户id查询
     * @param userId        用户id
     * @return          响应数据
     */
    ApiResult findByUserId(Integer userId);

    /**
     * 分页查询
     * @param page      当前页码
     * @param pageSize  每页大小
     * @return          响应数据
     */
    ApiResult findByPager(Integer page, Integer pageSize);

    /**
     * 条件查询
     * @param param         攻略查询条件实体
     * @return              响应数据
     */
    ApiResult findByParam(RaidersParam param);

    /**
     * 条件分页查询
     * @param param         攻略查询条件实体
     * @param page          当前页码
     * @param pageSize      每页大小
     * @return              响应数据
     */
    ApiResult findParamByPager(RaidersParam param, Integer page, Integer pageSize);
}
