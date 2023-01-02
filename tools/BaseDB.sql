/*
 Navicat Premium Data Transfer

 Source Server         : 192.168.1.210_3306
 Source Server Type    : MySQL
 Source Server Version : 80027
 Source Host           : 192.168.1.210:3306
 Source Schema         : PostEngine

 Target Server Type    : MySQL
 Target Server Version : 80027
 File Encoding         : 65001

 Date: 31/10/2021 20:09:27
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for PostTags
-- ----------------------------
DROP TABLE IF EXISTS `PostTags`;
CREATE TABLE `PostTags` (
  `PostID` int NOT NULL,
  `Tag` varchar(255) NOT NULL,
  UNIQUE KEY `PostID_2` (`PostID`,`Tag`),
  KEY `PostID` (`PostID`),
  KEY `Tag` (`Tag`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of PostTags
-- ----------------------------
BEGIN;
INSERT INTO `PostTags` VALUES (1, 'TEST');
COMMIT;

-- ----------------------------
-- Table structure for Posts
-- ----------------------------
DROP TABLE IF EXISTS `Posts`;
CREATE TABLE `Posts` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Title` varchar(512) DEFAULT NULL,
  `FeaturedImg` varchar(4069) DEFAULT NULL,
  `Content` text,
  `PostDate` datetime NOT NULL DEFAULT (now()),
  PRIMARY KEY (`ID`),
  KEY `PostDate` (`PostDate`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of Posts
-- ----------------------------
BEGIN;
INSERT INTO `Posts` VALUES (1, 'Test 1', NULL, 'Test 1 content', '2021-09-11 03:41:13');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
