const mock = require('./createMockData');
const db = require('./index')


db.loadFeatures((err)=> {
  if (err) {
    throw err;
  }
});

db.loadInterior((err)=> {
  if (err) {
    throw err;
  }
});




