const mysql = require('mysql');
const featuresTable = 'CREATE TABLE IF NOT EXISTS features (house_id int NOT NULL AUTO_INCREMENT, type varchar(255), year_built int, heating varchar (255), cooling varchar (255), parking varchar (255),lot int, days_on_zillow int, bedrooms float, bathrooms float, interiorheating varchar (255), interiorcooling varchar (255), appliances varchar (255), kitchen varchar (255), flooring varchar (255), sqft int, PRIMARY KEY (house_id));'
const dbName = 'zillow';
const mockFeatures = require('./mockFeatures');
const mockInterior = require('./mockInterior');
const features = require('./createMockData');
const fs = require('fs');
const config = require('../config');
var db;


  const createConnection = function (cb) {

    db = mysql.createConnection({
      host: 'localhost',
      user: config.username,
      password: config.password,
      multipleStatements: true
    });

    db.connect((err) => {
      if (err) {
        console.error('error connecting: ' + err);
      } else {
        console.log("Connected to database");
      }
    });

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
              cb();
            });
          }
        })
      }
    });


  }

  const createParams = (numRecords) => {
    let params = [];

    features.createFeatures(numRecords).forEach(house => {
      params.push([house.type, house.year_built, house.heating, house.cooling, house.parking, house.lot, house.days_on_zillow, house.bedrooms, house.bathrooms, house.int_heating, house.int_cooling, house.appliances, house.kitchen, house.flooring, house.sqft]);
    });

    return params;
  }


  //function to load feature mock data
  const loadFeatures = (callback, numRecords = 100, params = []) => {
    // fs.writeFileSync('/Users/apple/Code/RPT11/zillowclone/database/mockfeature.json', JSON.stringify(features.createFeatures()));
    let sql = 'INSERT into features (type, year_built, heating, cooling, parking, lot, days_on_zillow, bedrooms, bathrooms, interiorheating, interiorcooling, appliances, kitchen, flooring, sqft) VALUES ?';
    if (params.length === 0) {
      features.createFeatures(numRecords).forEach(house => {
        params.push([house.type, house.year_built, house.heating, house.cooling, house.parking, house.lot, house.days_on_zillow, house.bedrooms, house.bathrooms, house.int_heating, house.int_cooling, house.appliances, house.kitchen, house.flooring, house.sqft]);
      });
    }

    db.query(sql, [params], (err, results) => {
      if (err) {
        console.log(err);
      } else {
        callback();
      }
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

  const getBedBaths = (id, callback) => {
    let sql = 'select bedrooms, bathrooms, sqft from features where house_id = ?';
    let params = [`${id}`];
      db.query(sql, params, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          callback(null, results);
        }
      });
    };

    var getAllFeatures = (page, callback) => {

    };

    var postFeatures = (features, callback) => {
      if (isNaN(id)) {
        callback('no Id to insert', null);
      }
      delete features.house_id;
      features = keepOnlyFieldNames(features);
      featuresTable.upsert(features);
    };

    var updateFeatures = (id, features, callback) => {
      if (isNaN(id)) {
        callback('no Id to insert', null);
      }
      features.house_id = id;
      features = keepOnlyFieldNames(features);
    };

    var deleteFeatures = (id, callback) => {

    };

    var keepOnlyFieldNames = ({ house_id, type, year_built, heating, cooling, parking, lot, days_on_zillow, bedrooms, bathrooms, interiorheating, interiorcooling, appliances, kitchen, flooring, sqft}) => {
      return ({
        house_id,
        type,
        year_built,
        heating,
        cooling,
        parking,
        lot,
        days_on_zillow,
        bedrooms,
        bathrooms,
        interiorheating,
        interiorcooling,
        appliances,
        kitchen,
        flooring,
        sqft});
    };

    module.exports = {
      loadFeatures,
      getFeatures,
      getAllFeatures,
      updateFeatures,
      deleteFeatures,
      postFeatures,
      getBedBaths,
      createConnection,
      createParams
    };