/*
 Navicat Premium Data Transfer

 Source Server         : 本地主机
 Source Server Type    : MySQL
 Source Server Version : 50735
 Source Host           : localhost:3306
 Source Schema         : travel_strategy

 Target Server Type    : MySQL
 Target Server Version : 50735
 File Encoding         : 65001

 Date: 06/01/2022 11:26:05
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for attractions
-- ----------------------------
DROP TABLE IF EXISTS `attractions`;
CREATE TABLE `attractions`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '景点名称',
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '标题',
  `cover_pic` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '封面图',
  `pic` longtext CHARACTER SET utf8 COLLATE utf8_bin NULL COMMENT '图片信息',
  `content` longtext CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '正文信息',
  `fare` decimal(10, 0) NULL DEFAULT NULL COMMENT '票价',
  `city` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT '' COMMENT '城市',
  `star_rating` int(1) NULL DEFAULT 0 COMMENT '星级 0->无， 1->1星，2->2星，3->3星，4->4星，5->5星',
  `create_time` datetime(0) NOT NULL COMMENT '编辑时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8 COLLATE = utf8_bin COMMENT = '景点信息' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for raiders
-- ----------------------------
DROP TABLE IF EXISTS `raiders`;
CREATE TABLE `raiders`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '攻略标题',
  `pic` longtext CHARACTER SET utf8 COLLATE utf8_bin NULL COMMENT '图片信息',
  `cover_pic` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '封面图',
  `content` longtext CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '正文信息',
  `author_id` int(11) NOT NULL COMMENT '作者id',
  `author` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '作者名字',
  `create_time` datetime(0) NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8 COLLATE = utf8_bin COMMENT = '攻略表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for raiders_comment
-- ----------------------------
DROP TABLE IF EXISTS `raiders_comment`;
CREATE TABLE `raiders_comment`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `raiders_id` int(11) NOT NULL COMMENT '攻略id',
  `user_id` int(11) NOT NULL COMMENT '用户id',
  `content` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '评论内容',
  `create_time` datetime(0) NOT NULL COMMENT '评论时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 24 CHARACTER SET = utf8 COLLATE = utf8_bin COMMENT = '攻略评论表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for raiders_stat
-- ----------------------------
DROP TABLE IF EXISTS `raiders_stat`;
CREATE TABLE `raiders_stat`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `raiders_id` int(11) NOT NULL COMMENT '攻略id',
  `user_id` int(11) NOT NULL COMMENT '用户id',
  `create_time` datetime(0) NOT NULL COMMENT '点赞时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 26 CHARACTER SET = utf8 COLLATE = utf8_bin COMMENT = '攻略点赞表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `user_name` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '' COMMENT '用户名',
  `nick_name` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '昵称',
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '密码',
  `role` int(1) NOT NULL DEFAULT 2 COMMENT '用户角色 1-> 后台系统管理员，2-> 普通用户',
  `avatar` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '' COMMENT '头像地址',
  `age` int(11) NULL DEFAULT NULL COMMENT '年龄',
  `city` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT '' COMMENT '城市',
  `sex` int(1) NULL DEFAULT NULL COMMENT '性别 0->女，1->男',
  `introduction` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '简介',
  `status` int(1) NOT NULL DEFAULT 1 COMMENT '状态 0->禁用，1->正常',
  `create_time` datetime(0) NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_bin COMMENT = '用户表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for user_attention
-- ----------------------------
DROP TABLE IF EXISTS `user_attention`;
CREATE TABLE `user_attention`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `target_user_id` int(11) NOT NULL COMMENT '关注的目标的用户id',
  `user_id` int(11) NOT NULL COMMENT '用户id',
  `create_time` datetime(0) NOT NULL COMMENT '关注时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8 COLLATE = utf8_bin COMMENT = '用户关注表' ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
