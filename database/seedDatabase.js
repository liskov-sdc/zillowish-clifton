const mock = require('./createMockData');
const db = require('./index');

db.createDatabase(function () {

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

});





