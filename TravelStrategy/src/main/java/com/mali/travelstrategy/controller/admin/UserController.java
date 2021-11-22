package com.mali.travelstrategy.controller.admin;


import com.mali.travelstrategy.annotation.PassTokenRequired;
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
    public ApiResult login(@RequestBody Map<String,String> userMap) {
        return userService.login(userMap.get("userName"),userMap.get("password"));
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

    @PostMapping("/find")
    public ApiResult findById(@PathParam("id") Integer id) {
        return userService.findById(id);
    }
}

