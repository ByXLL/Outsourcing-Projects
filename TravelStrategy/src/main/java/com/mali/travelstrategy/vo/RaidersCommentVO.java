package com.mali.travelstrategy.vo;

import com.mali.travelstrategy.entity.RaidersComment;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * 攻略评论vo 实体
 * @author By-mali
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class RaidersCommentVO extends RaidersComment {
    @ApiModelProperty(value = "评论人昵称")
    private String nickName;

    @ApiModelProperty(value = "评论人头像")
    private String avatar;

}
