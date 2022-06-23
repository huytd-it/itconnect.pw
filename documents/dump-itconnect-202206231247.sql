-- MySQL dump 10.13  Distrib 5.5.62, for Win64 (AMD64)
--
-- Host: localhost    Database: itconnect
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.21-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `address_entity`
--

DROP TABLE IF EXISTS `address_entity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `address_entity` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `type` int(11) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deletedAt` datetime(6) DEFAULT NULL,
  `parentId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_bb6ca3fd9ceb44a47859a43869` (`name`,`type`),
  KEY `IDX_39d5f5d0d49f93a617b13b61fe` (`type`),
  KEY `FK_d96e5f9914d0f80c787b8da289b` (`parentId`),
  CONSTRAINT `FK_d96e5f9914d0f80c787b8da289b` FOREIGN KEY (`parentId`) REFERENCES `address_entity` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `address_entity`
--

LOCK TABLES `address_entity` WRITE;
/*!40000 ALTER TABLE `address_entity` DISABLE KEYS */;
INSERT INTO `address_entity` VALUES (1,'AAAA',1,'2022-06-20 17:08:48.594537','2022-06-20 17:08:48.594537',NULL,NULL),(2,'BBBB',1,'2022-06-20 17:08:48.599009','2022-06-20 17:08:48.599009',NULL,NULL),(3,'CCCC',1,'2022-06-20 17:08:48.600764','2022-06-20 17:08:48.600764',NULL,NULL),(4,'DDDD',1,'2022-06-20 17:08:48.604659','2022-06-20 17:08:48.604659',NULL,NULL),(5,'EEEE',1,'2022-06-20 17:08:48.607933','2022-06-20 17:08:48.607933',NULL,NULL),(6,'AAA',2,'2022-06-20 17:09:26.185255','2022-06-20 17:09:26.185255',NULL,1),(7,'BBB',2,'2022-06-20 17:09:26.189826','2022-06-20 17:09:26.189826',NULL,1),(8,'CCC',2,'2022-06-20 17:09:26.192389','2022-06-20 17:09:26.192389',NULL,1),(9,'AA',3,'2022-06-20 17:10:11.226474','2022-06-20 17:10:11.226474',NULL,6),(10,'BB',3,'2022-06-20 17:10:11.230966','2022-06-20 17:10:11.230966',NULL,6);
/*!40000 ALTER TABLE `address_entity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `certificate_entity`
--

DROP TABLE IF EXISTS `certificate_entity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `certificate_entity` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `isApprove` tinyint(4) NOT NULL DEFAULT 0,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deletedAt` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_ee4950f4e4c1764b45288bd631` (`name`),
  KEY `IDX_f181a76457aa6dd62fd6b99c72` (`isApprove`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `certificate_entity`
--

LOCK TABLES `certificate_entity` WRITE;
/*!40000 ALTER TABLE `certificate_entity` DISABLE KEYS */;
INSERT INTO `certificate_entity` VALUES (1,'English 2/6',1,'2022-06-23 12:35:21.287196','2022-06-23 12:35:23.652901',NULL),(2,'CCNA',0,'2022-06-23 12:36:35.860212','2022-06-23 12:36:35.860212',NULL);
/*!40000 ALTER TABLE `certificate_entity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company_info_entity`
--

DROP TABLE IF EXISTS `company_info_entity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `company_info_entity` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `addressStreet` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `companyName` varchar(255) NOT NULL,
  `dayEstablish` datetime NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deletedAt` datetime(6) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `addressProvinceId` int(11) DEFAULT NULL,
  `addressDistrictId` int(11) DEFAULT NULL,
  `addressVillageId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_bbd7576066b053fc16f76617e0` (`userId`),
  KEY `FK_5e416a6fdc03f66de9b51d6e96a` (`addressProvinceId`),
  KEY `FK_a30325f01e55247deb78498649a` (`addressDistrictId`),
  KEY `FK_e23e7775e939d1ae14b4e7ee473` (`addressVillageId`),
  CONSTRAINT `FK_5e416a6fdc03f66de9b51d6e96a` FOREIGN KEY (`addressProvinceId`) REFERENCES `address_entity` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_a30325f01e55247deb78498649a` FOREIGN KEY (`addressDistrictId`) REFERENCES `address_entity` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_bbd7576066b053fc16f76617e00` FOREIGN KEY (`userId`) REFERENCES `user_entity` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_e23e7775e939d1ae14b4e7ee473` FOREIGN KEY (`addressVillageId`) REFERENCES `address_entity` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company_info_entity`
--

LOCK TABLES `company_info_entity` WRITE;
/*!40000 ALTER TABLE `company_info_entity` DISABLE KEYS */;
/*!40000 ALTER TABLE `company_info_entity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company_tag_entity`
--

DROP TABLE IF EXISTS `company_tag_entity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `company_tag_entity` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `isApprove` tinyint(4) NOT NULL DEFAULT 0,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deletedAt` datetime(6) DEFAULT NULL,
  `companyInfoId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_3a8a95361d972896b371bf6ca6` (`name`),
  UNIQUE KEY `REL_0abbd4350f976aabf730c5ba4c` (`companyInfoId`),
  KEY `IDX_6b90e9608014c63667263159ca` (`isApprove`),
  CONSTRAINT `FK_0abbd4350f976aabf730c5ba4c7` FOREIGN KEY (`companyInfoId`) REFERENCES `company_info_entity` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company_tag_entity`
--

LOCK TABLES `company_tag_entity` WRITE;
/*!40000 ALTER TABLE `company_tag_entity` DISABLE KEYS */;
INSERT INTO `company_tag_entity` VALUES (1,'TNHH Khóc Một Dãi',0,'2022-06-23 12:33:02.412431','2022-06-23 12:33:02.412431',NULL,NULL);
/*!40000 ALTER TABLE `company_tag_entity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cv_activities_entity`
--

DROP TABLE IF EXISTS `cv_activities_entity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cv_activities_entity` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `startDate` datetime NOT NULL,
  `endDate` datetime NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deletedAt` datetime(6) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_87a1829647c584d7ac7a0e70296` (`userId`),
  CONSTRAINT `FK_87a1829647c584d7ac7a0e70296` FOREIGN KEY (`userId`) REFERENCES `user_entity` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cv_activities_entity`
--

LOCK TABLES `cv_activities_entity` WRITE;
/*!40000 ALTER TABLE `cv_activities_entity` DISABLE KEYS */;
/*!40000 ALTER TABLE `cv_activities_entity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cv_certificate_entity`
--

DROP TABLE IF EXISTS `cv_certificate_entity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cv_certificate_entity` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `year` int(11) NOT NULL,
  `content` text DEFAULT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deletedAt` datetime(6) DEFAULT NULL,
  `certificateId` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_17047910dd948275a7fbaec3ff` (`userId`,`certificateId`),
  KEY `FK_02fcbe5517ce42bbf470ab1d7ae` (`certificateId`),
  CONSTRAINT `FK_02fcbe5517ce42bbf470ab1d7ae` FOREIGN KEY (`certificateId`) REFERENCES `certificate_entity` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_7ace3a698f0341fa84d6558e828` FOREIGN KEY (`userId`) REFERENCES `user_entity` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cv_certificate_entity`
--

LOCK TABLES `cv_certificate_entity` WRITE;
/*!40000 ALTER TABLE `cv_certificate_entity` DISABLE KEYS */;
INSERT INTO `cv_certificate_entity` VALUES (1,2001,'<p><span style=\"color: rgb(0, 0, 0);\">Maecenas sagittis nisl eu dictum maximus. Morbi a purus lacinia, consequat ligula vel, dignissim ex. Integer eu mi in enim interdum hendrerit.</span></p>','2022-06-23 12:36:21.031307','2022-06-23 12:36:21.031307',NULL,1,1),(2,2018,'<p><span style=\"color: rgb(35, 38, 41);\">Right now, the input allows unlimited decimals. I would like to only allow 2 decimals on that input. It could be done with any of the following solutions</span></p>','2022-06-23 12:36:51.649990','2022-06-23 12:37:08.000000',NULL,2,1);
/*!40000 ALTER TABLE `cv_certificate_entity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cv_education_entity`
--

DROP TABLE IF EXISTS `cv_education_entity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cv_education_entity` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mark` float DEFAULT NULL,
  `content` text DEFAULT NULL,
  `startDate` datetime NOT NULL,
  `endDate` datetime DEFAULT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deletedAt` datetime(6) DEFAULT NULL,
  `rankedAcademicId` int(11) DEFAULT NULL,
  `schoolId` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_3152c2efd3647b7aa68f0743690` (`rankedAcademicId`),
  KEY `FK_3a4584dd964dbef7194e4b3734c` (`schoolId`),
  KEY `FK_52ab40f5accd7c3d6bc100389b7` (`userId`),
  CONSTRAINT `FK_3152c2efd3647b7aa68f0743690` FOREIGN KEY (`rankedAcademicId`) REFERENCES `ranked_academic_entity` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_3a4584dd964dbef7194e4b3734c` FOREIGN KEY (`schoolId`) REFERENCES `school_entity` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_52ab40f5accd7c3d6bc100389b7` FOREIGN KEY (`userId`) REFERENCES `user_entity` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cv_education_entity`
--

LOCK TABLES `cv_education_entity` WRITE;
/*!40000 ALTER TABLE `cv_education_entity` DISABLE KEYS */;
INSERT INTO `cv_education_entity` VALUES (1,7.5,'<p><span style=\"color: rgb(0, 0, 0);\">Maecenas sagittis nisl eu dictum maximus. Morbi a purus lacinia, consequat ligula vel, dignissim ex. Integer eu mi in enim interdum hendrerit.</span></p>','2012-07-23 12:44:38',NULL,'2022-06-23 12:44:55.648421','2022-06-23 12:44:55.648421',NULL,1,1,1);
/*!40000 ALTER TABLE `cv_education_entity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cv_honors_awards_entity`
--

DROP TABLE IF EXISTS `cv_honors_awards_entity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cv_honors_awards_entity` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` text NOT NULL,
  `date` datetime NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deletedAt` datetime(6) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_7652c87043fce32940a34c20153` (`userId`),
  CONSTRAINT `FK_7652c87043fce32940a34c20153` FOREIGN KEY (`userId`) REFERENCES `user_entity` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cv_honors_awards_entity`
--

LOCK TABLES `cv_honors_awards_entity` WRITE;
/*!40000 ALTER TABLE `cv_honors_awards_entity` DISABLE KEYS */;
/*!40000 ALTER TABLE `cv_honors_awards_entity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cv_work_experience_entity`
--

DROP TABLE IF EXISTS `cv_work_experience_entity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cv_work_experience_entity` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `startDate` datetime NOT NULL,
  `endDate` datetime DEFAULT NULL,
  `content` text DEFAULT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deletedAt` datetime(6) DEFAULT NULL,
  `companyTagId` int(11) DEFAULT NULL,
  `jobLevelId` int(11) DEFAULT NULL,
  `workFromId` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_5c10cf491690ed4d710718060b3` (`companyTagId`),
  KEY `FK_1b3900fd8753c2ca7f5daaf0afd` (`jobLevelId`),
  KEY `FK_6b0550abd4604060249ef3aca5b` (`workFromId`),
  KEY `FK_e79ee65cc62f38c795d889691d6` (`userId`),
  CONSTRAINT `FK_1b3900fd8753c2ca7f5daaf0afd` FOREIGN KEY (`jobLevelId`) REFERENCES `job_level_entity` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_5c10cf491690ed4d710718060b3` FOREIGN KEY (`companyTagId`) REFERENCES `company_tag_entity` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_6b0550abd4604060249ef3aca5b` FOREIGN KEY (`workFromId`) REFERENCES `work_from_entity` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_e79ee65cc62f38c795d889691d6` FOREIGN KEY (`userId`) REFERENCES `user_entity` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cv_work_experience_entity`
--

LOCK TABLES `cv_work_experience_entity` WRITE;
/*!40000 ALTER TABLE `cv_work_experience_entity` DISABLE KEYS */;
INSERT INTO `cv_work_experience_entity` VALUES (1,'2021-06-23 12:32:37',NULL,'<p><span style=\"color: rgb(0, 0, 0);\">Ut nec nibh porta, semper felis et, condimentum enim. Nunc commodo metus vel tristique facilisis. Vestibulum mattis ullamcorper tempor. Pellentesque dignissim quam at tristique sodales. Sed tristique tortor nisl. Etiam imperdiet iaculis augue, ut congue nisi sodales ut. Phasellus a velit porttitor, dapibus magna non, suscipit purus. Maecenas ultrices augue tristique, egestas est quis, blandit ante. Nam a varius orci. Quisque diam arcu, sodales sit amet semper sed, pulvinar nec dolor. In purus justo, bibendum bibendum neque ac, imperdiet tempor justo. Suspendisse fermentum enim ut nisl ultrices, non facilisis massa eleifend. Integer convallis ipsum ante, sed maximus sapien fermentum at. Mauris nec ipsum erat. Vestibulum ornare augue at leo mattis, non egestas sem interdum. Donec vel convallis nisl.</span></p>','2022-06-23 12:33:51.655424','2022-06-23 12:33:51.655424',NULL,1,1,2,1);
/*!40000 ALTER TABLE `cv_work_experience_entity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cv_work_experience_position_entity`
--

DROP TABLE IF EXISTS `cv_work_experience_position_entity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cv_work_experience_position_entity` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deletedAt` datetime(6) DEFAULT NULL,
  `cvWorkExperienceId` int(11) DEFAULT NULL,
  `positionId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_edea0cf6b6e524794e2324de90` (`cvWorkExperienceId`,`positionId`),
  KEY `FK_88e7580f6462c6b098083daeba1` (`positionId`),
  CONSTRAINT `FK_88e7580f6462c6b098083daeba1` FOREIGN KEY (`positionId`) REFERENCES `position_entity` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_d2bc7c7b359750c32dfed9bdc76` FOREIGN KEY (`cvWorkExperienceId`) REFERENCES `cv_work_experience_entity` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cv_work_experience_position_entity`
--

LOCK TABLES `cv_work_experience_position_entity` WRITE;
/*!40000 ALTER TABLE `cv_work_experience_position_entity` DISABLE KEYS */;
/*!40000 ALTER TABLE `cv_work_experience_position_entity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cv_work_experience_skill_entity`
--

DROP TABLE IF EXISTS `cv_work_experience_skill_entity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cv_work_experience_skill_entity` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deletedAt` datetime(6) DEFAULT NULL,
  `cvWorkExperienceId` int(11) DEFAULT NULL,
  `skillId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_8c99e8dfb3daee272748878669` (`cvWorkExperienceId`,`skillId`),
  KEY `FK_7847c58187237b0e4b346cd49ef` (`skillId`),
  CONSTRAINT `FK_7847c58187237b0e4b346cd49ef` FOREIGN KEY (`skillId`) REFERENCES `skill_entity` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_934c6ac69085740dd8f746d78e8` FOREIGN KEY (`cvWorkExperienceId`) REFERENCES `cv_work_experience_entity` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cv_work_experience_skill_entity`
--

LOCK TABLES `cv_work_experience_skill_entity` WRITE;
/*!40000 ALTER TABLE `cv_work_experience_skill_entity` DISABLE KEYS */;
INSERT INTO `cv_work_experience_skill_entity` VALUES (1,'2022-06-23 12:34:00.139147','2022-06-23 12:34:00.139147',NULL,1,3);
/*!40000 ALTER TABLE `cv_work_experience_skill_entity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_level_entity`
--

DROP TABLE IF EXISTS `job_level_entity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `job_level_entity` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deletedAt` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_bd3ae16a1281da016b39e86fef` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_level_entity`
--

LOCK TABLES `job_level_entity` WRITE;
/*!40000 ALTER TABLE `job_level_entity` DISABLE KEYS */;
INSERT INTO `job_level_entity` VALUES (1,'Fresher','2022-06-23 12:29:55.611560','2022-06-23 12:29:55.611560',NULL),(2,'Senior','2022-06-23 12:29:55.616564','2022-06-23 12:29:55.616564',NULL);
/*!40000 ALTER TABLE `job_level_entity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `migrations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `timestamp` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,1655962051416,'mg1655962051416');
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `position_entity`
--

DROP TABLE IF EXISTS `position_entity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `position_entity` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `isApprove` tinyint(4) NOT NULL DEFAULT 0,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deletedAt` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_5aa970b42f0a6ce72351658bd2` (`name`),
  KEY `IDX_098b1083dce9328b1fbc89fe66` (`isApprove`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `position_entity`
--

LOCK TABLES `position_entity` WRITE;
/*!40000 ALTER TABLE `position_entity` DISABLE KEYS */;
INSERT INTO `position_entity` VALUES (1,'Tester',0,'2022-06-23 12:32:13.491870','2022-06-23 12:32:13.491870',NULL),(2,'Backend',0,'2022-06-23 12:32:13.497102','2022-06-23 12:32:13.497102',NULL);
/*!40000 ALTER TABLE `position_entity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ranked_academic_entity`
--

DROP TABLE IF EXISTS `ranked_academic_entity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ranked_academic_entity` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deletedAt` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ranked_academic_entity`
--

LOCK TABLES `ranked_academic_entity` WRITE;
/*!40000 ALTER TABLE `ranked_academic_entity` DISABLE KEYS */;
INSERT INTO `ranked_academic_entity` VALUES (1,'Giỏi','2022-06-23 12:44:23.514523','2022-06-23 12:44:23.514523',NULL),(2,'Khá','2022-06-23 12:44:23.518119','2022-06-23 12:44:23.518119',NULL);
/*!40000 ALTER TABLE `ranked_academic_entity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `school_entity`
--

DROP TABLE IF EXISTS `school_entity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `school_entity` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `isApprove` tinyint(4) NOT NULL DEFAULT 0,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deletedAt` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_c153fa4cf5a2c086bc453a034b` (`name`),
  KEY `IDX_56e2fe4f2c246a857abb36b5a2` (`isApprove`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `school_entity`
--

LOCK TABLES `school_entity` WRITE;
/*!40000 ALTER TABLE `school_entity` DISABLE KEYS */;
INSERT INTO `school_entity` VALUES (1,'THPT Hiếu Phụng',1,'2022-06-23 12:37:59.461392','2022-06-23 12:37:59.461392',NULL),(2,'THCS Hiếu Phụng',0,'2022-06-23 12:37:59.471322','2022-06-23 12:37:59.471322',NULL),(3,'Test 123',0,'2022-06-23 12:40:53.574440','2022-06-23 12:40:53.574440',NULL);
/*!40000 ALTER TABLE `school_entity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `skill_entity`
--

DROP TABLE IF EXISTS `skill_entity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `skill_entity` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `isApprove` tinyint(4) NOT NULL DEFAULT 0,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deletedAt` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_f9600b0068f542043fc61430c8` (`name`),
  KEY `IDX_81c27997fd89b9513c7a147ebf` (`isApprove`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `skill_entity`
--

LOCK TABLES `skill_entity` WRITE;
/*!40000 ALTER TABLE `skill_entity` DISABLE KEYS */;
INSERT INTO `skill_entity` VALUES (1,'NestJS',1,'2022-06-23 12:30:51.744453','2022-06-23 12:35:35.554180',NULL),(2,'Angular',1,'2022-06-23 12:30:51.747259','2022-06-23 12:35:35.557469',NULL),(3,'Skill Owner',0,'2022-06-23 12:31:42.156654','2022-06-23 12:31:42.156654',NULL);
/*!40000 ALTER TABLE `skill_entity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_certificate_entity`
--

DROP TABLE IF EXISTS `user_certificate_entity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_certificate_entity` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `level` int(11) NOT NULL DEFAULT 1,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deletedAt` datetime(6) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `certificateId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_88a1485872bf594d91855aaf99` (`userId`,`certificateId`),
  KEY `FK_cbcff6bccb35fe0a22d56c88b5d` (`certificateId`),
  CONSTRAINT `FK_789640cfc0373a2d3442c1c5bbf` FOREIGN KEY (`userId`) REFERENCES `user_entity` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_cbcff6bccb35fe0a22d56c88b5d` FOREIGN KEY (`certificateId`) REFERENCES `certificate_entity` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_certificate_entity`
--

LOCK TABLES `user_certificate_entity` WRITE;
/*!40000 ALTER TABLE `user_certificate_entity` DISABLE KEYS */;
INSERT INTO `user_certificate_entity` VALUES (1,8,'2022-06-23 12:36:21.045820','2022-06-23 12:36:26.000000',NULL,1,1),(2,6,'2022-06-23 12:36:51.662155','2022-06-23 12:36:55.000000',NULL,1,2);
/*!40000 ALTER TABLE `user_certificate_entity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_entity`
--

DROP TABLE IF EXISTS `user_entity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_entity` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL DEFAULT 'begin',
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deletedAt` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_415c35b9b3b6fe45a3b065030f` (`email`),
  KEY `IDX_158f20832b16ead19dcd50c743` (`role`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_entity`
--

LOCK TABLES `user_entity` WRITE;
/*!40000 ALTER TABLE `user_entity` DISABLE KEYS */;
INSERT INTO `user_entity` VALUES (1,'huy@admin.com','$2b$12$WmSykDgF8ik4/PyKJHzEuOUBkeOnTJNyQxB/LXO3fqIuGU6lGPzoi','user','2022-06-23 12:28:53.028434','2022-06-23 12:30:14.000000',NULL);
/*!40000 ALTER TABLE `user_entity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_info_entity`
--

DROP TABLE IF EXISTS `user_info_entity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_info_entity` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `addressStreet` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `fullName` varchar(255) NOT NULL,
  `birthday` datetime NOT NULL,
  `computeYoe` int(11) DEFAULT NULL,
  `computeYoeDate` datetime DEFAULT NULL,
  `computeYoeCurrent` tinyint(4) DEFAULT NULL,
  `interest` text DEFAULT NULL,
  `objective` text DEFAULT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deletedAt` datetime(6) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `addressProvinceId` int(11) DEFAULT NULL,
  `addressDistrictId` int(11) DEFAULT NULL,
  `addressVillageId` int(11) DEFAULT NULL,
  `jobLevelId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_9c391e2018f807b6843cdee35c` (`userId`),
  KEY `FK_165d4ff9dcabc15def46ffa8c20` (`addressProvinceId`),
  KEY `FK_0d66f3e9f22d5e62be548a6f02b` (`addressDistrictId`),
  KEY `FK_1b8bcad73a6becddb565dc4efd7` (`addressVillageId`),
  KEY `FK_e7b0e7181fd855f9f1e812e592b` (`jobLevelId`),
  CONSTRAINT `FK_0d66f3e9f22d5e62be548a6f02b` FOREIGN KEY (`addressDistrictId`) REFERENCES `address_entity` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_165d4ff9dcabc15def46ffa8c20` FOREIGN KEY (`addressProvinceId`) REFERENCES `address_entity` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_1b8bcad73a6becddb565dc4efd7` FOREIGN KEY (`addressVillageId`) REFERENCES `address_entity` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_9c391e2018f807b6843cdee35ca` FOREIGN KEY (`userId`) REFERENCES `user_entity` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_e7b0e7181fd855f9f1e812e592b` FOREIGN KEY (`jobLevelId`) REFERENCES `job_level_entity` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_info_entity`
--

LOCK TABLES `user_info_entity` WRITE;
/*!40000 ALTER TABLE `user_info_entity` DISABLE KEYS */;
INSERT INTO `user_info_entity` VALUES (1,'1234','0857350574','Huy Nguyễn','2022-06-25 00:00:00',12,'2022-06-23 12:33:51',1,'<p><span style=\"color: rgb(0, 0, 0);\">Ut et eleifend enim. Curabitur ac blandit nulla. Etiam dapibus purus at risus tincidunt ullamcorper. Nulla imperdiet molestie nulla, eget placerat nunc posuere sed. Pellentesque vestibulum feugiat ultricies. Fusce pretium accumsan sem. Sed facilisis elit sit amet erat rhoncus, at pharetra augue rhoncus. Pellentesque id velit nibh. Donec tincidunt, diam in pellentesque dapibus, augue lorem gravida risus, eu scelerisque velit sem eu nibh. Aenean justo lectus, auctor nec malesuada a, accumsan eleifend est. Cras tincidunt, turpis ut pellentesque semper, elit lacus vehicula velit, id egestas urna est sit amet ipsum.</span></p>','<p><span style=\"color: rgb(0, 0, 0);\">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dignissim turpis velit, vel rutrum leo accumsan nec. Cras vel sollicitudin lectus, vitae auctor est. Suspendisse elementum erat augue, vitae faucibus ligula tincidunt eget. Ut et ligula lacus. Morbi nisl neque, placerat non dolor sed, tincidunt laoreet nisl. Phasellus eget massa urna. Morbi eu massa ut odio iaculis mattis non quis lacus. Mauris id nisi odio. Maecenas vel eros finibus, convallis dui sit amet, congue ipsum. Sed quis feugiat nisi, id lacinia mi. Vestibulum faucibus et mauris ac vestibulum. Nulla dapibus sodales hendrerit.</span></p>','2022-06-23 12:30:14.412742','2022-06-23 12:33:51.000000',NULL,1,1,6,9,1);
/*!40000 ALTER TABLE `user_info_entity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_position_entity`
--

DROP TABLE IF EXISTS `user_position_entity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_position_entity` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `level` int(11) NOT NULL DEFAULT 1,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deletedAt` datetime(6) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `positionId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_c8bac637b3db062b19fc103cf2` (`positionId`,`userId`),
  KEY `FK_4bb7b007ab6347dad742d533715` (`userId`),
  CONSTRAINT `FK_4bb7b007ab6347dad742d533715` FOREIGN KEY (`userId`) REFERENCES `user_entity` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_8f6fff6b2239738702560ddb52b` FOREIGN KEY (`positionId`) REFERENCES `position_entity` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_position_entity`
--

LOCK TABLES `user_position_entity` WRITE;
/*!40000 ALTER TABLE `user_position_entity` DISABLE KEYS */;
INSERT INTO `user_position_entity` VALUES (1,5,'2022-06-23 12:32:22.640614','2022-06-23 12:32:24.000000',NULL,1,2);
/*!40000 ALTER TABLE `user_position_entity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_school_entity`
--

DROP TABLE IF EXISTS `user_school_entity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_school_entity` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deletedAt` datetime(6) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `schoolId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_6b92f1f20f2469c59d3780fc06` (`schoolId`,`userId`),
  KEY `FK_1e728f6d21307865790753ee148` (`userId`),
  CONSTRAINT `FK_1925ddf100616fa4d0b3e62574b` FOREIGN KEY (`schoolId`) REFERENCES `school_entity` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_1e728f6d21307865790753ee148` FOREIGN KEY (`userId`) REFERENCES `user_entity` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_school_entity`
--

LOCK TABLES `user_school_entity` WRITE;
/*!40000 ALTER TABLE `user_school_entity` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_school_entity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_skill_entity`
--

DROP TABLE IF EXISTS `user_skill_entity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_skill_entity` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `level` int(11) NOT NULL DEFAULT 1,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deletedAt` datetime(6) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `skillId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_d569718f45522c277173602332` (`skillId`,`userId`),
  KEY `FK_401509d24b0d71b01a0a0b98756` (`userId`),
  CONSTRAINT `FK_10b2a273ef381e46ae6fc67aa46` FOREIGN KEY (`skillId`) REFERENCES `skill_entity` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_401509d24b0d71b01a0a0b98756` FOREIGN KEY (`userId`) REFERENCES `user_entity` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_skill_entity`
--

LOCK TABLES `user_skill_entity` WRITE;
/*!40000 ALTER TABLE `user_skill_entity` DISABLE KEYS */;
INSERT INTO `user_skill_entity` VALUES (1,6,'2022-06-23 12:31:01.305441','2022-06-23 12:31:08.000000',NULL,1,1),(2,7,'2022-06-23 12:31:25.464118','2022-06-23 12:31:27.000000',NULL,1,2),(3,10,'2022-06-23 12:31:42.185644','2022-06-23 12:31:44.000000',NULL,1,3);
/*!40000 ALTER TABLE `user_skill_entity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_tagged_certificate_entity`
--

DROP TABLE IF EXISTS `user_tagged_certificate_entity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_tagged_certificate_entity` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deletedAt` datetime(6) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `certificateId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_137366505dda765a2502e46f2f` (`userId`,`certificateId`),
  KEY `FK_c312553cc0e1a4328d69eb4d449` (`certificateId`),
  CONSTRAINT `FK_48c0503ac7bbf1d96d26fb9c356` FOREIGN KEY (`userId`) REFERENCES `user_entity` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_c312553cc0e1a4328d69eb4d449` FOREIGN KEY (`certificateId`) REFERENCES `certificate_entity` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_tagged_certificate_entity`
--

LOCK TABLES `user_tagged_certificate_entity` WRITE;
/*!40000 ALTER TABLE `user_tagged_certificate_entity` DISABLE KEYS */;
INSERT INTO `user_tagged_certificate_entity` VALUES (1,'2022-06-23 12:36:35.871248','2022-06-23 12:36:35.871248',NULL,1,2);
/*!40000 ALTER TABLE `user_tagged_certificate_entity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_tagged_company_tag_entity`
--

DROP TABLE IF EXISTS `user_tagged_company_tag_entity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_tagged_company_tag_entity` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deletedAt` datetime(6) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `companyTagId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_fdb82033eaa6d2f4cf7a44bbd3` (`companyTagId`,`userId`),
  KEY `FK_5cb06862a9b92d9f8639209d162` (`userId`),
  CONSTRAINT `FK_5cb06862a9b92d9f8639209d162` FOREIGN KEY (`userId`) REFERENCES `user_entity` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_d0f523287bb6a13d53905962391` FOREIGN KEY (`companyTagId`) REFERENCES `company_tag_entity` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_tagged_company_tag_entity`
--

LOCK TABLES `user_tagged_company_tag_entity` WRITE;
/*!40000 ALTER TABLE `user_tagged_company_tag_entity` DISABLE KEYS */;
INSERT INTO `user_tagged_company_tag_entity` VALUES (1,'2022-06-23 12:33:02.421131','2022-06-23 12:33:02.421131',NULL,1,1);
/*!40000 ALTER TABLE `user_tagged_company_tag_entity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_tagged_position_entity`
--

DROP TABLE IF EXISTS `user_tagged_position_entity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_tagged_position_entity` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deletedAt` datetime(6) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `positionId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_d8d247814af7dbb26a8ae81f54` (`positionId`,`userId`),
  KEY `FK_61b6e6c0ebe5a443ad738f394d5` (`userId`),
  CONSTRAINT `FK_61b6e6c0ebe5a443ad738f394d5` FOREIGN KEY (`userId`) REFERENCES `user_entity` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_cee737ea7a02788a001cdd9ebab` FOREIGN KEY (`positionId`) REFERENCES `position_entity` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_tagged_position_entity`
--

LOCK TABLES `user_tagged_position_entity` WRITE;
/*!40000 ALTER TABLE `user_tagged_position_entity` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_tagged_position_entity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_tagged_school_entity`
--

DROP TABLE IF EXISTS `user_tagged_school_entity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_tagged_school_entity` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deletedAt` datetime(6) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `schoolId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_9aac5475ecef981ded65e4f795` (`schoolId`,`userId`),
  KEY `FK_fe228a77fedbe9033278b705a18` (`userId`),
  CONSTRAINT `FK_ab153f36e61d7c0d0ccc945a0ea` FOREIGN KEY (`schoolId`) REFERENCES `school_entity` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_fe228a77fedbe9033278b705a18` FOREIGN KEY (`userId`) REFERENCES `user_entity` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_tagged_school_entity`
--

LOCK TABLES `user_tagged_school_entity` WRITE;
/*!40000 ALTER TABLE `user_tagged_school_entity` DISABLE KEYS */;
INSERT INTO `user_tagged_school_entity` VALUES (2,'2022-06-23 12:43:47.159876','2022-06-23 12:43:47.159876',NULL,1,3);
/*!40000 ALTER TABLE `user_tagged_school_entity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_tagged_skill_entity`
--

DROP TABLE IF EXISTS `user_tagged_skill_entity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_tagged_skill_entity` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deletedAt` datetime(6) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `skillId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_3f52e8df570dd7586c12a7dadd` (`skillId`,`userId`),
  KEY `FK_8b9dfbac4c8959963a7c966d9b8` (`userId`),
  CONSTRAINT `FK_24eca45ff584c922bdc0feef184` FOREIGN KEY (`skillId`) REFERENCES `skill_entity` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_8b9dfbac4c8959963a7c966d9b8` FOREIGN KEY (`userId`) REFERENCES `user_entity` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_tagged_skill_entity`
--

LOCK TABLES `user_tagged_skill_entity` WRITE;
/*!40000 ALTER TABLE `user_tagged_skill_entity` DISABLE KEYS */;
INSERT INTO `user_tagged_skill_entity` VALUES (1,'2022-06-23 12:31:42.165585','2022-06-23 12:31:42.165585',NULL,1,3);
/*!40000 ALTER TABLE `user_tagged_skill_entity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `work_from_entity`
--

DROP TABLE IF EXISTS `work_from_entity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `work_from_entity` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '0',
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deletedAt` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_b9ff15431d6b348f7b02f430d4` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `work_from_entity`
--

LOCK TABLES `work_from_entity` WRITE;
/*!40000 ALTER TABLE `work_from_entity` DISABLE KEYS */;
INSERT INTO `work_from_entity` VALUES (1,'Remote','2022-06-23 12:33:27.377312','2022-06-23 12:33:27.377312',NULL),(2,'On-site','2022-06-23 12:33:27.380173','2022-06-23 12:33:27.380173',NULL);
/*!40000 ALTER TABLE `work_from_entity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'itconnect'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-06-23 12:47:14
