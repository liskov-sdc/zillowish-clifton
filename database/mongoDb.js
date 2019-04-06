const mongoose = require('mongoose');
const dbName = 'zillow';
const config = require('../config');


var featuresTable;

const mockFeatures = require('./mockFeatures');
const mockInterior = require('./mockInterior');
const features = require('./createMockData');
const fs = require('fs');
var documentCount = 0;


  var createConnection = function (cb) {

    db = mongoose.connect(`mongodb://${config.host}:27017/${dbName}`, {useNewUrlParser: true});
    let schema = new mongoose.Schema({
      house_id: {
        type: Number,
        unique: true
      },
      type: String,
      year_built: Number,
      heating: String,
      cooling: String,
      parking: String,
      lot: Number,
      days_on_zillow: Number,
      bedrooms: Number,
      bathrooms: Number,
      interiorheating: String,
      interiorcooling: String,
      appliances: String,
      kitchen: String,
      flooring: String,
      sqft: Number
    }, { _id : false });
    featuresTable = mongoose.model('features', schema);
    console.log('Connected');
    featuresTable.countDocuments({}, function(err, count) {
      if (err) { return handleError(err) } //handle possible errors

      documentCount = count;
      console.log('The amount of records is: ' + documentCount);
      cb();
      //and do some other fancy stuff
    });

  };



  const createParams = (numRecords) => {
    let params = [];

    features.createFeatures(numRecords).forEach(house => {
      params.push({
        insertOne : {
          document: {
            house_id: documentCount,
            type:house.type,
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
            sqft: house.sqft
          }

        }
      });

    });

    return params;
  }


  //function to load feature mock data
  const loadFeatures = (callback, numRecords = 100, params = []) => {
    console.log(documentCount);
    if (params.length === 0) {
      features.createFeatures(numRecords).forEach(house => {
        params.push({
          insertOne : {
            document: {
              house_id: ++documentCount,
              type:house.type,
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
              sqft: house.sqft
            }
          }
        });
      });
    } else {
      params.forEach(function (value, index, array) {
        value.insertOne.document.house_id = ++documentCount;
      });
    }

    featuresTable.bulkWrite(params).then(()=> {
      console.log(`Loaded ${numRecords}`);
      callback();
    }).catch((err)=> {
      console.log('an error occured');
      console.log(err);
    });

    };

  /////////////////////////Retreiving Facts and Features///////////////////////////
  const getFeatures = (id, callback) => {
    console.log(id);
    featuresTable.find({ house_id: id }, function (err, docs) {
      if (err) {
        console.log(err);
        callback(err, null);
      } else {
        console.log(docs);
        callback(null, docs);
      }
    });
  };

  const getBedBaths = (id, callback) => {
    console.log(id);
    featuresTable.find({ house_id: id }, function (err, docs) {
      if (err) {
        console.log(err);
        callback(err, null);
      } else {
        console.log(docs);
        callback(null, docs);
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