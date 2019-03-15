const mysql = require('mysql');
const featuresTable = 'CREATE TABLE IF NOT EXISTS features (house_id int NOT NULL AUTO_INCREMENT, type varchar(255), year_built varchar (255), heating varchar (255), cooling varchar (255), parking varchar (255),lot varchar (255), days_on_zillow varchar (255), price_per_sqft varchar (255), PRIMARY KEY (house_id));'
const interiorTable = 'CREATE TABLE IF NOT EXISTS interior_features (feature_id int NOT NULL AUTO_INCREMENT, bedrooms varchar(255), bathrooms varchar (255), interiorheating varchar (255), interiorcooling varchar (255), appliances varchar (255), kitchen varchar (255), flooring varchar (255), house_id varchar (255), sqft varchar (255), PRIMARY KEY (feature_id));'
const dbName = 'zillow';
const mockFeatures = require('./mockFeatures');
const mockInterior = require('./mockInterior');
const features = require('./createMockData');
const fs = require('fs');

  const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    multipleStatements: true,
  });

  db.connect((err) => {
    if (err) {
      console.error('error connecting: ' + err);
    } else {
      console.log("Connected to database");
    }
  });

  const createDatabase = function (cb) {
    //Check for Database creation and Table Creation
    db.query('CREATE DATABASE IF NOT EXISTS ??', dbName, function (err, results) {
      if (err) {
        console.log(err);
      } else {
        db.changeUser({
          database: dbName
        }, function (err, results) {
          if (err) {
            console.log(err);
          } else {
            db.query(featuresTable, function (err, results) {
              if (err) {
                console.log(err);
              } else {
                db.query(interiorTable, function (err, results) {
                  if (err) {
                    console.log(err);
                  } else {
                    cb();
                  }
                });
              }
            });
          }
        })
      }
    });
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
      createDatabase
    };