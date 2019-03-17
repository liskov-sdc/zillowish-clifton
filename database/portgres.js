const Sequelize = require('sequelize');
const featuresTable = 'CREATE TABLE IF NOT EXISTS features (house_id int NOT NULL AUTO_INCREMENT, type varchar(255), year_built varchar (255), heating varchar (255), cooling varchar (255), parking varchar (255),lot varchar (255), days_on_zillow varchar (255), price_per_sqft varchar (255), PRIMARY KEY (house_id));'
const interiorTable = 'CREATE TABLE IF NOT EXISTS interior_features (feature_id int NOT NULL AUTO_INCREMENT, bedrooms varchar(255), bathrooms varchar (255), interiorheating varchar (255), interiorcooling varchar (255), appliances varchar (255), kitchen varchar (255), flooring varchar (255), house_id varchar (255), sqft varchar (255), PRIMARY KEY (feature_id));'
const dbName = 'zillow';
const mockFeatures = require('./mockFeatures');
const mockInterior = require('./mockInterior');
const features = require('./createMockData');
const fs = require('fs');
const config = require('../config');
var db, features, interiorFeatures;



  const createConnection = function (cb) {
    try {
      db = new Sequelize(dbName, config.username, config.password, {
        dialect: 'postgres',
        host: 'localhost'
      });
      createModels();
    } catch {
      //Check for Database creation and Table Creation
      let {Client} = require('pg');
      let postgres = new Client({
        user: config.user,
        password: config.password,
        host: 'localhost'
      });
      postgres.connect();
      postgres.query(`CREATE DATABASE ${dbName}`, (err) => {
        if (err && !~err.message.indexOf('already exists')) {
          console.log(err);
        } else {
          postgres.end();
          db = new Sequelize(dbName, config.username, config.password, {
            dialect: 'postgres',
            host: 'localhost'
          });
          createModels();
        }

      })

    }


    let createModels =  function () {

      features = sequelize.define('features', {
        house_id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false
        },
        type: {
          type: Sequelize.STRING
        },
        year_built: {
          type: Sequelize.STRING
        },
        heating: {
          type: Sequelize.STRING
        },
        cooling: {
          type: Sequelize.STRING
        },
        parking: {
          type: Sequelize.STRING
        },
        lot: {
          type: Sequelize.STRING
        },
        price_per_sqft: {
          type: Sequelize.STRING
        }
      }, {timestamps: false});

      CREATE TABLE interior_features (
        feature_id int NOT NULL AUTO_INCREMENT,
        bedrooms varchar(255),
        bathrooms varchar (255),
        interiorheating varchar (255),
        interiorcooling varchar (255),
        appliances varchar (255),
        kitchen varchar (255),
        flooring varchar (255),
        house_id varchar (255),
        sqft varchar (255),
        PRIMARY KEY (feature_id)
       );
      Price = sequelize.define('interior_features', {
        feature_id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false
        },
        bedrooms: {
          type: Sequelize.STRING
        },
        bathrooms: {
          type: Sequelize.STRING
        },
        interiorheating: {
          type: Sequelize.STRING
        },
        interiorcooling: {
          type: Sequelize.STRING
        },
        appliances: {
          type: Sequelize.STRING
        },
        kitchen: {
          type: Sequelize.STRING
        },
        flooring: {
          type: Sequelize.STRING
        },
        sqft: {
          type: Sequelize.STRING
        },
        house_id: {
          type: Sequelize.STRING
        },

      }, {timestamps: false});

      cb();
      }

  }


  //function to load feature mock data
  const loadFeatures = (callback) => {
    // fs.writeFileSync('/Users/apple/Code/RPT11/zillowclone/database/mockfeature.json', JSON.stringify(features.createFeatures()));
    mockFeatures.forEach(house => {
      let sql = 'INSERT into features (type, year_built, heating, cooling, parking, lot, days_on_zillow) VALUES (?,?,?,?,?,?,?)';
      let params = [house.type, house.year_built, house.heating, house.cooling, house.parking, house.lot, house.days_on_zillow];
        db.query(sql, params, (err, results) => {
          if (err) {
            console.log(err);
          } else {
            console.log("mockFeatures loaded", results);
          }
        });
      });
    };

    //function to load interior mock JSON data
  const loadInterior = (callback) => {
    mockInterior.forEach(feature => {
      let sql = 'INSERT into interior_features (bedrooms, bathrooms, interiorheating, interiorcooling, appliances, kitchen, flooring, sqft) VALUES (?,?,?,?,?,?,?,?)';
      let params = [feature.bedrooms, feature.bathrooms, feature.heating, feature.cooling, feature.appliances, feature.kitchen, feature.flooring, feature.sqft];
        db.query(sql, params, (err, results) => {
          if (err) {
            console.log(err);
          } else {
            console.log("mockInterior loaded", results);
          }
        });
    });
  };

  /////////////////////////Retreiving Facts and Features///////////////////////////
  const getFeatures = (id, callback) => {
    let sqlQuery = 'SELECT * from features WHERE house_id = ?';
    let params = [`${id}`];
      db.query(sqlQuery, params, (err, results) => {
        if (err) {
          console.log(err);
        } else {
          callback(null, results);
        }
      });
    };


    const getInterior = (id, callback) => {
      let sql = 'select * from interior_features where feature_id = ?';
      let params = [`${id}`];
        db.query(sql, params, (err, results) => {
          if (err) {
            console.log(err);
          } else {
            callback(null, results);
          }
        });
      };

  const getBedBaths = (id, callback) => {
    let sql = 'select feature_id, bedrooms, bathrooms, sqft from interior_features where feature_id = ?';
    let params = [`${id}`];
      db.query(sql, params, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          callback(null, results);
        }
      });
    };

    module.exports = {
      loadFeatures,
      loadInterior,
      getFeatures,
      getInterior,
      getBedBaths,
      createConnection
    };