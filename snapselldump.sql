-- MySQL dump 10.13  Distrib 5.7.28, for Linux (x86_64)
--
-- Host: localhost    Database: snapsell
-- ------------------------------------------------------
-- Server version	5.7.28-0ubuntu0.18.04.4

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

CREATE DATABASE  IF NOT EXISTS `snapsell` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `snapsell`;

--
-- Table structure for table `Likes`
--

DROP TABLE IF EXISTS `Likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Likes` (
  `uuid` char(36) NOT NULL,
  `fk_liker_id` char(36) NOT NULL,
  `fk_liked_listing` char(36) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`uuid`),
  KEY `fk_liker_id` (`fk_liker_id`),
  KEY `fk_liked_listing` (`fk_liked_listing`),
  CONSTRAINT `Likes_ibfk_1` FOREIGN KEY (`fk_liker_id`) REFERENCES `Users` (`uuid`),
  CONSTRAINT `Likes_ibfk_2` FOREIGN KEY (`fk_liked_listing`) REFERENCES `Listings` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Likes`
--

LOCK TABLES `Likes` WRITE;
/*!40000 ALTER TABLE `Likes` DISABLE KEYS */;
INSERT INTO `Likes` VALUES ('057d2934-2653-451c-b0e4-01f2a8c027ac','3cbf4a3c-604e-42eb-beec-0883e07f2c2c','c361aafd-c303-4fa1-a8b8-2fd0f82e349c','2019-12-30 03:09:48'),('1c6bca48-eea4-4913-baa3-cb684697f803','1aace665-be8b-4203-92f4-069b85e3f1e6','d713f014-cd3f-40d2-b98d-7c3ff52afb9a','2019-12-30 03:11:03'),('3793bdca-31da-431f-b784-9420d79827e3','7d759b73-6a7d-423d-86d2-7fdb71cb3f27','bc46d1fe-75b3-4d90-9170-ac04084cfcdb','2019-12-23 18:52:06'),('43948876-2b2c-42d0-abc0-4108476e3db6','7d759b73-6a7d-423d-86d2-7fdb71cb3f27','f6c7fb85-e83c-4a16-a471-94784bf6df52','2019-12-30 03:08:11'),('4b16ee20-d51b-41f9-8c54-d9a55ec192a8','3cbf4a3c-604e-42eb-beec-0883e07f2c2c','608c9085-66e1-46bc-9654-2b5d5009f506','2019-12-30 03:09:19'),('5022c7d0-4cf2-4a60-a9d3-332d9b209662','1aace665-be8b-4203-92f4-069b85e3f1e6','d713f014-cd3f-40d2-b98d-7c3ff52afb9a','2019-12-30 03:10:35'),('682e25da-e817-44df-9be5-61404086312c','3cbf4a3c-604e-42eb-beec-0883e07f2c2c','d713f014-cd3f-40d2-b98d-7c3ff52afb9a','2019-12-30 03:10:12'),('775e1692-f931-4996-801b-696f69fa8346','94b3085c-88c5-4c74-a8a7-cea52b31c358','f6c7fb85-e83c-4a16-a471-94784bf6df52','2019-12-30 03:08:30'),('9941ef63-3959-44ca-94d3-e454c98a4022','7d759b73-6a7d-423d-86d2-7fdb71cb3f27','c361aafd-c303-4fa1-a8b8-2fd0f82e349c','2019-12-30 03:05:27'),('a1e9a079-956e-4c26-9a5c-c973435176bb','3cbf4a3c-604e-42eb-beec-0883e07f2c2c','c361aafd-c303-4fa1-a8b8-2fd0f82e349c','2019-12-30 03:09:45');
/*!40000 ALTER TABLE `Likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Listings`
--

DROP TABLE IF EXISTS `Listings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Listings` (
  `uuid` char(36) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `price` decimal(6,2) NOT NULL,
  `fk_seller_id` char(36) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`uuid`),
  KEY `fk_seller_id` (`fk_seller_id`),
  CONSTRAINT `Listings_ibfk_1` FOREIGN KEY (`fk_seller_id`) REFERENCES `Users` (`uuid`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Listings`
--

LOCK TABLES `Listings` WRITE;
/*!40000 ALTER TABLE `Listings` DISABLE KEYS */;
INSERT INTO `Listings` VALUES ('0baf9189-993b-433c-8bc4-83c4f1fa8b07','Steam Account','ALevels KMS',20.00,'1aace665-be8b-4203-92f4-069b85e3f1e6','2019-12-30 02:37:07'),('23c51b7f-80a3-473d-8bb8-2333f4ddeec1','Postcards','Cute',5.00,'7d759b73-6a7d-423d-86d2-7fdb71cb3f27','2019-12-30 01:47:21'),('608c9085-66e1-46bc-9654-2b5d5009f506','Anime Posters','Impulse buy from AFA',15.00,'7d759b73-6a7d-423d-86d2-7fdb71cb3f27','2019-12-30 01:46:31'),('a74e5c0e-910a-4588-bc9c-9b02b54e2e4b','Wacom Tablet','Quitting osu, trash game',150.00,'3cbf4a3c-604e-42eb-beec-0883e07f2c2c','2019-12-30 01:50:06'),('b0bb5cbf-1487-4d18-b0fa-c382704e1d51','Ecigg','Stole from paikia friend lol',88.00,'1aace665-be8b-4203-92f4-069b85e3f1e6','2019-12-30 01:55:07'),('bc46d1fe-75b3-4d90-9170-ac04084cfcdb','iPhone 6s USED','In good condition. Camera and screen not working.',250.00,'4e42c285-3960-45db-919a-524797aed060','2019-12-20 10:39:22'),('c361aafd-c303-4fa1-a8b8-2fd0f82e349c','TENGA','Private mail available, limited edition from Japan',50.00,'94b3085c-88c5-4c74-a8a7-cea52b31c358','2019-12-30 01:48:19'),('d713f014-cd3f-40d2-b98d-7c3ff52afb9a','Gaming chair','Impulse buy, I don\'t even use it.',450.00,'94b3085c-88c5-4c74-a8a7-cea52b31c358','2019-12-30 01:49:14'),('d9dd5c04-b797-449f-a7d9-280e049e0af9','Logitech G29','Total ~300 hours use, selling as too busy to use',333.00,'7d759b73-6a7d-423d-86d2-7fdb71cb3f27','2019-12-30 01:46:03'),('f6c7fb85-e83c-4a16-a471-94784bf6df52','JC H2 Physics Textbook','Dropping out of JC to go poly, textbook barely touched lol',15.00,'1aace665-be8b-4203-92f4-069b85e3f1e6','2019-12-30 01:54:07'),('fb34695c-3ee2-4621-ac2b-355f9e1a0729','Steam account','Selling soul for game dev, 30 games and inventory total worth 750 SGD',200.00,'3cbf4a3c-604e-42eb-beec-0883e07f2c2c','2019-12-30 01:52:40');
/*!40000 ALTER TABLE `Listings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Offers`
--

DROP TABLE IF EXISTS `Offers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Offers` (
  `uuid` char(36) NOT NULL,
  `offer` decimal(6,2) NOT NULL,
  `fk_listing_id` char(36) NOT NULL,
  `fk_offerer_userid` char(36) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`uuid`),
  KEY `fk_listing_id` (`fk_listing_id`),
  KEY `fk_offerer_userid` (`fk_offerer_userid`),
  CONSTRAINT `Offers_ibfk_1` FOREIGN KEY (`fk_listing_id`) REFERENCES `Listings` (`uuid`) ON DELETE CASCADE,
  CONSTRAINT `Offers_ibfk_2` FOREIGN KEY (`fk_offerer_userid`) REFERENCES `Users` (`uuid`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Offers`
--

LOCK TABLES `Offers` WRITE;
/*!40000 ALTER TABLE `Offers` DISABLE KEYS */;
INSERT INTO `Offers` VALUES ('04a2f4e7-f312-473c-82c5-8892b09365bb',20.00,'c361aafd-c303-4fa1-a8b8-2fd0f82e349c','7d759b73-6a7d-423d-86d2-7fdb71cb3f27','2019-12-30 02:46:41'),('44827a86-36d5-437a-8f06-fa927b4c63a1',10.00,'f6c7fb85-e83c-4a16-a471-94784bf6df52','94b3085c-88c5-4c74-a8a7-cea52b31c358','2019-12-30 02:50:08'),('5c78ff41-da1e-4dfc-9fe8-ee83c1d8639a',5.00,'23c51b7f-80a3-473d-8bb8-2333f4ddeec1','3cbf4a3c-604e-42eb-beec-0883e07f2c2c','2019-12-30 02:49:06'),('955ad4ca-b14e-4308-9f09-39196a367a12',30.00,'c361aafd-c303-4fa1-a8b8-2fd0f82e349c','3cbf4a3c-604e-42eb-beec-0883e07f2c2c','2019-12-30 02:48:26'),('c728d436-1be9-4d58-9078-6a087554d9de',200.00,'bc46d1fe-75b3-4d90-9170-ac04084cfcdb','7d759b73-6a7d-423d-86d2-7fdb71cb3f27','2019-12-20 11:36:00'),('ea816f5c-fb4c-407d-a6e1-13058b2519d3',35.00,'c361aafd-c303-4fa1-a8b8-2fd0f82e349c','7d759b73-6a7d-423d-86d2-7fdb71cb3f27','2019-12-30 02:48:03');
/*!40000 ALTER TABLE `Offers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Users` (
  `uuid` char(36) NOT NULL,
  `username` varchar(255) NOT NULL,
  `profile_pic_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`uuid`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES ('1aace665-be8b-4203-92f4-069b85e3f1e6','death25525','wk pic HERE','2019-12-30 01:42:50'),('3cbf4a3c-604e-42eb-beec-0883e07f2c2c','Bamboo01','sherwyn pic HERE','2019-12-30 01:43:08'),('4e42c285-3960-45db-919a-524797aed060','steve_jobs','https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Steve_Jobs_Headshot_2010-CROP2.jpg/800px-Steve_Jobs_Headshot_2010-CROP2.jpg','2019-12-18 19:48:45'),('7d759b73-6a7d-423d-86d2-7fdb71cb3f27','SheeNigami','SheeNigami pic HERE','2019-12-20 11:34:29'),('94b3085c-88c5-4c74-a8a7-cea52b31c358','chuanhao01','chuanhao01 pic HERE','2019-12-30 01:40:30');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-01-03 14:43:36
