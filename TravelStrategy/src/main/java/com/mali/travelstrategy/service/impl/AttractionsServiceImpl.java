package com.mali.travelstrategy.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.mali.travelstrategy.dto.AttractionsParam;
import com.mali.travelstrategy.entity.ApiResult;
import com.mali.travelstrategy.entity.Attractions;
import com.mali.travelstrategy.enums.HttpCodeEnum;
import com.mali.travelstrategy.mapper.AttractionsMapper;
import com.mali.travelstrategy.service.AttractionsService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * 景点信息 服务实现类
 * @author By-mali
 */
@Service
public class AttractionsServiceImpl extends ServiceImpl<AttractionsMapper, Attractions> implements AttractionsService {

    @Autowired
    private AttractionsMapper attractionsMapper;
    /**
     * 添加景点信息
     * @param attractions 景点信息实体
     * @return 响应数据
     */
    @Override
    public ApiResult add(Attractions attractions) {
        if(attractions == null) { return new ApiResult(HttpCodeEnum.ARG_ERROR.getCode(), "参数异常"); }
        int i = attractionsMapper.insert(attractions);
        if(i>0) { return new ApiResult(HttpCodeEnum.SUCCESS.getCode(), "操作成功"); }
        return new ApiResult(HttpCodeEnum.ERROR.getCode(), "操作失败");
    }

    /**
     * 删除景点信息
     * @param id 景点id
     * @return 响应数据
     */
    @Override
    public ApiResult delete(Integer id) {
        if(id == null) { return new ApiResult(HttpCodeEnum.ARG_ERROR.getCode(), "参数异常"); }
        int i = attractionsMapper.deleteById(id);
        if(i>0) { return new ApiResult(HttpCodeEnum.SUCCESS.getCode(), "操作成功"); }
        return new ApiResult(HttpCodeEnum.ERROR.getCode(), "操作失败");
    }

    /**
     * 编辑景点信息
     * @param attractions 景点信息实体
     * @return 响应数据
     */
    @Override
    public ApiResult update(Attractions attractions) {
        if(attractions == null) { return new ApiResult(HttpCodeEnum.ARG_ERROR.getCode(), "参数异常"); }
        int i = attractionsMapper.updateById(attractions);
        if(i>0) { return new ApiResult(HttpCodeEnum.SUCCESS.getCode(), "操作成功"); }
        return new ApiResult(HttpCodeEnum.ERROR.getCode(), "操作失败");
    }

    /**
     * 通过id查询
     * @param id 景点id
     * @return 响应数据
     */
    @Override
    public ApiResult findById(Integer id) {
        if(id == null) { return new ApiResult(HttpCodeEnum.ARG_ERROR.getCode(), "参数异常"); }
        Attractions attractions = attractionsMapper.selectById(id);
        if(attractions != null) { return new ApiResult(HttpCodeEnum.SUCCESS.getCode(), "操作成功",attractions); }
        return new ApiResult(HttpCodeEnum.ERROR.getCode(), "操作失败");
    }

    /**
     * 根据参数 分页查询
     * @param attractionsParam 景点查询条件实体
     * @param page             当前页码
     * @param pageSize         每页大小
     * @return 响应数据
     */
    @Override
    public ApiResult findPagerByParam(AttractionsParam attractionsParam, Integer page, Integer pageSize) {
        if(attractionsParam == null || page == null || pageSize == null) { return new ApiResult(HttpCodeEnum.ARG_ERROR.getCode(), "参数异常"); }
        QueryWrapper<Attractions> queryWrapper = new QueryWrapper<>();
        if(StringUtils.isNotBlank(attractionsParam.getName())) {
            queryWrapper.like("name",attractionsParam.getName());
        }
        if(attractionsParam.getMaxFare() != null) {
            queryWrapper.between(
                    "fare",
                    attractionsParam.getMinFare() == null ? 0 : attractionsParam.getMinFare(),
                    attractionsParam.getMaxFare()
            );
        }

        if(StringUtils.isNotBlank(attractionsParam.getCity())) {
            queryWrapper.eq("city",attractionsParam.getCity());
        }

        if(attractionsParam.getStarRating() != null) {
            queryWrapper.eq("star_rating",attractionsParam.getStarRating());
        }
        IPage<Attractions> attractionsIPage = attractionsMapper.selectPage(new Page<>(page, pageSize), queryWrapper);
        return new ApiResult(HttpCodeEnum.SUCCESS.getCode(), "操作成功",attractionsIPage);
    }
}
