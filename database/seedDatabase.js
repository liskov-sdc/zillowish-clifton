const mock = require('./createMockData');
const db = require('./index');

db.createConnection(function () {

  db.loadFeatures((err)=> {
    if (err) {
      throw err;
    }
  });

});





