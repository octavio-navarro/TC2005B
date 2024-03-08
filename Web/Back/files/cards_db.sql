CREATE DATABASE  IF NOT EXISTS `cards_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `cards_db`;
-- MySQL dump 10.13  Distrib 8.0.35, for Linux (x86_64)
--
-- Host: localhost    Database: cards_db
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
-- Table structure for table `card`
--

DROP TABLE IF EXISTS `card`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `card` (
  `card_id` int NOT NULL AUTO_INCREMENT,
  `card_name` varchar(45) NOT NULL,
  `card_description` varchar(90) DEFAULT NULL,
  `card_type` varchar(45) NOT NULL,
  `card_cost` int NOT NULL,
  `card_rarity` varchar(45) NOT NULL,
  `card_target` varchar(45) NOT NULL DEFAULT 'enemy',
  PRIMARY KEY (`card_id`),
  UNIQUE KEY `card_id_UNIQUE` (`card_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `card`
--

LOCK TABLES `card` WRITE;
/*!40000 ALTER TABLE `card` DISABLE KEYS */;
INSERT INTO `card` VALUES (1,'Fireball','Massive ball of firery death','attack',1,'common','enemy'),(2,'Heal','Soothes most minor wounds','skill',1,'common','self'),(3,'Ice barrier','The cold does not bother me','skill',1,'common','self'),(4,'Ice bolt','FREEZE!','attack',2,'rare','enemy'),(5,'Lightning bolt','CATCH!','attack',2,'rare','enemy'),(6,'Pump iron','Proooteeein','buff',2,'rare','self'),(7,'Poison sting','You could learn a lot from the feral spirits of the wild','attack',2,'rare','self'),(10,'Wind cutter','High speed wind blades','attack',1,'common','enemy'),(11,'Air cannon','Airbenders\' most deadly technique','attack',1,'common','enemy');
/*!40000 ALTER TABLE `card` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `card_effect`
--

DROP TABLE IF EXISTS `card_effect`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `card_effect` (
  `card_effect_id` int NOT NULL AUTO_INCREMENT,
  `effect_id` int NOT NULL,
  `card_id` int NOT NULL,
  PRIMARY KEY (`card_effect_id`),
  UNIQUE KEY `card_effect_id_UNIQUE` (`card_effect_id`),
  KEY `fk_card_effect_1_idx` (`card_id`),
  KEY `fk_card_effect_2_idx` (`effect_id`),
  CONSTRAINT `fk_card_effect_1` FOREIGN KEY (`card_id`) REFERENCES `card` (`card_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_card_effect_2` FOREIGN KEY (`effect_id`) REFERENCES `effect` (`effect_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `card_effect`
--

LOCK TABLES `card_effect` WRITE;
/*!40000 ALTER TABLE `card_effect` DISABLE KEYS */;
INSERT INTO `card_effect` VALUES (1,1,1),(2,7,2),(3,2,3),(4,3,4),(5,8,5),(6,9,5),(7,4,6),(8,6,7);
/*!40000 ALTER TABLE `card_effect` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `effect`
--

DROP TABLE IF EXISTS `effect`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `effect` (
  `effect_id` int NOT NULL AUTO_INCREMENT,
  `effect_name` varchar(45) NOT NULL,
  `effect_magnitude` int NOT NULL,
  `effect_duration` int NOT NULL,
  `effect_description` varchar(90) DEFAULT NULL,
  `effect_type` varchar(45) NOT NULL DEFAULT 'skill',
  PRIMARY KEY (`effect_id`),
  UNIQUE KEY `effect_id_UNIQUE` (`effect_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `effect`
--

LOCK TABLES `effect` WRITE;
/*!40000 ALTER TABLE `effect` DISABLE KEYS */;
INSERT INTO `effect` VALUES (1,'damage',5,0,'Deals 5 damage','damage'),(2,'block',5,0,'blocks 5 damage','defense'),(3,'freeze',0,1,'Freezes the target for 1 turn','debuff'),(4,'strength',5,3,'Increases damage dealt by 5 for 3 turns','buff'),(5,'weaken',3,3,'Decreases damage dealt by 3 for 3 turns','debuff'),(6,'poison',3,3,'Deals 3 damage at the end of the next 3 turns','debuff'),(7,'heal',5,0,'Heals 5 damage','defense'),(8,'damage',3,0,'Deals 3 damage','attack'),(9,'stun',0,1,'Stuns a target for 1 turn','debuff');
/*!40000 ALTER TABLE `effect` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-07 18:17:19
