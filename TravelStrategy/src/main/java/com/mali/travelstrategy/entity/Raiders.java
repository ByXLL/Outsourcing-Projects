package com.mali.travelstrategy.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import java.sql.Timestamp;
import com.baomidou.mybatisplus.annotation.TableId;
import java.io.Serializable;
import java.util.Date;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

/**
 * 攻略表
 * @author By-mali
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@ApiModel(value="Raiders对象", description="攻略表")
public class Raiders implements Serializable {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty(value = "主键id")
    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;

    @ApiModelProperty(value = "攻略标题")
    private String title;

    @ApiModelProperty(value = "图片信息")
    private String pic;

    @ApiModelProperty(value = "封面图")
    private String coverPic;

    @ApiModelProperty(value = "正文信息")
    private String content;

    @ApiModelProperty(value = "作者id")
    private Integer authorId;

    @ApiModelProperty(value = "作者名字")
    private String author;

    @ApiModelProperty(value = "创建时间")
    private Date createTime;

}
