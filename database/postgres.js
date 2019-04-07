const Sequelize = require('sequelize');
const dbName = 'zillow';
const mockFeatures = require('./mockFeatures');
const mockInterior = require('./mockInterior');
const features = require('./createMockData');
const fs = require('fs');
const config = require('../config');
const Op = Sequelize.Op
var db, featuresTable;
var dbCount;



  const createConnection = function (cb) {
    console.log('starting Connection');
      //Check for Database creation and Table Creation
      let {Client} = require('pg');
      let postgres = new Client({
        user: config.username,
        database: 'postgres',
        password: config.password,
        host: 'localhost'
      });
      postgres.connect();
      postgres.query(`CREATE DATABASE ${dbName}`, (err) => {
        if (err && !~err.message.indexOf('already exists')) {
          console.log(err);
        } 
          postgres.end();
          postgres = new Client({
            user: config.username,
            database: dbName,
            password: config.password,
            host: 'localhost'
          });
          postgres.connect();
          postgres.query('CREATE TABLE IF NOT EXISTS features (house_id serial PRIMARY KEY, type varchar(255), year_built int, heating varchar (255), cooling varchar (255), parking varchar (255),lot int, days_on_zillow int, bedrooms float, bathrooms float, interiorheating varchar (255), interiorcooling varchar (255), appliances varchar (255), kitchen varchar (255), flooring varchar (255), sqft int);', (err) => {
            console.log(err);
            postgres.end();
            db = new Sequelize(dbName, config.username, config.password, {
              dialect: 'postgres',
              host: 'localhost',
              logging: false
            });
            createModels();
          });
        
        
      });

    let createModels =  function () {
      console.log('creating Models');
      featuresTable = db.define('features', {
        house_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        type: {
          type: Sequelize.STRING
        },
        year_built: {
          type: Sequelize.INTEGER
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
          type: Sequelize.INTEGER
        },
        days_on_zillow: {
          type: Sequelize.INTEGER
        },
        bedrooms: {
          type: Sequelize.FLOAT
        },
        bathrooms: {
          type: Sequelize.FLOAT
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
          type: Sequelize.INTEGER
        }
      }, {timestamps: false});

      featuresTable.count()
      .then((count)=> {
        dbCount = count;
        cb();
      });

      
      }

  }


  var createParams = (numRecords) => {
    let params = [];
    features.createFeatures(numRecords).forEach(house => {
      params.push({type:house.type,
        year_built: house.year_built,
        heating: house.heating,
        cooling: house.cooling,
        parking: house.parking,
        lot: house.lot,
        days_on_zillow: house.days_on_zillow,
        bedrooms: house.bedrooms,
        bathrooms: house.bathrooms,
        interiorheating: house.int_heating,
        interiorcooling: house.int_cooling,
        appliances: house.appliances,
        kitchen: house.kitchen,
        flooring: house.flooring,
        sqft: house.sqft});
    });

    return params;
  }


  //function to load feature mock data
  var loadFeatures = (callback, numRecords = 100, params = []) => {
    // fs.writeFileSync('/Users/apple/Code/RPT11/zillowclone/database/mockfeature.json', JSON.stringify(features.createFeatures()));

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
      featuresTable.findAll({
        where: {
          house_id: id
        }
      }).then((results) => {
          callback(null, results);
      }).catch((err) => {
        callback(err, null);
      });
    };

  var getBedBaths = (id, callback) => {

    featuresTable.findAll({
      attributes: [
        'bedrooms', 'bathrooms', 'sqft'
      ],
      where: {
        house_id: id
      }
    }).then((results) => {
      callback(null, results);
    }).catch((err) => {
      callback(err, null);
    });
  };

  var getAllFeatures = (page = 1, callback) => {
    featuresTable.findAll({
      order: [['house_id', 'ASC']],
      limit: 100,
      where: {
        house_id: {
          [Op.gt]: (100*(page-1))
        }
      }
    }).then((results) => {
        callback(null, results);
    }).catch((err) => {
      callback(err, null);
    });
  };

  var postFeatures = (features, callback) => {
    delete features.house_id;
    features = keepOnlyFieldNames(features);
    featuresTable.upsert(features)
    .then((results) => {
      callback(null, results);
    }).catch((err) => {
      callback(err, null);
    });
  };

  var updateFeatures = (id, features, callback) => {
    if (isNaN(id)) {
      callback('no Id to insert', null);
      return;
    }
    features.house_id = id;
    features = keepOnlyFieldNames(features);
    featuresTable.upsert(features)
    .then((results) => {
      callback(null, results);
    }).catch((err) => {
      callback(err, null);
    });
  };

  var deleteFeatures = (id, callback) => {
    featuresTable.destroy({
      where: {
        house_id: id
      }
    }).then((results) => {
        callback(null, results);
    }).catch((err) => {
      callback(err, null);
    });
  };

  var count = () => {
    return dbCount;
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
      createParams,
      count
    };