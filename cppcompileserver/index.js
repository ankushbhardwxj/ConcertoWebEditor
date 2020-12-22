const express = require('express');
const bodyParser = require('body-parser');
const runRoute = require('./compile');

const app = express();
const PORT = 3000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/run', runRoute);
app.listen(PORT, () => console.log(
  'listening on ' + PORT
))
