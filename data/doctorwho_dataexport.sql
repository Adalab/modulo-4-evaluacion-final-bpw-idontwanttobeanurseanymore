-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: localhost    Database: doctorwho
-- ------------------------------------------------------
-- Server version	8.0.44

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
  `id_companion` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) DEFAULT NULL,
  `actor` varchar(100) DEFAULT NULL,
  `temporada_inicio` int DEFAULT NULL,
  `temporada_fin` int DEFAULT NULL,
  PRIMARY KEY (`id_companion`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `companions`
--

LOCK TABLES `companions` WRITE;
/*!40000 ALTER TABLE `companions` DISABLE KEYS */;
INSERT INTO `companions` VALUES (1,'Susan Foreman','Carole Ann Ford',1,2),(2,'Ian Chesterton','William Russell',1,2),(3,'Barbara Wright','Jacqueline Hill',1,2),(4,'Jamie McCrimmon','Frazer Hines',4,6),(5,'Jo Grant','Katy Manning',8,10),(6,'Sarah Jane Smith','Elisabeth Sladen',11,14),(7,'Leela','Louise Jameson',14,15),(8,'Romana','Lalla Ward',16,18),(9,'Tegan Jovanka','Janet Fielding',19,21),(10,'Ace','Sophie Aldred',24,26),(11,'Grace Holloway','Daphne Ashbrook',26,26),(12,'Rose Tyler','Billie Piper',1,4),(13,'Martha Jones','Freema Agyeman',3,3),(14,'Donna Noble','Catherine Tate',4,4),(15,'Amy Pond','Karen Gillan',5,7),(16,'Rory Williams','Arthur Darvill',5,7),(17,'Clara Oswald','Jenna Coleman',7,9),(18,'Bill Potts','Pearl Mackie',10,10),(19,'Yasmin Khan','Mandip Gill',11,13),(20,'Ryan Sinclair','Tosin Cole',11,13),(21,'Graham OBrien','Bradley Walsh',11,13),(22,'Ruby Sunday','Millie Gibson',14,15),(23,'Doctor la mejor','Marta',1997,2026),(24,'Doctor la mejor','Marta',1997,2026),(25,'Doctor la mejor','Marta',1997,2026),(26,'Doctor la mejor','Marta',1997,2026),(27,'Who?','Marta',1997,2026),(28,'Who?','Marta',1997,2026),(29,'Who?','Marta',1997,2026),(30,'Who?','Marta',1997,2026),(31,'Who?','Marta',1997,2026),(32,'Who?','Marta',1997,2026),(33,'Who?','Marta',1997,2026);
/*!40000 ALTER TABLE `companions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctor_has_companions`
--

DROP TABLE IF EXISTS `doctor_has_companions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doctor_has_companions` (
  `id_doctor` int NOT NULL,
  `id_companion` int NOT NULL,
  `temporada_inicio` int DEFAULT NULL,
  `temporada_fin` int DEFAULT NULL,
  `rol` varchar(50) DEFAULT NULL,
  `estado_final` varchar(50) DEFAULT NULL,
  `primera_aparicion` varchar(150) DEFAULT NULL,
  `ultima_aparicion` varchar(150) DEFAULT NULL,
  `numero_episodios` int DEFAULT NULL,
  `relacion_con_doctor` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_doctor`,`id_companion`),
  KEY `doctor_has_companions_ibfk_2` (`id_companion`),
  CONSTRAINT `doctor_has_companions_ibfk_1` FOREIGN KEY (`id_doctor`) REFERENCES `doctors` (`id_doctor`) ON DELETE CASCADE,
  CONSTRAINT `doctor_has_companions_ibfk_2` FOREIGN KEY (`id_companion`) REFERENCES `companions` (`id_companion`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctor_has_companions`
--

LOCK TABLES `doctor_has_companions` WRITE;
/*!40000 ALTER TABLE `doctor_has_companions` DISABLE KEYS */;
INSERT INTO `doctor_has_companions` VALUES (1,1,1,2,'principal','viva','An Unearthly Child','The Dalek Invasion of Earth',20,'familia'),(1,2,1,2,'principal','vivo','An Unearthly Child','The Chase',25,'amistad'),(1,3,1,2,'principal','viva','An Unearthly Child','The Chase',25,'amistad'),(2,4,4,6,'principal','vivo','The Highlanders','The War Games',100,'amistad'),(3,5,8,10,'principal','viva','Terror of the Autons','The Green Death',30,'amistad'),(4,6,11,14,'principal','viva','The Time Warrior','The Hand of Fear',80,'amistad'),(4,7,14,15,'principal','viva','The Face of Evil','The Invasion of Time',40,'amistad'),(4,8,16,18,'principal','viva','The Ribos Operation','Warriors Gate',50,'amistad'),(5,9,19,21,'principal','viva','Logopolis','Resurrection of the Daleks',40,'amistad'),(7,10,24,26,'principal','viva','Dragonfire','Survival',30,'amistad'),(8,11,26,26,'principal','viva','Doctor Who (1996)','Doctor Who (1996)',1,'amistad'),(9,12,1,2,'principal','viva','Rose','Doomsday',26,'romance'),(10,12,2,4,'principal','separada','New Earth','Journey\'s End',30,'romance'),(10,13,3,3,'principal','viva','Smith and Jones','Last of the Time Lords',13,'amistad'),(10,14,4,4,'principal','viva','Partners in Crime','Journey\'s End',13,'amistad'),(11,15,5,7,'principal','viva','The Eleventh Hour','The Angels Take Manhattan',30,'familia'),(11,16,5,7,'principal','vivo','The Eleventh Hour','The Angels Take Manhattan',28,'amistad'),(11,17,7,9,'principal','viva','Asylum of the Daleks','Hell Bent',25,'amistad'),(12,17,8,9,'principal','viva','Deep Breath','Hell Bent',22,'amistad'),(12,18,10,10,'principal','viva','The Pilot','Twice Upon a Time',12,'mentor'),(13,19,11,13,'principal','viva','The Woman Who Fell to Earth','The Power of the Doctor',30,'amistad'),(13,20,11,13,'principal','vivo','The Woman Who Fell to Earth','The Power of the Doctor',30,'amistad'),(13,21,11,13,'principal','vivo','The Woman Who Fell to Earth','The Power of the Doctor',30,'familia'),(14,14,14,14,'principal','viva','The Star Beast','The Giggle',3,'amistad'),(15,22,14,15,'principal','activa','The Church on Ruby Road','presente',10,'amistad');
/*!40000 ALTER TABLE `doctor_has_companions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctor_has_enemies`
--

DROP TABLE IF EXISTS `doctor_has_enemies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doctor_has_enemies` (
  `id_doctor` int NOT NULL,
  `id_enemigo` int NOT NULL,
  `numero_enfrentamientos` int DEFAULT NULL,
  `primera_vez` varchar(150) DEFAULT NULL,
  `ultima_vez` varchar(150) DEFAULT NULL,
  `resultado_final` varchar(50) DEFAULT NULL,
  `enemigo_derrotado` tinyint(1) DEFAULT NULL,
  `nivel_peligro` varchar(50) DEFAULT NULL,
  `tipo_conflicto` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_doctor`,`id_enemigo`),
  KEY `doctor_has_enemies_ibfk_2` (`id_enemigo`),
  CONSTRAINT `doctor_has_enemies_ibfk_1` FOREIGN KEY (`id_doctor`) REFERENCES `doctors` (`id_doctor`) ON DELETE CASCADE,
  CONSTRAINT `doctor_has_enemies_ibfk_2` FOREIGN KEY (`id_enemigo`) REFERENCES `enemies` (`id_enemigo`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctor_has_enemies`
--

LOCK TABLES `doctor_has_enemies` WRITE;
/*!40000 ALTER TABLE `doctor_has_enemies` DISABLE KEYS */;
INSERT INTO `doctor_has_enemies` VALUES (1,1,2,'The Daleks','The Chase','victoria',1,'extremo','guerra'),(2,2,2,'The Moonbase','The Invasion','victoria',1,'alto','tecnologico'),(3,4,2,'The Time Warrior','The Sontaran Experiment','victoria',1,'alto','guerra'),(4,1,3,'Genesis of the Daleks','Destiny of the Daleks','victoria',1,'extremo','guerra'),(4,5,2,'Genesis of the Daleks','Revelation of the Daleks','victoria',1,'extremo','psicologico'),(9,1,3,'Dalek','Bad Wolf','victoria',1,'extremo','guerra'),(10,3,3,'Utopia','End of Time','empate',0,'extremo','psicologico'),(11,6,3,'Blink','Angels Take Manhattan','victoria',1,'alto','temporal'),(12,1,2,'Into the Dalek','The Magician\'s Apprentice','victoria',1,'extremo','psicologico'),(13,3,2,'Spyfall','Power of the Doctor','empate',0,'extremo','psicologico');
/*!40000 ALTER TABLE `doctor_has_enemies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctor_has_planets`
--

DROP TABLE IF EXISTS `doctor_has_planets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doctor_has_planets` (
  `id_doctor` int NOT NULL,
  `id_planeta` int NOT NULL,
  `numero_visitas` int DEFAULT NULL,
  `primera_visita` varchar(150) DEFAULT NULL,
  `ultima_visita` varchar(150) DEFAULT NULL,
  `evento_clave` varchar(255) DEFAULT NULL,
  `planeta_estado_post` varchar(50) DEFAULT NULL,
  `importancia` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_doctor`,`id_planeta`),
  KEY `doctor_has_planets_ibfk_2` (`id_planeta`),
  CONSTRAINT `doctor_has_planets_ibfk_1` FOREIGN KEY (`id_doctor`) REFERENCES `doctors` (`id_doctor`) ON DELETE CASCADE,
  CONSTRAINT `doctor_has_planets_ibfk_2` FOREIGN KEY (`id_planeta`) REFERENCES `planets` (`id_planeta`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctor_has_planets`
--

LOCK TABLES `doctor_has_planets` WRITE;
/*!40000 ALTER TABLE `doctor_has_planets` DISABLE KEYS */;
INSERT INTO `doctor_has_planets` VALUES (1,3,1,'The Daleks','The Daleks','Encuentro Dalek','activo','alta'),(2,4,1,'The Tenth Planet','The Tenth Planet','Origen Cybermen','destruido','alta'),(3,2,5,'Spearhead from Space','Planet of the Spiders','Defensa Tierra','intacto','alta'),(4,1,2,'The Deadly Assassin','Invasion of Time','Política Time Lords','activo','alta'),(4,3,2,'Genesis of the Daleks','Destiny of the Daleks','Creación Daleks','destruido','alta'),(9,2,5,'Rose','Bad Wolf','Protección Tierra','intacto','alta'),(10,2,10,'Christmas Invasion','Journey\'s End','Invasiones','intacto','alta'),(11,1,1,'Day of the Doctor','Time of the Doctor','Salvar Gallifrey','salvado','alta'),(12,1,1,'Heaven Sent','Hell Bent','Regreso Gallifrey','activo','alta'),(13,2,8,'Woman Who Fell to Earth','Flux','Crisis global','intacto','alta');
/*!40000 ALTER TABLE `doctor_has_planets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctors`
--

DROP TABLE IF EXISTS `doctors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doctors` (
  `id_doctor` int NOT NULL AUTO_INCREMENT,
  `numero_doctor` int DEFAULT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `actor` varchar(100) DEFAULT NULL,
  `temporada_inicio` int DEFAULT NULL,
  `temporada_fin` int DEFAULT NULL,
  `numero` int DEFAULT NULL,
  `era` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id_doctor`),
  UNIQUE KEY `numero_doctor` (`numero_doctor`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctors`
--

LOCK TABLES `doctors` WRITE;
/*!40000 ALTER TABLE `doctors` DISABLE KEYS */;
INSERT INTO `doctors` VALUES (1,1,'First Doctor','William Hartnell',1,3,1,'classic'),(2,2,'Second Doctor','Patrick Troughton',4,6,2,'classic'),(3,3,'Third Doctor','Jon Pertwee',7,11,3,'classic'),(4,4,'Fourth Doctor','Tom Baker',12,18,4,'classic'),(5,5,'Fifth Doctor','Peter Davison',19,21,5,'classic'),(6,6,'Sixth Doctor','Colin Baker',22,23,6,'classic'),(7,7,'Seventh Doctor','Sylvester McCoy',24,26,7,'classic'),(8,8,'Eighth Doctor','Paul McGann',26,26,8,'classic'),(9,9,'Ninth Doctor','Christopher Eccleston',1,1,9,'modern'),(10,10,'Tenth Doctor','David Tennant',2,4,10,'modern'),(11,11,'Eleventh Doctor','Matt Smith',5,7,11,'modern'),(12,12,'Twelfth Doctor','Peter Capaldi',8,10,12,'modern'),(13,13,'Thirteenth Doctor','Jodie Whittaker',11,13,13,'modern'),(14,14,'Fourteenth Doctor','David Tennant',14,14,14,'modern'),(15,15,'Fifteenth Doctor','Ncuti Gatwa',14,15,15,'modern'),(32,18,'Who?','Marta',1997,2026,18,'modern');
/*!40000 ALTER TABLE `doctors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enemies`
--

DROP TABLE IF EXISTS `enemies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `enemies` (
  `id_enemigo` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) DEFAULT NULL,
  `alive` tinyint(1) DEFAULT NULL,
  `fecha_muerte` date DEFAULT NULL,
  PRIMARY KEY (`id_enemigo`),
  CONSTRAINT `chk_estado_enemigo` CHECK ((((`alive` = 1) and (`fecha_muerte` is null)) or ((`alive` = 0) and (`fecha_muerte` is not null))))
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enemies`
--

LOCK TABLES `enemies` WRITE;
/*!40000 ALTER TABLE `enemies` DISABLE KEYS */;
INSERT INTO `enemies` VALUES (1,'Daleks',1,NULL),(2,'Cybermen',1,NULL),(3,'The Master',1,NULL),(4,'Sontarans',1,NULL),(5,'Davros',1,NULL),(6,'Weeping Angels',1,NULL),(7,'Weeping Angels',1,NULL),(8,'Ashildr (Me)',1,NULL),(9,'Missy',0,'2017-07-01'),(10,'Tim Shaw',1,NULL),(11,'Swarm',0,'2021-12-05'),(12,'Azure',0,'2021-12-05'),(13,'The Toymaker',0,'2023-12-09'),(14,'Doctor la mejor',0,'2026-07-02'),(15,'Doctor la mejor',1,NULL),(16,'Doctor la mejor',0,'2026-07-02'),(17,'Doctor la mejor',1,NULL),(18,'Doctor la mejor',0,'2026-07-02'),(19,'Doctor la mejor',1,NULL),(20,'Doctor la mejor',0,'2026-07-02'),(21,'Doctor la mejor',1,NULL),(22,'Worst enemy',0,'2026-07-02'),(23,'Best enemy',1,NULL),(24,'Worst enemy',0,'2026-07-02'),(25,'Best enemy',1,NULL),(26,'Worst enemy',0,'2026-07-02'),(27,'Best enemy',1,NULL),(28,'Worst enemy',0,'2026-07-02'),(29,'Best enemy',1,NULL),(30,'Worst enemy',0,'2026-07-02'),(31,'Best enemy',1,NULL),(32,'Worst enemy',0,'2026-07-02'),(33,'Best enemy',1,NULL);
/*!40000 ALTER TABLE `enemies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `planets`
--

DROP TABLE IF EXISTS `planets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `planets` (
  `id_planeta` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) DEFAULT NULL,
  `destroyed` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id_planeta`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `planets`
--

LOCK TABLES `planets` WRITE;
/*!40000 ALTER TABLE `planets` DISABLE KEYS */;
INSERT INTO `planets` VALUES (1,'Gallifrey',1),(2,'Earth',0),(3,'Skaro',1),(4,'Mondas',1),(5,'Telos',0);
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

-- Dump completed on 2026-07-02 16:25:38
