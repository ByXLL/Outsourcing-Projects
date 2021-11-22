package com.mali.travelstrategy.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.mali.travelstrategy.entity.ApiResult;
import com.mali.travelstrategy.entity.RaidersComment;
import com.mali.travelstrategy.enums.HttpCodeEnum;
import com.mali.travelstrategy.mapper.RaidersCommentMapper;
import com.mali.travelstrategy.service.RaidersCommentService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.mali.travelstrategy.vo.RaidersCommentVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 攻略评论表 服务实现类
 * @author By-mali
 */
@Service
public class RaidersCommentServiceImpl extends ServiceImpl<RaidersCommentMapper, RaidersComment> implements RaidersCommentService {

    @Autowired
    private RaidersCommentMapper raidersCommentMapper;
    /**
     * 添加评论
     * @param raidersComment 评论实体
     * @return 响应数据
     */
    @Override
    public ApiResult add(RaidersComment raidersComment) {
        if(raidersComment == null) { return new ApiResult(HttpCodeEnum.ARG_ERROR.getCode(), "参数异常"); }
        int i = raidersCommentMapper.insert(raidersComment);
        if(i>0) { return new ApiResult(HttpCodeEnum.SUCCESS.getCode(), "评论成功"); }
        return new ApiResult(HttpCodeEnum.ERROR.getCode(), "操作失败");
    }

    /**
     * 删除评论
     * @param id 评论id
     * @return 响应数据
     */
    @Override
    public ApiResult delete(Integer id) {
        if(id == null) { return new ApiResult(HttpCodeEnum.ARG_ERROR.getCode(), "参数异常"); }
        int i = raidersCommentMapper.deleteById(id);
        if(i>0) { return new ApiResult(HttpCodeEnum.SUCCESS.getCode(), "操作成功"); }
        return new ApiResult(HttpCodeEnum.ERROR.getCode(), "操作失败");
    }

    /**
     * 通过攻略id 分页查询评论
     * @param raidersId 攻略id
     * @param page      当前页码
     * @param pageSize  每页大小
     * @return 响应数据
     */
    @Override
    public ApiResult findPagerByRaidersId(Integer raidersId, Integer page, Integer pageSize) {
        if(raidersId == null || page == null || pageSize == null) { return new ApiResult(HttpCodeEnum.ARG_ERROR.getCode(), "参数异常"); }
        QueryWrapper<RaidersCommentVO> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("raiders_id",raidersId);
        queryWrapper.orderByDesc("create_time");
        IPage<RaidersCommentVO> commentDetails = raidersCommentMapper.selectRaidersCommentDetails(new Page<>(page, pageSize), queryWrapper);
        return new ApiResult(HttpCodeEnum.SUCCESS.getCode(), "操作成功", commentDetails);
    }
}
