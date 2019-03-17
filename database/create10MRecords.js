const mock = require('./createMockData');
const db = require('./index');
var i = 1;
var start = new Date().getTime();

db.createConnection(function () {
  load10MRecords().then((result)=>{
    i++;
    nextStep();
  });
});

function nextStep() {
  load10MRecords().then((result)=>{

    if (i<=100000) {
      i++;
      nextStep();
    } else {
      var end = new Date().getTime();
      console.log('The total time it took to inser 10 Million rows was ', end - start);
    };
  });
}




async function load10MRecords() {


      let promise = new Promise((resolve, reject) => {
        db.loadFeatures(function (err) {
          if (err) {
            reject(err);
          } else {
            console.log(i);
            resolve('loop');
          }
        });
      });
      let result = await promise;
      return result;
    };