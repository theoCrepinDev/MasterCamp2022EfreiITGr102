create database db_mastercamp;

use db_mastercamp;

CREATE TABLE `suffrage` (
  `ID_suffrage` int NOT NULL AUTO_INCREMENT,
  `Heure_fin_suffrage` time DEFAULT NULL,
  `Nom_suffrage` varchar(50) DEFAULT NULL,
  `Description_suffrage` text,
  `Date_fin_suffrage` date DEFAULT NULL,
  PRIMARY KEY (`ID_suffrage`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `candidat` (
  `ID_candidat` int NOT NULL AUTO_INCREMENT,
  `Nom_candidat` varchar(50) DEFAULT NULL,
  `Prénom_candidat` varchar(50) DEFAULT NULL,
  `Description_candidat` text,
  `Nombre_vote` int DEFAULT '0',
  `Photo_candidat` text,
  `Programme_candidat` text,
  `ID_suffrage` int NOT NULL,
  PRIMARY KEY (`ID_candidat`),
  KEY `candidat_ibfk_1` (`ID_suffrage`),
  CONSTRAINT `candidat_ibfk_1` FOREIGN KEY (`ID_suffrage`) REFERENCES `suffrage` (`ID_suffrage`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `utilisateur` (
  `No_CNI` int NOT NULL,
  `Nom_user` varchar(50) DEFAULT NULL,
  `Deuxième_Prénom` varchar(50) DEFAULT NULL,
  `Sexe` varchar(50) DEFAULT NULL,
  `Date_Naissance` date DEFAULT NULL,
  `Ville_Naissance` varchar(50) DEFAULT NULL,
  `Addresse_résidence` varchar(200) DEFAULT NULL,
  `Code_Postal` int DEFAULT NULL,
  `Prénom_user` varchar(50) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `MotDePass` text,
  `Admin` int DEFAULT NULL,
  `ID_candidat` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`No_CNI`),
  KEY `utilisateur_ibfk_1` (`ID_candidat`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;