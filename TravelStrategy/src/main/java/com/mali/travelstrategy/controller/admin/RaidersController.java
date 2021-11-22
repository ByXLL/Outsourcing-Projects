package com.mali.travelstrategy.controller.admin;


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
@RequestMapping("/admin/raiders")
public class RaidersController {
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

    @GetMapping("/findById")
    public ApiResult findById(@PathParam("id") Integer id) {
        return raidersService.findById(id);
    }

    @GetMapping("/findByUserId")
    public ApiResult findByUserId(@PathParam("userId") Integer userId) {
        return raidersService.findByUserId(userId);
    }

    @PostMapping("/search")
    public ApiResult findByParam(@RequestBody RaidersParam param) {
        return raidersService.findByParam(param);
    }

    @PostMapping("/searchByPager")
    public ApiResult findParamByPager(@RequestBody RaidersParam param, @PathParam("page") Integer page, @PathParam("pageSize") Integer pageSize) {
        return raidersService.findParamByPager(param, page, pageSize);
    }

}

