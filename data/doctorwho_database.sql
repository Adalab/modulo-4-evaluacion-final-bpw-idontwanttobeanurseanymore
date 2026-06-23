CREATE DATABASE  IF NOT EXISTS `doctorwho` /*!40100 DEFAULT CHARACTER SET utf8mb3 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `doctorwho`;
-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: doctorwho
-- ------------------------------------------------------
-- Server version	8.0.46

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
-- Table structure for table `companions`
--

DROP TABLE IF EXISTS `companions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `companions` (
  `id_companion` int NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `actor` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_companion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `companions`
--

LOCK TABLES `companions` WRITE;
/*!40000 ALTER TABLE `companions` DISABLE KEYS */;
INSERT INTO `companions` VALUES (1,'Rose Tyler','Billie Piper'),(2,'Martha Jones','Freema Agyeman'),(3,'Donna Noble','Catherine Tate'),(4,'Jack Harkness','John Barrowman'),(5,'Amy Pond','Karen Gillan'),(6,'Rory Williams','Arthur Darvill'),(7,'Clara Oswald','Jenna Coleman'),(8,'Bill Potts','Pearl Mackie'),(9,'Nardole','Matt Lucas'),(10,'Yasmin Khan','Mandip Gill'),(11,'Dan Lewis','John Bishop'),(12,'Ruby Sunday','Millie Gibson'),(13,'Belinda Chandra','Varada Sethu');
/*!40000 ALTER TABLE `companions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctors`
--

DROP TABLE IF EXISTS `doctors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doctors` (
  `id_doctor` int NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `actor` varchar(100) DEFAULT NULL,
  `numero` int DEFAULT NULL,
  `temporada_inicio` int DEFAULT NULL,
  `temporada_fin` int DEFAULT NULL,
  PRIMARY KEY (`id_doctor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctors`
--

LOCK TABLES `doctors` WRITE;
/*!40000 ALTER TABLE `doctors` DISABLE KEYS */;
INSERT INTO `doctors` VALUES (9,'Ninth Doctor','Christopher Eccleston',9,2005,2005),(10,'Tenth Doctor','David Tennant',10,2005,2010),(11,'Eleventh Doctor','Matt Smith',11,2010,2013),(12,'Twelfth Doctor','Peter Capaldi',12,2013,2017),(13,'Thirteenth Doctor','Jodie Whittaker',13,2017,2022),(14,'Fourteenth Doctor','David Tennant',14,2023,2023),(15,'Fifteenth Doctor','Ncuti Gatwa',15,2024,2025);
/*!40000 ALTER TABLE `doctors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctors_has_companions`
--

DROP TABLE IF EXISTS `doctors_has_companions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doctors_has_companions` (
  `doctors_id_doctor` int NOT NULL,
  `companions_id_companion` int NOT NULL,
  PRIMARY KEY (`doctors_id_doctor`,`companions_id_companion`),
  KEY `fk_doctors_has_companions_companions1_idx` (`companions_id_companion`),
  KEY `fk_doctors_has_companions_doctors_idx` (`doctors_id_doctor`),
  CONSTRAINT `fk_doctors_has_companions_companions1` FOREIGN KEY (`companions_id_companion`) REFERENCES `companions` (`id_companion`),
  CONSTRAINT `fk_doctors_has_companions_doctors` FOREIGN KEY (`doctors_id_doctor`) REFERENCES `doctors` (`id_doctor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctors_has_companions`
--

LOCK TABLES `doctors_has_companions` WRITE;
/*!40000 ALTER TABLE `doctors_has_companions` DISABLE KEYS */;
INSERT INTO `doctors_has_companions` VALUES (9,1),(10,1),(10,2),(10,3),(14,3),(9,4),(10,4),(11,5),(11,6),(11,7),(12,7),(12,8),(12,9),(13,10),(13,11),(15,12),(15,13);
/*!40000 ALTER TABLE `doctors_has_companions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctors_has_enemies`
--

DROP TABLE IF EXISTS `doctors_has_enemies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doctors_has_enemies` (
  `doctors_id_doctor` int NOT NULL,
  `enemies_id_enemigo` int NOT NULL,
  PRIMARY KEY (`doctors_id_doctor`,`enemies_id_enemigo`),
  KEY `fk_doctors_has_enemies_enemies1_idx` (`enemies_id_enemigo`),
  KEY `fk_doctors_has_enemies_doctors1_idx` (`doctors_id_doctor`),
  CONSTRAINT `fk_doctors_has_enemies_doctors1` FOREIGN KEY (`doctors_id_doctor`) REFERENCES `doctors` (`id_doctor`),
  CONSTRAINT `fk_doctors_has_enemies_enemies1` FOREIGN KEY (`enemies_id_enemigo`) REFERENCES `enemies` (`id_enemigo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctors_has_enemies`
--

LOCK TABLES `doctors_has_enemies` WRITE;
/*!40000 ALTER TABLE `doctors_has_enemies` DISABLE KEYS */;
INSERT INTO `doctors_has_enemies` VALUES (9,1),(10,1),(11,1),(12,1),(13,1),(10,2),(11,2),(12,2),(13,2),(10,3),(13,3),(10,4),(11,4),(11,5),(9,6),(12,8),(14,9),(15,10);
/*!40000 ALTER TABLE `doctors_has_enemies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctors_has_planets`
--

DROP TABLE IF EXISTS `doctors_has_planets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doctors_has_planets` (
  `doctors_id_doctor` int NOT NULL,
  `planets_id_planeta` int NOT NULL,
  PRIMARY KEY (`doctors_id_doctor`,`planets_id_planeta`),
  KEY `fk_doctors_has_planets_planets1_idx` (`planets_id_planeta`),
  KEY `fk_doctors_has_planets_doctors1_idx` (`doctors_id_doctor`),
  CONSTRAINT `fk_doctors_has_planets_doctors1` FOREIGN KEY (`doctors_id_doctor`) REFERENCES `doctors` (`id_doctor`),
  CONSTRAINT `fk_doctors_has_planets_planets1` FOREIGN KEY (`planets_id_planeta`) REFERENCES `planets` (`id_planeta`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctors_has_planets`
--

LOCK TABLES `doctors_has_planets` WRITE;
/*!40000 ALTER TABLE `doctors_has_planets` DISABLE KEYS */;
INSERT INTO `doctors_has_planets` VALUES (9,1),(10,1),(11,1),(12,1),(13,1),(14,1),(15,1),(10,2),(11,2),(12,2),(13,2),(10,3),(10,4),(10,5),(9,6),(11,7),(12,8),(13,9),(14,10);
/*!40000 ALTER TABLE `doctors_has_planets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enemies`
--

DROP TABLE IF EXISTS `enemies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `enemies` (
  `id_enemigo` int NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_enemigo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enemies`
--

LOCK TABLES `enemies` WRITE;
/*!40000 ALTER TABLE `enemies` DISABLE KEYS */;
INSERT INTO `enemies` VALUES (1,'Daleks'),(2,'Cybermen'),(3,'The Master'),(4,'Weeping Angels'),(5,'Silence'),(6,'Slitheen'),(7,'Sontarans'),(8,'Zygons'),(9,'The Toymaker'),(10,'Pantheon Gods');
/*!40000 ALTER TABLE `enemies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `planets`
--

DROP TABLE IF EXISTS `planets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `planets` (
  `id_planeta` int NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_planeta`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `planets`
--

LOCK TABLES `planets` WRITE;
/*!40000 ALTER TABLE `planets` DISABLE KEYS */;
INSERT INTO `planets` VALUES (1,'Earth'),(2,'Gallifrey'),(3,'Skaro'),(4,'New Earth'),(5,'Mars'),(6,'Satellite 5'),(7,'Trenzalore'),(8,'Mondas'),(9,'Karvanista Homeworld'),(10,'Toymaker Domain');
/*!40000 ALTER TABLE `planets` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-06-23 20:01:22
