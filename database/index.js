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
  getFeatures: DB.getFeatures,
  getBedBaths: DB.getBedBaths,
  createConnection: DB.createConnection,
  createParams: DB.createParams
};

