CREATE DATABASE  IF NOT EXISTS `api_game_db` /*!40101 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `api_game_db`;
-- MySQL dump 10.13  Distrib 8.0.35, for Linux (x86_64)
--
-- Host: localhost    Database: api_game_db
-- ------------------------------------------------------
-- Server version	8.0.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `levels`
--

DROP TABLE IF EXISTS `levels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `levels` (
  `id_levels` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `type` varchar(45) NOT NULL,
  `description` varchar(90) NOT NULL,
  `creation_date` datetime NOT NULL,
  `completion_rate` decimal(5,2) DEFAULT '0.00',
  PRIMARY KEY (`id_levels`),
  UNIQUE KEY `id_levels_UNIQUE` (`id_levels`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `levels`
--

LOCK TABLES `levels` WRITE;
/*!40000 ALTER TABLE `levels` DISABLE KEYS */;
INSERT INTO `levels` VALUES (1,'cactus','speed run','IS1UqGqEWLH82KkezFNw','2022-04-17 21:16:53',0.25),(2,'overwrought','standard','UTPBVJwTal6UhAPE3UkH','2022-04-17 21:16:53',0.00),(3,'marked','standard','7EtWpjEsgwciT9GHTjgq','2022-04-17 21:16:53',1.00),(4,'develop','versus','VzfnBzGbQ1MaK1aTUSPK','2022-04-17 21:16:53',0.67),(5,'knowing','standard','Y9geWGvzD51ruXVIfJ5n','2022-04-17 21:16:53',0.00),(6,'bump','versus','cruf6PIGeu2CEz8cLTRa','2022-04-17 21:16:53',0.33),(7,'ragged','standard','xiZhB51ig7f8UHCqIQHh','2022-04-17 21:16:53',0.75),(8,'babies','versus','ykVeb4iZZ8t2tHmDJSdA','2022-04-17 21:16:53',0.50),(9,'hall','standard','H8KVwFqgjXsaaTc9gAPT','2022-04-17 21:16:53',1.00),(10,'arrange','speed run','AYsD5sjOY4bj1iRjRYf3','2022-04-17 21:16:53',0.00);
/*!40000 ALTER TABLE `levels` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `top_levels`
--

DROP TABLE IF EXISTS `top_levels`;
/*!50001 DROP VIEW IF EXISTS `top_levels`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `top_levels` AS SELECT 
 1 AS `id_levels`,
 1 AS `name`,
 1 AS `type`,
 1 AS `description`,
 1 AS `creation_date`,
 1 AS `completion_rate`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `user_level`
--

DROP TABLE IF EXISTS `user_level`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_level` (
  `id_user_level` int NOT NULL AUTO_INCREMENT,
  `id_user` int NOT NULL,
  `id_level` int NOT NULL,
  `attempt_date` datetime NOT NULL,
  `completed` tinyint(1) NOT NULL,
  PRIMARY KEY (`id_user_level`),
  UNIQUE KEY `id_user_level_UNIQUE` (`id_user_level`),
  KEY `fk_user_idx` (`id_user`),
  KEY `fk_level_idx` (`id_level`),
  CONSTRAINT `fk_level` FOREIGN KEY (`id_level`) REFERENCES `levels` (`id_levels`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_user` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_users`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Update the average completion of levels after a new attempt is made';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_level`
--

LOCK TABLES `user_level` WRITE;
/*!40000 ALTER TABLE `user_level` DISABLE KEYS */;
INSERT INTO `user_level` VALUES (1,4,1,'2022-04-17 21:16:53',0),(3,18,6,'2022-04-17 21:16:53',0),(4,6,4,'2022-04-17 21:16:53',0),(5,17,9,'2022-04-17 21:16:53',1),(6,1,9,'2022-04-17 21:16:53',1),(7,6,7,'2022-04-17 21:16:53',1),(8,14,7,'2022-04-17 21:16:53',1),(9,11,4,'2022-04-17 21:16:53',1),(10,18,10,'2022-04-17 21:16:53',0),(11,6,1,'2022-04-17 21:16:53',0),(12,12,6,'2022-04-17 21:16:53',1),(13,4,7,'2022-04-17 21:16:53',0),(14,15,7,'2022-04-17 21:16:53',1),(15,14,8,'2022-04-17 21:16:53',0),(16,2,8,'2022-04-17 21:16:53',1),(17,18,4,'2022-04-17 21:16:53',1),(18,10,3,'2022-04-17 21:16:53',1),(19,6,6,'2022-04-17 21:16:53',0),(20,10,1,'2022-04-17 21:16:53',1);
/*!40000 ALTER TABLE `user_level` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id_users` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `surname` varchar(45) NOT NULL,
  PRIMARY KEY (`id_users`),
  UNIQUE KEY `id_users_UNIQUE` (`id_users`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Amara','Mayo'),(2,'Edgar','Dalton'),(3,'Jordan','Holland'),(4,'Jayda','Montoya'),(5,'Myles','Harmon'),(6,'Kelvin','Kidd'),(7,'Gabriela','Lang'),(8,'Tori','Wood'),(9,'Triston','Mercado'),(10,'Lilianna','Sutton'),(11,'Quincy','Horne'),(12,'Autumn','Obrien'),(13,'Journey','Morse'),(14,'Samir','Velez'),(15,'Malik','Lowe'),(16,'Reina','Sexton'),(17,'Sienna','Strickland'),(18,'Arjun','Lester'),(28,'1','2'),(29,'12233','33333'),(35,'12313123','1313213'),(36,'11','11'),(37,'123','123');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Final view structure for view `top_levels`
--

/*!50001 DROP VIEW IF EXISTS `top_levels`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `top_levels` AS select `levels`.`id_levels` AS `id_levels`,`levels`.`name` AS `name`,`levels`.`type` AS `type`,`levels`.`description` AS `description`,`levels`.`creation_date` AS `creation_date`,`levels`.`completion_rate` AS `completion_rate` from `levels` where (`levels`.`completion_rate` is not null) order by `levels`.`completion_rate` desc limit 5 */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-15  7:54:09
