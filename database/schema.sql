DROP DATABASE IF EXISTS zillow;

CREATE DATABASE zillow;

USE zillow;

CREATE TABLE features (
 id int NOT NULL AUTO_INCREMENT,
 type varchar(255),
 year_built varchar (255),
 heating varchar (255),
 cooling varchar (255),
 parking varchar (255),
 lot varchar (255),
 days_on_zillow varchar (255),
 price_per_sqft varchar (255),
 saves varchar (206),
 PRIMARY KEY (id)
);

CREATE TABLE interior_features (
 house_id int NOT NULL AUTO_INCREMENT,
 bedrooms varchar(255),
 bathrooms varchar (255),
 heating_cooling varchar (255),
 appliances varchar (255),
 kitchen varchar (255),
 flooring varchar (255),
 PRIMARY KEY (house_id),
 FOREIGN KEY (house_id) REFERENCES features(id)
);

