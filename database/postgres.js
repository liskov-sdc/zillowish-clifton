const dbName = 'zillow';
const features = require('./createMockData');
const config = require('../config');
var dbCount;
let {Client} = require('pg');
let postgres = new Client({
        user: config.username,
        database: 'postgres',
        password: config.password,
        host: config.host
      });
 postgres.connect();

  const createConnection = function (cb) {
    console.log('starting Connection');
      //Check for Database creation and Table Creation

     
      postgres.query(`CREATE DATABASE ${dbName}`, (err) => {
        if (err && !~err.message.indexOf('already exists')) {
          console.log(err);
        } 
          postgres.end();
          postgres = new Client({
            user: config.username,
            database: dbName,
            password: config.password,
            host: config.host
          });
          postgres.connect();
          postgres.query('CREATE TABLE IF NOT EXISTS features (house_id serial PRIMARY KEY, type varchar(255), year_built int, heating varchar (255), cooling varchar (255), parking varchar (255),lot int, days_on_zillow int, bedrooms float, bathrooms float, interiorheating varchar (255), interiorcooling varchar (255), appliances varchar (255), kitchen varchar (255), flooring varchar (255), sqft int);', (err) => {
            if (err) {
              console.log(err);
            } else {
              postgres.query('Select Count(*) as count from features', (err, results)=>{
              dbCount = results.rows[0].count;
              cb();
              })
            }
            
          });

        
      });

  }


  var createParams = (numRecords) => {
    let params = [];
    features.createFeatures(numRecords).forEach(house => {
      params.push([house.type,
        house.year_built,
        house.heating,
        house.cooling,
        house.parking,
        house.lot,
        house.days_on_zillow,
        house.bedrooms,
        house.bathrooms,
        house.int_heating,
        house.int_cooling,
        house.appliances,
        house.kitchen,
        house.flooring,
        house.sqft]);
    });

    return params;
  }


  //function to load feature mock data
  var loadFeatures = (callback, numRecords = 100, params = []) => {

    if (params.length === 0) {
      features.createFeatures(numRecords).forEach(house => {
        params.push([house.type, house.year_built, house.heating, house.cooling, house.parking, house.lot, house.days_on_zillow, house.bedrooms, house.bathrooms, house.int_heating, house.int_cooling, house.appliances, house.kitchen, house.flooring, house.sqft]);
      });
    }

    featuresTable.bulkCreate(params).then(()=> {
      callback();
    }).catch((err)=> {
      console.log('an error occured');
      console.log(err);
    });
  }

  /////////////////////////Retreiving Facts and Features///////////////////////////
  var getFeatures = (id, callback) => {
      return postgres.query('Select * from features where house_id=$1',[id])
      .then((results) => {
          return callback(null, results.rows);
      }).catch((err) => {
        callback(err, null);
      });
    };

  var getBedBaths = (id, callback) => {

    return postgres.query('Select bedrooms, bathrooms, sqft from features where house_id=$1',[id])
    .then((results) => {
        return callback(null, results.rows);
    }).catch((err) => {
      callback(err, null);
    });
  };

  var getAllFeatures = (page = 1, callback) => {
    let valuesToSkip = (100*(page-1))
    return postgres.query('Select bedrooms, bathrooms, sqft from features  where house_id > $1 ORDER BY house_id ASC LIMIT 100',[valuesToSkip])
    .then((results) => {
        return callback(null, results.rows);
    }).catch((err) => {
      callback(err, null);
    });
  };

  var postFeatures = (house, callback) => {
    house.house_id = null;
    return postgres.query('Insert Into features Values ($1, $2, $3, $4, $5, $6, $7, $8, &9, $10, $11, $12, $13, $14, $15)',[house.type, house.year_built, house.heating, house.cooling, house.parking, house.lot, house.days_on_zillow, house.bedrooms, house.bathrooms, house.int_heating, house.int_cooling, house.appliances, house.kitchen, house.flooring, house.sqft])
    .then((results) => {
        return callback(null, results);
    }).catch((err) => {
      callback(err, null);
    });
  };

  // var updateFeatures = (id, features, callback) => {
  //   if (isNaN(id)) {
  //     callback('no Id to insert', null);
  //     return;
  //   }
  //   features.house_id = id;
  //   featuresTable.update(features, {where: {house_id: id}})
  //   .then((results) => {
  //     callback(null, results);
  //   }).catch((err) => {
  //     callback(err, null);
  //   });
  // };

  // var deleteFeatures = (id, callback) => {
  //   featuresTable.destroy({
  //     where: {
  //       house_id: id
  //     }
  //   }).then((results) => {
  //       callback(null, results);
  //   }).catch((err) => {
  //     callback(err, null);
  //   });
  // };

  var count = () => {
    return dbCount;
  };

    module.exports = {
      getFeatures,
      getAllFeatures,
      postFeatures,
      getBedBaths,
      createConnection,
      createParams,
      count
    };