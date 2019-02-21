const express = require('express');
const app = express();
const port = 8181;
const bodyParser = require('body-parser');
const path = require('path');
const data = require('../database/index');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname+'/../client/dist'));


app.get('/house/:id', (req, res) => {
  //function to seed the mysql database with mock data for the house features
  console.log('ID:',req.params.id);
  data.getFeatures(req.params.id, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send(data);
    }
  });
});

//function to seed the interior_features table with 100 mock data points for the interior features of the house
app.get('/house/interior/:id', (req, res) => {
  //function to seed the mysql database with mock data for the house features
  console.log('ID:',req.params.id);
  data.getInterior(req.params.id, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.listen(8181, () => {
  console.log(`listening on ${port}`);
});

