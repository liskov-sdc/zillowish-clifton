
const mockFeatures = require('./mockFeatures');
const mockInterior = require('./mockInterior');
const mysql = require('mysql');


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
const loadData = (callback) => {
  mockFeatures.forEach(house => {
    let sql = 'INSERT into features (type, year_built, heating, cooling, parking, lot) VALUES (?,?,?,?,?,?)';
    let params = [house.type,house.year_built,house.heating,house.cooling,house.parking,house.lot];
      db.query(sql, params, (err, results, field) => {
        if (err) {
          console.log(err);
        } else {
          console.log("mockFeatures loaded");
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
          console.log("mockInterior loaded");
        }
      });
  });
};


const getFeatures = (id, callback) => {
  let sqlQuery = 'SELECT * from features WHERE id = ?';
  let params = [`${id}`];
    db.query(sqlQuery, params, (err, results, field ) => {
      if (err) {
        console.log(err);
      } else {
        console.log("results:",results[0].type);
        callback(null, results);
      }
    });
  };

  const getInterior = (id, callback) => {
    let sql = 'select * from interior_features where house_id = ?';
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
  loadData,
  loadInterior,
  getFeatures,
  getInterior
};

