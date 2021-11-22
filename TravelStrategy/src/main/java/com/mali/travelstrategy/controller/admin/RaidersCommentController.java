package com.mali.travelstrategy.controller.admin;


import com.mali.travelstrategy.entity.ApiResult;
import com.mali.travelstrategy.entity.RaidersComment;
import com.mali.travelstrategy.service.impl.RaidersCommentServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.websocket.server.PathParam;

/**
 * 攻略评论表 前端控制器
 * @author By-mali
 */
@RestController
@RequestMapping("/admin/raiders-comment")
public class RaidersCommentController {

    @Autowired
    private RaidersCommentServiceImpl raidersCommentService;

    @PostMapping("/add")
    public ApiResult add(RaidersComment raidersComment){
        return raidersCommentService.add(raidersComment);
    }

    @PostMapping("/del")
    public ApiResult delete(@PathParam("id") Integer id) {
        return raidersCommentService.delete(id);
    }

    @GetMapping("/find")
    public ApiResult findPagerByRaidersId(@PathParam("raidersId") Integer raidersId, @PathParam("page") Integer page, @PathParam("pageSize") Integer pageSize) {
        return raidersCommentService.findPagerByRaidersId(raidersId, page, pageSize);
    }
}

