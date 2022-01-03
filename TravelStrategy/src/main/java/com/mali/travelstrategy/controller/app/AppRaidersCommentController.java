package com.mali.travelstrategy.controller.app;


import com.mali.travelstrategy.annotation.PassTokenRequired;
import com.mali.travelstrategy.entity.ApiResult;
import com.mali.travelstrategy.entity.RaidersComment;
import com.mali.travelstrategy.service.impl.RaidersCommentServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;

/**
 * 攻略评论表 前端控制器
 * @author By-mali
 */
@RestController
@RequestMapping("/app/raiders-comment")
public class AppRaidersCommentController {
    @Autowired
    private RaidersCommentServiceImpl raidersCommentService;

    @PostMapping("/add")
    public ApiResult add(@RequestBody RaidersComment raidersComment){
        return raidersCommentService.add(raidersComment);
    }

    @PassTokenRequired
    @GetMapping("/find")
    public ApiResult findPagerByRaidersId(@PathParam("raidersId") Integer raidersId, @PathParam("page") Integer page, @PathParam("pageSize") Integer pageSize) {
        return raidersCommentService.findPagerByRaidersId(raidersId, page, pageSize);
    }
}

