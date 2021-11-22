package com.mali.travelstrategy.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.mali.travelstrategy.dto.UserPasswordDto;
import com.mali.travelstrategy.entity.ApiResult;
import com.mali.travelstrategy.entity.User;
import com.mali.travelstrategy.enums.HttpCodeEnum;
import com.mali.travelstrategy.mapper.UserMapper;
import com.mali.travelstrategy.service.UserService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.mali.travelstrategy.util.CommUtils;
import com.mali.travelstrategy.util.Constants;
import com.mali.travelstrategy.vo.UserVO;
import com.sun.corba.se.spi.ior.ObjectKey;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

/**
 * 用户表 服务实现类
 * @author By-mali
 */
@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {
    @Autowired
    private UserMapper userMapper;

    /**
     * 登录
     * @param userName  用户名
     * @param password  密码
     * @return          响应数据
     */
    @Override
    public ApiResult login(String userName, String password) {
        if(StringUtils.isEmpty(userName) || StringUtils.isEmpty(password)) { return new ApiResult(HttpCodeEnum.ARG_ERROR.getCode(),"参数异常"); }
        User user = userMapper.selectOne(new QueryWrapper<User>().eq("user_name",userName));
        if(user == null) {  return new ApiResult(HttpCodeEnum.ARG_ERROR.getCode(),"操作失败,用户不存在");}
        boolean isSamePassword = user.getPassword().equals(CommUtils.getMd5(password));
        if(isSamePassword) {
            String token = CommUtils.getToken(user);
            UserVO userVO = new UserVO();
            BeanUtils.copyProperties(user,userVO);
            HashMap<String,Object> userInfo = new HashMap<>(16);
            userInfo.put("token",token);
            userInfo.put("userInfo",userVO);
            return new ApiResult(HttpCodeEnum.SUCCESS.getCode(),"登录成功",userInfo);
        }
        return new ApiResult(HttpCodeEnum.ERROR.getCode(),"登录出错，请检查用户名和密码");
    }

    /**
     * 添加用户
     * @param user 用户实体
     * @return 响应数据
     */
    @Override
    public ApiResult add(User user) {
        if(user == null) { return new ApiResult(HttpCodeEnum.ARG_ERROR.getCode(),"参数异常"); }
        if(StringUtils.isEmpty(user.getAvatar())) { user.setAvatar(Constants.BASE_AVATAR); }
        user.setPassword(CommUtils.getMd5(user.getPassword()));
        user.setRole(2);
        user.setStatus(1);
        int i = userMapper.insert(user);
        if(i>0) { return new ApiResult(HttpCodeEnum.SUCCESS.getCode(),"添加用户成功");}
        return new ApiResult(HttpCodeEnum.ERROR.getCode(),"操作失败");
    }

    /**
     * 删除用户
     * @param id 用户id
     * @return 响应数据
     */
    @Override
    public ApiResult delete(Integer id) {
        if(id == null) { return new ApiResult(HttpCodeEnum.ARG_ERROR.getCode(),"参数异常"); }
        User user = userMapper.selectById(id);
        if(user == null) {  return new ApiResult(HttpCodeEnum.ERROR.getCode(),"操作失败,用户不存在");}
        int i = userMapper.deleteById(id);
        if(i>0) { return new ApiResult(HttpCodeEnum.SUCCESS.getCode(),"删除用户成功");}
        return new ApiResult(HttpCodeEnum.ERROR.getCode(),"操作失败");
    }

    /**
     * 编辑用户
     *
     * @param user 用户实体
     * @return 响应数据
     */
    @Override
    public ApiResult update(User user) {
        if(user == null) { return new ApiResult(HttpCodeEnum.ARG_ERROR.getCode(),"参数异常"); }
        User oldUser = userMapper.selectById(user.getId());
        if(oldUser == null) {  return new ApiResult(HttpCodeEnum.ARG_ERROR.getCode(),"操作失败,用户不存在");}
        BeanUtils.copyProperties(user,oldUser);
        int i = userMapper.updateById(oldUser);
        if(i>0) { return new ApiResult(HttpCodeEnum.SUCCESS.getCode(),"修改用户信息成功");}
        return new ApiResult(HttpCodeEnum.ERROR.getCode(), "操作失败");
    }

    /**
     * 修改密码
     *
     * @param userPasswordDto 修改密码dto
     * @return 响应数据
     */
    @Override
    public ApiResult changePassword(UserPasswordDto userPasswordDto) {
        if(
            userPasswordDto == null ||
            StringUtils.isEmpty(userPasswordDto.getOldPassword()) ||
            StringUtils.isEmpty(userPasswordDto.getNewPassword())
        ) { return new ApiResult(HttpCodeEnum.ARG_ERROR.getCode(),"参数异常"); }
        User oldUser = userMapper.selectById(userPasswordDto.getId());
        if(oldUser == null) {  return new ApiResult(HttpCodeEnum.ERROR.getCode(),"操作失败,用户不存在");}
        String oldPassword = CommUtils.getMd5(userPasswordDto.getOldPassword());
        if(oldUser.getPassword().equals(oldPassword)) {
            oldUser.setPassword(CommUtils.getMd5(userPasswordDto.getNewPassword()));
            int i = userMapper.updateById(oldUser);
            if(i>0) { return new ApiResult(HttpCodeEnum.SUCCESS.getCode(),"修改密码成功");}
        }
        return new ApiResult(HttpCodeEnum.ERROR.getCode(),"操作失败,旧密码输入错误");
    }

    /**
     * 通过id 查询用户信息
     * @param id 用户id
     * @return 响应数据
     */
    @Override
    public ApiResult findById(Integer id) {
        if(id == null) { return new ApiResult(HttpCodeEnum.ARG_ERROR.getCode(),"参数异常"); }
        User user = userMapper.selectById(id);
        if(user == null) {  return new ApiResult(HttpCodeEnum.ERROR.getCode(),"操作失败,用户不存在");}
        user.setPassword("");
        return new ApiResult(HttpCodeEnum.SUCCESS.getCode(),"查询成功",user);
    }
}
