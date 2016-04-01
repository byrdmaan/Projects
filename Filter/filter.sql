-- mine.sql

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET@OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

CREATE SCHEMA IF NOT EXISTS Filter DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
USE Filter ;

DROP TABLE IF EXISTS Filter.registeredUser ;

CREATE TABLE IF NOT EXISTS Filter.registeredUser (
  userId INT(11) NOT NULL AUTO_INCREMENT,
  username VARCHAR(25) NOT NULL,
  fName VARCHAR(25) NOT NULL,
  lName VARCHAR(25) NULL,
  email VARCHAR(30) NOT NULL,
  password VARCHAR(15) NOT NULL,
  zipcode INT(5) NOT NULL,
  rating INT(1) NOT NULL,
  phone VARCHAR(10) NULL,
  PRIMARY KEY (userId))
ENGINE = InnoDB;