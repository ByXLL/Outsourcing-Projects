package com.mali.travelstrategy.controller.admin;


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
@RequestMapping("/admin/attractions")
public class AttractionsController {
    @Autowired
    private AttractionsServiceImpl attractionsService;

    @PostMapping("/add")
    public ApiResult add(@RequestBody Attractions attractions) {
        return attractionsService.add(attractions);
    }

    @PostMapping("/del")
    public ApiResult delete(@PathParam("id") Integer id) {
        return attractionsService.delete(id);
    }

    @PostMapping("/edit")
    public ApiResult update(@RequestBody Attractions attractions) {
        return attractionsService.update(attractions);
    }

    @GetMapping("/findById")
    public ApiResult findById(@PathParam("id") Integer id) {
        return attractionsService.findById(id);
    }

    @PostMapping("/findPagerByParam")
    public ApiResult findPagerByParam(@RequestBody AttractionsParam attractionsParam, @PathParam("page") Integer page, @PathParam("pageSize") Integer pageSize) {
        return attractionsService.findPagerByParam(attractionsParam, page, pageSize);
    }
}

