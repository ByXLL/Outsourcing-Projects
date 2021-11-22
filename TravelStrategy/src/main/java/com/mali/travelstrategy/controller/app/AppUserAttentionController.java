package com.mali.travelstrategy.controller.app;


import com.mali.travelstrategy.annotation.PassTokenRequired;
import com.mali.travelstrategy.entity.ApiResult;
import com.mali.travelstrategy.entity.UserAttention;
import com.mali.travelstrategy.service.impl.UserAttentionServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import javax.websocket.server.PathParam;

/**
 * 用户关注表 前端控制器
 * @author By-mali
 */
@RestController
@RequestMapping("/app/user-attention")
public class AppUserAttentionController {
    @Autowired
    private UserAttentionServiceImpl userAttentionService;

    @PostMapping("/add")
    public ApiResult add(UserAttention userAttention) {
        return userAttentionService.add(userAttention);
    }

    @PostMapping("/del")
    public ApiResult delete(@PathParam("id") Integer id) {
        return userAttentionService.delete(id);
    }

    @GetMapping("/findByUserId")
    public ApiResult findByUserId(@PathParam("userId") Integer userId) {
        return userAttentionService.findByUserId(userId);
    }

    @GetMapping("/isWatchUser")
    public ApiResult isWatchUser(@PathParam("targetUserId") Integer targetUserId, @PathParam("sourceUserId") Integer sourceUserId) {
        return userAttentionService.isWatchUser(targetUserId, sourceUserId);
    }
}

