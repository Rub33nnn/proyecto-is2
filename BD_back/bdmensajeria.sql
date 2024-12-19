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
  `id` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(45) DEFAULT NULL,
  `idusuarioparticipante1` int DEFAULT NULL,
  `idusuarioparticipante2` varchar(45) DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT NULL,
  `fechaactualizado` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conversations`
--

LOCK TABLES `conversations` WRITE;
/*!40000 ALTER TABLE `conversations` DISABLE KEYS */;
INSERT INTO `conversations` VALUES (1,'Ruben: A',1,'3','2024-08-12 00:00:00','2024-12-19 04:51:39'),(2,'Ruben: E',1,'4','2024-08-12 00:00:00','2024-12-19 04:50:18'),(3,'Ruben: Tuki',1,'5','2024-08-12 00:00:00','2024-12-19 05:40:15'),(4,'Ruben: Rubén',1,'6','2024-08-12 00:00:00','2024-12-19 04:51:33'),(5,'Javier: Ea',3,'4','2024-08-12 00:00:00','2024-12-19 04:50:35'),(6,'f',3,'5','2024-08-12 00:00:00','2024-08-12 00:00:00'),(7,'g',3,'6','2024-08-12 00:00:00','2024-08-12 00:00:00'),(8,'h',4,'5','2024-08-12 00:00:00','2024-08-12 00:00:00'),(9,'i',4,'6','2024-08-12 00:00:00','2024-08-12 00:00:00'),(10,'waos',6,'5','2024-08-12 00:00:00','2024-08-12 00:00:00'),(11,'javier-ctrlz: Pinga',7,'1','2024-12-19 09:59:08','2024-12-19 17:12:18'),(12,'',7,'1','2024-12-19 09:59:20',NULL),(13,'',7,'1','2024-12-19 10:02:03',NULL),(15,'javier-ctrlz: E',7,'5','2024-12-19 10:20:08','2024-12-19 17:20:26');
/*!40000 ALTER TABLE `conversations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `conversation_id` int DEFAULT NULL,
  `userid` int DEFAULT NULL,
  `txt_message` varchar(255) DEFAULT NULL,
  `fechadeenvio` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (1,1,1,'Hola','2024-08-12 00:00:00'),(2,1,2,'Wenas','2024-08-12 00:00:00'),(3,1,1,'when haces tus momos en el proyecto final','2024-08-12 00:00:00'),(4,2,1,'ey','2024-08-12 00:00:00'),(5,2,4,'up','2024-08-12 00:00:00'),(6,3,1,'como t fue','2024-08-12 00:00:00'),(7,33,5,'pos bien ahi la neta','2024-08-12 00:00:00'),(8,1,1,'Prueba desde la api','2024-08-12 00:00:00'),(9,1,1,'Pureba de trigger','2024-08-12 00:00:00'),(10,100,1,'Prueba desde la api','2024-08-12 00:00:00'),(11,100,1,'Prueba desde la api','2024-08-12 00:00:00'),(13,1,1,'a ver si esto jala','2024-12-18 14:44:19'),(14,2,1,'Pinga','2024-12-18 14:47:39'),(15,1,1,'Prueba','2024-12-18 15:25:09'),(16,1,1,'<','2024-12-18 15:46:41'),(17,1,1,'Tuki','2024-12-18 15:47:22'),(18,1,1,'Teléfono','2024-12-18 15:55:50'),(19,1,1,'A','2024-12-18 15:58:56'),(20,1,1,'Pinga','2024-12-18 15:59:30'),(21,1,1,'MelaShaco','2024-12-18 16:16:12'),(22,1,1,'Compu','2024-12-18 16:20:03'),(23,1,1,'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA','2024-12-18 16:21:10'),(24,1,1,'Nmms ya jala','2024-12-18 16:19:04'),(25,1,1,'A','2024-12-18 17:28:49'),(26,2,1,'a','2024-12-18 17:49:59'),(27,1,3,'Tuki','2024-12-18 17:57:55'),(28,1,1,'Prueba','2024-12-18 18:01:20'),(29,1,3,'3','2024-12-18 18:01:37'),(30,1,1,'Tuki','2024-12-18 18:06:51'),(31,1,3,'Prueba','2024-12-18 18:07:02'),(32,1,3,'Tuki','2024-12-18 18:07:07'),(33,1,3,'aqsqDfas','2024-12-18 18:08:16'),(34,1,3,'Prueba','2024-12-18 18:10:00'),(35,5,3,'Tuki','2024-12-18 19:13:58'),(36,2,1,'Hey','2024-12-18 19:39:55'),(37,4,1,'Hola','2024-12-18 21:33:15'),(38,2,1,'Calando','2024-12-18 21:41:14'),(39,4,1,'Hey','2024-12-18 21:41:36'),(40,4,1,'A','2024-12-18 21:45:43'),(41,2,4,'Amigo','2024-12-18 21:47:03'),(42,2,4,'Amigo','2024-12-18 21:48:41'),(43,2,4,'A','2024-12-18 21:49:42'),(44,2,4,'Tuki','2024-12-18 21:50:07'),(45,2,1,'E','2024-12-18 21:50:18'),(46,5,4,'Ea','2024-12-18 21:50:35'),(47,4,1,'Rubén','2024-12-18 21:51:33'),(48,1,1,'A','2024-12-18 21:51:39'),(49,3,1,'T','2024-12-18 21:51:45'),(50,3,1,'Tuki','2024-12-18 22:40:15'),(51,11,7,'Pinga','2024-12-19 10:12:18'),(52,15,7,'E','2024-12-19 10:20:26');
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
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `update_conversation_title_after_message_insert` AFTER INSERT ON `messages` FOR EACH ROW BEGIN
    -- Declarar variables para almacenar el texto del último mensaje y el nombre del usuario
    DECLARE last_message_text VARCHAR(255);
    DECLARE user_name VARCHAR(100);

    -- Obtener el nombre del usuario que envió el mensaje
    SELECT username
    INTO user_name
    FROM users
    WHERE id = NEW.userid;

    -- Obtener el texto del último mensaje para esa conversación
    SELECT txt_message
    INTO last_message_text
    FROM messages
    WHERE conversation_id = NEW.conversation_id
    ORDER BY fechadeenvio DESC
    LIMIT 1;

    -- Actualizar el título de la conversación con el nombre del usuario y el último mensaje
    UPDATE conversations
    SET titulo = CONCAT(user_name, ': ', last_message_text), fechaactualizado = NOW()
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
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Ruben','Ruben@ruben','Ruben1','R',NULL),(3,'Jose','jose@gmail.com','ruben3','J',NULL),(4,'Javier','javier@hotmail.com','javi1237','J',NULL),(5,'Carlitos','penpapi23@gmail.com','penpapi432','C',NULL),(6,'Alberto-DobleH','alberthdz@live.es','12345678','A','6681348867'),(7,'javier-ctrlz','javier.zapien237@gmail.com','javier2004','J',NULL),(8,'Zapien','javier.zapien238@gmail.com','1234567u','Z',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
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
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `before_insert_users` BEFORE INSERT ON `users` FOR EACH ROW BEGIN
  -- Verifica que el username no sea nulo
  IF NEW.username IS NOT NULL AND CHAR_LENGTH(NEW.username) > 0 THEN
    -- Toma la primera letra del username, la convierte a mayúsculas y la inserta en imguser
    SET NEW.imguser = UPPER(LEFT(NEW.username, 1));
  ELSE
    -- Si no hay username, establece imguser como NULL o un valor por defecto
    SET NEW.imguser = NULL;
  END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

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
        AND fechaactualizado IS NOT NULL
    ORDER BY 
        c.fechaactualizado DESC;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `obtenermensajes` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `obtenermensajes`(IN chat_id INT)
BEGIN
	SELECT
		m.id,
		m.conversation_id,
		m.userid,
		m.txt_message,
		m.fechadeenvio,
		u.username
	FROM messages m
	LEFT JOIN users u ON m.userid = u.id
    WHERE m.conversation_id = chat_id;
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

-- Dump completed on 2024-12-19 11:34:53
