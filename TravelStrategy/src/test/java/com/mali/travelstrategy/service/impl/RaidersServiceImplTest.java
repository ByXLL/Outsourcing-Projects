package com.mali.travelstrategy.service.impl;

import com.mali.travelstrategy.dto.RaidersParam;
import com.mali.travelstrategy.entity.ApiResult;
import com.mali.travelstrategy.entity.Raiders;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

/**
 * 攻略 service 测试类
 * @author By-mali
 */
@SpringBootTest
class RaidersServiceImplTest {
    @Autowired
    private RaidersServiceImpl raidersService;

    @Test
    void findByParam() {
        RaidersParam param = new RaidersParam();
//        raiders.setTitle(" ");

        ApiResult result = raidersService.findByParam(param);
        System.out.println();
    }

    @Test
    void findByPager() {
        ApiResult result = raidersService.findByPager(1,2);

    }

    @Test
    void findParamByPager() {
        RaidersParam raidersParam = new RaidersParam();
        raidersParam.setAuthor("张三");
        raidersParam.setSelectType(2);
        ApiResult result = raidersService.findParamByPager(raidersParam, 1, 10);

    }

    @Test
    void findUserStarRaiders() {
        ApiResult userStarRaiders = raidersService.findUserStarRaiders(2);
        System.out.println();
    }
}