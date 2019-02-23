
const mockFeatures = require('./mockFeatures');
const mockInterior = require('./mockInterior');
const mysql = require('mysql');
const features = require('./createMockData');


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'zillow'
});

db.connect((err) => {
  if (err) {
    console.error('error connecting: ' + err);
  } else {
    console.log("Connected to database");
  }
});

//function to load mock data
const loadFeatures = (callback) => {
  features.createFeatures().forEach(house => {
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
    let sql = 'INSERT into interior_features (bedrooms, bathrooms, heating_cooling, appliances, kitchen, flooring) VALUES (?,?,?,?,?,?)';
    let params = [feature.bedrooms, feature.bathrooms, feature.heating_cooling, feature.appliances, feature.kitchen, feature.flooring];
      db.query(sql, params, (err, results, field) => {
        if (err) {
          console.log(err);
        } else {
          console.log("mockInterior loaded", results);
        }
      });
  });
};


const getFeatures = (id, callback) => {
  let sqlQuery = 'SELECT * from features WHERE house_id = ?';
  let params = [`${id}`];
    db.query(sqlQuery, params, (err, results) => {
      if (err) {
        console.log(err);
      } else {
        console.log("results:",results[0].type);
        callback(null, results);
      }
    });
  };

  //function to seed the interior_features table with 100 mock data points for the interior features of the house
  const getInterior = (id, callback) => {
    let sql = 'select * from interior_features where feature_id = ?';
    let params = [`${id}`];
    console.log("params:", params);
      db.query(sql, params, (err, results, field ) => {
        if (err) {
          console.log(err);
        } else {
          console.log("results:",results);
          callback(null, results);
        }
      });
    };

module.exports = {
  loadFeatures,
  loadInterior,
  getFeatures,
  getInterior,
  getBedBaths
};

