DROP DATABASE IF EXISTS aboutGame;

CREATE DATABASE aboutGame;

USE aboutGame;

CREATE TABLE about (
  gameId int NOT NULL AUTO_INCREMENT,
  aboutHeader varchar(1000) NOT NULL,
  aboutBody varchar(1000) NOT NULL,
  featureTitle varchar(1000) NOT NULL,
  features varchar(1000) NOT NULL,
  PRIMARY KEY (gameId)
);
