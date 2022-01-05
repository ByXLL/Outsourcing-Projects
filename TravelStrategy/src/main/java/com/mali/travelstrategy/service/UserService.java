package com.mali.travelstrategy.service;

import com.mali.travelstrategy.dto.RaidersParam;
import com.mali.travelstrategy.dto.UserParam;
import com.mali.travelstrategy.dto.UserPasswordDto;
import com.mali.travelstrategy.entity.ApiResult;
import com.mali.travelstrategy.entity.User;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 * 用户表 服务类
 * @author By-mali
 */
public interface UserService extends IService<User> {
    /**
     * 登录
     * @param userName  用户名
     * @param password  密码
     * @return          响应数据
     */
    ApiResult login(String userName, String password);

    /**
     * 添加用户
     * @param user 用户实体
     * @return 响应数据
     */
    ApiResult add(User user);

    /**
     * 删除用户
     * @param id 用户id
     * @return 响应数据
     */
    ApiResult delete(Integer id);

    /**
     * 编辑用户
     * @param user 用户实体
     * @return 响应数据
     */
    ApiResult update(User user);

    /**
     * 修改密码
     * @param userPasswordDto       修改密码dto
     * @return                      响应数据
     */
    ApiResult changePassword(UserPasswordDto userPasswordDto);

    /**
     * 通过id 查询用户信息
     * @param id        用户id
     * @return          响应数据
     */
    ApiResult findById(Integer id);

    /**
     * 查询用户的点赞收藏等信息
     * @param id    用户id
     * @return      响应数据
     */
    ApiResult findUserStar(Integer id);

    /**
     * 条件分页查询
     * @param userParam     用户名
     * @param page          当前页码
     * @param pageSize      每页大小
     * @return              响应数据
     */
    ApiResult findParamByPager(UserParam userParam, Integer page, Integer pageSize);
}
