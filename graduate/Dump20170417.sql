-- MySQL dump 10.13  Distrib 5.7.12, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: paike
-- ------------------------------------------------------
-- Server version	5.7.17-log

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
-- Table structure for table `class`
--

DROP TABLE IF EXISTS `class`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `class` (
  `classId` int(11) NOT NULL AUTO_INCREMENT,
  `className` varchar(45) NOT NULL,
  `stucount` int(11) DEFAULT NULL,
  `timeused` varchar(45) NOT NULL,
  PRIMARY KEY (`classId`),
  UNIQUE KEY `id_UNIQUE` (`classId`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `class`
--

LOCK TABLES `class` WRITE;
/*!40000 ALTER TABLE `class` DISABLE KEYS */;
INSERT INTO `class` VALUES (1,'zc',500,' 20,4,18,15,17,12,14,19,10,'),(2,'zhouchao',15,' 19,22,10,13,23,16,'),(6,'14.01',120,' 6,22,'),(7,'14.03',196,' 12,16,9,17,11,4,15,24,'),(8,'班级5',10,' 15,20,22,11,'),(9,'班级6',999,' 13,14,21,23,8,9,'),(12,'11.36',20,' 25,7,24,');
/*!40000 ALTER TABLE `class` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `classroom`
--

DROP TABLE IF EXISTS `classroom`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `classroom` (
  `classroomId` int(11) NOT NULL AUTO_INCREMENT,
  `classroomName` varchar(45) NOT NULL,
  `capacity` int(11) NOT NULL,
  `timeUsed` varchar(45) NOT NULL,
  `type` varchar(45) NOT NULL,
  PRIMARY KEY (`classroomId`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classroom`
--

LOCK TABLES `classroom` WRITE;
/*!40000 ALTER TABLE `classroom` DISABLE KEYS */;
INSERT INTO `classroom` VALUES (1,'room6',78,' 12,16,20,19,22,10,25,7,14,21,15,13,23,24,8,','common'),(2,'zizizi',120,' 22,18,9,13,17,15,11,4,23,24,12,19,10,','common'),(7,'room3',80,' 4,6,17,20,22,9,11,16,15,14,','common');
/*!40000 ALTER TABLE `classroom` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course`
--

DROP TABLE IF EXISTS `course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `course` (
  `courseId` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `courseName` varchar(45) NOT NULL,
  `type` varchar(45) NOT NULL,
  `timeperweek` varchar(45) NOT NULL,
  `classId` int(11) NOT NULL,
  `roomrequest` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`courseId`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course`
--

LOCK TABLES `course` WRITE;
/*!40000 ALTER TABLE `course` DISABLE KEYS */;
INSERT INTO `course` VALUES (1,'1590','数学','4',7,'common'),(2,'123','英语','4',1,'common'),(3,'周超111','语文','4',6,'common'),(4,'课程4','体育','4',2,'common'),(7,'课程5','数学','2',1,'common'),(8,'kec6','英语','2',2,'common'),(9,'rtyutyu','语文','2',7,'common'),(10,'lkajsjd','体育','2',9,'common'),(11,'拉开京东方','语文','2',12,'common'),(12,'ddd','数学','2',12,'common'),(13,'lkjlk','英语','4',9,'common'),(14,'课程5','英语','2',1,'common'),(15,'kec6','数学','2',2,'common'),(16,'rtyutyu','英语','2',7,'common'),(17,'lkajsjd','数学','2',9,'common'),(18,'拉开京东方','英语','2',12,'common'),(19,'ddd','体育','2',1,'common'),(24,'678','数学','4',8,'common'),(25,'sdf','语文','4',8,'common'),(26,'dfsf','英语','4',9,'common'),(27,'阿斯蒂芬','体育','4',7,'common'),(28,'东方闪电','语文','4',2,'common'),(29,'云音乐','体育','4',7,'common'),(30,'45','科学','2',1,'common'),(31,'搜索','物理','2',1,'common'),(32,'对的','化学','2',1,'common'),(33,'55','生物','2',1,'common');
/*!40000 ALTER TABLE `course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `schedule`
--

DROP TABLE IF EXISTS `schedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `schedule` (
  `scheduleId` int(11) NOT NULL AUTO_INCREMENT,
  `courseId` int(11) NOT NULL,
  `teacherId` int(11) DEFAULT NULL,
  `classId` int(11) DEFAULT NULL,
  `classroomId` int(11) DEFAULT NULL,
  `time` int(11) DEFAULT NULL,
  PRIMARY KEY (`scheduleId`),
  UNIQUE KEY `scheduleId_UNIQUE` (`scheduleId`)
) ENGINE=InnoDB AUTO_INCREMENT=676 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schedule`
--

LOCK TABLES `schedule` WRITE;
/*!40000 ALTER TABLE `schedule` DISABLE KEYS */;
INSERT INTO `schedule` VALUES (638,1,4,7,1,12),(639,1,4,7,1,16),(640,2,7,1,1,20),(641,2,7,1,7,4),(642,3,11,6,7,6),(643,3,11,6,2,22),(644,4,8,2,1,19),(645,4,8,2,1,22),(646,7,4,1,2,18),(647,8,7,2,1,10),(648,9,6,7,2,9),(649,10,8,9,2,13),(650,11,12,12,1,25),(651,12,4,12,1,7),(652,13,9,9,1,14),(653,13,9,9,1,21),(654,14,9,1,1,15),(655,15,4,2,1,13),(656,16,9,7,7,17),(657,17,4,9,1,23),(658,18,7,12,1,24),(659,19,8,1,2,17),(660,24,4,8,2,15),(661,24,4,8,7,20),(662,25,10,8,7,22),(663,25,11,8,2,11),(664,26,9,9,1,8),(665,26,9,9,7,9),(666,27,8,7,7,11),(667,27,8,7,2,4),(668,28,12,2,2,23),(669,28,12,2,7,16),(670,29,8,7,7,15),(671,29,8,7,2,24),(672,30,16,1,2,12),(673,31,13,1,7,14),(674,32,14,1,2,19),(675,33,15,1,2,10);
/*!40000 ALTER TABLE `schedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teacher`
--

DROP TABLE IF EXISTS `teacher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `teacher` (
  `teacherId` int(11) NOT NULL AUTO_INCREMENT,
  `teacherName` varchar(45) NOT NULL,
  `priority` int(11) NOT NULL,
  `prefertime` varchar(45) NOT NULL,
  `type` varchar(45) NOT NULL,
  `timeused` varchar(45) NOT NULL,
  PRIMARY KEY (`teacherId`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teacher`
--

LOCK TABLES `teacher` WRITE;
/*!40000 ALTER TABLE `teacher` DISABLE KEYS */;
INSERT INTO `teacher` VALUES (4,'云音乐',90,'89','数学',' 12,16,18,7,13,23,15,20,'),(6,'没有',4,'12','语文',' 9,'),(7,'教师4',2,'33','英语',' 20,4,10,24,'),(8,'教师5',91,'1','体育',' 19,22,13,17,11,4,15,24,'),(9,'教师6',11,'2','英语',' 14,21,15,17,8,9,'),(10,'教师89',30,'88','语文',' 22,'),(11,'语文对对对',7,'8','语文',' 6,22,11,'),(12,'77',88,'66','语文',' 25,23,16,'),(13,'77',90,'7','物理',' 14,'),(14,'斯蒂芬',2,'3','化学',' 19,'),(15,'十点多',2,'3','生物',' 10,'),(16,'地方',2,'3','科学',' 12,');
/*!40000 ALTER TABLE `teacher` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `userId` int(11) NOT NULL AUTO_INCREMENT,
  `userName` varchar(45) NOT NULL,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `id_UNIQUE` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'zc');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-04-17 19:01:01
