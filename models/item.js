const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Category = require('./category');

const itemSchema = new Schema({
  name: String,
  price: Number,
  categoryId: [{
    type: Schema.Types.ObjectId,
    ref: 'Category'
  }]
});

module.exports = mongoose.model('Item', itemSchema);