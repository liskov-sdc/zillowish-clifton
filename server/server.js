require('newrelic');
const port = 3003;

app = require('./app.js');

app.listen(port, () => {
  console.log(`listening on ${port}`);
});

