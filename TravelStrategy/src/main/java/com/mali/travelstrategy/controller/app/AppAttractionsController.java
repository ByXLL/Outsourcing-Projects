package com.mali.travelstrategy.controller.app;


import com.mali.travelstrategy.annotation.PassTokenRequired;
import com.mali.travelstrategy.dto.AttractionsParam;
import com.mali.travelstrategy.entity.ApiResult;
import com.mali.travelstrategy.entity.Attractions;
import com.mali.travelstrategy.service.impl.AttractionsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;

/**
 * 景点信息 前端控制器
 * @author By-mali
 */
@RestController
@RequestMapping("/app/attractions")
public class AppAttractionsController {
    @Autowired
    private AttractionsServiceImpl attractionsService;

    @PassTokenRequired
    @GetMapping("/findById")
    public ApiResult findById(@PathParam("id") Integer id) {
        return attractionsService.findById(id);
    }

    @PassTokenRequired
    @PostMapping("/findPagerByParam")
    public ApiResult findPagerByParam(@RequestBody AttractionsParam attractionsParam, @PathParam("page") Integer page, @PathParam("pageSize") Integer pageSize) {
        return attractionsService.findPagerByParam(attractionsParam, page, pageSize);
    }
}

