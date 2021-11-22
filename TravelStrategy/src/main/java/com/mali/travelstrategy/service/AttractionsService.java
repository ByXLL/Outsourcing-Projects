package com.mali.travelstrategy.service;

import com.mali.travelstrategy.dto.AttractionsParam;
import com.mali.travelstrategy.entity.ApiResult;
import com.mali.travelstrategy.entity.Attractions;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 * 景点信息 服务类
 * @author By-mali
 */
public interface AttractionsService extends IService<Attractions> {
    /**
     * 添加景点信息
     * @param attractions       景点信息实体
     * @return                  响应数据
     */
    ApiResult add(Attractions attractions);

    /**
     * 删除景点信息
     * @param id        景点id
     * @return          响应数据
     */
    ApiResult delete(Integer id);

    /**
     * 编辑景点信息
     * @param attractions       景点信息实体
     * @return                  响应数据
     */
    ApiResult update(Attractions attractions);

    /**
     * 通过id查询
     * @param id    景点id
     * @return      响应数据
     */
    ApiResult findById(Integer id);

    /**
     * 根据参数 分页查询
     * @param attractionsParam  景点查询条件实体
     * @param page              当前页码
     * @param pageSize          每页大小
     * @return                  响应数据
     */
    ApiResult findPagerByParam(AttractionsParam attractionsParam, Integer page, Integer pageSize);
}
