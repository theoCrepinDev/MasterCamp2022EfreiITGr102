if(database db_mastercamp exist){
  drop database db_mastercamp;
}

create database db_mastercamp;

use db_mastercamp;

CREATE TABLE Suffrage(
   ID_suffrage INT,
   Nom_suffrage VARCHAR(50),
   Description_suffrage TEXT,
   Date_fin_suffrage DATE,
   PRIMARY KEY(ID_suffrage)
);

CREATE TABLE Candidat(
   ID_candidat INT,
   Nom_candidat VARCHAR(50),
   Prénom_candidat VARCHAR(50),
   Description_candidat TEXT,
   Nombre_vote INT,
   Photo_candidat TEXT,
   Programme_candidat TEXT,
   ID_suffrage INT NOT NULL,
   PRIMARY KEY(ID_candidat),
   FOREIGN KEY(ID_suffrage) REFERENCES Suffrage(ID_suffrage)
);

CREATE TABLE Utilisateur(
   No_CNI INT,
   Nom_user VARCHAR(50),
   Deuxième_Prénom VARCHAR(50),
   Sexe VARCHAR(50),
   Date_Naissance DATE,
   Ville_Naissance VARCHAR(50),
   Addresse_résidence VARCHAR(200),
   Code_Postal INT,
   Prénom_user VARCHAR(50),
   Email VARCHAR(100),
   MotDePass TEXT,
   Admin LOGICAL,
   ID_candidat INT NOT NULL,
   PRIMARY KEY(No_CNI),
   FOREIGN KEY(ID_candidat) REFERENCES Candidat(ID_candidat)
);

CREATE TABLE Eligible(
   No_CNI INT,
   ID_suffrage INT,
   Vote CHAR(3),
   PRIMARY KEY(No_CNI, ID_suffrage),
   FOREIGN KEY(No_CNI) REFERENCES Utilisateur(No_CNI),
   FOREIGN KEY(ID_suffrage) REFERENCES Suffrage(ID_suffrage)
);
