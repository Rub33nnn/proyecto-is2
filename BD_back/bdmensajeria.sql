CREATE DATABASE  IF NOT EXISTS `bd_appmensajeria` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `bd_appmensajeria`;
-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: bd_appmensajeria
-- ------------------------------------------------------
-- Server version	9.0.1

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
-- Table structure for table `conversations`
--

DROP TABLE IF EXISTS `conversations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `conversations` (
  `id` int NOT NULL,
  `titulo` varchar(45) DEFAULT NULL,
  `idusuarioparticipante1` int DEFAULT NULL,
  `idusuarioparticipante2` varchar(45) DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT NULL,
  `fechaactualizado` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conversations`
--

LOCK TABLES `conversations` WRITE;
/*!40000 ALTER TABLE `conversations` DISABLE KEYS */;
INSERT INTO `conversations` VALUES (1,'a',1,'3','2024-08-12 00:00:00','2024-12-16 20:08:51'),(2,'b',1,'4','2024-08-12 00:00:00','2024-08-12 00:00:00'),(3,'c',1,'5','2024-08-12 00:00:00','2024-08-12 00:00:00'),(4,'d',1,'6','2024-08-12 00:00:00','2024-08-12 00:00:00'),(5,'e',3,'4','2024-08-12 00:00:00','2024-08-12 00:00:00'),(6,'f',3,'5','2024-08-12 00:00:00','2024-08-12 00:00:00'),(7,'g',3,'6','2024-08-12 00:00:00','2024-08-12 00:00:00'),(8,'h',4,'5','2024-08-12 00:00:00','2024-08-12 00:00:00'),(9,'i',4,'6','2024-08-12 00:00:00','2024-08-12 00:00:00'),(10,'waos',6,'5','2024-08-12 00:00:00','2024-08-12 00:00:00');
/*!40000 ALTER TABLE `conversations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messages` (
  `id` int NOT NULL,
  `conversation_id` int DEFAULT NULL,
  `userid` int DEFAULT NULL,
  `txt_message` varchar(255) DEFAULT NULL,
  `fechadeenvio` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (1,1,1,'Hola','2024-08-12 00:00:00'),(2,1,2,'Wenas','2024-08-12 00:00:00'),(3,1,1,'when haces tus momos en el proyecto final','2024-08-12 00:00:00'),(4,2,1,'ey','2024-08-12 00:00:00'),(5,2,4,'up','2024-08-12 00:00:00'),(6,3,1,'como t fue','2024-08-12 00:00:00'),(7,33,5,'pos bien ahi la neta','2024-08-12 00:00:00'),(8,1,1,'Prueba desde la api','2024-08-12 00:00:00'),(9,1,1,'Pureba de trigger','2024-08-12 00:00:00');
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `actualizar_fecha_conversacion` AFTER INSERT ON `messages` FOR EACH ROW BEGIN
    UPDATE conversations
    SET fechaactualizado = NOW()
    WHERE id = NEW.conversation_id;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  `imguser` varchar(45) DEFAULT NULL,
  `telefono` varchar(45) DEFAULT NULL,
  `recoverytoken` varchar(45) DEFAULT NULL,
  `recoverytokenexpiration` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Ruben','Ruben@ruben','Ruben1',NULL,NULL,NULL,NULL),(3,'Jose','jose@gmail.com','ruben3',NULL,NULL,NULL,NULL),(4,'Javier','javier@hotmail.com','javi1237',NULL,NULL,NULL,NULL),(5,'Carlitos','penpapi23@gmail.com','penpapi432',NULL,NULL,NULL,NULL),(6,'Alberto-DobleH','alberthdz@live.es','12345678',NULL,'6681348867',NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'bd_appmensajeria'
--

--
-- Dumping routines for database 'bd_appmensajeria'
--
/*!50003 DROP PROCEDURE IF EXISTS `obtenerconversasionesdeusuario` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `obtenerconversasionesdeusuario`(IN idusuario INT)
BEGIN
    SELECT 
        c.id,
        c.titulo,
        c.idusuarioparticipante1,
        u1.username AS participante1,
        c.idusuarioparticipante2,
        u2.username AS participante2,
        c.fecha_creacion,
        c.fechaactualizado
    FROM 
        conversations c
    LEFT JOIN users u1 ON c.idusuarioparticipante1 = u1.id
    LEFT JOIN users u2 ON c.idusuarioparticipante2 = u2.id
    WHERE 
        idusuario = c.idusuarioparticipante1 
        OR idusuario = c.idusuarioparticipante2
    ORDER BY 
        c.fechaactualizado DESC;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-16 20:10:08
