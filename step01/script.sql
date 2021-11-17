-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema jobboard
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema jobboard
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `jobboard` DEFAULT CHARACTER SET utf8 ;
USE `jobboard` ;

-- -----------------------------------------------------
-- Table `jobboard`.`Compagnies`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `jobboard`.`Compagnies` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `address` VARCHAR(255) NOT NULL,
  `compagnie_name` VARCHAR(255) NOT NULL,
  `compagnie_description` VARCHAR(255) NULL DEFAULT NULL,
  `link` VARCHAR(255) NULL DEFAULT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NULL DEFAULT NULL,
  `siret` VARCHAR(255) NULL DEFAULT NULL,
  `role` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `jobboard`.`Advertisements`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `jobboard`.`Advertisements` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `short_desc` LONGTEXT NOT NULL,
  `long_desc` LONGTEXT NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `contract` VARCHAR(45) NOT NULL,
  `wage` INT NULL DEFAULT NULL,
  `city` VARCHAR(45) NULL DEFAULT NULL,
  `domain` VARCHAR(45) NOT NULL,
  `date_start` DATE NOT NULL,
  `date_end` DATE NULL DEFAULT NULL,
  `Compagnies_id` INT NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`, `Compagnies_id`),
  INDEX `fk_Advertisements_Compagnies1_idx` (`Compagnies_id` ASC) VISIBLE,
  CONSTRAINT `fk_Advertisements_Compagnies1`
    FOREIGN KEY (`Compagnies_id`)
    REFERENCES `jobboard`.`Compagnies` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 9
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `jobboard`.`Applications`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `jobboard`.`Applications` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `message` VARCHAR(255) NULL DEFAULT NULL,
  `Users_email` VARCHAR(255) NOT NULL,
  `Advertisements_id` INT NOT NULL,
  PRIMARY KEY (`id`, `Users_email`, `Advertisements_id`),
  INDEX `fk_Application_Advertisements1_idx` (`Advertisements_id` ASC) VISIBLE,
  INDEX `fk_Application_Users_idx` (`Users_email` ASC) VISIBLE,
  CONSTRAINT `fk_Application_Advertisements1`
    FOREIGN KEY (`Advertisements_id`)
    REFERENCES `jobboard`.`Advertisements` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Application_Users`
    FOREIGN KEY (`Users_email`)
    REFERENCES `jobboard`.`Users` (`email`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 12
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `jobboard`.`Users_preferences`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `jobboard`.`Users_preferences` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `contract` VARCHAR(255) NULL DEFAULT NULL,
  `city` VARCHAR(255) NULL DEFAULT NULL,
  `domain` VARCHAR(255) NULL DEFAULT NULL,
  `Users_id` INT NOT NULL,
  `Users_email` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`, `Users_id`, `Users_email`),
  INDEX `fk_Users_preference_Users1_idx` (`Users_id` ASC, `Users_email` ASC) VISIBLE,
  CONSTRAINT `fk_Users_preference_Users1`
    FOREIGN KEY (`Users_id` , `Users_email`)
    REFERENCES `jobboard`.`Users` (`id` , `email`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `jobboard`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `jobboard`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NOT NULL,
  `first_name` VARCHAR(255) NOT NULL,
  `last_name` VARCHAR(255) NOT NULL,
  `birthday` DATE NOT NULL,
  `phone` VARCHAR(45) NOT NULL,
  `description` VARCHAR(255) NULL DEFAULT NULL,
  `role` VARCHAR(45) NULL DEFAULT 'user',
  `password` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`, `email`),
  UNIQUE INDEX `email` (`email` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 139
DEFAULT CHARACTER SET = utf8mb3;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
