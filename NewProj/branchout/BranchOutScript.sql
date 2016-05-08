--mySQL script for BranchOut
--Tuesday October 6, 2015

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET@OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

CREATE SCHEMA IF NOT EXISTS BranchOut DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
USE BranchOut ;

-- -----------------------------------------------------
-- Table BranchOut.registeredUser
-- -----------------------------------------------------

DROP TABLE IF EXISTS BranchOut.registeredUser ;

CREATE TABLE IF NOT EXISTS BranchOut.registeredUser (
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

-- -----------------------------------------------------
-- Table BranchOut.events
-- -----------------------------------------------------

DROP TABLE IF EXISTS BranchOut.events ;

CREATE TABLE IF NOT EXISTS BranchOut.events (
  userId INT(11) NOT NULL,
  eventId INT(11) NOT NULL AUTO_INCREMENT,
  eventName VARCHAR(45),
  eventDate VARCHAR(10) NOT NULL,
  startTime VARCHAR(5) NOT NULL,
  endTime VARCHAR(5),
  numFlags INT(5),
  venue VARCHAR(25),
  street VARCHAR(45),
  city VARCHAR(30),
  zipcode INT(5),
  description VARCHAR(250),
  image VARCHAR(100),
  valueChanged VARCHAR(45),
  PRIMARY KEY (eventId))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table BranchOut.category_selected
-- -----------------------------------------------------

DROP TABLE IF EXISTS BranchOut.category_selected ;

CREATE TABLE IF NOT EXISTS BranchOut.category_selected (
  eventId INT(11) NOT NULL,
  catId INT(5))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table BranchOut.category_options
-- -----------------------------------------------------

DROP TABLE IF EXISTS BranchOut.category_options ;

CREATE TABLE IF NOT EXISTS BranchOut.category_options (
  catName VARCHAR(30),
  catId INT(5))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table BranchOut.interested
-- -----------------------------------------------------

DROP TABLE IF EXISTS BranchOut.interested ;

CREATE TABLE IF NOT EXISTS BranchOut.interested (
  userId INT(11),
  eventId INT(11),
  changed BOOLEAN,
  PRIMARY KEY (userId, eventId))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table BranchOut.going
-- -----------------------------------------------------

DROP TABLE IF EXISTS BranchOut.following ;

CREATE TABLE IF NOT EXISTS BranchOut.following (
  userId INT(11),
  followingId INT(11),
  PRIMARY KEY (userId,followingId),
  FOREIGN KEY (followingId) REFERENCES registeredUser(userId))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Insert Users
-- -----------------------------------------------------

INSERT INTO registeredUser values (1,'atimmins', 'andrew','timmins','atimmins@smu.edu','ilovekitties',78746,5,5129097186);
INSERT INTO registeredUser values (2,'hotdog', 'hotty','mcHotty','mcHotty@gmail.com','powderPuff',11111,5,5121234567);
INSERT INTO registeredUser values (3,'SassyCat', 'James','Timmins','jamestimmins@hotmail.com','cookies',22222,4,5122222222);
INSERT INTO registeredUser values (4,'theStruggleBus', 'Parker','Timmins','ptimmins@space.com','icecream',33333,4,5123334444);
INSERT INTO registeredUser values (5,'llamashephard', 'Michelle','Timmins','Michelle@smu.edu','cheese',44444,4,5125556666);
INSERT INTO registeredUser values (6,'howdyfolks', 'Sam','Burr','Burr@gmail.edu','cake',55555,4,5127778888);
INSERT INTO registeredUser values (7,'catSaysMeow', 'Riley','Heldenfels','riley@me.com','bakedgoods',66666,3,5129990000);
INSERT INTO registeredUser values (8,'MLK', 'Martin','King','martinlking@gmail.com','ILUVBOOKS',77777,3,5121112343);

-- -----------------------------------------------------
-- Insert Events
-- -----------------------------------------------------

INSERT INTO events (userId, eventId, eventName, eventDate, startTime, endTime, numFlags, venue, street, city, zipcode, description, image)
  VALUES (1,10,'mygig', '2015-10-29', '20:00', '21:00', 0,'venue1', '6502 Torrey Pines Cove', 'Dallas', 78746, 'desc1', 'image1'),
         (1,11,'Garage Sale', '2015-10-12', '08:30', '12:00', 0, 'venue 2', '4653 Plop Plop Drive', 'Dallas', 75206, 'desc1', 'image1'),
         (3,12,'Bloc Party', '2015-10-18', '12:00', '14:00', 1,'venue3', '456 The Place', 'Dallas', 75273, 'desc1', 'image1'),
         (4,13,'Romantic Encounter', '2015-10-25', '23:00', '23:50', 5,'venue 4', '123 Park Caves', 'Dallas', 75234, 'desc1', 'image1'),
         (6,14,'BYX Rager', '2015-11-01', '18:00', '23:00', 1,'venue5', '6567 Wealthy Lane', 'Dallas', 75205, 'desc1', 'image1'),
         (5,15,'Cool Frat Party', '2015-12-25', '13:00', '17:00', 0,'venue6', '7890 Peach Cove', 'Dallas', 75206, 'desc1', 'image1'),
         (6,16,'Biker Rally', '2015-11-15', '14:00', '20:00', 3,'venue6', '2002 Sassy Cat Nation', 'Dallas', 75206, 'desc1', 'image1'),
         (7,17,'SLUMBER PARTY', '2015-11-31', '20:00', '12:00', 2,'venue7', '4562 My Town Avenue Boulevard', 'Dallas', 75275, 'desc1', 'image1');
-- -----------------------------------------------------
-- Insert category_selected
-- -----------------------------------------------------

INSERT INTO category_selected values (10,1);
INSERT INTO category_selected values (10,3);
INSERT INTO category_selected values (10,8);

INSERT INTO category_selected values (11,6);
INSERT INTO category_selected values (11,10);

INSERT INTO category_selected values (12,2);
INSERT INTO category_selected values (12,3);
INSERT INTO category_selected values (12,6);
INSERT INTO category_selected values (12,8);

INSERT INTO category_selected values (13,1);
INSERT INTO category_selected values (13,11);

INSERT INTO category_selected values (14,2);
INSERT INTO category_selected values (14,3);
INSERT INTO category_selected values (14,6);
INSERT INTO category_selected values (14,8);


INSERT INTO category_selected values (15,8);
INSERT INTO category_selected values (15,3);
INSERT INTO category_selected values (15,5);

INSERT INTO category_selected values (16,2);
INSERT INTO category_selected values (16,5);
INSERT INTO category_selected values (16,9);

INSERT INTO category_selected values (17,3);
INSERT INTO category_selected values (17,8);

-- -----------------------------------------------------
-- Insert category_options
-- -----------------------------------------------------

INSERT INTO category_options values ('art',1);
INSERT INTO category_options values ('sport',2);
INSERT INTO category_options values ('food',3);
INSERT INTO category_options values ('exhibit or display',4);
INSERT INTO category_options values ('alcohol',5);
INSERT INTO category_options values ('family friendly',6);
INSERT INTO category_options values ('festival',7);
INSERT INTO category_options values ('free',8);
INSERT INTO category_options values ('$',9);
INSERT INTO category_options values ('$$',10);
INSERT INTO category_options values ('$$$',11);

-- -----------------------------------------------------
-- Insert interested
-- -----------------------------------------------------

INSERT INTO interested (userId, eventId, changed)
  VALUES (1,12,FALSE), (1,14,FALSE),
         (2,13,FALSE), (2,15,FALSE),(2,16,FALSE),
         (3,12,FALSE),
         (4,14,FALSE), (4,17,FALSE),
         (5,10,FALSE), (5,11,FALSE),
         (6,12,FALSE),(6,13,FALSE),(6,15,FALSE),(6,16,FALSE),(6,17,FALSE),
         (7,10,FALSE),(7,11,FALSE),(7,12,FALSE),
         (8,11,FALSE),(8,12,FALSE),(8,16,FALSE);

-- -----------------------------------------------------
-- Insert going
-- -----------------------------------------------------

INSERT INTO following values (1,2);
INSERT INTO following values (1,4);

INSERT INTO following values (2,1);
INSERT INTO following values (2,6);
INSERT INTO following values (2,7);

INSERT INTO following values (5,2);
INSERT INTO following values (5,8);

-------------------------------------------------------

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
