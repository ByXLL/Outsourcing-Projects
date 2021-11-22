package com.mali.travelstrategy.service.impl;

import com.mali.travelstrategy.entity.ApiResult;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

/**
 * @author By-mali
 */
@SpringBootTest
class UserAttentionServiceImplTest {
    @Autowired
    private UserAttentionServiceImpl userAttentionService;

    @Test
    void findByUserId() {
        ApiResult result = userAttentionService.findByUserId(2);
        System.out.println("11");
    }

}