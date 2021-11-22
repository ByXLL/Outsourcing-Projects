package com.mali.travelstrategy.service.impl;

import com.mali.travelstrategy.entity.ApiResult;
import com.mali.travelstrategy.entity.Raiders;
import com.mali.travelstrategy.entity.RaidersStat;
import com.mali.travelstrategy.enums.HttpCodeEnum;
import com.mali.travelstrategy.mapper.RaidersMapper;
import com.mali.travelstrategy.mapper.RaidersStatMapper;
import com.mali.travelstrategy.mapper.UserMapper;
import com.mali.travelstrategy.service.RaidersStatService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * 攻略点赞表 服务实现类
 * @author By-mali
 */
@Service
public class RaidersStatServiceImpl extends ServiceImpl<RaidersStatMapper, RaidersStat> implements RaidersStatService {
    @Autowired
    private RaidersStatMapper raidersStatMapper;

    @Autowired
    private RaidersMapper raidersMapper;

    @Autowired
    private UserMapper userMapper;

    /**
     * 添加点赞
     * @param raidersId 攻略id
     * @param userId    用户id
     * @return 响应数据
     */
    @Override
    public ApiResult add(Integer raidersId, Integer userId) {
        if(raidersId == null || userId == null ) { return new ApiResult(HttpCodeEnum.ARG_ERROR.getCode(),"参数异常"); }
        Raiders raiders = raidersMapper.selectById(raidersId);
        if(raiders == null) { return new ApiResult(HttpCodeEnum.ERROR.getCode(),"点赞失败"); }
        RaidersStat raidersStat = new RaidersStat();
        raidersStat.setRaidersId(raidersId);
        raidersStat.setUserId(userId);
        int i = raidersStatMapper.insert(raidersStat);
        if(i>0) { return new ApiResult(HttpCodeEnum.SUCCESS.getCode(),"点赞成功");}
        return new ApiResult(HttpCodeEnum.ERROR.getCode(),"点赞失败");
    }

    /**
     * 取消点赞
     * @param raidersId 攻略id
     * @param userId    用户id
     * @return 响应数据
     */
    @Override
    public ApiResult delete(Integer raidersId, Integer userId) {
        if(raidersId == null || userId == null ) { return new ApiResult(HttpCodeEnum.ARG_ERROR.getCode(),"参数异常"); }
        Raiders raiders = raidersMapper.selectById(raidersId);
        if(raiders == null) { return new ApiResult(HttpCodeEnum.ERROR.getCode(),"操作失败"); }
        int i = raidersStatMapper.deleteById(raidersId);
        if(i>0) { return new ApiResult(HttpCodeEnum.SUCCESS.getCode(),"操作成功");}
        return new ApiResult(HttpCodeEnum.ERROR.getCode(),"操作失败");
    }

}
