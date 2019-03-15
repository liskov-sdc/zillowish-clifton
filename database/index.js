if (!process.env.DB) {process.env.DB = 'mysql'}
let DB
//create functions for MYSQL
if (process.env.DB = 'mysql') {
  DB = require('./mysql');
} else if (process.env.DB = 'portgres') {
  DB = require('./portgres');
} else if (process.env.DB = 'mongoDB') {
  DB = require('./mongoDb');
}




module.exports = {
  loadFeatures: DB.loadFeatures,
  loadInterior: DB.loadInterior,
  getFeatures: DB.getFeatures,
  getInterior: DB.getInterior,
  getBedBaths: DB.getBedBaths,
  createDatabase: DB.createDatabase
};

