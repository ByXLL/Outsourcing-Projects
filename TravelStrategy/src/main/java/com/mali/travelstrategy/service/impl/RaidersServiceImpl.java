package com.mali.travelstrategy.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.mali.travelstrategy.dto.RaidersParam;
import com.mali.travelstrategy.entity.ApiResult;
import com.mali.travelstrategy.entity.Raiders;
import com.mali.travelstrategy.entity.RaidersStat;
import com.mali.travelstrategy.entity.UserAttention;
import com.mali.travelstrategy.enums.HttpCodeEnum;
import com.mali.travelstrategy.mapper.RaidersMapper;
import com.mali.travelstrategy.mapper.RaidersStatMapper;
import com.mali.travelstrategy.service.RaidersService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.mali.travelstrategy.vo.RaidersDetailsVO;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * 攻略表 服务实现类
 * @author By-mali
 */
@Service
public class RaidersServiceImpl extends ServiceImpl<RaidersMapper, Raiders> implements RaidersService {

    @Autowired
    private RaidersMapper raidersMapper;

    @Autowired
    private RaidersStatMapper raidersStatMapper;

    /**
     * 添加攻略
     * @param raiders 攻略实体
     * @return 响应数据
     */
    @Override
    public ApiResult add(Raiders raiders) {
        if(raiders == null) { return new ApiResult(HttpCodeEnum.ARG_ERROR.getCode(),"参数异常"); }
        int i = raidersMapper.insert(raiders);
        if(i>0) { return new ApiResult(HttpCodeEnum.SUCCESS.getCode(),"添加攻略成功");}
        return new ApiResult(HttpCodeEnum.ERROR.getCode(),"操作失败");
    }

    /**
     * 删除攻略
     * @param id 攻略id
     * @return 响应数据
     */
    @Override
    public ApiResult delete(Integer id) {
        if(id == null) { return new ApiResult(HttpCodeEnum.ARG_ERROR.getCode(),"参数异常"); }
        int i = raidersMapper.deleteById(id);
        if(i<1) {return new ApiResult(HttpCodeEnum.ERROR.getCode(),"操作失败");}
        return new ApiResult(HttpCodeEnum.SUCCESS.getCode(),"操作成功");
    }

    /**
     * 编辑攻略
     * @param raiders 攻略实体
     * @return 响应数据
     */
    @Override
    public ApiResult update(Raiders raiders) {
        if(raiders == null) { return new ApiResult(HttpCodeEnum.ARG_ERROR.getCode(),"参数异常"); }
        int i = raidersMapper.updateById(raiders);
        if(i>0) { return new ApiResult(HttpCodeEnum.SUCCESS.getCode(),"修改攻略成功");}
        return new ApiResult(HttpCodeEnum.ERROR.getCode(),"操作失败");
    }

    /**
     * 通过id查询
     * @param id 攻略id
     * @return 响应数据
     */
    @Override
    public ApiResult findById(Integer id) {
        if(id == null) { return new ApiResult(HttpCodeEnum.ARG_ERROR.getCode(),"参数异常"); }
        Raiders raiders = raidersMapper.selectById(id);
        if(raiders == null) {return new ApiResult(HttpCodeEnum.ERROR.getCode(),"查询失败，攻略不存在");}
        return new ApiResult(HttpCodeEnum.SUCCESS.getCode(),"查询成功",raiders);
    }

    /**
     * 通过id查询详情
     * @param id 攻略id
     * @return 响应数据
     */
    @Override
    public ApiResult findDetailById(Integer id, Integer userId) {
        if(id == null || userId == null) { return new ApiResult(HttpCodeEnum.ARG_ERROR.getCode(),"参数异常"); }
        Raiders raiders = raidersMapper.selectById(id);
        if(raiders == null) {return new ApiResult(HttpCodeEnum.ERROR.getCode(),"查询失败，攻略不存在");}
        QueryWrapper<RaidersStat> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("user_id",userId).eq("target_user_id",raiders.getAuthorId());
        RaidersStat raidersStat = raidersStatMapper.selectOne(queryWrapper);
        RaidersDetailsVO detailsVO = new RaidersDetailsVO();
        BeanUtils.copyProperties(raiders,detailsVO);
        detailsVO.setIsStat(raidersStat != null);
        return new ApiResult(HttpCodeEnum.SUCCESS.getCode(),"查询成功",detailsVO);
    }

    /**
     * 通过用户id查询
     * @param userId 用户id
     * @return 响应数据
     */
    @Override
    public ApiResult findByUserId(Integer userId) {
        if(userId == null) { return new ApiResult(HttpCodeEnum.ARG_ERROR.getCode(),"参数异常"); }
        List<Raiders> raidersList = raidersMapper.selectList(new QueryWrapper<Raiders>().eq("author_id", userId).orderByDesc("create_time"));
        return new ApiResult(HttpCodeEnum.SUCCESS.getCode(),"查询成功",raidersList);
    }

    /**
     * 通过用户id查询用户点赞的攻略
     *
     * @param userId 用户id
     * @return 响应数据
     */
    @Override
    public ApiResult findUserStarRaiders(Integer userId) {
        if(userId == null) { return new ApiResult(HttpCodeEnum.ARG_ERROR.getCode(),"参数异常"); }
        List<RaidersStat> raidersStats = raidersStatMapper.selectList(new QueryWrapper<RaidersStat>().eq("user_id", userId));
        List<Raiders> raidersList = new ArrayList<>();
        if(raidersStats.size() >0) {
            List<Integer> raidersIds = new ArrayList<>();
            for (RaidersStat item : raidersStats) {
                raidersIds.add(item.getRaidersId());
            }
            raidersList = raidersMapper.selectList(new QueryWrapper<Raiders>().in("id", raidersIds));
        }
        return new ApiResult(HttpCodeEnum.SUCCESS.getCode(),"查询成功",raidersList);
    }

    /**
     * 条件查询
     * @param param 攻略查询条件实体
     * @return 响应数据
     */
    @Override
    public ApiResult findByParam(RaidersParam param) {
        QueryWrapper<Raiders> queryWrapper = new QueryWrapper<>();
        if(StringUtils.isNotBlank(param.getTitle())) {
            queryWrapper.like("title",param.getTitle());
        }
        if(param.getAuthorId() != null ) {
            queryWrapper.eq("author_id", param.getAuthorId());
        }
        if(StringUtils.isNotBlank(param.getAuthor())) {
            queryWrapper.eq("author", param.getAuthor());
        }
        queryWrapper.orderByDesc("create_time");
        List<Raiders> raidersList = raidersMapper.selectList(queryWrapper);
        return new ApiResult(HttpCodeEnum.SUCCESS.getCode(),"查询成功",raidersList);
    }

    /**
     * 分页查询
     * @param page     当前页码
     * @param pageSize 每页大小
     * @return 响应数据
     */
    @Override
    public ApiResult findByPager(Integer page, Integer pageSize) {
        if(page == null || pageSize == null) { return new ApiResult(HttpCodeEnum.ARG_ERROR.getCode(),"参数异常"); }
        QueryWrapper<Raiders> queryWrapper = new QueryWrapper<>();
        queryWrapper.orderByDesc("create_time");
        IPage<Raiders> raidersIPage = raidersMapper.selectPage(new Page<>(page, pageSize), queryWrapper);
        List<Raiders> list = raidersIPage.getRecords();
        return new ApiResult(HttpCodeEnum.SUCCESS.getCode(),"查询成功",list);
    }

    /**
     * 条件分页查询
     * @param param    攻略查询条件实体
     * @param page     当前页码
     * @param pageSize 每页大小
     * @return 响应数据
     */
    @Override
    public ApiResult findParamByPager(RaidersParam param, Integer page, Integer pageSize) {
        if(page == null || pageSize == null) { return new ApiResult(HttpCodeEnum.ARG_ERROR.getCode(),"参数异常"); }
        QueryWrapper<RaidersDetailsVO> queryWrapper = new QueryWrapper<>();
        if(param.getId() != null) { queryWrapper.eq("id", param.getId()); }
        if(StringUtils.isNotBlank(param.getTitle())) { queryWrapper.like("title", param.getTitle()); }
        if(param.getAuthorId() != null) { queryWrapper.eq("author_id", param.getAuthorId()); }
        if(StringUtils.isNotBlank(param.getAuthor())) { queryWrapper.eq("author", param.getAuthor()); }
        if(param.getSelectType() != null) {
            switch (param.getSelectType()){
                case 1:
                    queryWrapper.orderByDesc("create_time","start_count");
                    break;
                case 2:
                    queryWrapper.orderByDesc("start_count");
                    break;
                case 3:
                    queryWrapper.orderByDesc("create_time");
                    break;
                default:
            }
        }
        IPage<RaidersDetailsVO> raidersIPage = raidersMapper.selectRaidersDetails(new Page<>(page, pageSize), queryWrapper);
        return new ApiResult(HttpCodeEnum.SUCCESS.getCode(),"查询成功",raidersIPage);
    }
}
