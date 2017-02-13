const mongoose = require('mongoose');
const refreshMongo = require('./mongo-tool');
mongoose.connect('mongodb://localhost/supermarket');

refreshMongo(() => {
  process.exit(0);
});