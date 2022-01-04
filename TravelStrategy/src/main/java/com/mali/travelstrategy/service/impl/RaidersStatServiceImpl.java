package com.mali.travelstrategy.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.mali.travelstrategy.entity.ApiResult;
import com.mali.travelstrategy.entity.Attractions;
import com.mali.travelstrategy.entity.Raiders;
import com.mali.travelstrategy.entity.RaidersStat;
import com.mali.travelstrategy.enums.HttpCodeEnum;
import com.mali.travelstrategy.mapper.RaidersMapper;
import com.mali.travelstrategy.mapper.RaidersStatMapper;
import com.mali.travelstrategy.mapper.UserMapper;
import com.mali.travelstrategy.service.RaidersStatService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.mali.travelstrategy.vo.RaidersStatVo;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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
     * 编辑攻略点赞 点赞/取消点赞
     * @param raidersId 攻略id
     * @param userId    用户id
     * @return 响应数据
     */
    @Override
    public ApiResult editRaidersStat(Integer raidersId, Integer userId) {
        if(raidersId == null || userId == null ) { return new ApiResult(HttpCodeEnum.ARG_ERROR.getCode(),"参数异常"); }
        Raiders raiders = raidersMapper.selectById(raidersId);
        if(raiders == null) { return new ApiResult(HttpCodeEnum.ERROR.getCode(),"操作失败"); }
        QueryWrapper<RaidersStat> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("raiders_id",raidersId);
        queryWrapper.eq("user_id",userId);
        RaidersStat raidersStat = raidersStatMapper.selectOne(queryWrapper);
        if(raidersStat == null) {
            RaidersStat raidersStat1 = new RaidersStat();
            raidersStat1.setRaidersId(raidersId);
            raidersStat1.setUserId(userId);
            int i = raidersStatMapper.insert(raidersStat1);
            if(i>0) { return new ApiResult(HttpCodeEnum.SUCCESS.getCode(),"点赞成功");}
            return new ApiResult(HttpCodeEnum.ERROR.getCode(),"点赞失败");
        }else {
            int i = raidersStatMapper.deleteById(raidersStat.getId());
            if(i>0) { return new ApiResult(HttpCodeEnum.SUCCESS.getCode(),"取消点赞成功");}
            return new ApiResult(HttpCodeEnum.ERROR.getCode(),"取消点赞失败");
        }

    }

    /**
     * 获取点赞列表
     *
     * @param raidersId 攻略id
     * @return 响应数据
     */
    @Override
    public ApiResult getList(Integer raidersId) {
        if(raidersId == null ) { return new ApiResult(HttpCodeEnum.ARG_ERROR.getCode(),"参数异常"); }
        List<RaidersStatVo> statList = raidersMapper.findStatListByRaidersId(raidersId);
        return new ApiResult(HttpCodeEnum.SUCCESS.getCode(),"操作成功",statList);
    }

}
