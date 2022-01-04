package com.mali.travelstrategy.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.mali.travelstrategy.entity.ApiResult;
import com.mali.travelstrategy.entity.RaidersStat;
import com.mali.travelstrategy.entity.User;
import com.mali.travelstrategy.entity.UserAttention;
import com.mali.travelstrategy.enums.HttpCodeEnum;
import com.mali.travelstrategy.mapper.UserAttentionMapper;
import com.mali.travelstrategy.mapper.UserMapper;
import com.mali.travelstrategy.service.UserAttentionService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.mali.travelstrategy.util.CommUtils;
import com.mali.travelstrategy.util.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

/**
 * 用户关注表 服务实现类
 * @author By-mali
 */
@Service
public class UserAttentionServiceImpl extends ServiceImpl<UserAttentionMapper, UserAttention> implements UserAttentionService {
    @Autowired
    private UserMapper userMapper;

    @Autowired
    private UserAttentionMapper userAttentionMapper;

    /**
     * 编辑用户关注 添加关注/取消关注
     * @param userAttention 关注信息关联实体
     * @return 响应数据
     */
    @Override
    public ApiResult editUserAttention(UserAttention userAttention) {
        if(userAttention == null) { return new ApiResult(HttpCodeEnum.ARG_ERROR.getCode(),"参数异常"); }
        User targetUser = userMapper.selectById(userAttention.getTargetUserId());
        User sourceUser = userMapper.selectById(userAttention.getUserId());
        if(targetUser == null || sourceUser == null) { return new ApiResult(HttpCodeEnum.ARG_ERROR.getCode(),"操作失败");  }

        QueryWrapper<UserAttention> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("target_user_id",targetUser.getId());
        queryWrapper.eq("user_id",sourceUser.getId());
        UserAttention userAttention1 = userAttentionMapper.selectOne(queryWrapper);
        if(userAttention1 == null) {
            int i = userAttentionMapper.insert(userAttention);
            if(i>0) { return new ApiResult(HttpCodeEnum.SUCCESS.getCode(),"关注成功");}
            return new ApiResult(HttpCodeEnum.ARG_ERROR.getCode(),"操作失败");
        }else {
            int i = userAttentionMapper.deleteById(userAttention1.getId());
            if(i>0) { return new ApiResult(HttpCodeEnum.SUCCESS.getCode(),"取消关注成功");}
            return new ApiResult(HttpCodeEnum.ARG_ERROR.getCode(),"操作失败");
        }
    }



    /**
     * 查询用户关注的所有用户
     * @param userId 用户id
     * @return 响应数据
     */
    @Override
    public ApiResult findByUserId(Integer userId) {
        if(userId == null ){ return new ApiResult(HttpCodeEnum.ARG_ERROR.getCode(),"参数异常"); }
        List<Object> userList = userAttentionMapper.selectWatchingUsers(userId);
        return new ApiResult(HttpCodeEnum.SUCCESS.getCode(),"获取关注列表成功",userList);
    }

    /**
     * 是否关注
     * @param targetUserId 目标用户id
     * @param sourceUserId 源用户id
     * @return 响应数据
     */
    @Override
    public ApiResult isWatchUser(Integer targetUserId, Integer sourceUserId) {
        HashMap<String,Object> result = new HashMap<>(16);
        if(targetUserId == null || sourceUserId == null ){
            result.put("isWatching",false);
            return new ApiResult(HttpCodeEnum.ARG_ERROR.getCode(),"查询成功",result);
        }
        QueryWrapper<UserAttention> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("target_user_id",targetUserId).eq("user_id",sourceUserId);
        UserAttention userAttention = userAttentionMapper.selectOne(queryWrapper);
        if(userAttention == null) {
            result.put("isWatching",false);
        }else {
            result.put("isWatching",true);
            result.put("info",userAttention);
        }
        return new ApiResult(HttpCodeEnum.SUCCESS.getCode(),"查询成功",result);
    }
}
