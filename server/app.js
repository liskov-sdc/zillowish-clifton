const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const data = require('../database/index');

data.createConnection(()=>{});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use('/', express.static(__dirname+'/../client/dist'));
app.use('/:id', express.static(__dirname+'/../client/dist'));

//To do Create getAllFeatures
app.get('/house/all', (req, res) => {
  console.time('read')
  data.getAllFeatures(req.query.page, (err, data) => {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      console.log(`The total time it took to look up a record with id, ${req.params.id}, in ${process.env.DB.trim()} was:`)
      console.timeEnd('read');
      res.status(200).send(data);
    }
  });
});

app.get('/house/:id', (req, res) => {
  console.time('read')
  data.getFeatures(req.params.id, (err, data) => {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      console.log(`The total time it took to look up a record with id, ${req.params.id}, in ${process.env.DB.trim()} was:`)
      console.timeEnd('read');
      res.status(200).send(data);
    }
  });
});

//To do Create postFeatures
app.post('/house/', (req, res) => {
  if(!req.body.features) {
    return res.status(400).send({
      success: 'false',
      message: 'features are required'
    });
  }
  console.time('write');
  data.postFeatures(req.body.features, (err, data) => {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      console.log(`The total time it took to look up a record with id, ${req.params.id}, in ${process.env.DB.trim()} was:`)
      console.timeEnd('write');
      res.status(200).send(data);
    }
  });
});

//To do Create putFeatures
app.put('/house/:id', (req, res) => {
  if(!req.body.features) {
    return res.status(400).send({
      success: 'false',
      message: 'features are required'
    });
  }
  console.time('read');
  data.updateFeatures(req.params.id, req.body.features, (err, data) => {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      console.log(`The total time it took to look up a record with id, ${req.params.id}, in ${process.env.DB.trim()} was:`)
      console.timeEnd('read');
      res.status(200).send(data);
    }
  });
});

//To do Create deleteFeatures
app.delete('/house/:id', (req, res) => {
  console.time('read');
  data.deleteFeatures(req.params.id, (err, data) => {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      console.log(`The total time it took to look up a record with id, ${req.params.id}, in ${process.env.DB.trim()} was:`)
      console.timeEnd('read');
      res.status(200).send(data);
    }
  });
});

app.get('/features/:id', (req, res) => {
  console.time('read');
  data.getBedBaths(req.params.id, (err, data) => {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      console.log(`The total time it took to look up a record with id, ${req.params.id}, in ${process.env.DB.trim()} was:`)
      console.timeEnd('read');
      res.status(200).send(data);
    }
  });
});

module.exports = app;