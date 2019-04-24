const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const data = require('../database/index');
var redis = require('redis').createClient(6736, '172.31.22.186');
redis.on('connect', function() {
  console.log('connected to redis.');
});
data.createConnection(()=>{});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use('/', express.static(__dirname+'/../client/dist'));
app.use('/:id', express.static(__dirname+'/../client/dist'));

//To do Create getAllFeatures
app.get('/house/all/:id', (req, res) => {
  redis.get('key-page-'+req.params.id, (err, reply) =>{
    if (reply) {
      res.send(reply);
    } else {
      data.getAllFeatures(req.params.id, (err, data) => {
        if (err) {
          console.log(err);
          res.status(400).send(err);
        } else {
          res.json(data);
          redis.set('key-page-' + req.params.id, JSON.stringify(data));
        }
      });
    }
  });
});

app.get('/house/all', (req, res) => {
  if (!req.query.page) {
    redis.get('key-page-'+req.params.id, (err, reply) =>{
      if (reply) {
        res.send(reply);
      } else {
        data.getAllFeatures(req.params.id, (err, data) => {
          if (err) {
            console.log(err);
            res.status(400).send(err);
          } else {
            res.json(data);
            redis.set('key-page-' + req.params.id, JSON.stringify(data));
          }
        });
      }
    });
  } else {
    res.redirect('/house/all/' + req.query.page);
  }

});

app.get('/house/:id', (req, res) => {
  redis.get('key-house-'+req.params.id, (err, reply) =>{
    if (reply) {
      res.send(reply);
    } else {
      data.getFeatures(req.params.id, (err, data) => {
        if (err) {
          console.log(err);
          res.status(400).send(err);
        } else {
          res.json(data[0]);
          redis.set('key-house-' + req.params.id, JSON.stringify(data));
        }
      });
    }
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