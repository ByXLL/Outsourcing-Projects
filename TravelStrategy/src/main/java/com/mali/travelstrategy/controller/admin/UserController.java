package com.mali.travelstrategy.controller.admin;


import com.mali.travelstrategy.annotation.PassTokenRequired;
import com.mali.travelstrategy.dto.UserParam;
import com.mali.travelstrategy.dto.UserPasswordDto;
import com.mali.travelstrategy.entity.ApiResult;
import com.mali.travelstrategy.entity.User;
import com.mali.travelstrategy.service.impl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;
import java.util.Map;

/**
 * 用户表 前端控制器
 * @author By-mali
 */
@RestController
@RequestMapping("/admin/user")
public class UserController {
    @Autowired
    private UserServiceImpl userService;

    @PassTokenRequired
    @PostMapping("/login")
    public ApiResult login(@RequestBody Map<String,String> userForm) {
        return userService.login(userForm.get("userName"),userForm.get("password"));
    }

    @PassTokenRequired
    @PostMapping("/add")
    public ApiResult add(@RequestBody User user) {
        return userService.add(user);
    }

    @PostMapping("/del")
    public ApiResult add(@PathParam("id") Integer id) {
        return userService.delete(id);
    }

    @PostMapping("/update")
    public ApiResult update(@RequestBody User user) {
        return userService.update(user);
    }

    @PostMapping("/editPassword")
    public ApiResult editPassword(@RequestBody UserPasswordDto userPasswordDto) {
        return userService.changePassword(userPasswordDto);
    }

    @GetMapping("/find")
    public ApiResult findById(@PathParam("id") Integer id) {
        return userService.findById(id);
    }

    @PostMapping("/search")
    public ApiResult search(@RequestBody UserParam userParam, @PathParam("page") Integer page, @PathParam("pageSize") Integer pageSize) {
        return userService.findParamByPager(userParam,page,pageSize);
    }
}

