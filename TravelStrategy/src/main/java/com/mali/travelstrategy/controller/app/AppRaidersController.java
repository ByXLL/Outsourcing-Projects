package com.mali.travelstrategy.controller.app;


import com.mali.travelstrategy.annotation.PassTokenRequired;
import com.mali.travelstrategy.dto.RaidersParam;
import com.mali.travelstrategy.entity.ApiResult;
import com.mali.travelstrategy.entity.Raiders;
import com.mali.travelstrategy.service.impl.RaidersServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;

/**
 * 攻略表 前端控制器
 * @author By-mali
 */
@RestController
@RequestMapping("/app/raiders")
public class AppRaidersController {
    @Autowired
    private RaidersServiceImpl raidersService;

    @PostMapping("/add")
    public ApiResult add(@RequestBody Raiders raiders){
        return raidersService.add(raiders);
    }

    @PostMapping("/del")
    public ApiResult delete(@PathParam("id") Integer id) {
        return raidersService.delete(id);
    }

    @PostMapping("/update")
    public ApiResult update(@RequestBody Raiders raiders) {
        return raidersService.update(raiders);
    }

    @PassTokenRequired
    @GetMapping("/findById")
    public ApiResult findById(@PathParam("id") Integer id) {
        return raidersService.findById(id);
    }

    @PassTokenRequired
    @GetMapping("/findDetailById")
    public ApiResult findDetailById(@PathParam("id") Integer id, @PathParam("userId") Integer userId) {
        return raidersService.findDetailById(id,userId);
    }

    @PassTokenRequired
    @GetMapping("/findByUserId")
    public ApiResult findByUserId(@PathParam("userId") Integer userId) {
        return raidersService.findByUserId(userId);
    }

    @PassTokenRequired
    @PostMapping("/search")
    public ApiResult findByParam(@RequestBody RaidersParam param) {
        return raidersService.findByParam(param);
    }

    @PassTokenRequired
    @PostMapping("/searchByPager")
    public ApiResult findParamByPager(@RequestBody RaidersParam param, @PathParam("page") Integer page, @PathParam("pageSize") Integer pageSize) {
        return raidersService.findParamByPager(param, page, pageSize);
    }
}

