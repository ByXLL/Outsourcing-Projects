package com.mali.travelstrategy.service;

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
     * 通过id 查询用户信息
     * @param id        用户id
     * @return          响应数据
     */
    ApiResult findById(Integer id);
}
