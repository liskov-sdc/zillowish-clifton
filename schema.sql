DROP DATABASE IF EXISTS zillow;

CREATE DATABASE zillow;

USE zillow;

CREATE TABLE features (
 house_id int NOT NULL AUTO_INCREMENT,
 type varchar(255),
 year_built int,
 heating varchar (255),
 cooling varchar (255),
 parking varchar (255),
 lot int,
 days_on_zillow int,
 bedrooms float,
 bathrooms float,
 interiorheating varchar (255),
 interiorcooling varchar (255),
 appliances varchar (255),
 kitchen varchar (255),
 flooring varchar (255),
 sqft int,
 PRIMARY KEY (house_id)
);

-- mysql -u root < schema.sql