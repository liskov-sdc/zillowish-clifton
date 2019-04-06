const port = 3003;
const app = require('./app.js');

app.listen(port, () => {
  console.log(`listening on ${port}`);
});

