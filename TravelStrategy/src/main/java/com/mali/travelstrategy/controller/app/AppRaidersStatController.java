package com.mali.travelstrategy.controller.app;


import com.mali.travelstrategy.annotation.PassTokenRequired;
import com.mali.travelstrategy.entity.ApiResult;
import com.mali.travelstrategy.service.impl.RaidersStatServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import javax.websocket.server.PathParam;

/**
 * 攻略点赞表 前端控制器
 * @author By-mali
 */
@RestController
@RequestMapping("/app/raiders-start")
public class AppRaidersStatController {
    @Autowired
    private RaidersStatServiceImpl raidersStatService;

    @PostMapping("/editRaidersStat")
    public ApiResult add(@PathParam("raidersId") Integer raidersId, @PathParam("userId") Integer userId) {
        return raidersStatService.editRaidersStat(raidersId, userId);
    }

    @PassTokenRequired
    @GetMapping("/getList")
    public ApiResult getList(@PathParam("raidersId") Integer raidersId) {
        return raidersStatService.getList(raidersId);
    }
}

