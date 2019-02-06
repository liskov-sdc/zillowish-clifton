const express = require('express');
const app = express();
const port = 8181;
const path = require('path');

//app.use(express.static('client/dist'));
app.use(express.static(path.join(__dirname, 'dist')));

// app.get('/', (req, res) => {
//   res.sendfile("we are here");
// });


app.listen(8181, () => {
  console.log(`listening on ${port}`);
});

//console.log(path.join(__dirname,"dist"));