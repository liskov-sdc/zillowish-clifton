const mock = require('./createMockData');
const db = require('./index');

var completedInserts = 0;
var start;

//set how many records to insert currently 10 Million
const recordsToInsert = 10000000;
//How many records to randomly create per batch insert
const recordsPerInsert = 31250;
//The number of simultaneous function instances to be called,
// I found 5 to be optimal if using generated data on each insert and 2 if using static data.
const instances = 2;
const numberOfLoops= Math.ceil(recordsToInsert/recordsPerInsert);
//Tested with static Data and found not much improvement over randomizing each insert
//probably due to the multiple simultaneous function calls becoming less productive.
const staticData = db.createParams(recordsPerInsert);

db.createConnection(function () {
  //set the start time for timing the insert of Records
  start = new Date().getTime();
  //start several simultaneous function calls
  for (var i = 0; i < instances; i++) {
    nextStep();
  }
});

function nextStep() {
  load10MRecords().then((result)=>{
    completedInserts++;
    console.log(`${completedInserts} of ${numberOfLoops}`);
    if (completedInserts <= (numberOfLoops-instances)) {
      nextStep();
    } else if (completedInserts === numberOfLoops) {
      var end = new Date().getTime();
      console.log(`The total time it took to insert 10 Million records in ${process.env.DB} was ${(end - start)/60000} minutes`);
      process.exit();
    }
  });
}




async function load10MRecords() {
      let promise = new Promise((resolve, reject) => {
        db.loadFeatures(function (err) {
          if (err) {
            reject(err);
          } else {
            resolve('loop');
          } //finally
        }, completedInserts === numberOfLoops - 1 ? (recordsToInsert - (completedInserts * recordsPerInsert)) : recordsPerInsert,
        staticData);
      });
      let result = promise;
      return result;
};