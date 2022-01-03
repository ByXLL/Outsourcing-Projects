package com.mali.travelstrategy.service.impl;

import com.mali.travelstrategy.entity.ApiResult;
import com.mali.travelstrategy.entity.RaidersComment;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

/**
 * @author By-mali
 */
@SpringBootTest
class RaidersCommentServiceImplTest {
    @Autowired
    private RaidersCommentServiceImpl raidersCommentService;

    @Test
    void add() {
        for (int i = 0; i < 10; i++) {
            RaidersComment raidersComment = new RaidersComment();
            raidersComment.setRaidersId(1);
            raidersComment.setUserId(3);
            raidersComment.setContent(i+"-66666666");
            raidersCommentService.add(raidersComment);
        }
    }
    @Test
    void findByPager() {
        ApiResult pager = raidersCommentService.findByPager(1, 10);
        System.out.println();
    }

    @Test
    void findPagerByRaidersId() {
        ApiResult result = raidersCommentService.findPagerByRaidersId(1, 1, 10);
        System.out.println();
    }
}