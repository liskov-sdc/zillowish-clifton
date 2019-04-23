const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const data = require('../database/index');
var redis = require('redis').createClient({port: 6739, host: "172.31.22.186"});
var lru = require('redis-lru');
var readCache = lru(redis, {max: 1000000});

data.createConnection(()=>{});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use('/', express.static(__dirname+'/../client/dist'));
app.use('/:id', express.static(__dirname+'/../client/dist'));

//To do Create getAllFeatures
app.get('/house/all/:id', (req, res) => {
  let promise = readCache.getOrSet('page'+req.params.id, () =>{
    return data.getAllFeatures(req.query.page, (err, data) => {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      } else {
        return data;
      }
    });
  }, 1000000);

  promise.then((data) =>{
    res.status(200).send(data);
  }).catch((error) =>{
    console.log(error)
  });
});

app.get('/house/all', (req, res) => {
  if (!req.query.page) {
    let promise = readCache.getOrSet('page1', () =>{
    return data.getAllFeatures(req.query.page, (err, data) => {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      } else {
        return data;
      }
    });
  }, 1000000);

    promise.then((data) =>{
      res.status(200).send(data);
    }).catch((error) =>{
      console.log(error)
    });
  } else {
    res.redirect('/house/all/' + req.query.page);
  }

});

app.get('/house/:id', (req, res) => {
  let promise = readCache.getOrSet(req.params.id, ()=>{
    return data.getFeatures(req.params.id, (err, data) => {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      } else {
        return data;
      }
    });
  });

  promise.then((data)=>{
    res.status(200).send(data);
  });

});


// app.post('/house/', (req, res) => {
//   if(!req.body.features) {
//     return res.status(400).send({
//       success: 'false',
//       message: 'features are required'
//     });
//   }

//   data.postFeatures(req.body.features, (err, data) => {
//     if (err) {
//       console.log(err);
//       res.status(400).send(err);
//     } else {
//       res.status(200).send(data);
//     }
//   });
// });

// 
// app.put('/house/:id', (req, res) => {
//   if(!req.body.features) {
//     return res.status(400).send({
//       success: 'false',
//       message: 'features are required'
//     });
//   }
//   data.updateFeatures(req.params.id, req.body.features, (err, data) => {
//     if (err) {
//       console.log(err);
//       res.status(400).send(err);
//     } else {
//       console.log('updated record')
//       res.status(200).send(data);
//     }
//   });
// });

// 
// app.delete('/house/:id', (req, res) => {
//   console.time('read');
//   data.deleteFeatures(req.params.id, (err, data) => {
//     if (err) {
//       console.log(err);
//       res.status(400).send(err);
//     } else {
//       console.log(`The total time it took to look up a record with id, ${req.params.id}, in ${process.env.DB.trim()} was:`)
//       console.timeEnd('read');
//       res.status(200).send(data);
//     }
//   });
// });

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