create database agence;
use agence;

create table logement(
code int not null auto_increment unique,
type ENUM('Maison', 'Appartement', 'Pavillon'),
nb_Pieces int (50) not null,
nb_Surfaces int (50) not null,
Etat ENUM('Neuf','Bon_etat','Bon','Mauvais_etat'),
adresse varchar(50)not null,
nom_Proprietaire varchar(20) not null,
prenom_Proprietaire varchar(20),
prix int(10) not null,
date_Dispo Date not null,
ville varchar(20) not null,
PRIMARY KEY(code));


CREATE TABLE locataires (
  id INT auto_increment PRIMARY KEY,
  nom VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  telephone VARCHAR(20) NOT NULL,
  mot_de_passe VARCHAR(50) NOT NULL
);

CREATE TABLE proprietaires (
  id INT auto_increment PRIMARY KEY,
  nom VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  telephone VARCHAR(20) NOT NULL,
  mot_de_passe VARCHAR(50) NOT NULL
);

CREATE TABLE demande_location (
  id INT auto_increment PRIMARY KEY,
  id_locataire INT NOT NULL,
  id_logement INT NOT NULL,
  date_debut DATE NOT NULL,
  duree INT NOT NULL,
  FOREIGN KEY (id_locataire) REFERENCES locataires(id),
  FOREIGN KEY (id_logement) REFERENCES logement(code)
);

CREATE TABLE paiement (
  id INT auto_increment PRIMARY KEY,
  id_locataire INT NOT NULL,
  id_demande_location INT NOT NULL,
  montant FLOAT NOT NULL,
  date_paiement DATE NOT NULL,
  etat ENUM('en_attente', 'valide', 'annule') NOT NULL DEFAULT 'en_attente',
  FOREIGN KEY (id_locataire) REFERENCES locataires(id),
  FOREIGN KEY (id_demande_location) REFERENCES demande_location(id)
);

use agence;

-- Remplir table logement
INSERT INTO logement (type, nb_Pieces, nb_Surfaces, Etat, adresse, nom_Proprietaire, prenom_Proprietaire, prix, date_Dispo, ville)
VALUES ('Maison', 4, 120, 'Bon_etat', '123 Rue des Fleurs', 'Dupont', 'Jean', 150000, '2023-05-01', 'Paris'),
('Appartement', 3, 80, 'Neuf', '456 des Champs', 'Martin', 'Sophie', 100000, '2023-04-15', 'Lyon'),
('Pavillon', 5, 200, 'Bon', '789 des Cerisiers', 'Lefebvre', 'Julien', 200000, '2023-06-01', 'Marseille');

-- Remplir table locataires
INSERT INTO locataires (nom, email, telephone, mot_de_passe)
VALUES ('Dubois', 'dubois@gmail.com', '0612345678', 'mdp123'),
('Durand', 'durand@gmail.com', '0623456789', 'mdp456'),
('Leclerc', 'leclerc@gmail.com', '0634567890', 'mdp789');

-- Remplir la table proprietaires
INSERT INTO proprietaires (nom, email, telephone, mot_de_passe)
VALUES ('Dupont', 'dupont@gmail.com', '0712345678', 'mdp123'),
('Martin', 'martin@gmail.com', '0723456789', 'mdp456'),
('Lefebvre', 'lefebvre@gmail.com', '0734567890', 'mdp789');

-- Remplir table demande_location
INSERT INTO demande_location (id_locataire, id_logement, date_debut, duree)
VALUES (1, 1, '2023-05-01', 12),
(2, 2, '2023-04-15', 6),
(3, 3, '2023-06-01', 9);

-- Remplir table paiement
INSERT INTO paiement (id_locataire, id_demande_location, montant, date_paiement, etat)
VALUES (1, 1, 1000, '2023-05-01', 'valide'),
(2, 2, 500, '2023-04-16', 'en_attente'),
(3, 3, 1500, '2023-06-01', 'en_attente');



