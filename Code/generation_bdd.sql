CREATE DATABASE db_mastercamp;

use db_mastercamp;

CREATE TABLE `suffrage` (
  `ID_suffrage` int NOT NULL AUTO_INCREMENT,
  `Nom_suffrage` varchar(50) DEFAULT NULL,
  `Description_suffrage` text,
  `Date_fin_suffrage` date DEFAULT NULL,
  PRIMARY KEY (`ID_suffrage`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
;
CREATE TABLE `candidat` (
  `ID_candidat` int NOT NULL AUTO_INCREMENT,
  `Nom_candidat` varchar(50) DEFAULT NULL,
  `Prénom_candidat` varchar(50) DEFAULT NULL,
  `Description_candidat` text,
  `Nombre_vote` int DEFAULT '0',
  `Photo_candidat` text,
  `Lien_programme_candidat` text,
  `ID_suffrage` int NOT NULL,
  PRIMARY KEY (`ID_candidat`),
  KEY `ID_suffrage` (`ID_suffrage`),
  CONSTRAINT `candidat_ibfk_1` FOREIGN KEY (`ID_suffrage`) REFERENCES `suffrage` (`ID_suffrage`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
;
CREATE TABLE `user` (
  `Email` varchar(100) NOT NULL,
  `ID_user` int NOT NULL,
  `Nom_user` varchar(50) DEFAULT NULL,
  `Prénom_user` varchar(50) DEFAULT NULL,
  `MotDePass` text,
  `Admin` tinyint(1) DEFAULT NULL,
  `ID_candidat` int NOT NULL,
  PRIMARY KEY (`Email`),
  KEY `ID_candidat` (`ID_candidat`),
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`ID_candidat`) REFERENCES `candidat` (`ID_candidat`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
;
CREATE TABLE `commentaire` (
  `ID_commentaire` int NOT NULL AUTO_INCREMENT,
  `Date_commentaire` date DEFAULT NULL,
  `contenu_commentaire` text,
  `ID_suffrage` int NOT NULL,
  `Email` varchar(100) NOT NULL,
  PRIMARY KEY (`ID_commentaire`),
  KEY `ID_suffrage` (`ID_suffrage`),
  KEY `Email` (`Email`),
  CONSTRAINT `commentaire_ibfk_1` FOREIGN KEY (`ID_suffrage`) REFERENCES `suffrage` (`ID_suffrage`),
  CONSTRAINT `commentaire_ibfk_2` FOREIGN KEY (`Email`) REFERENCES `user` (`Email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
;
CREATE TABLE `eligible` (
  `Email` varchar(100) NOT NULL,
  `ID_suffrage` int NOT NULL,
  `vote` varchar(3) DEFAULT 'non',
  PRIMARY KEY (`Email`,`ID_suffrage`),
  KEY `ID_suffrage` (`ID_suffrage`),
  CONSTRAINT `eligible_ibfk_1` FOREIGN KEY (`ID_suffrage`) REFERENCES `suffrage` (`ID_suffrage`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
;