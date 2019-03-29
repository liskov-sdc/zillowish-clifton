if (!process.env.DB) {process.env.DB = 'postgres'}
let DB

//create functions for postgres
if (process.env.DB.trim() === 'mysql') {
  console.log(process.env.DB);
  DB = require('./mysql');
} else if (process.env.DB.trim() === 'postgres') {
  console.log(process.env.DB);
  DB = require('./postgres');
} else if (process.env.DB.trim() === 'mongo') {
  console.log(process.env.DB);
  DB = require('./mongoDb');
}




module.exports = {
  loadFeatures: DB.loadFeatures,
  getFeatures: DB.getFeatures,
  getBedBaths: DB.getBedBaths,
  createConnection: DB.createConnection,
  createParams: DB.createParams,
  getAllFeatures: DB.getAllFeatures,
  postFeatures: DB.postFeatures,
  updateFeatures: DB.updateFeatures,
  deleteFeatures: DB.deleteFeatures
};

