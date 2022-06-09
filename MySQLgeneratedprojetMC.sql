create database MasterCampProjetttt;
use MasterCampProjetttt;

DROP TABLE IF EXISTS user ;
CREATE TABLE user (n_carte_identite_user BIGINT AUTO_INCREMENT NOT NULL,
nom_user VARCHAR(200),
prenom_user VARCHAR(200),
adresse_mail_user VARCHAR(200),
date_naissance_user DATE,
mot_de_passe_user VARCHAR(200),
admin_user BOOLEAN,
PRIMARY KEY (n_carte_identite_user)) ENGINE=InnoDB;

DROP TABLE IF EXISTS candidat ;
CREATE TABLE candidat (id_candidat_candidat BIGINT AUTO_INCREMENT NOT NULL,
nom_candidat VARCHAR(200),
description_candidat VARCHAR(200),
image_candidat VARCHAR(200),
PRIMARY KEY (id_candidat_candidat)) ENGINE=InnoDB;

DROP TABLE IF EXISTS soffrage ;
CREATE TABLE soffrage (id_soffrage_soffrage BIGINT AUTO_INCREMENT NOT NULL,
nom_vote_soffrage VARCHAR(200),
theme_soffrage VARCHAR(200),
date_fin_soffrage DATE,
secret_soffrage BOOLEAN,
description_soffrage VARCHAR(200),
PRIMARY KEY (id_soffrage_soffrage)) ENGINE=InnoDB;

DROP TABLE IF EXISTS vote ;
CREATE TABLE vote (n_carte_identite_user BIGINT AUTO_INCREMENT NOT NULL,
id_candidat_candidat BIGINT NOT NULL,
PRIMARY KEY (n_carte_identite_user,
 id_candidat_candidat)) ENGINE=InnoDB;

DROP TABLE IF EXISTS participe ;
CREATE TABLE participe (id_candidat_candidat BIGINT AUTO_INCREMENT NOT NULL,
id_soffrage_soffrage BIGINT NOT NULL,
PRIMARY KEY (id_candidat_candidat,
 id_soffrage_soffrage)) ENGINE=InnoDB;

DROP TABLE IF EXISTS éligible ;
CREATE TABLE éligible (n_carte_identite_user BIGINT AUTO_INCREMENT NOT NULL,
id_soffrage_soffrage BIGINT NOT NULL,
PRIMARY KEY (n_carte_identite_user,
 id_soffrage_soffrage)) ENGINE=InnoDB;

ALTER TABLE vote ADD CONSTRAINT FK_vote_n_carte_identite_user FOREIGN KEY (n_carte_identite_user) REFERENCES user (n_carte_identite_user);

ALTER TABLE vote ADD CONSTRAINT FK_vote_id_candidat_candidat FOREIGN KEY (id_candidat_candidat) REFERENCES candidat (id_candidat_candidat);
ALTER TABLE participe ADD CONSTRAINT FK_participe_id_candidat_candidat FOREIGN KEY (id_candidat_candidat) REFERENCES candidat (id_candidat_candidat);
ALTER TABLE participe ADD CONSTRAINT FK_participe_id_soffrage_soffrage FOREIGN KEY (id_soffrage_soffrage) REFERENCES soffrage (id_soffrage_soffrage);
ALTER TABLE éligible ADD CONSTRAINT FK_éligible_n_carte_identite_user FOREIGN KEY (n_carte_identite_user) REFERENCES user (n_carte_identite_user);
ALTER TABLE éligible ADD CONSTRAINT FK_éligible_id_soffrage_soffrage FOREIGN KEY (id_soffrage_soffrage) REFERENCES soffrage (id_soffrage_soffrage);
