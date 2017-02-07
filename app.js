const mongoose = require('mongoose');
const express = require('express');
const config = require('config');
const bodyParser = require('body-parser');
const router = require('./router');

mongoose.connect(config.get('mongoUri'));

const app = express();

app.use(bodyParser.json())
app.get('/', (req, res) => {
  res.send({
    'hello': 'world'
  })
})

router(app);

app.listen(config.get('httpPort'), () => {
  console.log('server started at http://localhost:' + config.get('httpPort'));   // eslint-disable-line no-console
})

module.exports = app;