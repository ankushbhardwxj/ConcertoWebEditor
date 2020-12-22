const express = require('express');
const bodyParser = require('body-parser');
const runRoute = require('./compile');

const app = express();
const PORT = 3000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  if (req.method == 'OPTIONS') {
    res.header(
      'Access-Control-Allow-Methods',
      'PUT, POST, PATCH, DELETE, GET'
    );
    return res.status(200).json({});
  }
  next();
})

app.use('/run', runRoute);
app.listen(PORT, () => console.log(
  'listening on ' + PORT
))
